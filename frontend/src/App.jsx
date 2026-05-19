import { useState, useEffect, createContext, useContext } from 'react'

// ⚠️ ⚠️ ⚠️ STYLES ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg: #0a0a0f;
//     --surface: #131318;
//     --surface2: #1c1c28;
//     --border: rgba(255,255,255,0.08);
//     --accent: #e8b86d;
//     --accent2: #c07d3a;
//     --red: #e85d5d;
//     --green: #4ecb8d;
//     --text: #f0ede8;
//     --muted: #888;
//     --font-display: 'Playfair Display', serif;
//     --font-body: 'DM Sans', sans-serif;
//     --radius: 12px;
//     --shadow: 0 8px 32px rgba(0,0,0,0.5);
//   }

//   body {
//     background: var(--bg);
//     color: var(--text);
//     font-family: var(--font-body);
//     font-size: 15px;
//     line-height: 1.6;
//     min-height: 100vh;
//   }

//   /* NAV */
//   .nav {
//     position: fixed; top: 0; left: 0; right: 0; z-index: 100;
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 18px 48px;
//     background: rgba(10,10,15,0.92);
//     backdrop-filter: blur(20px);
//     border-bottom: 1px solid var(--border);
//   }
//   .nav-logo {
//     font-family: var(--font-display);
//     font-size: 24px; font-weight: 900;
//     color: var(--accent);
//     cursor: pointer; letter-spacing: -0.5px;
//   }
//   .nav-links { display: flex; gap: 32px; align-items: center; }
//   .nav-link {
//     color: var(--muted); font-size: 14px; font-weight: 500;
//     cursor: pointer; transition: color 0.2s;
//     background: none; border: none; font-family: var(--font-body);
//   }
//   .nav-link:hover { color: var(--text); }
//   .nav-link.active { color: var(--accent); }
//   .nav-actions { display: flex; gap: 12px; align-items: center; }

//   /* BUTTONS */
//   .btn {
//     padding: 10px 22px; border-radius: 8px; font-size: 14px;
//     font-weight: 600; cursor: pointer; border: none;
//     font-family: var(--font-body); transition: all 0.2s;
//     display: inline-flex; align-items: center; gap: 8px;
//   }
//   .btn-primary { background: var(--accent); color: #0a0a0f; }
//   .btn-primary:hover { background: #f0c87d; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(232,184,109,0.3); }
//   .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
//   .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
//   .btn-danger { background: var(--red); color: white; }
//   .btn-danger:hover { background: #d44; }
//   .btn-success { background: var(--green); color: #0a0a0f; }
//   .btn-lg { padding: 14px 32px; font-size: 16px; border-radius: 10px; }
//   .btn-sm { padding: 7px 14px; font-size: 13px; }

//   /* LAYOUT */
//   .page { padding-top: 80px; min-height: 100vh; }
//   .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
//   .section { padding: 80px 0; }

//   /* HERO */
//   .hero {
//     min-height: 92vh; display: flex; align-items: center;
//     position: relative; overflow: hidden;
//     background: radial-gradient(ellipse at 30% 50%, rgba(232,184,109,0.08) 0%, transparent 60%),
//                 radial-gradient(ellipse at 80% 20%, rgba(78,203,141,0.05) 0%, transparent 50%);
//   }
//   .hero::before {
//     content: '';
//     position: absolute; inset: 0;
//     background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
//   }
//   .hero-content { position: relative; max-width: 680px; }
//   .hero-badge {
//     display: inline-flex; align-items: center; gap: 8px;
//     background: rgba(232,184,109,0.1); border: 1px solid rgba(232,184,109,0.3);
//     color: var(--accent); padding: 6px 16px; border-radius: 100px;
//     font-size: 13px; font-weight: 500; margin-bottom: 28px;
//   }
//   .hero-title {
//     font-family: var(--font-display);
//     font-size: clamp(42px, 6vw, 80px);
//     font-weight: 900; line-height: 1.05;
//     margin-bottom: 24px; letter-spacing: -2px;
//   }
//   .hero-title span { color: var(--accent); }
//   .hero-sub { font-size: 18px; color: var(--muted); margin-bottom: 40px; max-width: 500px; }
//   .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
//   .hero-stats {
//     display: flex; gap: 48px; margin-top: 64px;
//     padding-top: 40px; border-top: 1px solid var(--border);
//   }
//   .stat-num { font-family: var(--font-display); font-size: 36px; font-weight: 900; color: var(--accent); }
//   .stat-label { color: var(--muted); font-size: 13px; }

