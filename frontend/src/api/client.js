/**
 * Optional override (must run before this module loads):
 * <script>window.__EVENTIFY_API_URL__="https://your-api.com/api"</script>
 *
 * Express mounts routes under `/api`. Host-only URLs get `/api` appended.
 *
 * Production without VITE_API_URL: uses same-origin `/api` (or /{BASE_URL}api).
 * Deploy with `frontend/vercel.json` or `public/_redirects` so `/api` proxies to Render.
 */
function normalizeApiBase(raw) {
  const s = String(raw || "").trim().replace(/\/+$/, "");
  if (!s) return "http://localhost:5000/api";
  if (/\/api$/i.test(s)) return s;
  try {
    const href = /^https?:\/\//i.test(s) ? s : `https://${s}`;
    const u = new URL(href);
    const path = (u.pathname || "/").replace(/\/+$/, "") || "/";
    if (path === "/") {
      u.pathname = "/api";
      return u.toString().replace(/\/+$/, "");
    }
  } catch {
    /* ignore */
  }
  return `${s}/api`;
}

/** If the page is HTTPS, never call a non-localhost http:// API (mixed content → Failed to fetch). */
function upgradeToHttpsIfNeeded(base) {
  if (typeof window === "undefined") return base;
  if (window.location.protocol !== "https:") return base;
  if (base.startsWith("http://") && !/localhost|127\.0\.0\.1/i.test(base)) {
    return `https://${base.slice(7)}`;
  }
  return base;
}

/** Same-origin API path for static hosts with a reverse proxy to the real backend. */
function productionSameOriginApi() {
  const origin = window.location.origin;
  const prefix = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const suffix = prefix ? `${prefix}/api` : "/api";
  return `${origin}${suffix}`;
}

export function getApiBase() {
  const fromWindow =
    typeof window !== "undefined" && window.__EVENTIFY_API_URL__
      ? String(window.__EVENTIFY_API_URL__).trim()
      : "";
  const fromEnv = (import.meta.env.VITE_API_URL || "").trim();
  const explicit = fromWindow || fromEnv;

  if (explicit) {
    return upgradeToHttpsIfNeeded(normalizeApiBase(explicit));
  }
  if (typeof window !== "undefined") {
    return productionSameOriginApi().replace(/\/+$/, "");
  }
  return "http://localhost:5000/api";
}

export function getToken() {
  return sessionStorage.getItem("evtfy_token");
}

export function setToken(token) {
  if (token) sessionStorage.setItem("evtfy_token", token);
  else sessionStorage.removeItem("evtfy_token");
}

/**
 * @param {string} path - e.g. "/auth/login"
 * @param {{ method?: string, body?: unknown, skipAuth?: boolean }} [opts]
 */
export async function api(path, { method = "GET", body, skipAuth = false } = {}) {
  const base = getApiBase();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = { "Content-Type": "application/json" };
  if (!skipAuth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  let res;
  try {
    res = await fetch(url, {
      method,
      mode: "cors",
      credentials: "omit",
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    const err = new Error(
      `Cannot reach API (${e?.message || "network"}). Requests use: ${base}`
    );
    err.cause = e;
    throw err;
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.details = json.details;
    throw err;
  }
  return json;
}

export function normalizeEvent(raw) {
  if (!raw) return null;
  const id = raw.id ?? raw._id;
  const sid = typeof id === "object" && id?.toString ? id.toString() : String(id);
  let organizer = raw.organizer;
  if (organizer && typeof organizer === "object" && organizer._id) {
    organizer = {
      id: organizer._id.toString(),
      name: organizer.name,
      email: organizer.email,
    };
  }
  return {
    ...raw,
    id: sid,
    organizer,
  };
}

export function normalizeBooking(b) {
  if (!b) return null;
  const ev = b.event;
  let title = "Event";
  let emoji = "🎪";
  let date = "";
  let eventMongoId = "";
  if (ev && typeof ev === "object") {
    title = ev.title || title;
    emoji = ev.emoji || emoji;
    date = ev.date || date;
    eventMongoId = ev._id?.toString?.() || ev.id || "";
  } else if (typeof ev === "string") {
    eventMongoId = ev;
  }
  const mongoId = b._id?.toString?.() || b.id;
  return {
    id: b.bookingId || mongoId,
    mongoId,
    eventId: eventMongoId,
    event: title,
    emoji,
    date,
    tickets: b.tickets,
    total: b.total,
    status: b.status,
    seat: b.seatLabel || "General",
    razorpayPaymentId: b.razorpayPaymentId || "",
  };
}
