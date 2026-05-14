/**
 * Optional emergency override without rebuilding (set before the app module loads):
 * <script>window.__EVENTIFY_API_URL__="https://your-api.com/api"</script>
 *
 * Express mounts all routes under `/api`. Host-only URLs like
 * `https://service.onrender.com` are normalized to `.../api` so requests
 * hit `/api/events`, `/api/auth/login`, etc.
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

function resolveApiBase() {
  const fromWindow =
    typeof window !== "undefined" && window.__EVENTIFY_API_URL__
      ? String(window.__EVENTIFY_API_URL__).trim()
      : "";
  const fromEnv = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  return normalizeApiBase(fromWindow || fromEnv);
}

export const API_BASE = resolveApiBase();

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
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = { "Content-Type": "application/json" };
  if (!skipAuth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    const err = new Error(
      `Cannot reach API (${e?.message || "network"}). Requests use: ${API_BASE}`
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