//   /* SEARCH BAR */
//   .search-bar {
//     display: flex; gap: 12px; background: var(--surface);
//     border: 1px solid var(--border); border-radius: 14px;
//     padding: 8px 8px 8px 20px; margin-bottom: 40px;
//     max-width: 600px;
//   }
//   .search-bar input {
//     flex: 1; background: none; border: none; outline: none;
//     color: var(--text); font-family: var(--font-body); font-size: 15px;
//   }
//   .search-bar input::placeholder { color: var(--muted); }

//   /* CARDS */
//   .grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
//   .grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 24px; }
//   .card {
//     background: var(--surface); border: 1px solid var(--border);
//     border-radius: 16px; overflow: hidden;
//     transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
//     cursor: pointer;
//   }
//   .card:hover { transform: translateY(-4px); border-color: rgba(232,184,109,0.3); box-shadow: var(--shadow); }
//   .card-img {
//     width: 100%; height: 200px; object-fit: cover;
//     background: linear-gradient(135deg, var(--surface2), #2a2a3a);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 48px;
//   }
//   .card-body { padding: 20px; }
//   .card-tag {
//     display: inline-block;
//     background: rgba(232,184,109,0.12); color: var(--accent);
//     padding: 3px 10px; border-radius: 100px; font-size: 11px;
//     font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
//     margin-bottom: 10px;
//   }
//   .card-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 8px; }
//   .card-meta { display: flex; gap: 16px; color: var(--muted); font-size: 13px; margin-bottom: 16px; flex-wrap: wrap; }
//   .card-meta span { display: flex; align-items: center; gap: 4px; }
//   .card-footer { display: flex; justify-content: space-between; align-items: center; }
//   .price { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--accent); }

//   /* SECTION HEADERS */
//   .section-header { text-align: center; margin-bottom: 60px; }
//   .section-tag {
//     display: inline-block; color: var(--accent); font-size: 12px;
//     font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
//     margin-bottom: 16px;
//   }
//   .section-title {
//     font-family: var(--font-display);
//     font-size: clamp(28px, 4vw, 44px);
//     font-weight: 900; letter-spacing: -1px; margin-bottom: 16px;
//   }
//   .section-sub { color: var(--muted); max-width: 520px; margin: 0 auto; }

//   /* FORMS */
//   .form-group { margin-bottom: 20px; }
//   .form-label { display: block; font-size: 13px; font-weight: 600; color: var(--muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
//   .form-input {
//     width: 100%; padding: 12px 16px;
//     background: var(--surface2); border: 1px solid var(--border);
//     border-radius: 8px; color: var(--text);
//     font-family: var(--font-body);
//   }
// `;

function useForm(defaults = {}) {
  const [values, setValues] = useState(defaults);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const register = (name, rules = {}) => ({
    value: values[name] ?? "",
    onChange: (e) => {
      setValues(p => ({ ...p, [name]: e.target.value }));
    },
    onBlur: () => {
      setTouched(p => ({ ...p, [name]: true }));
      validate(name, values[name], rules);
    },
    className: `form-input${errors[name] ? " error" : ""}`,
  });

  const validate = (name, value, rules) => {
    let err = "";
    if (rules.required && !value) err = "Required";
    if (rules.min && value.length < rules.min) err = `Min ${rules.min} characters`;
    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = "Invalid email";
    setErrors(p => ({ ...p, [name]: err }));
  };

  const validateAll = (schema) => {
    let allErrs = {};
    Object.entries(schema).forEach(([name, rules]) => {
      let err = "";
      const value = values[name] ?? "";
      if (rules.required && !value) err = "Required";
      if (rules.min && value.length < rules.min) err = `Min ${rules.min} characters`;
      if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = "Invalid email";
      if (err) allErrs[name] = err;
    });
    setErrors(allErrs);
    return Object.keys(allErrs).length === 0;
  };

  const reset = () => { setValues(defaults); setErrors({}); setTouched({}); };
  const setValue = (name, val) => setValues(p => ({ ...p, [name]: val }));

  return { values, errors, register, validateAll, reset, setValue };
}

