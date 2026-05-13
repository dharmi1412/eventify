const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

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
  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = { "Content-Type": "application/json" };
  if (!skipAuth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
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