// Pagination hook
function usePagination(items, perPage = 6) {
  const [page, setPage] = useState(0);
  const start = page * perPage;
  const end = start + perPage;
  const paginated = items.slice(start, end);
  const pageCount = Math.ceil(items.length / perPage);
  return { paginated, page, setPage, pageCount };
}

// Context & Providers
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toast = (msg, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    if (duration > 0) setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), duration);
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  );
}

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem("evtfy_token");
    const user = sessionStorage.getItem("evtfy_user");
    return token ? { token, user: user ? JSON.parse(user) : null } : null;
  });

  const login = ({ token: t, user: u }) => {
    setAuth({ token: t, user: u });
    sessionStorage.setItem("evtfy_token", t);
    sessionStorage.setItem("evtfy_user", JSON.stringify(u));
  };

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem("evtfy_token");
    sessionStorage.removeItem("evtfy_user");
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const toggle = () => setDark(d => !d);
  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
}

function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const addEvent = async (payload) => {
    const { api } = await import("./api/client");
    return api("/events", { method: "POST", body: payload });
  };

  const updateEvent = async (id, data) => {
    const { api } = await import("./api/client");
    return api(`/events/${id}`, { method: "PUT", body: data });
  };

  const deleteEvent = async (id) => {
    const { api } = await import("./api/client");
    return api(`/events/${id}`, { method: "DELETE" });
  };

  return <EventContext.Provider value={{ events, setEvents, loading, setLoading, addEvent, updateEvent, deleteEvent }}>{children}</EventContext.Provider>;
}

const AuthContext = createContext();
const ThemeContext = createContext();
const EventContext = createContext();
const ToastContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);
export const useEvent = () => useContext(EventContext);
export const useToast = () => useContext(ToastContext);

// Components
const Badge = ({ status }) => {
  const colors = { confirmed: "var(--accent)", cancelled: "var(--red)", pending: "#888" };
  return <span style={{ background: colors[status], color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>{status}</span>;
};

const StatCard = ({ num, label, icon, trend }) => (
  <div style={{ padding: "24px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", textAlign: "center" }}>
    <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
    <div style={{ fontSize: "32px", fontWeight: "900", color: "var(--accent)" }}>{num}</div>
    <div style={{ fontSize: "13px", color: "var(--muted)" }}>{label}</div>
    {trend && <div style={{ fontSize: "12px", color: trend > 0 ? "var(--green)" : "var(--red)" }}>{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%</div>}
  </div>
);

const MiniBar = ({ pct, color = "var(--accent)" }) => (
  <div style={{ width: "100%", height: "4px", background: "var(--surface2)", borderRadius: "2px", overflow: "hidden" }}>
    <div style={{ width: `${pct}%`, height: "100%", background: color, transition: "width 0.3s" }} />
  </div>
);

function Sidebar({ title, subtitle, subtitleColor, items, active, setActive }) {
  return (
    <div style={{ borderRight: "1px solid var(--border)", paddingRight: "32px", minHeight: "400px" }}>
      <h2 style={{ marginBottom: "8px" }}>{title}</h2>
      <p style={{ color: subtitleColor || "var(--muted)", marginBottom: "24px", fontSize: "14px" }}>{subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map(item => (
          <button key={item} onClick={() => setActive(item)} style={{ padding: "12px 16px", textAlign: "left", background: active === item ? "var(--surface)" : "transparent", border: "none", color: active === item ? "var(--accent)" : "var(--text)", cursor: "pointer", borderRadius: "8px", transition: "all 0.2s" }}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

// QR Code Generator (ASCII-art style)
function QRCode({ value, size = 140 }) {
  const qr = String(value).substring(0, 20);
  const blocks = Array.from(qr).map((c, i) => (i % 2 === 0 ? "█" : "░")).join("");
  return <pre style={{ fontSize: "8px", lineHeight: "1", color: "var(--accent)" }}>{blocks}</pre>;
}

// Skeleton loader for event cards
function SkeletonCard() {
  return (
    <div style={{ background: "var(--surface)", borderRadius: "12px", height: "300px", animation: "pulse 1s infinite", opacity: 0.5 }} />
  );
}

// PDF Ticket "generator" — opens printable page
function generatePDFTicket(booking, user) {
  const w = window.open("", "_blank");
  w.document.write(`<html><body style="font-family:Arial;padding:20px;">
    <h2>${booking.event}</h2>
    <p>Booking ID: ${booking.id}</p>
    <p>Tickets: ${booking.tickets}</p>
    <p>Total: $${booking.total}</p>
  </body></html>`);
  w.document.close();
}

// Razorpay stub
function loadRazorpay(amount, name, onSuccess) {
  alert(`[Razorpay] Would pay $${amount} for ${name}`);
  onSuccess({ razorpay_payment_id: "pay_" + Date.now() });
}

// Cloudinary upload stub
async function uploadToCloudinary(file) {
  return new Promise(resolve => setTimeout(() => resolve({ url: URL.createObjectURL(file), public_id: "evt_" + Date.now() }), 1200));
}

// ============= PAGE COMPONENTS =============

function Navbar({ page, setPage, setModal }) {
  const auth = useAuth();
  const { dark, toggle } = useTheme();
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", background: "rgba(20, 20, 28, 0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <h1 style={{ cursor: "pointer", color: "var(--accent)", margin: 0, fontSize: "24px" }} onClick={() => setPage("home")}>eventify</h1>
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["home", "events"].map(p => (
          <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", color: page === p ? "var(--accent)" : "var(--text)", cursor: "pointer", textTransform: "capitalize" }}>{p}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {auth?.auth ? (
          <>
            <button onClick={() => setPage("dashboard")} style={{ padding: "8px 16px", background: "var(--surface)", border: "none", color: "var(--text)", cursor: "pointer", borderRadius: "6px" }}>Dashboard</button>
            <button onClick={() => auth.logout()} style={{ padding: "8px 16px", background: "var(--red)", border: "none", color: "white", cursor: "pointer", borderRadius: "6px" }}>Logout</button>
          </>
        ) : (
          <button onClick={() => setModal({ type: "login" })} style={{ padding: "8px 16px", background: "var(--accent)", border: "none", color: "#000", cursor: "pointer", borderRadius: "6px" }}>Login</button>
        )}
        <button onClick={toggle} style={{ padding: "8px", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>{dark ? "🌙" : "☀️"}</button>
      </div>
    </nav>
  );
}

// ========== UPDATED: EventCard with Banner Display ==========
function EventCard({ event, setPage, setSelectedEvent }) {
  return (
    <div 
      className="event-card"
      onClick={() => {
        setSelectedEvent(event);
        setPage("detail");
      }}
      style={{ cursor: "pointer" }}
    >
      {/* EVENT BANNER */}
      {event.banner ? (
        <div 
          className="event-card-banner"
          style={{
            backgroundImage: `url(${event.banner})`,
          }}
        />
      ) : (
        <div 
          className="event-card-banner-fallback"
        >
          {event.emoji || "🎪"}
        </div>
      )}
      
      {/* EVENT CONTENT */}
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p className="event-date">{event.date}</p>
        <p className="event-price">${event.price || "TBA"}</p>
      </div>
    </div>
  );
}

function HomePage({ setPage, setSelectedEvent, setModal }) {
  return (
    <div style={{ paddingTop: "100px", textAlign: "center", minHeight: "100vh" }}>
      <h1>Welcome to eventify</h1>
      <p style={{ color: "var(--muted)", marginBottom: "32px" }}>Discover and manage amazing events</p>
      <button onClick={() => setPage("events")} style={{ padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontSize: "16px", fontWeight: "600" }}>Explore Events</button>
    </div>
  );
}

function EventsPage({ setPage, setSelectedEvent }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const { api, normalizeEvent } = await import("./api/client");
        const data = await api("/events");
        setEvents((data.events || []).map(normalizeEvent));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px" }}>
      <h1>All Events</h1>
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px", marginTop: "32px" }}>
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px", marginTop: "32px" }}>
          {events.map(e => <EventCard key={e.id} event={e} setPage={setPage} setSelectedEvent={setSelectedEvent} />)}
        </div>
      )}
    </div>
  );
}

function EventDetailPage({ event, setPage, setModal }) {
  const [isWished, setIsWished] = useState(false);
  
  const toggleWish = async () => {
    setIsWished(!isWished);
  };

  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px", maxWidth: "900px", margin: "0 auto" }}>
      {event.banner && <img src={event.banner} alt={event.title} style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px", marginBottom: "32px" }} />}
      <h1>{event.title}</h1>
      <p style={{ fontSize: "18px", color: "var(--muted)", marginBottom: "24px" }}>{event.date}</p>
      <p style={{ fontSize: "24px", fontWeight: "600", color: "var(--accent)", marginBottom: "32px" }}>${event.price}</p>
      <button onClick={() => setModal({ type: "booking", event })} style={{ padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontSize: "16px", fontWeight: "600" }}>Book Tickets</button>
      <button onClick={toggleWish} style={{ padding: "12px 32px", background: isWished ? "var(--red)" : "var(--surface)", color: isWished ? "white" : "var(--text)", border: "none", cursor: "pointer", borderRadius: "8px", marginLeft: "12px", fontSize: "16px" }}>{isWished ? "❤️ Wishlisted" : "🤍 Wishlist"}</button>
    </div>
  );
}

function var_radius() { return "var(--radius)"; }

function BookingPage({ event, setPage, setModal }) {
  const form = useForm({ tickets: 1 });
  const [razorpayReady, setRazorpayReady] = useState(false);

  const handlePay = () => {
    const total = form.values.tickets * event.price;
    loadRazorpay(total, event.title, (res) => {
      console.log("Payment successful:", res);
      setPage("home");
    });
  };

  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Book {event.title}</h1>
      <div style={{ marginTop: "32px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Number of Tickets</label>
        <input type="number" min="1" max="10" {...form.register("tickets")} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)" }} />
      </div>
      <div style={{ marginTop: "32px", padding: "16px", background: "var(--surface)", borderRadius: "8px" }}>
        <p>Tickets: {form.values.tickets}</p>
        <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--accent)" }}>Total: ${form.values.tickets * event.price}</p>
      </div>
      <button onClick={handlePay} style={{ width: "100%", padding: "12px", marginTop: "24px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "600", fontSize: "16px" }}>Pay Now</button>
    </div>
  );
}

function UserDashboard({ setPage, setModal }) {
  const auth = useAuth();
  const [tab, setTab] = useState("profile");

  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px" }}>
      <h1>My Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", marginTop: "32px" }}>
        <Sidebar title="Account" subtitle="Manage your profile" items={["profile", "bookings", "settings"]} active={tab} setActive={setTab} />
        <div>
          {tab === "profile" && <ProfileTab user={auth?.auth?.user} />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user }) {
  const form = useForm(user || {});
  const [image, setImage] = useState(null);

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      setImage(url.url);
      form.setValue("avatar", url.url);
    }
  };

  const save = async () => {
    const { api } = await import("./api/client");
    try {
      await api("/users/me", { method: "PUT", body: form.values });
      alert("Profile updated!");
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <div style={{ marginTop: "24px" }}>
        <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "var(--surface)", marginBottom: "16px", backgroundImage: image ? `url(${image})` : "none", backgroundSize: "cover" }} />
        <label style={{ display: "block", marginTop: "8px" }}>
          <span style={{ color: "var(--accent)", cursor: "pointer" }}>Change Avatar</span>
          <input type="file" onChange={handleImgUpload} style={{ display: "none" }} />
        </label>
      </div>
      <div style={{ marginTop: "24px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Name</label>
        <input {...form.register("name")} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)" }} />
      </div>
      <button onClick={save} style={{ marginTop: "24px", padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "600" }}>Save Changes</button>
    </div>
  );
}

function SettingsTab() {
  const [notifs, setNotifs] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const persistToggles = async (next) => {
    const { api } = await import("./api/client");
    try {
      await api("/users/me/settings", { method: "PUT", body: { notifs: next.notifs ?? notifs, newsletter: next.newsletter ?? newsletter } });
    } catch (e) {
      console.error(e);
    }
  };

  const T = ({ name, label, desc }) => (
    <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <p style={{ fontWeight: "600", margin: 0 }}>{label}</p>
        <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>{desc}</p>
      </div>
      <input type="checkbox" onChange={(e) => { const next = { [name]: e.target.checked }; if (name === "notifs") setNotifs(e.target.checked); else setNewsletter(e.target.checked); persistToggles(next); }} style={{ cursor: "pointer" }} />
    </div>
  );

  return (
    <div>
      <h2>Settings</h2>
      <T name="notifs" label="Notifications" desc="Get updates about your bookings" />
      <T name="newsletter" label="Newsletter" desc="Subscribe to event recommendations" />
    </div>
  );
}

function OrganizerDashboard({ setPage }) {
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const [tab, setTab] = useState("published");
  const [editingEvent, setEditingEvent] = useState(null);
  const form = useForm(editingEvent || { title: "", date: "", price: 0, emoji: "🎪", banner: "" });

  useEffect(() => {
    (async () => {
      try {
        const { api, normalizeEvent } = await import("./api/client");
        const data = await api("/organizer/events");
        setPublished((data.events || []).map(normalizeEvent));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const startEdit = (ev) => {
    setEditingEvent(ev);
    form.setValue("title", ev.title);
    form.setValue("date", ev.date);
    form.setValue("price", ev.price);
    form.setValue("banner", ev.banner || "");
  };

  const publish = async (draft = false) => {
    const { api } = await import("./api/client");
    try {
      if (editingEvent?.id) {
        await api(`/events/${editingEvent.id}`, { method: "PUT", body: form.values });
      } else {
        await api("/events", { method: "POST", body: form.values });
      }
      alert("Event saved!");
      setEditingEvent(null);
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const handleBanner = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await uploadToCloudinary(file);
      form.setValue("banner", result.url);
    }
  };

  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px" }}>
      <h1>My Events</h1>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", marginTop: "32px" }}>
        <Sidebar title="Events" subtitle="Manage your events" items={["published", "drafts"]} active={tab} setActive={setTab} />
        <div>
          {!editingEvent ? (
            <>
              <button onClick={() => setEditingEvent({})} style={{ padding: "12px 24px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "600" }}>+ New Event</button>
              <div style={{ marginTop: "32px", display: "grid", gap: "16px" }}>
                {(tab === "published" ? published : drafts).map(e => (
                  <div key={e.id} style={{ padding: "16px", background: "var(--surface)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ margin: 0 }}>{e.title}</h3>
                      <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)" }}>{e.date}</p>
                    </div>
                    <button onClick={() => startEdit(e)} style={{ padding: "8px 16px", background: "var(--surface2)", border: "none", color: "var(--accent)", cursor: "pointer", borderRadius: "6px" }}>Edit</button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <h2>Edit Event</h2>
              <div style={{ marginTop: "24px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Title</label>
                <input {...form.register("title")} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)", marginBottom: "16px" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Date</label>
                <input type="date" {...form.register("date")} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)", marginBottom: "16px" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Price</label>
                <input type="number" {...form.register("price")} style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)", marginBottom: "16px" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Banner Image</label>
                <input type="file" onChange={handleBanner} style={{ marginBottom: "16px" }} />
                {form.values.banner && <img src={form.values.banner} alt="Preview" style={{ width: "200px", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "16px" }} />}
              </div>
              <button onClick={() => publish()} style={{ padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "600" }}>Save Event</button>
              <button onClick={() => setEditingEvent(null)} style={{ padding: "12px 32px", marginLeft: "12px", background: "var(--surface2)", color: "var(--text)", border: "none", cursor: "pointer", borderRadius: "8px" }}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "32px" }}>
        <StatCard num="1,234" label="Total Events" icon="🎪" trend={12} />
        <StatCard num="5,678" label="Total Users" icon="👥" trend={8} />
        <StatCard num="$45.2K" label="Revenue" icon="💰" trend={-3} />
        <StatCard num="987" label="Active Bookings" icon="🎟️" trend={5} />
      </div>
    </div>
  );
}

function HowItWorksPage() {
  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px", textAlign: "center" }}>
      <h1>How It Works</h1>
      <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
        <div>
          <h3>1. Browse Events</h3>
          <p style={{ color: "var(--muted)" }}>Explore events happening near you</p>
        </div>
        <div>
          <h3>2. Book Tickets</h3>
          <p style={{ color: "var(--muted)" }}>Select dates and purchase tickets</p>
        </div>
        <div>
          <h3>3. Get Confirmation</h3>
          <p style={{ color: "var(--muted)" }}>Receive your tickets instantly</p>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px", textAlign: "center" }}>
      <h1>About eventify</h1>
      <p style={{ maxWidth: "600px", margin: "24px auto", color: "var(--muted)", lineHeight: "1.8" }}>
        eventify is your go-to platform for discovering, booking, and managing events. Whether you're an event organizer or a ticket buyer, we make it simple and enjoyable.
      </p>
    </div>
  );
}

function ContactPage() {
  const form = useForm({ name: "", email: "", message: "" });

  const send = async () => {
    try {
      const { api } = await import("./api/client");
      await api("/contact", { method: "POST", body: form.values, skipAuth: true });
      alert("Message sent!");
      form.reset();
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div style={{ paddingTop: "100px", padding: "100px 48px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Contact Us</h1>
      <div style={{ marginTop: "32px" }}>
        <input {...form.register("name", { required: true })} placeholder="Your Name" style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)", marginBottom: "16px" }} />
        <input {...form.register("email", { required: true, email: true })} placeholder="Your Email" style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)", marginBottom: "16px" }} />
        <textarea {...form.register("message", { required: true })} placeholder="Your Message" style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", color: "var(--text)", minHeight: "120px", marginBottom: "16px" }} />
        <button onClick={send} style={{ width: "100%", padding: "12px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "600", fontSize: "16px" }}>Send Message</button>
      </div>
    </div>
  );
}

function AuthModal({ type, setModal, setPage }) {
  const auth = useAuth();
  const form = useForm({ email: "", password: "" });
  const toast = useToast();

  const submit = async () => {
    try {
      const { api } = await import("./api/client");
      const data = await api(`/auth/${type}`, { method: "POST", body: form.values, skipAuth: true });
      auth.login(data);
      setModal(null);
      setPage("home");
      if (data.user?.role === "organizer") setPage("organizer");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "var(--surface)", padding: "48px", borderRadius: "16px", maxWidth: "400px", width: "100%" }}>
        <h2 style={{ textTransform: "capitalize", marginTop: 0 }}>{type}</h2>
        <input {...form.register("email", { required: true, email: true })} placeholder="Email" style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface2)", color: "var(--text)", marginBottom: "16px" }} />
        <input type="password" {...form.register("password", { required: true, min: 6 })} placeholder="Password" style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface2)", color: "var(--text)", marginBottom: "24px" }} />
        <button onClick={submit} style={{ width: "100%", padding: "12px", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "600", marginBottom: "12px" }}>Submit</button>
        <button onClick={() => setModal(null)} style={{ width: "100%", padding: "12px", background: "var(--surface2)", border: "none", color: "var(--text)", cursor: "pointer", borderRadius: "8px" }}>Close</button>
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "48px", marginTop: "80px", textAlign: "center", color: "var(--muted)", fontSize: "13px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "32px", marginBottom: "48px", textAlign: "left" }}>
        <div><h4 style={{ color: "var(--text)" }}>Product</h4><button onClick={() => setPage("events")} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>Events</button></div>
        <div><h4 style={{ color: "var(--text)" }}>Company</h4><button onClick={() => setPage("about")} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>About</button></div>
        <div><h4 style={{ color: "var(--text)" }}>Support</h4><button onClick={() => setPage("contact")} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>Contact</button></div>
      </div>
      <p style={{ margin: 0 }}>© 2025 eventify. All rights reserved.</p>
    </footer>
  );
}

function AppInner() {
  const [page, setPage] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modal, setModal] = useState(null);

  return (
    <>
      <Navbar page={page} setPage={setPage} setModal={setModal} />
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        {page === "home" && <HomePage setPage={setPage} setSelectedEvent={setSelectedEvent} setModal={setModal} />}
        {page === "events" && <EventsPage setPage={setPage} setSelectedEvent={setSelectedEvent} />}
        {page === "detail" && selectedEvent && <EventDetailPage event={selectedEvent} setPage={setPage} setModal={setModal} />}
        {page === "booking" && selectedEvent && <BookingPage event={selectedEvent} setPage={setPage} setModal={setModal} />}
        {page === "dashboard" && <UserDashboard setPage={setPage} setModal={setModal} />}
        {page === "organizer" && <OrganizerDashboard setPage={setPage} />}
        {page === "admin" && <AdminDashboard />}
        {page === "how-it-works" && <HowItWorksPage />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
        {modal && <AuthModal type={modal.type} setModal={setModal} setPage={setPage} />}
      </div>
      <Footer setPage={setPage} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <EventProvider>
          <ToastProvider>
            <AppInner />
          </ToastProvider>
        </EventProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
