// import { useState, useEffect, createContext, useContext } from "react";

// // ─── STYLES ──────────────────────────────────────────────────────────────────
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg: #0a0a0f;
//     --surface: #13131a;
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
//     background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
//     font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px);
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
//     font-family: var(--font-body); font-size: 15px;
//     outline: none; transition: border-color 0.2s;
//   }
//   .form-input:focus { border-color: var(--accent); }
//   .form-input::placeholder { color: var(--muted); }
//   select.form-input option { background: var(--surface2); }

//   /* MODAL */
//   .modal-overlay {
//     position: fixed; inset: 0; background: rgba(0,0,0,0.8);
//     backdrop-filter: blur(8px); z-index: 200;
//     display: flex; align-items: center; justify-content: center;
//     padding: 24px;
//   }
//   .modal {
//     background: var(--surface); border: 1px solid var(--border);
//     border-radius: 20px; padding: 40px; width: 100%; max-width: 480px;
//     max-height: 90vh; overflow-y: auto;
//   }
//   .modal-title { font-family: var(--font-display); font-size: 28px; font-weight: 900; margin-bottom: 8px; }
//   .modal-sub { color: var(--muted); margin-bottom: 32px; font-size: 14px; }

//   /* TABS */
//   .tabs { display: flex; gap: 4px; background: var(--surface); padding: 4px; border-radius: 10px; margin-bottom: 32px; }
//   .tab {
//     flex: 1; padding: 10px 16px; border-radius: 7px; border: none;
//     background: none; color: var(--muted); font-family: var(--font-body);
//     font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
//     text-align: center;
//   }
//   .tab.active { background: var(--accent); color: #0a0a0f; }

//   /* FILTER TAGS */
//   .filter-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
//   .filter-tag {
//     padding: 8px 18px; border-radius: 100px;
//     border: 1px solid var(--border); background: none;
//     color: var(--muted); font-size: 13px; font-weight: 500;
//     cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
//   }
//   .filter-tag:hover, .filter-tag.active { background: var(--accent); color: #0a0a0f; border-color: var(--accent); }

//   /* TABLE */
//   table { width: 100%; border-collapse: collapse; }
//   th { text-align: left; padding: 12px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); border-bottom: 1px solid var(--border); }
//   td { padding: 16px; border-bottom: 1px solid var(--border); font-size: 14px; }
//   tr:last-child td { border-bottom: none; }
//   .table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }

//   /* BADGE */
//   .badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; }
//   .badge-success { background: rgba(78,203,141,0.15); color: var(--green); }
//   .badge-warn { background: rgba(232,184,109,0.15); color: var(--accent); }
//   .badge-danger { background: rgba(232,93,93,0.15); color: var(--red); }
//   .badge-info { background: rgba(100,150,255,0.15); color: #7ab0ff; }

//   /* ALERT */
//   .alert { padding: 14px 18px; border-radius: 10px; font-size: 14px; margin-bottom: 20px; }
//   .alert-success { background: rgba(78,203,141,0.1); border: 1px solid rgba(78,203,141,0.3); color: var(--green); }
//   .alert-error { background: rgba(232,93,93,0.1); border: 1px solid rgba(232,93,93,0.3); color: var(--red); }

//   /* STEPS */
//   .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; }
//   .step { text-align: center; }
//   .step-num {
//     width: 56px; height: 56px; border-radius: 50%;
//     background: rgba(232,184,109,0.1); border: 2px solid rgba(232,184,109,0.3);
//     display: flex; align-items: center; justify-content: center;
//     font-family: var(--font-display); font-size: 22px; font-weight: 900;
//     color: var(--accent); margin: 0 auto 20px;
//   }
//   .step-title { font-weight: 700; margin-bottom: 8px; }
//   .step-desc { color: var(--muted); font-size: 14px; }

//   /* DASHBOARD */
//   .dash-grid { display: grid; grid-template-columns: 240px 1fr; gap: 0; min-height: calc(100vh - 80px); }
//   .dash-sidebar {
//     background: var(--surface); border-right: 1px solid var(--border);
//     padding: 32px 0; position: sticky; top: 80px; height: calc(100vh - 80px); overflow-y: auto;
//   }
//   .dash-nav-item {
//     display: flex; align-items: center; gap: 12px;
//     padding: 13px 24px; cursor: pointer; font-size: 14px;
//     font-weight: 500; color: var(--muted); transition: all 0.2s;
//     border: none; background: none; font-family: var(--font-body);
//     width: 100%; text-align: left;
//   }
//   .dash-nav-item:hover { color: var(--text); background: rgba(255,255,255,0.04); }
//   .dash-nav-item.active { color: var(--accent); background: rgba(232,184,109,0.08); border-right: 2px solid var(--accent); }
//   .dash-content { padding: 40px; }
//   .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-bottom: 32px; }
//   .stat-card {
//     background: var(--surface); border: 1px solid var(--border);
//     border-radius: 12px; padding: 24px; position: relative; overflow: hidden;
//   }
//   .stat-card-num { font-family: var(--font-display); font-size: 32px; font-weight: 900; color: var(--accent); }
//   .stat-card-label { color: var(--muted); font-size: 13px; margin-top: 4px; }

//   /* FOOTER */
//   footer { border-top: 1px solid var(--border); padding: 60px 0 32px; margin-top: 80px; background: var(--surface); }
//   .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
//   .footer-brand { font-family: var(--font-display); font-size: 22px; font-weight: 900; color: var(--accent); margin-bottom: 16px; }
//   .footer-desc { color: var(--muted); font-size: 14px; line-height: 1.7; }
//   .footer-heading { font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
//   .footer-links { list-style: none; }
//   .footer-links li { margin-bottom: 12px; }
//   .footer-links button { background: none; border: none; color: var(--muted); font-size: 14px; cursor: pointer; font-family: var(--font-body); padding: 0; transition: color 0.2s; }
//   .footer-links button:hover { color: var(--accent); }
//   .footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; color: var(--muted); font-size: 13px; }

//   /* MISC */
//   .divider { height: 1px; background: var(--border); margin: 32px 0; }
//   .text-accent { color: var(--accent); }
//   .text-muted { color: var(--muted); }
//   .text-center { text-align: center; }
//   .fw-bold { font-weight: 700; }
//   .mt-8 { margin-top: 8px; } .mt-16 { margin-top: 16px; } .mt-24 { margin-top: 24px; } .mt-32 { margin-top: 32px; }
//   .mb-8 { margin-bottom: 8px; } .mb-16 { margin-bottom: 16px; }
//   .flex { display: flex; }
//   .flex-between { display: flex; justify-content: space-between; align-items: center; }
//   .flex-center { display: flex; align-items: center; justify-content: center; }
//   .gap-12 { gap: 12px; } .gap-16 { gap: 16px; }
//   .detail-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; }
//   .sticky-card { position: sticky; top: 100px; background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 28px; }
//   .info-row { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
//   .info-row:last-child { border-bottom: none; }
//   .info-icon { font-size: 18px; width: 24px; }
//   .info-label { color: var(--muted); font-size: 12px; }
//   .avatar { width: 42px; height: 42px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #0a0a0f; font-size: 16px; }
//   .organizer-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(78,203,141,0.1); border: 1px solid rgba(78,203,141,0.3); color: var(--green); padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }
// `;

// // ─── DATA ─────────────────────────────────────────────────────────────────────
// const EVENTS = [
//   {
//     id: 1,
//     title: "Mumbai Music Festival",
//     category: "Music",
//     date: "Dec 20, 2025",
//     time: "6:00 PM",
//     location: "BKC, Mumbai",
//     price: 1499,
//     emoji: "🎵",
//     seats: 320,
//     booked: 210,
//   },
//   {
//     id: 2,
//     title: "TechConf India 2025",
//     category: "Tech",
//     date: "Jan 15, 2026",
//     time: "9:00 AM",
//     location: "Bengaluru Convention Centre",
//     price: 2999,
//     emoji: "💻",
//     seats: 500,
//     booked: 340,
//   },
//   {
//     id: 3,
//     title: "Comedy Night Special",
//     category: "Entertainment",
//     date: "Dec 28, 2025",
//     time: "8:00 PM",
//     location: "Nehru Centre, Mumbai",
//     price: 799,
//     emoji: "😂",
//     seats: 200,
//     booked: 180,
//   },
//   {
//     id: 4,
//     title: "Art & Culture Expo",
//     category: "Arts",
//     date: "Jan 5, 2026",
//     time: "11:00 AM",
//     location: "NGMA, New Delhi",
//     price: 499,
//     emoji: "🎨",
//     seats: 400,
//     booked: 120,
//   },
//   {
//     id: 5,
//     title: "Startup Summit 2025",
//     category: "Business",
//     date: "Dec 22, 2025",
//     time: "10:00 AM",
//     location: "Hyderabad Int. Convention",
//     price: 3499,
//     emoji: "🚀",
//     seats: 600,
//     booked: 450,
//   },
//   {
//     id: 6,
//     title: "Yoga & Wellness Retreat",
//     category: "Health",
//     date: "Jan 10, 2026",
//     time: "7:00 AM",
//     location: "Rishikesh",
//     price: 1999,
//     emoji: "🧘",
//     seats: 100,
//     booked: 60,
//   },
//   {
//     id: 7,
//     title: "Bangalore Social Mixer",
//     category: "Social",
//     date: "Dec 24, 2025",
//     time: "7:00 PM",
//     location: "Indiranagar, Bengaluru",
//     price: 599,
//     emoji: "🥂",
//     seats: 150,
//     booked: 98,
//   },
//   {
//     id: 8,
//     title: "Delhi Speed Networking Night",
//     category: "Social",
//     date: "Jan 3, 2026",
//     time: "6:30 PM",
//     location: "Connaught Place, New Delhi",
//     price: 799,
//     emoji: "🤝",
//     seats: 120,
//     booked: 74,
//   },
//   {
//     id: 9,
//     title: "Mumbai Rooftop Social",
//     category: "Social",
//     date: "Jan 8, 2026",
//     time: "8:00 PM",
//     location: "Lower Parel, Mumbai",
//     price: 899,
//     emoji: "🌆",
//     seats: 80,
//     booked: 61,
//   },
// ];

// const CATEGORIES = [
//   "All",
//   "Music",
//   "Tech",
//   "Entertainment",
//   "Arts",
//   "Business",
//   "Health",
//   "Social",
// ];

// const USER_BOOKINGS = [
//   {
//     id: "TKT-001",
//     event: "Mumbai Music Festival",
//     emoji: "🎵",
//     date: "Dec 20, 2025",
//     tickets: 2,
//     total: 2998,
//     status: "Confirmed",
//     seat: "A12, A13",
//   },
//   {
//     id: "TKT-002",
//     event: "TechConf India 2025",
//     emoji: "💻",
//     date: "Jan 15, 2026",
//     tickets: 1,
//     total: 2999,
//     status: "Confirmed",
//     seat: "B07",
//   },
//   {
//     id: "TKT-003",
//     event: "Comedy Night Special",
//     emoji: "😂",
//     date: "Dec 28, 2025",
//     tickets: 3,
//     total: 2397,
//     status: "Pending",
//     seat: "C01–C03",
//   },
//   {
//     id: "TKT-004",
//     event: "Startup Summit 2025",
//     emoji: "🚀",
//     date: "Dec 22, 2025",
//     tickets: 1,
//     total: 3499,
//     status: "Cancelled",
//     seat: "D05",
//   },
// ];

// const ATTENDEES = [
//   {
//     name: "Priya Sharma",
//     email: "priya@email.com",
//     event: "Music Festival",
//     tickets: 2,
//     date: "Dec 1",
//     city: "Mumbai",
//   },
//   {
//     name: "Rahul Mehta",
//     email: "rahul@email.com",
//     event: "TechConf",
//     tickets: 1,
//     date: "Dec 3",
//     city: "Bengaluru",
//   },
//   {
//     name: "Anita Kumar",
//     email: "anita@email.com",
//     event: "Comedy Night",
//     tickets: 3,
//     date: "Dec 5",
//     city: "Pune",
//   },
//   {
//     name: "Vikram Patel",
//     email: "vikram@email.com",
//     event: "Startup Summit",
//     tickets: 2,
//     date: "Dec 6",
//     city: "Hyderabad",
//   },
//   {
//     name: "Sneha Rao",
//     email: "sneha@email.com",
//     event: "Art & Culture",
//     tickets: 1,
//     date: "Dec 7",
//     city: "Delhi",
//   },
//   {
//     name: "Karan Singh",
//     email: "karan@email.com",
//     event: "Social Mixer",
//     tickets: 2,
//     date: "Dec 8",
//     city: "Bengaluru",
//   },
// ];

// const ALL_USERS = [
//   {
//     name: "Priya Sharma",
//     email: "priya@email.com",
//     role: "User",
//     joined: "Dec 1",
//     status: "Active",
//     bookings: 3,
//   },
//   {
//     name: "Rahul Mehta",
//     email: "rahul@email.com",
//     role: "Organizer",
//     joined: "Nov 20",
//     status: "Active",
//     bookings: 0,
//   },
//   {
//     name: "Admin Test",
//     email: "admin@eventify.in",
//     role: "Admin",
//     joined: "Jan 1",
//     status: "Active",
//     bookings: 0,
//   },
//   {
//     name: "Anita Kumar",
//     email: "anita@email.com",
//     role: "User",
//     joined: "Dec 5",
//     status: "Active",
//     bookings: 2,
//   },
//   {
//     name: "Suspicious X",
//     email: "sus@x.com",
//     role: "User",
//     joined: "Dec 10",
//     status: "Flagged",
//     bookings: 7,
//   },
//   {
//     name: "Vikram Patel",
//     email: "vikram@email.com",
//     role: "Organizer",
//     joined: "Nov 10",
//     status: "Active",
//     bookings: 0,
//   },
// ];

// const TRANSACTIONS = [
//   {
//     id: "TXN-001",
//     user: "Priya Sharma",
//     event: "Music Festival",
//     amount: 2998,
//     method: "UPI",
//     status: "Success",
//     date: "Dec 1",
//   },
//   {
//     id: "TXN-002",
//     user: "Rahul Mehta",
//     event: "TechConf",
//     amount: 2999,
//     method: "Card",
//     status: "Success",
//     date: "Dec 3",
//   },
//   {
//     id: "TXN-003",
//     user: "Anita Kumar",
//     event: "Comedy Night",
//     amount: 2397,
//     method: "UPI",
//     status: "Pending",
//     date: "Dec 5",
//   },
//   {
//     id: "TXN-004",
//     user: "Vikram Patel",
//     event: "Social Mixer",
//     amount: 599,
//     method: "Net Banking",
//     status: "Success",
//     date: "Dec 6",
//   },
//   {
//     id: "TXN-005",
//     user: "Sneha Rao",
//     event: "Art & Culture",
//     amount: 499,
//     method: "Wallet",
//     status: "Refunded",
//     date: "Dec 7",
//   },
// ];

// const ORGANIZERS_LIST = [
//   {
//     name: "Elite Events India",
//     events: 6,
//     revenue: "₹4.2L",
//     attendees: 1240,
//     status: "Verified",
//     since: "Jan 2024",
//   },
//   {
//     name: "Harmony Events",
//     events: 2,
//     revenue: "₹1.1L",
//     attendees: 320,
//     status: "Verified",
//     since: "Mar 2024",
//   },
//   {
//     name: "StarLight Org",
//     events: 0,
//     revenue: "₹0",
//     attendees: 0,
//     status: "Pending",
//     since: "Dec 2025",
//   },
//   {
//     name: "TechWorld India",
//     events: 3,
//     revenue: "₹2.8L",
//     attendees: 780,
//     status: "Verified",
//     since: "Jun 2024",
//   },
//   {
//     name: "ArtHouse Mumbai",
//     events: 1,
//     revenue: "₹0.6L",
//     attendees: 150,
//     status: "Suspended",
//     since: "Aug 2024",
//   },
// ];

// // ─── SHARED HELPERS ───────────────────────────────────────────────────────────
// const Badge = ({ status }) => {
//   const map = {
//     Confirmed: "badge-success",
//     Active: "badge-success",
//     Success: "badge-success",
//     Verified: "badge-success",
//     Approved: "badge-success",
//     Pending: "badge-warn",
//     Flagged: "badge-danger",
//     Cancelled: "badge-danger",
//     Suspended: "badge-danger",
//     Refunded: "badge-info",
//   };
//   return (
//     <span className={`badge ${map[status] || "badge-warn"}`}>{status}</span>
//   );
// };

// const StatCard = ({ num, label, icon, trend }) => (
//   <div className="stat-card">
//     <div
//       style={{
//         position: "absolute",
//         top: 16,
//         right: 16,
//         fontSize: 28,
//         opacity: 0.15,
//       }}
//     >
//       {icon}
//     </div>
//     <div className="stat-card-num">{num}</div>
//     <div className="stat-card-label">{label}</div>
//     {trend && (
//       <div style={{ fontSize: 12, color: "var(--green)", marginTop: 8 }}>
//         ↑ {trend}
//       </div>
//     )}
//   </div>
// );

// const MiniBar = ({ pct, color = "var(--accent)" }) => (
//   <div
//     style={{
//       width: 80,
//       height: 6,
//       background: "var(--surface2)",
//       borderRadius: 3,
//     }}
//   >
//     <div
//       style={{
//         width: pct + "%",
//         height: "100%",
//         background: color,
//         borderRadius: 3,
//         transition: "width 0.6s ease",
//       }}
//     />
//   </div>
// );

// function Sidebar({ title, subtitle, subtitleColor, items, active, setActive }) {
//   return (
//     <div className="dash-sidebar">
//       <div
//         style={{
//           padding: "0 24px 24px",
//           borderBottom: "1px solid var(--border)",
//           marginBottom: 8,
//         }}
//       >
//         <div
//           style={{
//             fontWeight: 700,
//             fontSize: 11,
//             textTransform: "uppercase",
//             letterSpacing: 1.5,
//             color: "var(--muted)",
//           }}
//         >
//           {title}
//         </div>
//         {subtitle && (
//           <div
//             style={{
//               marginTop: 4,
//               fontSize: 12,
//               color: subtitleColor || "var(--muted)",
//             }}
//           >
//             {subtitle}
//           </div>
//         )}
//       </div>
//       {items.map((item) => (
//         <button
//           key={item.id}
//           className={`dash-nav-item${active === item.id ? " active" : ""}`}
//           onClick={() => setActive(item.id)}
//         >
//           <span style={{ fontSize: 16 }}>{item.icon}</span>
//           <span>{item.label}</span>
//           {item.badge && (
//             <span
//               style={{
//                 marginLeft: "auto",
//                 background: "var(--red)",
//                 color: "#fff",
//                 fontSize: 10,
//                 fontWeight: 700,
//                 padding: "2px 7px",
//                 borderRadius: 100,
//               }}
//             >
//               {item.badge}
//             </span>
//           )}
//         </button>
//       ))}
//     </div>
//   );
// }

// // ─── NAVBAR ───────────────────────────────────────────────────────────────────
// function Navbar({ page, setPage, user, setUser, setModal }) {
//   const links = [
//     { label: "Events", page: "events" },
//     { label: "How It Works", page: "how" },
//     { label: "About", page: "about" },
//     { label: "Contact", page: "contact" },
//   ];
//   return (
//     <nav className="nav">
//       <div className="nav-logo" onClick={() => setPage("home")}>
//         ✦ Eventify
//       </div>
//       <div className="nav-links">
//         {links.map((l) => (
//           <button
//             key={l.page}
//             className={`nav-link${page === l.page ? " active" : ""}`}
//             onClick={() => setPage(l.page)}
//           >
//             {l.label}
//           </button>
//         ))}
//         {user?.role === "organizer" && (
//           <button
//             className={`nav-link${page === "organizer" ? " active" : ""}`}
//             onClick={() => setPage("organizer")}
//           >
//             Dashboard
//           </button>
//         )}
//         {user?.role === "admin" && (
//           <button
//             className={`nav-link${page === "admin" ? " active" : ""}`}
//             onClick={() => setPage("admin")}
//           >
//             Admin
//           </button>
//         )}
//       </div>
//       <div className="nav-actions">
//         {user ? (
//           <>
//             <div
//               className="avatar"
//               style={{ cursor: "pointer" }}
//               onClick={() => setPage("account")}
//               title="My Account"
//             >
//               {user.name[0]}
//             </div>
//             <button
//               className="btn btn-ghost btn-sm"
//               onClick={() => {
//                 setUser(null);
//                 setPage("home");
//               }}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               className="btn btn-ghost btn-sm"
//               onClick={() => setModal("login")}
//             >
//               Login
//             </button>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() => setModal("register")}
//             >
//               Sign Up
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// // ─── EVENT CARD ───────────────────────────────────────────────────────────────
// function EventCard({ event, setPage, setSelectedEvent }) {
//   const pct = Math.round((event.booked / event.seats) * 100);
//   return (
//     <div
//       className="card"
//       onClick={() => {
//         setSelectedEvent(event);
//         setPage("event-detail");
//       }}
//     >
//       <div className="card-img">{event.emoji}</div>
//       <div className="card-body">
//         <span className="card-tag">{event.category}</span>
//         <div className="card-title">{event.title}</div>
//         <div className="card-meta">
//           <span>📅 {event.date}</span>
//           <span>⏰ {event.time}</span>
//           <span>📍 {event.location}</span>
//         </div>
//         <div style={{ marginBottom: 16 }}>
//           <div
//             className="flex-between mb-8"
//             style={{ fontSize: 12, color: "var(--muted)" }}
//           >
//             <span>{event.booked} booked</span>
//             <span>{event.seats - event.booked} left</span>
//           </div>
//           <div
//             style={{
//               height: 4,
//               background: "var(--surface2)",
//               borderRadius: 2,
//             }}
//           >
//             <div
//               style={{
//                 height: "100%",
//                 width: pct + "%",
//                 background: pct > 80 ? "var(--red)" : "var(--accent)",
//                 borderRadius: 2,
//                 transition: "width 0.5s",
//               }}
//             />
//           </div>
//         </div>
//         <div className="card-footer">
//           <div className="price">₹{event.price.toLocaleString()}</div>
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedEvent(event);
//               setPage("booking");
//             }}
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── HOME PAGE ────────────────────────────────────────────────────────────────
// function HomePage({ setPage, setSelectedEvent, setModal, user }) {
//   const featured = EVENTS.slice(0, 3);
//   return (
//     <div className="page">
//       {/* HERO */}
//       <div className="hero">
//         <div className="container">
//           <div className="hero-content">
//             <div className="hero-badge">✦ India's Premier Event Platform</div>
//             <h1 className="hero-title">
//               Discover &amp;
//               <br />
//               <span>Live the Moment</span>
//             </h1>
//             <p className="hero-sub">
//               Book tickets for concerts, tech summits, social mixers, art shows,
//               and more — all in one place.
//             </p>
//             <div className="hero-actions">
//               <button
//                 className="btn btn-primary btn-lg"
//                 onClick={() => setPage("events")}
//               >
//                 Explore Events →
//               </button>
//               {!user && (
//                 <button
//                   className="btn btn-ghost btn-lg"
//                   onClick={() => setModal("register")}
//                 >
//                   Create Account
//                 </button>
//               )}
//             </div>
//             <div className="hero-stats">
//               <div>
//                 <div className="stat-num">2,400+</div>
//                 <div className="stat-label">Events Listed</div>
//               </div>
//               <div>
//                 <div className="stat-num">180K+</div>
//                 <div className="stat-label">Happy Attendees</div>
//               </div>
//               <div>
//                 <div className="stat-num">650+</div>
//                 <div className="stat-label">Organizers</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FEATURED */}
//       <div className="section container">
//         <div className="section-header">
//           <div className="section-tag">Featured Events</div>
//           <h2 className="section-title">Trending Near You</h2>
//           <p className="section-sub">
//             Handpicked events you won't want to miss this season
//           </p>
//         </div>
//         <div className="grid-3">
//           {featured.map((e) => (
//             <EventCard
//               key={e.id}
//               event={e}
//               setPage={setPage}
//               setSelectedEvent={setSelectedEvent}
//             />
//           ))}
//         </div>
//         <div style={{ textAlign: "center", marginTop: 40 }}>
//           <button
//             className="btn btn-ghost btn-lg"
//             onClick={() => setPage("events")}
//           >
//             View All Events →
//           </button>
//         </div>
//       </div>

//       {/* CATEGORIES — now includes Social */}
//       <div
//         className="section"
//         style={{
//           background: "var(--surface)",
//           borderTop: "1px solid var(--border)",
//           borderBottom: "1px solid var(--border)",
//         }}
//       >
//         <div className="container">
//           <div className="section-header">
//             <div className="section-tag">Categories</div>
//             <h2 className="section-title">Find Your Vibe</h2>
//           </div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
//               gap: 16,
//             }}
//           >
//             {[
//               ["🎵", "Music"],
//               ["💻", "Tech"],
//               ["😂", "Comedy"],
//               ["🎨", "Arts"],
//               ["🚀", "Business"],
//               ["🧘", "Wellness"],
//               ["🥂", "Social"],
//             ].map(([emoji, cat]) => (
//               <div
//                 key={cat}
//                 className="card"
//                 style={{ padding: 28, textAlign: "center" }}
//                 onClick={() => setPage("events")}
//               >
//                 <div style={{ fontSize: 36, marginBottom: 12 }}>{emoji}</div>
//                 <div style={{ fontWeight: 700 }}>{cat}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* HOW IT WORKS SNIPPET */}
//       <div className="section container">
//         <div className="section-header">
//           <div className="section-tag">How It Works</div>
//           <h2 className="section-title">Book in 3 Easy Steps</h2>
//         </div>
//         <div className="steps">
//           {[
//             [
//               "1",
//               "Discover",
//               "Browse thousands of events by category, date, or location.",
//             ],
//             [
//               "2",
//               "Book",
//               "Select your seats and pay securely with any method.",
//             ],
//             [
//               "3",
//               "Enjoy",
//               "Get your QR ticket instantly. Just scan and walk in.",
//             ],
//           ].map(([n, t, d]) => (
//             <div key={n} className="step">
//               <div className="step-num">{n}</div>
//               <div className="step-title">{t}</div>
//               <div className="step-desc">{d}</div>
//             </div>
//           ))}
//         </div>
//         <div style={{ textAlign: "center", marginTop: 48 }}>
//           <button
//             className="btn btn-primary btn-lg"
//             onClick={() => setPage("how")}
//           >
//             Learn More →
//           </button>
//         </div>
//       </div>

//       <Footer setPage={setPage} />
//     </div>
//   );
// }

// // ─── EVENTS PAGE ──────────────────────────────────────────────────────────────
// function EventsPage({ setPage, setSelectedEvent }) {
//   const [cat, setCat] = useState("All");
//   const [search, setSearch] = useState("");
//   const filtered = EVENTS.filter(
//     (e) =>
//       (cat === "All" || e.category === cat) &&
//       (e.title.toLowerCase().includes(search.toLowerCase()) ||
//         e.location.toLowerCase().includes(search.toLowerCase())),
//   );
//   return (
//     <div className="page section container">
//       <div className="flex-between mb-16">
//         <div>
//           <div className="section-tag">Browse Events</div>
//           <h1
//             className="section-title"
//             style={{ textAlign: "left", marginBottom: 0 }}
//           >
//             All Events
//           </h1>
//         </div>
//       </div>
//       <div
//         className="search-bar"
//         style={{ maxWidth: "100%", marginBottom: 24 }}
//       >
//         <span style={{ fontSize: 18 }}>🔍</span>
//         <input
//           placeholder="Search events by name or city..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button className="btn btn-primary btn-sm">Search</button>
//       </div>
//       <div className="filter-tags">
//         {CATEGORIES.map((c) => (
//           <button
//             key={c}
//             className={`filter-tag${cat === c ? " active" : ""}`}
//             onClick={() => setCat(c)}
//           >
//             {c}
//           </button>
//         ))}
//       </div>
//       {filtered.length === 0 ? (
//         <div
//           style={{
//             textAlign: "center",
//             padding: "60px 0",
//             color: "var(--muted)",
//           }}
//         >
//           <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
//           <p>No events found. Try a different search.</p>
//         </div>
//       ) : (
//         <div className="grid-3">
//           {filtered.map((e) => (
//             <EventCard
//               key={e.id}
//               event={e}
//               setPage={setPage}
//               setSelectedEvent={setSelectedEvent}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── EVENT DETAIL PAGE ────────────────────────────────────────────────────────
// function EventDetailPage({ event, setPage, user, setModal }) {
//   if (!event)
//     return (
//       <div className="page container section">
//         <p>No event selected.</p>
//       </div>
//     );
//   return (
//     <div className="page section">
//       <div className="container">
//         <button
//           className="btn btn-ghost btn-sm mb-16"
//           onClick={() => setPage("events")}
//         >
//           ← Back to Events
//         </button>
//         <div className="detail-grid">
//           <div>
//             <div
//               style={{
//                 height: 320,
//                 borderRadius: 20,
//                 background: "var(--surface)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 100,
//                 marginBottom: 32,
//                 border: "1px solid var(--border)",
//               }}
//             >
//               {event.emoji}
//             </div>
//             <span className="card-tag" style={{ fontSize: 13 }}>
//               {event.category}
//             </span>
//             <h1
//               className="section-title"
//               style={{ textAlign: "left", marginTop: 12, marginBottom: 20 }}
//             >
//               {event.title}
//             </h1>
//             <div
//               style={{
//                 color: "var(--muted)",
//                 marginBottom: 32,
//                 lineHeight: 1.8,
//               }}
//             >
//               Join us for an unforgettable experience at{" "}
//               <strong style={{ color: "var(--text)" }}>{event.title}</strong>.
//               This is one of India's most anticipated events of the season,
//               bringing together the best talent, ideas, and entertainment under
//               one roof.
//             </div>
//             <h3
//               style={{
//                 marginBottom: 16,
//                 fontFamily: "var(--font-display)",
//                 fontSize: 20,
//               }}
//             >
//               What to Expect
//             </h3>
//             <ul
//               style={{
//                 color: "var(--muted)",
//                 paddingLeft: 20,
//                 lineHeight: 2.2,
//               }}
//             >
//               <li>World-class performances and presentations</li>
//               <li>Networking with industry professionals</li>
//               <li>Exclusive merchandise and giveaways</li>
//               <li>Food courts and refreshments on-site</li>
//             </ul>
//             <div className="divider" />
//             <h3
//               style={{
//                 marginBottom: 16,
//                 fontFamily: "var(--font-display)",
//                 fontSize: 20,
//               }}
//             >
//               Organizer
//             </h3>
//             <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//               <div
//                 className="avatar"
//                 style={{ width: 52, height: 52, fontSize: 20 }}
//               >
//                 E
//               </div>
//               <div>
//                 <div className="fw-bold">Elite Events India</div>
//                 <span className="organizer-badge">✓ Verified Organizer</span>
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="sticky-card">
//               <div className="price" style={{ fontSize: 32, marginBottom: 4 }}>
//                 ₹{event.price.toLocaleString()}
//               </div>
//               <div
//                 style={{
//                   color: "var(--muted)",
//                   fontSize: 13,
//                   marginBottom: 24,
//                 }}
//               >
//                 per ticket
//               </div>
//               <div className="info-row">
//                 <span className="info-icon">📅</span>
//                 <div>
//                   <div className="info-label">Date</div>
//                   <div>{event.date}</div>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <span className="info-icon">⏰</span>
//                 <div>
//                   <div className="info-label">Time</div>
//                   <div>{event.time}</div>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <span className="info-icon">📍</span>
//                 <div>
//                   <div className="info-label">Venue</div>
//                   <div>{event.location}</div>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <span className="info-icon">🎟️</span>
//                 <div>
//                   <div className="info-label">Available Seats</div>
//                   <div>
//                     {event.seats - event.booked} / {event.seats}
//                   </div>
//                 </div>
//               </div>
//               <div style={{ marginTop: 24 }}>
//                 <div
//                   style={{
//                     height: 6,
//                     background: "var(--surface2)",
//                     borderRadius: 3,
//                     marginBottom: 8,
//                   }}
//                 >
//                   <div
//                     style={{
//                       height: "100%",
//                       width:
//                         Math.round((event.booked / event.seats) * 100) + "%",
//                       background: "var(--accent)",
//                       borderRadius: 3,
//                     }}
//                   />
//                 </div>
//                 <div style={{ fontSize: 12, color: "var(--muted)" }}>
//                   {Math.round((event.booked / event.seats) * 100)}% seats filled
//                 </div>
//               </div>
//               <button
//                 className="btn btn-primary btn-lg"
//                 style={{
//                   width: "100%",
//                   marginTop: 24,
//                   justifyContent: "center",
//                 }}
//                 onClick={() => (user ? setPage("booking") : setModal("login"))}
//               >
//                 Book Tickets Now
//               </button>
//               <button
//                 className="btn btn-ghost btn-sm"
//                 style={{
//                   width: "100%",
//                   marginTop: 10,
//                   justifyContent: "center",
//                 }}
//               >
//                 ♡ Save to Wishlist
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── BOOKING PAGE ─────────────────────────────────────────────────────────────
// function BookingPage({ event, setPage, user, setModal }) {
//   const [qty, setQty] = useState(1);
//   const [step, setStep] = useState(1);
//   const [done, setDone] = useState(false);

//   if (!user)
//     return (
//       <div className="page section container" style={{ textAlign: "center" }}>
//         <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
//         <h2
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 28,
//             marginBottom: 12,
//           }}
//         >
//           Login Required
//         </h2>
//         <p style={{ color: "var(--muted)", marginBottom: 24 }}>
//           Please log in to book tickets.
//         </p>
//         <button className="btn btn-primary" onClick={() => setModal("login")}>
//           Login to Continue
//         </button>
//       </div>
//     );
//   if (!event)
//     return (
//       <div className="page container section">
//         <p>No event selected.</p>
//       </div>
//     );

//   const total = event.price * qty;

//   if (done)
//     return (
//       <div
//         className="page section container"
//         style={{ maxWidth: 560, margin: "0 auto" }}
//       >
//         <div style={{ textAlign: "center", padding: "60px 0" }}>
//           <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
//           <h2
//             style={{
//               fontFamily: "var(--font-display)",
//               fontSize: 36,
//               marginBottom: 12,
//             }}
//           >
//             Booking Confirmed!
//           </h2>
//           <p style={{ color: "var(--muted)", marginBottom: 32 }}>
//             Your tickets have been booked. Check your email for the QR code.
//           </p>
//           <div
//             style={{
//               background: "var(--surface)",
//               border: "1px solid var(--border)",
//               borderRadius: 16,
//               padding: 28,
//               marginBottom: 32,
//             }}
//           >
//             <div
//               style={{
//                 borderBottom: "1px dashed var(--border)",
//                 paddingBottom: 20,
//                 marginBottom: 20,
//               }}
//             >
//               <div style={{ fontSize: 40 }}>{event.emoji}</div>
//               <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>
//                 {event.title}
//               </h3>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 16,
//                 fontSize: 14,
//               }}
//             >
//               <div>
//                 <div style={{ color: "var(--muted)", fontSize: 12 }}>
//                   BOOKING ID
//                 </div>
//                 <div className="fw-bold">
//                   TKT-{Date.now().toString().slice(-6)}
//                 </div>
//               </div>
//               <div>
//                 <div style={{ color: "var(--muted)", fontSize: 12 }}>
//                   TICKETS
//                 </div>
//                 <div className="fw-bold">{qty}</div>
//               </div>
//               <div>
//                 <div style={{ color: "var(--muted)", fontSize: 12 }}>DATE</div>
//                 <div className="fw-bold">{event.date}</div>
//               </div>
//               <div>
//                 <div style={{ color: "var(--muted)", fontSize: 12 }}>
//                   TOTAL PAID
//                 </div>
//                 <div className="fw-bold text-accent">
//                   ₹{total.toLocaleString()}
//                 </div>
//               </div>
//             </div>
//             <div
//               style={{
//                 marginTop: 20,
//                 padding: 16,
//                 background: "var(--surface2)",
//                 borderRadius: 10,
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}
//               >
//                 QR CODE
//               </div>
//               <div style={{ fontSize: 48, letterSpacing: -4 }}>▓▓▓▓▓▓▓▓▓</div>
//               <div style={{ fontSize: 48, letterSpacing: -4 }}>▓░░░▓░░░▓</div>
//               <div style={{ fontSize: 48, letterSpacing: -4 }}>▓▓▓▓▓▓▓▓▓</div>
//             </div>
//           </div>
//           <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
//             <button
//               className="btn btn-primary"
//               onClick={() => setPage("account")}
//             >
//               My Bookings
//             </button>
//             <button className="btn btn-ghost" onClick={() => setPage("events")}>
//               Explore More
//             </button>
//           </div>
//         </div>
//       </div>
//     );

//   return (
//     <div className="page section">
//       <div className="container" style={{ maxWidth: 740 }}>
//         <button
//           className="btn btn-ghost btn-sm mb-16"
//           onClick={() => setPage("event-detail")}
//         >
//           ← Back
//         </button>
//         <h1
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 32,
//             marginBottom: 8,
//           }}
//         >
//           Book Tickets
//         </h1>
//         <p style={{ color: "var(--muted)", marginBottom: 32 }}>{event.title}</p>

//         {/* STEPPER */}
//         <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
//           {["Select Tickets", "Confirm Details", "Payment"].map((s, i) => (
//             <div key={s} style={{ flex: 1, textAlign: "center" }}>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 {i > 0 && (
//                   <div
//                     style={{
//                       flex: 1,
//                       height: 2,
//                       background: step > i ? "var(--accent)" : "var(--border)",
//                     }}
//                   />
//                 )}
//                 <div
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     background:
//                       step > i
//                         ? "var(--accent)"
//                         : step === i + 1
//                           ? "rgba(232,184,109,0.2)"
//                           : "var(--surface2)",
//                     border:
//                       step === i + 1
//                         ? "2px solid var(--accent)"
//                         : "2px solid var(--border)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color:
//                       step > i
//                         ? "#0a0a0f"
//                         : step === i + 1
//                           ? "var(--accent)"
//                           : "var(--muted)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   {step > i + 1 ? "✓" : i + 1}
//                 </div>
//                 {i < 2 && (
//                   <div
//                     style={{
//                       flex: 1,
//                       height: 2,
//                       background:
//                         step > i + 1 ? "var(--accent)" : "var(--border)",
//                     }}
//                   />
//                 )}
//               </div>
//               <div
//                 style={{
//                   marginTop: 8,
//                   fontSize: 12,
//                   color: step === i + 1 ? "var(--accent)" : "var(--muted)",
//                 }}
//               >
//                 {s}
//               </div>
//             </div>
//           ))}
//         </div>

//         {step === 1 && (
//           <div>
//             <div
//               className="table-card"
//               style={{ padding: 24, marginBottom: 24 }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   gap: 16,
//                   alignItems: "center",
//                   marginBottom: 20,
//                 }}
//               >
//                 <div style={{ fontSize: 40 }}>{event.emoji}</div>
//                 <div>
//                   <div className="fw-bold" style={{ fontSize: 18 }}>
//                     {event.title}
//                   </div>
//                   <div style={{ color: "var(--muted)", fontSize: 14 }}>
//                     📅 {event.date} • 📍 {event.location}
//                   </div>
//                 </div>
//               </div>
//               <div className="divider" />
//               <div className="flex-between" style={{ marginTop: 20 }}>
//                 <div>
//                   <div className="fw-bold">Standard Ticket</div>
//                   <div style={{ color: "var(--muted)", fontSize: 13 }}>
//                     General admission
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                   <button
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setQty(Math.max(1, qty - 1))}
//                   >
//                     −
//                   </button>
//                   <span
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 24,
//                       fontWeight: 700,
//                       minWidth: 24,
//                       textAlign: "center",
//                     }}
//                   >
//                     {qty}
//                   </span>
//                   <button
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setQty(Math.min(10, qty + 1))}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="table-card"
//               style={{ padding: 24, marginBottom: 24 }}
//             >
//               <div className="flex-between mb-8">
//                 <span style={{ color: "var(--muted)" }}>Ticket Price</span>
//                 <span>
//                   ₹{event.price.toLocaleString()} × {qty}
//                 </span>
//               </div>
//               <div className="flex-between mb-8">
//                 <span style={{ color: "var(--muted)" }}>Platform Fee</span>
//                 <span>₹{(qty * 49).toLocaleString()}</span>
//               </div>
//               <div className="divider" />
//               <div className="flex-between">
//                 <span className="fw-bold">Total</span>
//                 <span className="price">
//                   ₹{(total + qty * 49).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//             <button
//               className="btn btn-primary btn-lg"
//               style={{ width: "100%", justifyContent: "center" }}
//               onClick={() => setStep(2)}
//             >
//               Continue →
//             </button>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <div
//               className="table-card"
//               style={{ padding: 28, marginBottom: 24 }}
//             >
//               <h3 style={{ marginBottom: 20 }}>Attendee Details</h3>
//               <div className="form-group">
//                 <label className="form-label">Full Name</label>
//                 <input className="form-input" defaultValue={user.name} />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Email</label>
//                 <input className="form-input" defaultValue={user.email} />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Phone</label>
//                 <input className="form-input" placeholder="+91 XXXXX XXXXX" />
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 12 }}>
//               <button
//                 className="btn btn-ghost btn-lg"
//                 style={{ flex: 1, justifyContent: "center" }}
//                 onClick={() => setStep(1)}
//               >
//                 ← Back
//               </button>
//               <button
//                 className="btn btn-primary btn-lg"
//                 style={{ flex: 2, justifyContent: "center" }}
//                 onClick={() => setStep(3)}
//               >
//                 Proceed to Payment →
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div>
//             <div
//               className="table-card"
//               style={{ padding: 28, marginBottom: 24 }}
//             >
//               <h3 style={{ marginBottom: 20 }}>Payment</h3>
//               <div className="tabs" style={{ marginBottom: 24 }}>
//                 {["UPI", "Card", "Net Banking", "Wallet"].map((t, i) => (
//                   <button key={t} className={`tab${i === 0 ? " active" : ""}`}>
//                     {t}
//                   </button>
//                 ))}
//               </div>
//               <div className="form-group">
//                 <label className="form-label">UPI ID</label>
//                 <input className="form-input" placeholder="yourname@paytm" />
//               </div>
//               <div className="alert alert-success">
//                 🔒 256-bit SSL encrypted. Your payment is secure.
//               </div>
//               <div
//                 className="flex-between"
//                 style={{
//                   padding: "16px 0",
//                   borderTop: "1px solid var(--border)",
//                 }}
//               >
//                 <span className="fw-bold">Total Payable</span>
//                 <span className="price">
//                   ₹{(total + qty * 49).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 12 }}>
//               <button
//                 className="btn btn-ghost btn-lg"
//                 style={{ flex: 1, justifyContent: "center" }}
//                 onClick={() => setStep(2)}
//               >
//                 ← Back
//               </button>
//               <button
//                 className="btn btn-success btn-lg"
//                 style={{ flex: 2, justifyContent: "center" }}
//                 onClick={() => setDone(true)}
//               >
//                 Pay ₹{(total + qty * 49).toLocaleString()} →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── USER DASHBOARD ───────────────────────────────────────────────────────────
// function UserDashboard({ user, setPage, setModal }) {
//   const [nav, setNav] = useState("overview");

//   if (!user)
//     return (
//       <div className="page section container" style={{ textAlign: "center" }}>
//         <div style={{ fontSize: 56, marginBottom: 16 }}>👤</div>
//         <h2
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 28,
//             marginBottom: 12,
//           }}
//         >
//           Not Logged In
//         </h2>
//         <p style={{ color: "var(--muted)", marginBottom: 24 }}>
//           Please login to view your dashboard.
//         </p>
//         <button className="btn btn-primary" onClick={() => setModal("login")}>
//           Login
//         </button>
//       </div>
//     );

//   const navItems = [
//     { id: "overview", icon: "🏠", label: "Overview" },
//     { id: "bookings", icon: "🎟️", label: "My Bookings" },
//     { id: "wishlist", icon: "❤️", label: "Wishlist" },
//     { id: "profile", icon: "👤", label: "Profile" },
//     { id: "settings", icon: "⚙️", label: "Settings" },
//   ];

//   return (
//     <div className="page" style={{ paddingTop: 80 }}>
//       <div className="dash-grid">
//         <Sidebar
//           title="My Account"
//           items={navItems}
//           active={nav}
//           setActive={setNav}
//         />
//         <div className="dash-content">
//           {nav === "overview" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 20,
//                   marginBottom: 36,
//                   background:
//                     "linear-gradient(135deg, rgba(232,184,109,0.1), rgba(78,203,141,0.05))",
//                   border: "1px solid var(--border)",
//                   borderRadius: 20,
//                   padding: 28,
//                 }}
//               >
//                 <div
//                   className="avatar"
//                   style={{ width: 68, height: 68, fontSize: 26, flexShrink: 0 }}
//                 >
//                   {user.name[0]}
//                 </div>
//                 <div>
//                   <h2
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 26,
//                       marginBottom: 4,
//                     }}
//                   >
//                     Hey, {user.name.split(" ")[0]}! 👋
//                   </h2>
//                   <div style={{ color: "var(--muted)", fontSize: 14 }}>
//                     {user.email}
//                   </div>
//                   <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
//                     {user.role === "organizer" && (
//                       <span className="organizer-badge">
//                         ✓ Verified Organizer
//                       </span>
//                     )}
//                     <span
//                       style={{
//                         background: "rgba(100,150,255,0.12)",
//                         color: "#7ab0ff",
//                         padding: "3px 10px",
//                         borderRadius: 100,
//                         fontSize: 12,
//                         fontWeight: 600,
//                       }}
//                     >
//                       Member since Dec 2024
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   className="btn btn-ghost btn-sm"
//                   style={{ marginLeft: "auto" }}
//                   onClick={() => setNav("profile")}
//                 >
//                   Edit Profile
//                 </button>
//               </div>
//               <div className="stats-row" style={{ marginBottom: 32 }}>
//                 <StatCard
//                   num="4"
//                   label="Total Bookings"
//                   icon="🎟️"
//                   trend="2 this month"
//                 />
//                 <StatCard num="2" label="Upcoming Events" icon="📅" />
//                 <StatCard num="₹11,893" label="Total Spent" icon="💸" />
//                 <StatCard num="3" label="Wishlist Items" icon="❤️" />
//               </div>
//               <h3
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 20,
//                   marginBottom: 16,
//                 }}
//               >
//                 Recent Bookings
//               </h3>
//               <div className="table-card" style={{ marginBottom: 32 }}>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Event</th>
//                       <th>Date</th>
//                       <th>Tickets</th>
//                       <th>Total</th>
//                       <th>Status</th>
//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {USER_BOOKINGS.slice(0, 3).map((b) => (
//                       <tr key={b.id}>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 10,
//                             }}
//                           >
//                             <span style={{ fontSize: 22 }}>{b.emoji}</span>
//                             <div>
//                               <div style={{ fontWeight: 600, fontSize: 14 }}>
//                                 {b.event}
//                               </div>
//                               <div
//                                 style={{ color: "var(--muted)", fontSize: 12 }}
//                               >
//                                 {b.id}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td style={{ color: "var(--muted)" }}>{b.date}</td>
//                         <td>{b.tickets}</td>
//                         <td style={{ fontWeight: 700, color: "var(--accent)" }}>
//                           ₹{b.total.toLocaleString()}
//                         </td>
//                         <td>
//                           <Badge status={b.status} />
//                         </td>
//                         <td>
//                           <button
//                             className="btn btn-ghost btn-sm"
//                             onClick={() => setNav("bookings")}
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 16,
//                 }}
//               >
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 8,
//                     }}
//                   >
//                     Discover Events
//                   </h4>
//                   <p
//                     style={{
//                       color: "var(--muted)",
//                       fontSize: 13,
//                       marginBottom: 16,
//                     }}
//                   >
//                     Find exciting events happening near you.
//                   </p>
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => setPage("events")}
//                   >
//                     Browse All →
//                   </button>
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <div style={{ fontSize: 32, marginBottom: 12 }}>🎁</div>
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 8,
//                     }}
//                   >
//                     Refer & Earn
//                   </h4>
//                   <p
//                     style={{
//                       color: "var(--muted)",
//                       fontSize: 13,
//                       marginBottom: 16,
//                     }}
//                   >
//                     Invite friends and get ₹200 off your next booking.
//                   </p>
//                   <button className="btn btn-ghost btn-sm">
//                     Copy Invite Link
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {nav === "bookings" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 24,
//                 }}
//               >
//                 <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
//                   My Bookings
//                 </h2>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   {["All", "Confirmed", "Pending", "Cancelled"].map((s) => (
//                     <button
//                       key={s}
//                       className="filter-tag"
//                       style={{ fontSize: 12, padding: "5px 14px" }}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div
//                 style={{ display: "flex", flexDirection: "column", gap: 16 }}
//               >
//                 {USER_BOOKINGS.map((b) => (
//                   <div
//                     key={b.id}
//                     style={{
//                       background: "var(--surface)",
//                       border: "1px solid var(--border)",
//                       borderRadius: 16,
//                       padding: 24,
//                       display: "flex",
//                       gap: 20,
//                       alignItems: "flex-start",
//                     }}
//                   >
//                     <div style={{ fontSize: 52, lineHeight: 1 }}>{b.emoji}</div>
//                     <div style={{ flex: 1 }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                         }}
//                       >
//                         <div>
//                           <h3
//                             style={{
//                               fontFamily: "var(--font-display)",
//                               fontSize: 20,
//                               marginBottom: 4,
//                             }}
//                           >
//                             {b.event}
//                           </h3>
//                           <div
//                             style={{
//                               color: "var(--muted)",
//                               fontSize: 13,
//                               display: "flex",
//                               gap: 16,
//                             }}
//                           >
//                             <span>📅 {b.date}</span>
//                             <span>
//                               🎟️ {b.tickets} ticket{b.tickets > 1 ? "s" : ""}
//                             </span>
//                             <span>💺 Seat {b.seat}</span>
//                           </div>
//                         </div>
//                         <Badge status={b.status} />
//                       </div>
//                       <div
//                         style={{
//                           marginTop: 16,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <div>
//                           <div
//                             style={{
//                               fontSize: 11,
//                               color: "var(--muted)",
//                               textTransform: "uppercase",
//                               letterSpacing: 0.5,
//                               marginBottom: 2,
//                             }}
//                           >
//                             Booking ID
//                           </div>
//                           <div
//                             style={{ fontWeight: 700, color: "var(--accent)" }}
//                           >
//                             {b.id}
//                           </div>
//                         </div>
//                         <div style={{ textAlign: "right" }}>
//                           <div
//                             style={{
//                               fontSize: 11,
//                               color: "var(--muted)",
//                               textTransform: "uppercase",
//                               letterSpacing: 0.5,
//                               marginBottom: 2,
//                             }}
//                           >
//                             Total Paid
//                           </div>
//                           <div
//                             style={{
//                               fontFamily: "var(--font-display)",
//                               fontSize: 20,
//                               fontWeight: 700,
//                               color: "var(--accent)",
//                             }}
//                           >
//                             ₹{b.total.toLocaleString()}
//                           </div>
//                         </div>
//                         <div style={{ display: "flex", gap: 8 }}>
//                           <button className="btn btn-ghost btn-sm">
//                             📥 Download
//                           </button>
//                           {b.status === "Confirmed" && (
//                             <button className="btn btn-ghost btn-sm">
//                               🔗 Share
//                             </button>
//                           )}
//                           {b.status !== "Cancelled" && (
//                             <button className="btn btn-danger btn-sm">
//                               Cancel
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                       {b.status === "Confirmed" && (
//                         <div
//                           style={{
//                             marginTop: 16,
//                             padding: "12px 16px",
//                             background: "var(--surface2)",
//                             borderRadius: 10,
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 16,
//                             fontSize: 13,
//                           }}
//                         >
//                           <div
//                             style={{
//                               fontFamily: "monospace",
//                               fontSize: 24,
//                               letterSpacing: -2,
//                               lineHeight: 1,
//                             }}
//                           >
//                             ▓░▓░▓
//                             <br />
//                             ░▓░▓░
//                             <br />
//                             ▓░▓░▓
//                           </div>
//                           <div>
//                             <div style={{ fontWeight: 600, marginBottom: 2 }}>
//                               QR Ticket Ready
//                             </div>
//                             <div style={{ color: "var(--muted)" }}>
//                               Show at gate for instant entry
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {nav === "wishlist" && (
//             <div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 Wishlist
//               </h2>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//                   gap: 20,
//                 }}
//               >
//                 {EVENTS.slice(1, 4).map((e) => (
//                   <div
//                     key={e.id}
//                     style={{
//                       background: "var(--surface)",
//                       border: "1px solid var(--border)",
//                       borderRadius: 16,
//                       overflow: "hidden",
//                     }}
//                   >
//                     <div
//                       style={{
//                         height: 120,
//                         background: "var(--surface2)",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: 52,
//                       }}
//                     >
//                       {e.emoji}
//                     </div>
//                     <div style={{ padding: 20 }}>
//                       <span className="card-tag">{e.category}</span>
//                       <h3
//                         style={{
//                           fontFamily: "var(--font-display)",
//                           fontSize: 18,
//                           margin: "8px 0 4px",
//                         }}
//                       >
//                         {e.title}
//                       </h3>
//                       <div
//                         style={{
//                           color: "var(--muted)",
//                           fontSize: 13,
//                           marginBottom: 16,
//                         }}
//                       >
//                         📅 {e.date} · 📍 {e.location}
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         <span
//                           style={{
//                             fontFamily: "var(--font-display)",
//                             fontSize: 18,
//                             fontWeight: 700,
//                             color: "var(--accent)",
//                           }}
//                         >
//                           ₹{e.price.toLocaleString()}
//                         </span>
//                         <div style={{ display: "flex", gap: 8 }}>
//                           <button className="btn btn-danger btn-sm">
//                             ✕ Remove
//                           </button>
//                           <button
//                             className="btn btn-primary btn-sm"
//                             onClick={() => setPage("booking")}
//                           >
//                             Book
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {nav === "profile" && (
//             <div style={{ maxWidth: 560 }}>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 8,
//                 }}
//               >
//                 Edit Profile
//               </h2>
//               <p style={{ color: "var(--muted)", marginBottom: 32 }}>
//                 Update your personal information
//               </p>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 20,
//                   marginBottom: 32,
//                   padding: 24,
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 16,
//                 }}
//               >
//                 <div
//                   className="avatar"
//                   style={{ width: 72, height: 72, fontSize: 28 }}
//                 >
//                   {user.name[0]}
//                 </div>
//                 <div>
//                   <div style={{ fontWeight: 600, marginBottom: 4 }}>
//                     Profile Photo
//                   </div>
//                   <div
//                     style={{
//                       color: "var(--muted)",
//                       fontSize: 13,
//                       marginBottom: 10,
//                     }}
//                   >
//                     PNG or JPG, max 2MB
//                   </div>
//                   <button className="btn btn-ghost btn-sm">Upload Photo</button>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 16,
//                 }}
//               >
//                 <div className="form-group">
//                   <label className="form-label">First Name</label>
//                   <input
//                     className="form-input"
//                     defaultValue={user.name.split(" ")[0]}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Last Name</label>
//                   <input
//                     className="form-input"
//                     defaultValue={user.name.split(" ")[1] || ""}
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Email Address</label>
//                 <input className="form-input" defaultValue={user.email} />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Phone Number</label>
//                 <input className="form-input" placeholder="+91 XXXXX XXXXX" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Date of Birth</label>
//                 <input className="form-input" type="date" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">City</label>
//                 <select className="form-input">
//                   {[
//                     "Mumbai",
//                     "Delhi",
//                     "Bengaluru",
//                     "Hyderabad",
//                     "Pune",
//                     "Chennai",
//                     "Kolkata",
//                   ].map((c) => (
//                     <option key={c}>{c}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Bio</label>
//                 <textarea
//                   className="form-input"
//                   rows={3}
//                   placeholder="Tell us a bit about yourself..."
//                 />
//               </div>
//               <div style={{ display: "flex", gap: 12 }}>
//                 <button className="btn btn-primary">Save Changes</button>
//                 <button className="btn btn-ghost">Cancel</button>
//               </div>
//             </div>
//           )}

//           {nav === "settings" && (
//             <div style={{ maxWidth: 560 }}>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 8,
//                 }}
//               >
//                 Settings
//               </h2>
//               <p style={{ color: "var(--muted)", marginBottom: 32 }}>
//                 Manage your preferences and account security
//               </p>
//               <h4
//                 style={{
//                   fontSize: 14,
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   letterSpacing: 0.5,
//                   color: "var(--muted)",
//                   marginBottom: 16,
//                 }}
//               >
//                 Notifications
//               </h4>
//               <div
//                 className="table-card"
//                 style={{ padding: 4, marginBottom: 28 }}
//               >
//                 {[
//                   [
//                     "Email Notifications",
//                     "Get booking confirmations and updates via email",
//                     true,
//                   ],
//                   [
//                     "SMS Alerts",
//                     "Receive OTP and booking status via SMS",
//                     true,
//                   ],
//                   [
//                     "Event Reminders",
//                     "Get reminded 24h before your event",
//                     true,
//                   ],
//                   [
//                     "Marketing Emails",
//                     "Receive personalized event recommendations",
//                     false,
//                   ],
//                   [
//                     "Price Drop Alerts",
//                     "Know when wishlist events go on sale",
//                     true,
//                   ],
//                 ].map(([t, d, on]) => (
//                   <div
//                     key={t}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: "16px 20px",
//                       borderBottom: "1px solid var(--border)",
//                     }}
//                   >
//                     <div>
//                       <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
//                       <div style={{ color: "var(--muted)", fontSize: 12 }}>
//                         {d}
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         width: 44,
//                         height: 24,
//                         borderRadius: 12,
//                         background: on ? "var(--accent)" : "var(--surface2)",
//                         border: "1px solid var(--border)",
//                         cursor: "pointer",
//                         position: "relative",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <div
//                         style={{
//                           position: "absolute",
//                           top: 3,
//                           [on ? "right" : "left"]: 3,
//                           width: 16,
//                           height: 16,
//                           borderRadius: "50%",
//                           background: on ? "#0a0a0f" : "var(--muted)",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <h4
//                 style={{
//                   fontSize: 14,
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   letterSpacing: 0.5,
//                   color: "var(--muted)",
//                   marginBottom: 16,
//                 }}
//               >
//                 Security
//               </h4>
//               <div
//                 className="table-card"
//                 style={{ padding: 20, marginBottom: 28 }}
//               >
//                 <div className="form-group">
//                   <label className="form-label">Current Password</label>
//                   <input
//                     className="form-input"
//                     type="password"
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">New Password</label>
//                   <input
//                     className="form-input"
//                     type="password"
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Confirm New Password</label>
//                   <input
//                     className="form-input"
//                     type="password"
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 <button className="btn btn-primary btn-sm">
//                   Update Password
//                 </button>
//               </div>
//               <h4
//                 style={{
//                   fontSize: 14,
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   letterSpacing: 0.5,
//                   color: "var(--red)",
//                   marginBottom: 16,
//                 }}
//               >
//                 Danger Zone
//               </h4>
//               <div
//                 className="table-card"
//                 style={{ padding: 20, border: "1px solid rgba(232,93,93,0.3)" }}
//               >
//                 <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
//                   Delete Account
//                 </div>
//                 <div
//                   style={{
//                     color: "var(--muted)",
//                     fontSize: 13,
//                     marginBottom: 12,
//                   }}
//                 >
//                   This action is permanent. All your bookings and data will be
//                   deleted.
//                 </div>
//                 <button className="btn btn-danger btn-sm">
//                   Delete My Account
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── ORGANIZER DASHBOARD ──────────────────────────────────────────────────────
// function OrganizerDashboard({ user, setPage }) {
//   const [nav, setNav] = useState("overview");

//   const navItems = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "events", icon: "🎪", label: "My Events" },
//     { id: "create", icon: "➕", label: "Create Event" },
//     { id: "attendees", icon: "👥", label: "Attendees" },
//     { id: "revenue", icon: "💰", label: "Revenue" },
//     { id: "analytics", icon: "📈", label: "Analytics" },
//     { id: "settings", icon: "⚙️", label: "Settings" },
//   ];

//   return (
//     <div className="page" style={{ paddingTop: 80 }}>
//       <div className="dash-grid">
//         <Sidebar
//           title="Organizer Panel"
//           subtitle="✓ Verified Organizer"
//           subtitleColor="var(--green)"
//           items={navItems}
//           active={nav}
//           setActive={setNav}
//         />
//         <div className="dash-content">
//           {nav === "overview" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   marginBottom: 32,
//                 }}
//               >
//                 <div>
//                   <h2
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 28,
//                       marginBottom: 4,
//                     }}
//                   >
//                     Welcome back, {user?.name?.split(" ")[0] || "Organizer"}! 👋
//                   </h2>
//                   <p style={{ color: "var(--muted)" }}>
//                     Here's your event performance at a glance.
//                   </p>
//                 </div>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => setNav("create")}
//                 >
//                   + Create Event
//                 </button>
//               </div>
//               <div className="stats-row" style={{ marginBottom: 36 }}>
//                 <StatCard
//                   num="9"
//                   label="Active Events"
//                   icon="🎪"
//                   trend="3 this month"
//                 />
//                 <StatCard
//                   num="1,573"
//                   label="Total Attendees"
//                   icon="👥"
//                   trend="12% growth"
//                 />
//                 <StatCard
//                   num="₹4.2L"
//                   label="Total Revenue"
//                   icon="💰"
//                   trend="₹68K this month"
//                 />
//                 <StatCard num="4.8★" label="Avg. Rating" icon="⭐" />
//               </div>
//               <h3
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 20,
//                   marginBottom: 16,
//                 }}
//               >
//                 Live Event Occupancy
//               </h3>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//                   gap: 16,
//                   marginBottom: 36,
//                 }}
//               >
//                 {EVENTS.map((e) => {
//                   const pct = Math.round((e.booked / e.seats) * 100);
//                   const color =
//                     pct > 85
//                       ? "var(--red)"
//                       : pct > 60
//                         ? "var(--accent)"
//                         : "var(--green)";
//                   return (
//                     <div
//                       key={e.id}
//                       style={{
//                         background: "var(--surface)",
//                         border: "1px solid var(--border)",
//                         borderRadius: 14,
//                         padding: 20,
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           marginBottom: 8,
//                         }}
//                       >
//                         <div style={{ fontWeight: 600, fontSize: 13 }}>
//                           {e.emoji} {e.title}
//                         </div>
//                         <span style={{ color, fontWeight: 700, fontSize: 14 }}>
//                           {pct}%
//                         </span>
//                       </div>
//                       <div
//                         style={{
//                           height: 6,
//                           background: "var(--surface2)",
//                           borderRadius: 3,
//                           marginBottom: 8,
//                         }}
//                       >
//                         <div
//                           style={{
//                             height: "100%",
//                             width: pct + "%",
//                             background: color,
//                             borderRadius: 3,
//                           }}
//                         />
//                       </div>
//                       <div style={{ fontSize: 12, color: "var(--muted)" }}>
//                         {e.booked} / {e.seats} seats · {e.date}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               <h3
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 20,
//                   marginBottom: 16,
//                 }}
//               >
//                 Recent Registrations
//               </h3>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Attendee</th>
//                       <th>Event</th>
//                       <th>City</th>
//                       <th>Tickets</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {ATTENDEES.slice(0, 5).map((a) => (
//                       <tr key={a.name}>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 10,
//                             }}
//                           >
//                             <div
//                               className="avatar"
//                               style={{ width: 32, height: 32, fontSize: 13 }}
//                             >
//                               {a.name[0]}
//                             </div>
//                             <div>
//                               <div style={{ fontWeight: 600, fontSize: 14 }}>
//                                 {a.name}
//                               </div>
//                               <div
//                                 style={{ color: "var(--muted)", fontSize: 12 }}
//                               >
//                                 {a.email}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td style={{ fontSize: 13 }}>{a.event}</td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           {a.city}
//                         </td>
//                         <td>{a.tickets}</td>
//                         <td>
//                           <Badge status="Confirmed" />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "events" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 24,
//                 }}
//               >
//                 <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
//                   My Events
//                 </h2>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => setNav("create")}
//                 >
//                   + Create New
//                 </button>
//               </div>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Event</th>
//                       <th>Date</th>
//                       <th>Booked/Total</th>
//                       <th>Fill Rate</th>
//                       <th>Revenue</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {EVENTS.map((e) => {
//                       const pct = Math.round((e.booked / e.seats) * 100);
//                       return (
//                         <tr key={e.id}>
//                           <td>
//                             <div style={{ fontWeight: 600 }}>
//                               {e.emoji} {e.title}
//                             </div>
//                             <div
//                               style={{ color: "var(--muted)", fontSize: 12 }}
//                             >
//                               📍 {e.location}
//                             </div>
//                           </td>
//                           <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                             {e.date}
//                           </td>
//                           <td style={{ fontSize: 13 }}>
//                             {e.booked} / {e.seats}
//                           </td>
//                           <td>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 8,
//                               }}
//                             >
//                               <MiniBar
//                                 pct={pct}
//                                 color={
//                                   pct > 85 ? "var(--red)" : "var(--accent)"
//                                 }
//                               />
//                               <span
//                                 style={{ fontSize: 12, color: "var(--muted)" }}
//                               >
//                                 {pct}%
//                               </span>
//                             </div>
//                           </td>
//                           <td
//                             style={{ fontWeight: 700, color: "var(--accent)" }}
//                           >
//                             ₹{((e.price * e.booked) / 1000).toFixed(1)}K
//                           </td>
//                           <td>
//                             <Badge status="Active" />
//                           </td>
//                           <td>
//                             <div style={{ display: "flex", gap: 6 }}>
//                               <button className="btn btn-ghost btn-sm">
//                                 Edit
//                               </button>
//                               <button className="btn btn-ghost btn-sm">
//                                 Share
//                               </button>
//                               <button className="btn btn-danger btn-sm">
//                                 Cancel
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "create" && (
//             <div style={{ maxWidth: 680 }}>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 8,
//                 }}
//               >
//                 Create New Event
//               </h2>
//               <p style={{ color: "var(--muted)", marginBottom: 32 }}>
//                 Fill in the details below to publish your event on Eventify.
//               </p>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 20,
//                   padding: 32,
//                   marginBottom: 24,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     color: "var(--muted)",
//                     marginBottom: 20,
//                   }}
//                 >
//                   Basic Information
//                 </h4>
//                 <div className="form-group">
//                   <label className="form-label">Event Title *</label>
//                   <input
//                     className="form-input"
//                     placeholder="e.g. Mumbai Jazz Night 2025"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Description *</label>
//                   <textarea
//                     className="form-input"
//                     rows={4}
//                     placeholder="Describe what makes your event special..."
//                   />
//                 </div>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: 16,
//                   }}
//                 >
//                   <div className="form-group">
//                     <label className="form-label">Category *</label>
//                     <select className="form-input">
//                       <option>Music</option>
//                       <option>Tech</option>
//                       <option>Arts</option>
//                       <option>Business</option>
//                       <option>Health</option>
//                       <option>Entertainment</option>
//                       <option>Social</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Event Type</label>
//                     <select className="form-input">
//                       <option>In-Person</option>
//                       <option>Online</option>
//                       <option>Hybrid</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 20,
//                   padding: 32,
//                   marginBottom: 24,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     color: "var(--muted)",
//                     marginBottom: 20,
//                   }}
//                 >
//                   Date & Venue
//                 </h4>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: 16,
//                   }}
//                 >
//                   <div className="form-group">
//                     <label className="form-label">Event Date *</label>
//                     <input className="form-input" type="date" />
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Start Time *</label>
//                     <input className="form-input" type="time" />
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">End Time</label>
//                     <input className="form-input" type="time" />
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">City *</label>
//                     <select className="form-input">
//                       <option>Mumbai</option>
//                       <option>Delhi</option>
//                       <option>Bengaluru</option>
//                       <option>Hyderabad</option>
//                       <option>Pune</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Venue / Address *</label>
//                   <input
//                     className="form-input"
//                     placeholder="Hall name, full address"
//                   />
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 20,
//                   padding: 32,
//                   marginBottom: 24,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     color: "var(--muted)",
//                     marginBottom: 20,
//                   }}
//                 >
//                   Tickets & Pricing
//                 </h4>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: 16,
//                   }}
//                 >
//                   <div className="form-group">
//                     <label className="form-label">Ticket Price (₹) *</label>
//                     <input
//                       className="form-input"
//                       type="number"
//                       placeholder="1499"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Total Seats *</label>
//                     <input
//                       className="form-input"
//                       type="number"
//                       placeholder="200"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Max Per Booking</label>
//                     <input
//                       className="form-input"
//                       type="number"
//                       placeholder="10"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Early Bird Price (₹)</label>
//                     <input
//                       className="form-input"
//                       type="number"
//                       placeholder="Optional"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 20,
//                   padding: 32,
//                   marginBottom: 32,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     color: "var(--muted)",
//                     marginBottom: 20,
//                   }}
//                 >
//                   Media
//                 </h4>
//                 <div
//                   style={{
//                     border: "2px dashed var(--border)",
//                     borderRadius: 12,
//                     padding: "48px 24px",
//                     textAlign: "center",
//                     color: "var(--muted)",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
//                   <div style={{ fontWeight: 600, marginBottom: 4 }}>
//                     Upload Event Banner
//                   </div>
//                   <div style={{ fontSize: 13 }}>
//                     PNG, JPG — recommended 1280×640px, max 5MB
//                   </div>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 12 }}>
//                 <button className="btn btn-primary btn-lg">
//                   🚀 Publish Event
//                 </button>
//                 <button className="btn btn-ghost btn-lg">Save as Draft</button>
//               </div>
//             </div>
//           )}

//           {nav === "attendees" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 24,
//                 }}
//               >
//                 <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
//                   Attendees
//                 </h2>
//                 <div style={{ display: "flex", gap: 10 }}>
//                   <div
//                     className="search-bar"
//                     style={{
//                       margin: 0,
//                       maxWidth: 260,
//                       padding: "6px 6px 6px 14px",
//                     }}
//                   >
//                     <span>🔍</span>
//                     <input placeholder="Search attendees..." />
//                   </div>
//                   <button className="btn btn-ghost btn-sm">
//                     📥 Export CSV
//                   </button>
//                 </div>
//               </div>
//               <div className="stats-row" style={{ marginBottom: 24 }}>
//                 <StatCard num="1,573" label="Total Registered" icon="👥" />
//                 <StatCard num="1,510" label="Confirmed" icon="✅" />
//                 <StatCard num="63" label="Pending" icon="⏳" />
//                 <StatCard num="9" label="Events" icon="🎪" />
//               </div>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Attendee</th>
//                       <th>Event</th>
//                       <th>City</th>
//                       <th>Tickets</th>
//                       <th>Booked On</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {ATTENDEES.map((a) => (
//                       <tr key={a.name}>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 10,
//                             }}
//                           >
//                             <div
//                               className="avatar"
//                               style={{ width: 32, height: 32, fontSize: 13 }}
//                             >
//                               {a.name[0]}
//                             </div>
//                             <div>
//                               <div style={{ fontWeight: 600, fontSize: 14 }}>
//                                 {a.name}
//                               </div>
//                               <div
//                                 style={{ color: "var(--muted)", fontSize: 12 }}
//                               >
//                                 {a.email}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td style={{ fontSize: 13 }}>{a.event}</td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           {a.city}
//                         </td>
//                         <td>{a.tickets}</td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           {a.date}
//                         </td>
//                         <td>
//                           <button className="btn btn-ghost btn-sm">
//                             Message
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "revenue" && (
//             <div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 Revenue
//               </h2>
//               <div className="stats-row" style={{ marginBottom: 32 }}>
//                 <StatCard
//                   num="₹4.2L"
//                   label="Gross Revenue"
//                   icon="💰"
//                   trend="↑ 18% vs last month"
//                 />
//                 <StatCard num="₹3.99L" label="After Platform Fee" icon="🏦" />
//                 <StatCard num="₹68K" label="This Month" icon="📅" />
//                 <StatCard num="₹12K" label="Today" icon="⚡" />
//               </div>
//               <div
//                 className="table-card"
//                 style={{ padding: 28, marginBottom: 24 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: 20,
//                   }}
//                 >
//                   <h3
//                     style={{ fontFamily: "var(--font-display)", fontSize: 20 }}
//                   >
//                     Revenue by Event
//                   </h3>
//                   <button className="btn btn-ghost btn-sm">
//                     📊 Full Report
//                   </button>
//                 </div>
//                 {EVENTS.map((e) => {
//                   const rev = e.price * e.booked;
//                   const pct = Math.round((e.booked / e.seats) * 100);
//                   return (
//                     <div
//                       key={e.id}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 20,
//                         padding: "14px 0",
//                         borderBottom: "1px solid var(--border)",
//                       }}
//                     >
//                       <span style={{ fontSize: 24 }}>{e.emoji}</span>
//                       <div style={{ flex: 1 }}>
//                         <div
//                           style={{
//                             fontWeight: 600,
//                             fontSize: 14,
//                             marginBottom: 4,
//                           }}
//                         >
//                           {e.title}
//                         </div>
//                         <div style={{ fontSize: 12, color: "var(--muted)" }}>
//                           {e.booked} attendees · {pct}% full
//                         </div>
//                       </div>
//                       <MiniBar pct={pct} />
//                       <div
//                         style={{
//                           fontFamily: "var(--font-display)",
//                           fontSize: 18,
//                           fontWeight: 700,
//                           color: "var(--accent)",
//                           minWidth: 80,
//                           textAlign: "right",
//                         }}
//                       >
//                         ₹{(rev / 1000).toFixed(1)}K
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div
//                 style={{
//                   background: "rgba(78,203,141,0.08)",
//                   border: "1px solid rgba(78,203,141,0.25)",
//                   borderRadius: 16,
//                   padding: 24,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div>
//                     <div style={{ fontWeight: 700, marginBottom: 4 }}>
//                       Next Payout
//                     </div>
//                     <div style={{ color: "var(--muted)", fontSize: 13 }}>
//                       Expected by December 25, 2025
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 28,
//                       fontWeight: 900,
//                       color: "var(--green)",
//                     }}
//                   >
//                     ₹3.99L
//                   </div>
//                   <button className="btn btn-success btn-sm">
//                     Request Early Payout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {nav === "analytics" && (
//             <div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 Analytics
//               </h2>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 24,
//                 }}
//               >
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Bookings This Week
//                   </h4>
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: 8,
//                       alignItems: "flex-end",
//                       height: 120,
//                     }}
//                   >
//                     {[35, 60, 45, 80, 55, 90, 40].map((h, i) => (
//                       <div
//                         key={i}
//                         style={{
//                           flex: 1,
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                             height: h + "%",
//                             background:
//                               i === 5
//                                 ? "var(--accent)"
//                                 : "rgba(232,184,109,0.25)",
//                             borderRadius: "4px 4px 0 0",
//                           }}
//                         />
//                         <div style={{ fontSize: 11, color: "var(--muted)" }}>
//                           {["M", "T", "W", "T", "F", "S", "S"][i]}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Attendees by City
//                   </h4>
//                   {[
//                     ["Mumbai", 42],
//                     ["Bengaluru", 28],
//                     ["Delhi", 18],
//                     ["Hyderabad", 12],
//                   ].map(([city, pct]) => (
//                     <div key={city} style={{ marginBottom: 14 }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           fontSize: 13,
//                           marginBottom: 4,
//                         }}
//                       >
//                         <span>{city}</span>
//                         <span
//                           style={{ color: "var(--accent)", fontWeight: 600 }}
//                         >
//                           {pct}%
//                         </span>
//                       </div>
//                       <MiniBar pct={pct} />
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Satisfaction Ratings
//                   </h4>
//                   {[
//                     ["5 ★", 62],
//                     ["4 ★", 24],
//                     ["3 ★", 10],
//                     ["2 ★", 3],
//                     ["1 ★", 1],
//                   ].map(([stars, pct]) => (
//                     <div
//                       key={stars}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 10,
//                         marginBottom: 10,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 40,
//                           fontSize: 13,
//                           color: "var(--accent)",
//                         }}
//                       >
//                         {stars}
//                       </div>
//                       <div
//                         style={{
//                           flex: 1,
//                           height: 6,
//                           background: "var(--surface2)",
//                           borderRadius: 3,
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: pct + "%",
//                             height: "100%",
//                             background: "var(--accent)",
//                             borderRadius: 3,
//                           }}
//                         />
//                       </div>
//                       <div
//                         style={{
//                           fontSize: 12,
//                           color: "var(--muted)",
//                           width: 32,
//                         }}
//                       >
//                         {pct}%
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Traffic Sources
//                   </h4>
//                   {[
//                     ["🔍 Search", 48],
//                     ["📱 Social Media", 28],
//                     ["🔗 Direct Link", 16],
//                     ["📧 Email", 8],
//                   ].map(([src, pct]) => (
//                     <div
//                       key={src}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 10,
//                         marginBottom: 12,
//                       }}
//                     >
//                       <div style={{ flex: 1, fontSize: 13 }}>{src}</div>
//                       <MiniBar pct={pct} />
//                       <div
//                         style={{
//                           fontSize: 12,
//                           color: "var(--accent)",
//                           fontWeight: 600,
//                           width: 32,
//                         }}
//                       >
//                         {pct}%
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {nav === "settings" && (
//             <div style={{ maxWidth: 560 }}>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 8,
//                 }}
//               >
//                 Organizer Settings
//               </h2>
//               <p style={{ color: "var(--muted)", marginBottom: 32 }}>
//                 Manage your organizer profile and preferences
//               </p>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 16,
//                   padding: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color: "var(--muted)",
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     marginBottom: 20,
//                   }}
//                 >
//                   Organizer Profile
//                 </h4>
//                 <div className="form-group">
//                   <label className="form-label">Organization Name</label>
//                   <input
//                     className="form-input"
//                     defaultValue="Elite Events India"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Website</label>
//                   <input
//                     className="form-input"
//                     placeholder="https://yourwebsite.com"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">GST Number</label>
//                   <input className="form-input" placeholder="29XXXXX1234X1ZX" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">
//                     Bank Account (for payouts)
//                   </label>
//                   <input className="form-input" placeholder="XXXXXX1234" />
//                 </div>
//                 <button className="btn btn-primary">Save Profile</button>
//               </div>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 16,
//                   padding: 28,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color: "var(--muted)",
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     marginBottom: 20,
//                   }}
//                 >
//                   Notification Preferences
//                 </h4>
//                 {[
//                   [
//                     "New Booking Alerts",
//                     "Get notified when someone books your event",
//                     true,
//                   ],
//                   [
//                     "Cancellation Alerts",
//                     "Get notified when a booking is cancelled",
//                     true,
//                   ],
//                   [
//                     "Payout Notifications",
//                     "Get notified when payout is processed",
//                     true,
//                   ],
//                   [
//                     "Weekly Summary",
//                     "Receive a weekly performance report",
//                     false,
//                   ],
//                 ].map(([t, d, on]) => (
//                   <div
//                     key={t}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: "14px 0",
//                       borderBottom: "1px solid var(--border)",
//                     }}
//                   >
//                     <div>
//                       <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
//                       <div style={{ color: "var(--muted)", fontSize: 12 }}>
//                         {d}
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         width: 44,
//                         height: 24,
//                         borderRadius: 12,
//                         background: on ? "var(--accent)" : "var(--surface2)",
//                         cursor: "pointer",
//                         position: "relative",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <div
//                         style={{
//                           position: "absolute",
//                           top: 3,
//                           [on ? "right" : "left"]: 3,
//                           width: 16,
//                           height: 16,
//                           borderRadius: "50%",
//                           background: on ? "#0a0a0f" : "var(--muted)",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
// function AdminDashboard() {
//   const [nav, setNav] = useState("overview");
//   const [userSearch, setUserSearch] = useState("");

//   const navItems = [
//     { id: "overview", icon: "📊", label: "Overview", badge: null },
//     { id: "users", icon: "👥", label: "Manage Users", badge: "3" },
//     { id: "events", icon: "🎪", label: "Manage Events", badge: null },
//     { id: "payments", icon: "💳", label: "Payments", badge: null },
//     { id: "organizers", icon: "🏢", label: "Organizers", badge: "2" },
//     { id: "reports", icon: "📈", label: "Reports", badge: null },
//     { id: "settings", icon: "⚙️", label: "System Settings", badge: null },
//   ];

//   return (
//     <div className="page" style={{ paddingTop: 80 }}>
//       <div className="dash-grid">
//         <Sidebar
//           title="Admin Panel"
//           subtitle="⚠ Super Admin"
//           subtitleColor="var(--red)"
//           items={navItems}
//           active={nav}
//           setActive={setNav}
//         />
//         <div className="dash-content">
//           {nav === "overview" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   marginBottom: 32,
//                 }}
//               >
//                 <div>
//                   <h2
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 28,
//                       marginBottom: 4,
//                     }}
//                   >
//                     Admin Dashboard
//                   </h2>
//                   <p style={{ color: "var(--muted)" }}>
//                     System-wide overview and controls
//                   </p>
//                 </div>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <button className="btn btn-ghost btn-sm">
//                     📥 Export Data
//                   </button>
//                   <button className="btn btn-primary btn-sm">
//                     📢 Broadcast
//                   </button>
//                 </div>
//               </div>
//               <div className="stats-row" style={{ marginBottom: 36 }}>
//                 <StatCard
//                   num="12,480"
//                   label="Total Users"
//                   icon="👥"
//                   trend="↑ 340 this week"
//                 />
//                 <StatCard
//                   num="650"
//                   label="Organizers"
//                   icon="🏢"
//                   trend="↑ 12 this month"
//                 />
//                 <StatCard num="2,400+" label="Live Events" icon="🎪" />
//                 <StatCard
//                   num="₹48L"
//                   label="Platform Revenue"
//                   icon="💰"
//                   trend="↑ 18%"
//                 />
//               </div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 24,
//                   marginBottom: 32,
//                 }}
//               >
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     System Health
//                   </h4>
//                   {[
//                     ["API Response Time", "98ms", "var(--green)"],
//                     ["Server Uptime", "99.97%", "var(--green)"],
//                     ["DB Query Time", "12ms", "var(--green)"],
//                     ["Error Rate", "0.03%", "var(--accent)"],
//                   ].map(([label, val, color]) => (
//                     <div
//                       key={label}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         padding: "10px 0",
//                         borderBottom: "1px solid var(--border)",
//                         fontSize: 14,
//                       }}
//                     >
//                       <span style={{ color: "var(--muted)" }}>{label}</span>
//                       <span style={{ fontWeight: 700, color }}>{val}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Pending Approvals
//                   </h4>
//                   {[
//                     { name: "StarLight Org" },
//                     { name: "TechWorld India (new event)" },
//                   ].map((o) => (
//                     <div
//                       key={o.name}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         padding: "10px 0",
//                         borderBottom: "1px solid var(--border)",
//                       }}
//                     >
//                       <div style={{ fontSize: 14, fontWeight: 600 }}>
//                         {o.name}
//                       </div>
//                       <div style={{ display: "flex", gap: 6 }}>
//                         <button className="btn btn-success btn-sm">
//                           ✓ Approve
//                         </button>
//                         <button className="btn btn-danger btn-sm">
//                           ✗ Reject
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <h3
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 20,
//                   marginBottom: 16,
//                 }}
//               >
//                 Recent User Signups
//               </h3>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User</th>
//                       <th>Role</th>
//                       <th>Joined</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {ALL_USERS.slice(0, 5).map((u) => (
//                       <tr key={u.email}>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 10,
//                             }}
//                           >
//                             <div
//                               className="avatar"
//                               style={{ width: 32, height: 32, fontSize: 13 }}
//                             >
//                               {u.name[0]}
//                             </div>
//                             <div>
//                               <div style={{ fontWeight: 600, fontSize: 14 }}>
//                                 {u.name}
//                               </div>
//                               <div
//                                 style={{ color: "var(--muted)", fontSize: 12 }}
//                               >
//                                 {u.email}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${u.role === "Admin" ? "badge-danger" : u.role === "Organizer" ? "badge-info" : "badge-warn"}`}
//                           >
//                             {u.role}
//                           </span>
//                         </td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           {u.joined}
//                         </td>
//                         <td>
//                           <Badge status={u.status} />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "users" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 24,
//                 }}
//               >
//                 <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
//                   Manage Users
//                 </h2>
//                 <div style={{ display: "flex", gap: 10 }}>
//                   <div
//                     className="search-bar"
//                     style={{
//                       margin: 0,
//                       maxWidth: 260,
//                       padding: "6px 6px 6px 14px",
//                     }}
//                   >
//                     <span>🔍</span>
//                     <input
//                       placeholder="Search by name or email..."
//                       value={userSearch}
//                       onChange={(e) => setUserSearch(e.target.value)}
//                     />
//                   </div>
//                   <button className="btn btn-ghost btn-sm">📥 Export</button>
//                   <button className="btn btn-primary btn-sm">+ Add User</button>
//                 </div>
//               </div>
//               <div className="stats-row" style={{ marginBottom: 24 }}>
//                 <StatCard num="12,480" label="Total Users" icon="👥" />
//                 <StatCard num="650" label="Organizers" icon="🏢" />
//                 <StatCard num="12" label="Admins" icon="🛡️" />
//                 <StatCard num="3" label="Flagged" icon="🚩" />
//               </div>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User</th>
//                       <th>Role</th>
//                       <th>Bookings</th>
//                       <th>Joined</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {ALL_USERS.filter(
//                       (u) =>
//                         u.name
//                           .toLowerCase()
//                           .includes(userSearch.toLowerCase()) ||
//                         u.email
//                           .toLowerCase()
//                           .includes(userSearch.toLowerCase()),
//                     ).map((u) => (
//                       <tr key={u.email}>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 10,
//                             }}
//                           >
//                             <div
//                               className="avatar"
//                               style={{ width: 36, height: 36, fontSize: 14 }}
//                             >
//                               {u.name[0]}
//                             </div>
//                             <div>
//                               <div style={{ fontWeight: 600, fontSize: 14 }}>
//                                 {u.name}
//                               </div>
//                               <div
//                                 style={{ color: "var(--muted)", fontSize: 12 }}
//                               >
//                                 {u.email}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${u.role === "Admin" ? "badge-danger" : u.role === "Organizer" ? "badge-info" : "badge-warn"}`}
//                           >
//                             {u.role}
//                           </span>
//                         </td>
//                         <td style={{ fontSize: 13 }}>{u.bookings}</td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           {u.joined}
//                         </td>
//                         <td>
//                           <Badge status={u.status} />
//                         </td>
//                         <td>
//                           <div style={{ display: "flex", gap: 6 }}>
//                             <button className="btn btn-ghost btn-sm">
//                               View
//                             </button>
//                             <button className="btn btn-ghost btn-sm">
//                               Edit
//                             </button>
//                             {u.status === "Flagged" ? (
//                               <button className="btn btn-success btn-sm">
//                                 Restore
//                               </button>
//                             ) : (
//                               <button className="btn btn-danger btn-sm">
//                                 Block
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "events" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 24,
//                 }}
//               >
//                 <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
//                   Manage Events
//                 </h2>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   {["All", "Active", "Pending", "Cancelled"].map((s) => (
//                     <button
//                       key={s}
//                       className="filter-tag"
//                       style={{ fontSize: 12, padding: "5px 14px" }}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Event</th>
//                       <th>Organizer</th>
//                       <th>Date</th>
//                       <th>Fill</th>
//                       <th>Revenue</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {EVENTS.map((e) => {
//                       const pct = Math.round((e.booked / e.seats) * 100);
//                       return (
//                         <tr key={e.id}>
//                           <td>
//                             <div style={{ fontWeight: 600 }}>
//                               {e.emoji} {e.title}
//                             </div>
//                             <div
//                               style={{ color: "var(--muted)", fontSize: 12 }}
//                             >
//                               📍 {e.location}
//                             </div>
//                           </td>
//                           <td style={{ fontSize: 13, color: "var(--muted)" }}>
//                             Elite Events
//                           </td>
//                           <td style={{ fontSize: 13, color: "var(--muted)" }}>
//                             {e.date}
//                           </td>
//                           <td>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 6,
//                               }}
//                             >
//                               <MiniBar pct={pct} />
//                               <span
//                                 style={{ fontSize: 12, color: "var(--muted)" }}
//                               >
//                                 {pct}%
//                               </span>
//                             </div>
//                           </td>
//                           <td
//                             style={{ fontWeight: 700, color: "var(--accent)" }}
//                           >
//                             ₹{((e.price * e.booked) / 1000).toFixed(1)}K
//                           </td>
//                           <td>
//                             <Badge status="Active" />
//                           </td>
//                           <td>
//                             <div style={{ display: "flex", gap: 6 }}>
//                               <button className="btn btn-ghost btn-sm">
//                                 View
//                               </button>
//                               <button className="btn btn-danger btn-sm">
//                                 Remove
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "payments" && (
//             <div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 Payment Records
//               </h2>
//               <div className="stats-row" style={{ marginBottom: 32 }}>
//                 <StatCard num="₹48L" label="Gross Revenue" icon="💰" />
//                 <StatCard num="₹2.4L" label="Platform Fee (5%)" icon="🏦" />
//                 <StatCard num="₹45.6L" label="Paid to Organizers" icon="💸" />
//                 <StatCard num="3" label="Pending Refunds" icon="⏳" />
//               </div>
//               <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//                 {["All", "Success", "Pending", "Refunded", "Failed"].map(
//                   (s) => (
//                     <button
//                       key={s}
//                       className="filter-tag"
//                       style={{ fontSize: 12, padding: "5px 14px" }}
//                     >
//                       {s}
//                     </button>
//                   ),
//                 )}
//               </div>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Transaction ID</th>
//                       <th>User</th>
//                       <th>Event</th>
//                       <th>Amount</th>
//                       <th>Fee</th>
//                       <th>Method</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {TRANSACTIONS.map((t) => (
//                       <tr key={t.id}>
//                         <td
//                           style={{
//                             color: "var(--accent)",
//                             fontWeight: 700,
//                             fontSize: 13,
//                           }}
//                         >
//                           {t.id}
//                         </td>
//                         <td style={{ fontSize: 13 }}>{t.user}</td>
//                         <td style={{ fontSize: 13, color: "var(--muted)" }}>
//                           {t.event}
//                         </td>
//                         <td style={{ fontWeight: 700 }}>
//                           ₹{t.amount.toLocaleString()}
//                         </td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           ₹{Math.round(t.amount * 0.05)}
//                         </td>
//                         <td style={{ fontSize: 13 }}>{t.method}</td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           {t.date}
//                         </td>
//                         <td>
//                           <Badge status={t.status} />
//                         </td>
//                         <td>
//                           <button className="btn btn-ghost btn-sm">
//                             Details
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "organizers" && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 24,
//                 }}
//               >
//                 <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
//                   Organizers
//                 </h2>
//                 <button className="btn btn-primary btn-sm">
//                   + Add Organizer
//                 </button>
//               </div>
//               <div className="stats-row" style={{ marginBottom: 24 }}>
//                 <StatCard num="650" label="Total Organizers" icon="🏢" />
//                 <StatCard num="635" label="Verified" icon="✅" />
//                 <StatCard num="12" label="Pending" icon="⏳" />
//                 <StatCard num="3" label="Suspended" icon="🚫" />
//               </div>
//               <div className="table-card">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Organizer</th>
//                       <th>Events</th>
//                       <th>Attendees</th>
//                       <th>Revenue</th>
//                       <th>Since</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {ORGANIZERS_LIST.map((o) => (
//                       <tr key={o.name}>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 10,
//                             }}
//                           >
//                             <div
//                               className="avatar"
//                               style={{ width: 36, height: 36, fontSize: 14 }}
//                             >
//                               {o.name[0]}
//                             </div>
//                             <span style={{ fontWeight: 600, fontSize: 14 }}>
//                               {o.name}
//                             </span>
//                           </div>
//                         </td>
//                         <td>{o.events}</td>
//                         <td>{o.attendees.toLocaleString()}</td>
//                         <td style={{ fontWeight: 700, color: "var(--accent)" }}>
//                           {o.revenue}
//                         </td>
//                         <td style={{ color: "var(--muted)", fontSize: 13 }}>
//                           {o.since}
//                         </td>
//                         <td>
//                           <Badge status={o.status} />
//                         </td>
//                         <td>
//                           <div style={{ display: "flex", gap: 6 }}>
//                             {o.status === "Pending" && (
//                               <button className="btn btn-success btn-sm">
//                                 Approve
//                               </button>
//                             )}
//                             {o.status === "Verified" && (
//                               <button className="btn btn-ghost btn-sm">
//                                 View
//                               </button>
//                             )}
//                             {o.status === "Suspended" ? (
//                               <button className="btn btn-success btn-sm">
//                                 Restore
//                               </button>
//                             ) : (
//                               <button className="btn btn-danger btn-sm">
//                                 Suspend
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {nav === "reports" && (
//             <div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 Platform Analytics
//               </h2>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 24,
//                 }}
//               >
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Revenue by Month (₹L)
//                   </h4>
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: 8,
//                       alignItems: "flex-end",
//                       height: 130,
//                     }}
//                   >
//                     {[
//                       [28, "Jul"],
//                       [32, "Aug"],
//                       [35, "Sep"],
//                       [41, "Oct"],
//                       [38, "Nov"],
//                       [48, "Dec"],
//                     ].map(([h, m]) => (
//                       <div
//                         key={m}
//                         style={{
//                           flex: 1,
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <div style={{ fontSize: 10, color: "var(--muted)" }}>
//                           ₹{h}L
//                         </div>
//                         <div
//                           style={{
//                             width: "100%",
//                             height: (h / 48) * 100 + "%",
//                             background:
//                               m === "Dec"
//                                 ? "var(--accent)"
//                                 : "rgba(232,184,109,0.25)",
//                             borderRadius: "4px 4px 0 0",
//                           }}
//                         />
//                         <div style={{ fontSize: 11, color: "var(--muted)" }}>
//                           {m}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Events by Category
//                   </h4>
//                   {[
//                     ["🎵 Music", 30],
//                     ["💻 Tech", 22],
//                     ["🎨 Arts", 16],
//                     ["🚀 Business", 12],
//                     ["🥂 Social", 12],
//                     ["🧘 Health", 8],
//                   ].map(([cat, pct]) => (
//                     <div key={cat} style={{ marginBottom: 14 }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           fontSize: 13,
//                           marginBottom: 4,
//                         }}
//                       >
//                         <span>{cat}</span>
//                         <span
//                           style={{ color: "var(--accent)", fontWeight: 600 }}
//                         >
//                           {pct}%
//                         </span>
//                       </div>
//                       <MiniBar pct={pct} />
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     New Users / Week
//                   </h4>
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: 8,
//                       alignItems: "flex-end",
//                       height: 100,
//                     }}
//                   >
//                     {[220, 310, 280, 340, 390, 420, 510].map((h, i) => (
//                       <div
//                         key={i}
//                         style={{
//                           flex: 1,
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                             height: (h / 510) * 100 + "%",
//                             background:
//                               i === 6
//                                 ? "var(--green)"
//                                 : "rgba(78,203,141,0.25)",
//                             borderRadius: "4px 4px 0 0",
//                           }}
//                         />
//                         <div style={{ fontSize: 10, color: "var(--muted)" }}>
//                           W{i + 1}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     background: "var(--surface)",
//                     border: "1px solid var(--border)",
//                     borderRadius: 16,
//                     padding: 24,
//                   }}
//                 >
//                   <h4
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: 18,
//                       marginBottom: 20,
//                     }}
//                   >
//                     Top Cities by Bookings
//                   </h4>
//                   {[
//                     ["🏙️ Mumbai", 38],
//                     ["🏙️ Bengaluru", 24],
//                     ["🏙️ Delhi", 19],
//                     ["🏙️ Hyderabad", 12],
//                     ["🏙️ Pune", 7],
//                   ].map(([city, pct], i) => (
//                     <div
//                       key={city}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 10,
//                         marginBottom: 12,
//                       }}
//                     >
//                       <div
//                         style={{
//                           fontSize: 13,
//                           color: "var(--muted)",
//                           width: 16,
//                         }}
//                       >
//                         {i + 1}
//                       </div>
//                       <div style={{ flex: 1, fontSize: 13 }}>{city}</div>
//                       <MiniBar pct={pct} />
//                       <div
//                         style={{
//                           fontSize: 12,
//                           color: "var(--accent)",
//                           fontWeight: 600,
//                           width: 32,
//                         }}
//                       >
//                         {pct}%
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {nav === "settings" && (
//             <div style={{ maxWidth: 600 }}>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 28,
//                   marginBottom: 8,
//                 }}
//               >
//                 System Settings
//               </h2>
//               <p style={{ color: "var(--muted)", marginBottom: 32 }}>
//                 Configure platform-wide settings
//               </p>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 16,
//                   padding: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color: "var(--muted)",
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     marginBottom: 20,
//                   }}
//                 >
//                   Platform Configuration
//                 </h4>
//                 <div className="form-group">
//                   <label className="form-label">Platform Fee (%)</label>
//                   <input
//                     className="form-input"
//                     defaultValue="5"
//                     type="number"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Max Tickets per Booking</label>
//                   <input
//                     className="form-input"
//                     defaultValue="10"
//                     type="number"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Refund Window (hours)</label>
//                   <input
//                     className="form-input"
//                     defaultValue="24"
//                     type="number"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Support Email</label>
//                   <input
//                     className="form-input"
//                     defaultValue="hello@eventify.in"
//                   />
//                 </div>
//                 <button className="btn btn-primary">Save Configuration</button>
//               </div>
//               <div
//                 style={{
//                   background: "var(--surface)",
//                   border: "1px solid var(--border)",
//                   borderRadius: 16,
//                   padding: 28,
//                   marginBottom: 24,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color: "var(--muted)",
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     marginBottom: 20,
//                   }}
//                 >
//                   Feature Toggles
//                 </h4>
//                 {[
//                   [
//                     "Organizer Self-Registration",
//                     "Allow new organizers to sign up independently",
//                     true,
//                   ],
//                   [
//                     "User Reviews",
//                     "Allow attendees to leave event reviews",
//                     true,
//                   ],
//                   [
//                     "Waitlist Feature",
//                     "Enable waitlist for sold-out events",
//                     false,
//                   ],
//                   [
//                     "Referral Program",
//                     "Enable the refer-and-earn system",
//                     true,
//                   ],
//                   [
//                     "Maintenance Mode",
//                     "Take the platform offline for maintenance",
//                     false,
//                   ],
//                 ].map(([t, d, on]) => (
//                   <div
//                     key={t}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: "14px 0",
//                       borderBottom: "1px solid var(--border)",
//                     }}
//                   >
//                     <div>
//                       <div style={{ fontWeight: 600, fontSize: 14 }}>{t}</div>
//                       <div style={{ color: "var(--muted)", fontSize: 12 }}>
//                         {d}
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         width: 44,
//                         height: 24,
//                         borderRadius: 12,
//                         background: on ? "var(--accent)" : "var(--surface2)",
//                         border: "1px solid var(--border)",
//                         cursor: "pointer",
//                         position: "relative",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <div
//                         style={{
//                           position: "absolute",
//                           top: 3,
//                           [on ? "right" : "left"]: 3,
//                           width: 16,
//                           height: 16,
//                           borderRadius: "50%",
//                           background: on ? "#0a0a0f" : "var(--muted)",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div
//                 style={{
//                   background: "rgba(232,93,93,0.07)",
//                   border: "1px solid rgba(232,93,93,0.3)",
//                   borderRadius: 16,
//                   padding: 28,
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color: "var(--red)",
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     marginBottom: 16,
//                   }}
//                 >
//                   Danger Zone
//                 </h4>
//                 <div style={{ marginBottom: 16 }}>
//                   <div style={{ fontWeight: 600, marginBottom: 4 }}>
//                     Clear All Cache
//                   </div>
//                   <div
//                     style={{
//                       color: "var(--muted)",
//                       fontSize: 13,
//                       marginBottom: 10,
//                     }}
//                   >
//                     Force-refresh all cached data.
//                   </div>
//                   <button className="btn btn-ghost btn-sm">Clear Cache</button>
//                 </div>
//                 <div>
//                   <div style={{ fontWeight: 600, marginBottom: 4 }}>
//                     Reset Platform Stats
//                   </div>
//                   <div
//                     style={{
//                       color: "var(--muted)",
//                       fontSize: 13,
//                       marginBottom: 10,
//                     }}
//                   >
//                     Resets analytics counters. Cannot be undone.
//                   </div>
//                   <button className="btn btn-danger btn-sm">Reset Stats</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── STATIC PAGES ─────────────────────────────────────────────────────────────
// function HowItWorksPage() {
//   return (
//     <div className="page section container">
//       <div className="section-header">
//         <div className="section-tag">How It Works</div>
//         <h1 className="section-title">Simple. Fast. Secure.</h1>
//         <p className="section-sub">
//           From discovery to entry — Eventify makes event booking effortless in
//           just a few steps.
//         </p>
//       </div>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr",
//           gap: 32,
//           maxWidth: 700,
//           margin: "0 auto 80px",
//         }}
//       >
//         {[
//           [
//             "1",
//             "🔍",
//             "Discover Events",
//             "Browse thousands of events across India — filter by city, date, category, or price.",
//           ],
//           [
//             "2",
//             "📝",
//             "Create an Account",
//             "Sign up for free in under a minute. A single Eventify account lets you book tickets and track bookings.",
//           ],
//           [
//             "3",
//             "🎟️",
//             "Select & Book Tickets",
//             "Choose your ticket type and quantity. Review the booking details and proceed to secure checkout.",
//           ],
//           [
//             "4",
//             "💳",
//             "Pay Securely",
//             "Pay using UPI, credit/debit cards, net banking, or wallets. All transactions are 256-bit SSL encrypted.",
//           ],
//           [
//             "5",
//             "📧",
//             "Receive Confirmation",
//             "Get an instant email with your booking ID and QR code ticket.",
//           ],
//           [
//             "6",
//             "🚪",
//             "Show QR & Walk In",
//             "At the event venue, simply show your QR code at the gate. Get scanned and enjoy!",
//           ],
//         ].map(([n, icon, title, desc]) => (
//           <div
//             key={n}
//             style={{
//               display: "flex",
//               gap: 24,
//               padding: 28,
//               background: "var(--surface)",
//               border: "1px solid var(--border)",
//               borderRadius: 16,
//               alignItems: "flex-start",
//             }}
//           >
//             <div
//               className="step-num"
//               style={{ margin: 0, fontSize: 18, flexShrink: 0 }}
//             >
//               {n}
//             </div>
//             <div>
//               <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
//               <div
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 20,
//                   fontWeight: 700,
//                   marginBottom: 8,
//                 }}
//               >
//                 {title}
//               </div>
//               <div style={{ color: "var(--muted)", lineHeight: 1.7 }}>
//                 {desc}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div
//         style={{
//           background: "var(--surface)",
//           border: "1px solid var(--border)",
//           borderRadius: 20,
//           padding: 48,
//           textAlign: "center",
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 32,
//             marginBottom: 16,
//           }}
//         >
//           Ready to Experience Live Events?
//         </h2>
//         <p style={{ color: "var(--muted)", marginBottom: 32 }}>
//           Join 180,000+ attendees already using Eventify.
//         </p>
//         <button className="btn btn-primary btn-lg">Explore Events →</button>
//       </div>
//     </div>
//   );
// }

// function AboutPage() {
//   return (
//     <div className="page section container">
//       <div style={{ maxWidth: 800, margin: "0 auto" }}>
//         <div className="section-tag text-center">About Us</div>
//         <h1 className="section-title text-center">
//           We're Building the Future
//           <br />
//           of Events in India
//         </h1>
//         <p
//           style={{
//             color: "var(--muted)",
//             textAlign: "center",
//             fontSize: 18,
//             lineHeight: 1.8,
//             marginBottom: 60,
//           }}
//         >
//           Eventify was founded with a simple mission: make it effortless for
//           anyone in India to discover and attend incredible events, and for
//           organizers to manage them beautifully.
//         </p>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: 24,
//             marginBottom: 60,
//           }}
//         >
//           {[
//             [
//               "🎯",
//               "Our Mission",
//               "To democratize event experiences across India by connecting organizers and attendees on a single, powerful platform.",
//             ],
//             [
//               "👁️",
//               "Our Vision",
//               "A future where no great event goes unnoticed, and no attendee misses an experience they'd love.",
//             ],
//             [
//               "💡",
//               "Innovation",
//               "We use the latest technology — MERN stack, real-time notifications, and AI recommendations — to deliver seamless UX.",
//             ],
//             [
//               "🤝",
//               "Community",
//               "Over 650 organizers and 180K attendees trust Eventify for their event needs every day.",
//             ],
//           ].map(([icon, title, desc]) => (
//             <div
//               key={title}
//               style={{
//                 background: "var(--surface)",
//                 border: "1px solid var(--border)",
//                 borderRadius: 16,
//                 padding: 28,
//               }}
//             >
//               <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
//               <div
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: 20,
//                   fontWeight: 700,
//                   marginBottom: 8,
//                 }}
//               >
//                 {title}
//               </div>
//               <div style={{ color: "var(--muted)", lineHeight: 1.7 }}>
//                 {desc}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(232,184,109,0.08), rgba(78,203,141,0.05))",
//             border: "1px solid var(--border)",
//             borderRadius: 20,
//             padding: 48,
//             textAlign: "center",
//           }}
//         >
//           <h2
//             style={{
//               fontFamily: "var(--font-display)",
//               fontSize: 28,
//               marginBottom: 24,
//             }}
//           >
//             Meet the Team
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 32,
//               flexWrap: "wrap",
//             }}
//           >
//             {[
//               ["A", "Aarav Shah", "Co-Founder & CEO"],
//               ["P", "Priya Nair", "CTO & Lead Dev"],
//               ["R", "Rohit Gupta", "Head of Design"],
//             ].map(([init, name, role]) => (
//               <div key={name} style={{ textAlign: "center" }}>
//                 <div
//                   className="avatar"
//                   style={{
//                     width: 72,
//                     height: 72,
//                     fontSize: 28,
//                     margin: "0 auto 12px",
//                   }}
//                 >
//                   {init}
//                 </div>
//                 <div className="fw-bold">{name}</div>
//                 <div style={{ color: "var(--muted)", fontSize: 13 }}>
//                   {role}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactPage() {
//   const [sent, setSent] = useState(false);
//   return (
//     <div className="page section container">
//       <div style={{ maxWidth: 900, margin: "0 auto" }}>
//         <div className="section-header">
//           <div className="section-tag">Contact Us</div>
//           <h1 className="section-title">Get In Touch</h1>
//           <p className="section-sub">
//             Have a question or want to partner with us? We'd love to hear from
//             you.
//           </p>
//         </div>
//         <div
//           style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48 }}
//         >
//           <div>
//             {[
//               ["📧", "Email", "hello@eventify.in"],
//               ["📞", "Phone", "+91 98765 43210"],
//               ["📍", "Address", "Bandra Kurla Complex, Mumbai 400051"],
//               ["🕐", "Support Hours", "Mon–Sat, 9 AM – 8 PM IST"],
//             ].map(([icon, label, val]) => (
//               <div key={label} className="info-row">
//                 <span className="info-icon">{icon}</span>
//                 <div>
//                   <div className="info-label">{label}</div>
//                   <div>{val}</div>
//                 </div>
//               </div>
//             ))}
//             <div style={{ marginTop: 32 }}>
//               <div style={{ fontWeight: 700, marginBottom: 12 }}>Follow Us</div>
//               <div style={{ display: "flex", gap: 12 }}>
//                 {["𝕏", "in", "f", "▶"].map((s) => (
//                   <div
//                     key={s}
//                     style={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: 10,
//                       background: "var(--surface2)",
//                       border: "1px solid var(--border)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                       fontSize: 14,
//                       fontWeight: 700,
//                     }}
//                   >
//                     {s}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div
//             style={{
//               background: "var(--surface)",
//               border: "1px solid var(--border)",
//               borderRadius: 20,
//               padding: 36,
//             }}
//           >
//             {sent ? (
//               <div style={{ textAlign: "center", padding: "40px 0" }}>
//                 <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
//                 <h3
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: 24,
//                     marginBottom: 8,
//                   }}
//                 >
//                   Message Sent!
//                 </h3>
//                 <p style={{ color: "var(--muted)" }}>
//                   We'll get back to you within 24 hours.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <h3
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: 24,
//                     marginBottom: 24,
//                   }}
//                 >
//                   Send a Message
//                 </h3>
//                 <div className="form-group">
//                   <label className="form-label">Full Name</label>
//                   <input className="form-input" placeholder="Your Name" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Email</label>
//                   <input className="form-input" placeholder="your@email.com" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Subject</label>
//                   <select className="form-input">
//                     <option>General Inquiry</option>
//                     <option>Partnership</option>
//                     <option>Technical Support</option>
//                     <option>Event Organizer</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Message</label>
//                   <textarea
//                     className="form-input"
//                     rows={5}
//                     placeholder="How can we help you?"
//                   />
//                 </div>
//                 <button
//                   className="btn btn-primary btn-lg"
//                   style={{ width: "100%", justifyContent: "center" }}
//                   onClick={() => setSent(true)}
//                 >
//                   Send Message →
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── AUTH MODAL ───────────────────────────────────────────────────────────────
// function AuthModal({ type, setModal, setUser, setPage }) {
//   const [mode, setMode] = useState(type);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [err, setErr] = useState("");

//   const handleSubmit = () => {
//     if (!form.email || !form.password) {
//       setErr("Please fill all required fields.");
//       return;
//     }
//     if (mode === "register" && !form.name) {
//       setErr("Name is required.");
//       return;
//     }
//     const user = {
//       name:
//         form.name || (form.email === "admin@eventify.in" ? "Admin" : "User"),
//       email: form.email,
//       role: form.email === "admin@eventify.in" ? "admin" : form.role,
//     };
//     setUser(user);
//     setModal(null);
//     if (user.role === "admin") setPage("admin");
//     else if (user.role === "organizer") setPage("organizer");
//     else setPage("account");
//   };

//   return (
//     <div className="modal-overlay" onClick={() => setModal(null)}>
//       <div className="modal" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-title">
//           {mode === "login" ? "Welcome Back" : "Join Eventify"}
//         </div>
//         <div className="modal-sub">
//           {mode === "login"
//             ? "Sign in to your account"
//             : "Create your free account today"}
//         </div>
//         {err && <div className="alert alert-error">{err}</div>}
//         {mode === "register" && (
//           <div className="form-group">
//             <label className="form-label">Full Name</label>
//             <input
//               className="form-input"
//               placeholder="Your Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//           </div>
//         )}
//         <div className="form-group">
//           <label className="form-label">Email</label>
//           <input
//             className="form-input"
//             placeholder="your@email.com"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Password</label>
//           <input
//             className="form-input"
//             type="password"
//             placeholder="••••••••"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//         </div>
//         {mode === "register" && (
//           <div className="form-group">
//             <label className="form-label">Account Type</label>
//             <select
//               className="form-input"
//               value={form.role}
//               onChange={(e) => setForm({ ...form, role: e.target.value })}
//             >
//               <option value="user">Attendee (User)</option>
//               <option value="organizer">Event Organizer</option>
//             </select>
//           </div>
//         )}
//         {mode === "login" && (
//           <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>
//             Tip: use admin@eventify.in to login as admin
//           </p>
//         )}
//         <button
//           className="btn btn-primary btn-lg"
//           style={{ width: "100%", justifyContent: "center", marginBottom: 16 }}
//           onClick={handleSubmit}
//         >
//           {mode === "login" ? "Login →" : "Create Account →"}
//         </button>
//         <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
//           {mode === "login"
//             ? "Don't have an account?"
//             : "Already have an account?"}{" "}
//           <span
//             style={{
//               color: "var(--accent)",
//               cursor: "pointer",
//               fontWeight: 600,
//             }}
//             onClick={() => {
//               setMode(mode === "login" ? "register" : "login");
//               setErr("");
//             }}
//           >
//             {mode === "login" ? "Sign Up" : "Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── FOOTER ───────────────────────────────────────────────────────────────────
// function Footer({ setPage }) {
//   return (
//     <footer>
//       <div className="container">
//         <div className="footer-grid">
//           <div>
//             <div className="footer-brand">✦ Eventify</div>
//             <div className="footer-desc">
//               India's premier event management platform. Discover, book, and
//               manage events with ease.
//             </div>
//           </div>
//           <div>
//             <div className="footer-heading">Platform</div>
//             <ul className="footer-links">
//               {[
//                 ["Browse Events", "events"],
//                 ["How It Works", "how"],
//                 ["For Organizers", "organizer"],
//                 ["Pricing", "about"],
//               ].map(([l, p]) => (
//                 <li key={l}>
//                   <button onClick={() => setPage(p)}>{l}</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <div className="footer-heading">Company</div>
//             <ul className="footer-links">
//               {[
//                 ["About Us", "about"],
//                 ["Contact", "contact"],
//                 ["Careers", "about"],
//                 ["Blog", "about"],
//               ].map(([l, p]) => (
//                 <li key={l}>
//                   <button onClick={() => setPage(p)}>{l}</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <div className="footer-heading">Support</div>
//             <ul className="footer-links">
//               {[
//                 "Help Center",
//                 "Privacy Policy",
//                 "Terms of Service",
//                 "Refund Policy",
//               ].map((l) => (
//                 <li key={l}>
//                   <button>{l}</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <div>© 2025 Eventify. All rights reserved.</div>
//           <div>Made with ♥ for event lovers across India</div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ─── APP ROOT ─────────────────────────────────────────────────────────────────
// export default function App() {
//   const [page, setPage] = useState("home");
//   const [user, setUser] = useState(null);
//   const [modal, setModal] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [page]);

//   return (
//     <>
//       <style>{styles}</style>
//       <Navbar
//         page={page}
//         setPage={setPage}
//         user={user}
//         setUser={setUser}
//         setModal={setModal}
//       />

//       {modal && (
//         <AuthModal
//           type={modal}
//           setModal={setModal}
//           setUser={setUser}
//           setPage={setPage}
//         />
//       )}

//       {page === "home" && (
//         <HomePage
//           setPage={setPage}
//           setSelectedEvent={setSelectedEvent}
//           setModal={setModal}
//           user={user}
//         />
//       )}
//       {page === "events" && (
//         <EventsPage setPage={setPage} setSelectedEvent={setSelectedEvent} />
//       )}
//       {page === "event-detail" && (
//         <EventDetailPage
//           event={selectedEvent}
//           setPage={setPage}
//           user={user}
//           setModal={setModal}
//         />
//       )}
//       {page === "booking" && (
//         <BookingPage
//           event={selectedEvent}
//           setPage={setPage}
//           user={user}
//           setModal={setModal}
//         />
//       )}
//       {page === "account" && (
//         <UserDashboard user={user} setPage={setPage} setModal={setModal} />
//       )}
//       {page === "organizer" && (
//         <OrganizerDashboard user={user} setPage={setPage} />
//       )}
//       {page === "admin" && <AdminDashboard />}
//       {page === "how" && <HowItWorksPage />}
//       {page === "about" && <AboutPage />}
//       {page === "contact" && <ContactPage />}
//     </>
//   );
// }
// ============================================================
// EVENTIFY — Complete Frontend (React)
// Features: JWT Auth, Protected Routes, Dark/Light Mode,
//   Toast Notifications, QR Ticket, PDF Download, Role Dashboards,
//   Skeleton Loaders, Pagination, Razorpay, Cloudinary Upload,
//   Recharts Analytics, React Hook Form, Glassmorphism, Animations
// ============================================================

import {
  useState, useEffect, useContext, createContext,
  useRef, useCallback, useMemo
} from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { api, getToken, setToken, normalizeEvent, normalizeBooking } from "./api/client.js";

// ─────────────────────────────────────────────────────────────
// 1. GLOBAL STYLES
// ─────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --bg:#0a0a0f; --surface:#13131a; --surface2:#1c1c28; --surface3:#252535;
  --border:rgba(255,255,255,0.08); --border2:rgba(255,255,255,0.14);
  --accent:#e8b86d; --accent2:#c07d3a; --accent-glow:rgba(232,184,109,0.25);
  --red:#e85d5d; --green:#4ecb8d; --blue:#7ab0ff;
  --text:#f0ede8; --text2:#b8b4ae; --muted:#666;
  --font-display:'Playfair Display',serif;
  --font-body:'DM Sans',sans-serif;
  --radius:14px; --radius-sm:8px;
  --shadow:0 8px 40px rgba(0,0,0,0.6);
  --shadow-sm:0 2px 12px rgba(0,0,0,0.4);
  --glass:rgba(255,255,255,0.04);
  --glass-border:rgba(255,255,255,0.1);
  --transition:0.22s cubic-bezier(0.4,0,0.2,1);
}
.light-mode{
  --bg:#f5f3ee; --surface:#ffffff; --surface2:#f0ede8; --surface3:#e8e4de;
  --border:rgba(0,0,0,0.08); --border2:rgba(0,0,0,0.14);
  --text:#1a1a1a; --text2:#555; --muted:#999;
  --glass:rgba(255,255,255,0.7); --glass-border:rgba(0,0,0,0.08);
  --shadow:0 8px 40px rgba(0,0,0,0.12); --shadow-sm:0 2px 12px rgba(0,0,0,0.08);
}

body{
  background:var(--bg); color:var(--text);
  font-family:var(--font-body); font-size:15px; line-height:1.65;
  min-height:100vh; transition:background var(--transition),color var(--transition);
  scroll-behavior:smooth;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--surface);}
::-webkit-scrollbar-thumb{background:var(--accent2);border-radius:99px;}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 48px; height:68px;
  background:rgba(10,10,15,0.85);
  backdrop-filter:blur(24px) saturate(180%);
  border-bottom:1px solid var(--border);
  transition:all var(--transition);
}
.light-mode .nav{background:rgba(245,243,238,0.88);}
.nav-logo{
  font-family:var(--font-display);font-size:22px;font-weight:900;
  color:var(--accent);cursor:pointer;letter-spacing:-0.5px;
  display:flex;align-items:center;gap:8px;
}
.nav-logo span{
  background:var(--accent);color:#0a0a0f;
  padding:2px 10px;border-radius:6px;font-size:13px;font-weight:800;
}
.nav-links{display:flex;gap:8px;align-items:center;}
.nav-link{
  color:var(--text2);font-size:14px;font-weight:500;
  cursor:pointer;transition:color var(--transition);
  background:none;border:none;font-family:var(--font-body);
  padding:6px 12px;border-radius:7px;
}
.nav-link:hover{color:var(--text);background:var(--glass);}
.nav-link.active{color:var(--accent);background:rgba(232,184,109,0.1);}
.nav-actions{display:flex;gap:10px;align-items:center;}

/* ── BUTTONS ── */
.btn{
  padding:10px 22px;border-radius:var(--radius-sm);font-size:14px;
  font-weight:600;cursor:pointer;border:none;font-family:var(--font-body);
  transition:all var(--transition);display:inline-flex;align-items:center;gap:8px;
  position:relative;overflow:hidden;
}
.btn::after{
  content:'';position:absolute;inset:0;
  background:rgba(255,255,255,0);transition:background var(--transition);
}
.btn:hover::after{background:rgba(255,255,255,0.08);}
.btn-primary{background:var(--accent);color:#0a0a0f;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 24px var(--accent-glow);}
.btn-primary:active{transform:translateY(0);}
.btn-ghost{background:transparent;color:var(--text);border:1px solid var(--border2);}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
.btn-danger{background:var(--red);color:#fff;}
.btn-danger:hover{filter:brightness(1.15);transform:translateY(-1px);}
.btn-success{background:var(--green);color:#0a0a0f;}
.btn-success:hover{filter:brightness(1.1);transform:translateY(-1px);}
.btn-icon{background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);padding:8px;border-radius:8px;width:36px;height:36px;justify-content:center;}
.btn-icon:hover{color:var(--accent);border-color:var(--accent);}
.btn-lg{padding:14px 32px;font-size:16px;border-radius:10px;}
.btn-sm{padding:7px 14px;font-size:13px;}
.btn-xs{padding:4px 10px;font-size:12px;border-radius:6px;}

/* ── LAYOUT ── */
.page{padding-top:68px;min-height:100vh;}
.container{max-width:1200px;margin:0 auto;padding:0 24px;}
.section{padding:80px 0;}

/* ── HERO ── */
.hero{
  min-height:92vh;display:flex;align-items:center;position:relative;overflow:hidden;
  background:radial-gradient(ellipse 70% 60% at 20% 60%,rgba(232,184,109,0.1) 0%,transparent 70%),
             radial-gradient(ellipse 50% 50% at 80% 20%,rgba(78,203,141,0.06) 0%,transparent 60%);
}
.hero-bg-grid{
  position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
  background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);
}
.hero-content{position:relative;max-width:660px;}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(232,184,109,0.1);border:1px solid rgba(232,184,109,0.3);
  color:var(--accent);padding:6px 16px;border-radius:100px;
  font-size:12px;font-weight:600;margin-bottom:28px;letter-spacing:0.5px;
  animation:fadeUp 0.6s ease both;
}
.hero-title{
  font-family:var(--font-display);font-size:clamp(40px,6vw,78px);
  font-weight:900;line-height:1.04;margin-bottom:22px;letter-spacing:-2px;
  animation:fadeUp 0.7s 0.1s ease both;
}
.hero-title .accent{color:var(--accent);}
.hero-title .outline{-webkit-text-stroke:2px var(--accent);color:transparent;}
.hero-sub{
  font-size:18px;color:var(--text2);margin-bottom:40px;max-width:480px;line-height:1.7;
  animation:fadeUp 0.7s 0.2s ease both;
}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp 0.7s 0.3s ease both;}
.hero-stats{
  display:flex;gap:48px;margin-top:64px;padding-top:36px;
  border-top:1px solid var(--border);animation:fadeUp 0.7s 0.4s ease both;
}
.stat-num{font-family:var(--font-display);font-size:34px;font-weight:900;color:var(--accent);}
.stat-label{color:var(--muted);font-size:12px;margin-top:2px;}
.hero-float{
  position:absolute;right:-40px;top:50%;transform:translateY(-50%);
  width:460px;height:460px;border-radius:50%;
  background:radial-gradient(circle,rgba(232,184,109,0.07) 0%,transparent 70%);
  pointer-events:none;animation:pulse 4s ease-in-out infinite;
}
@keyframes pulse{0%,100%{transform:translateY(-50%) scale(1);}50%{transform:translateY(-50%) scale(1.05);}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes slideIn{from{transform:translateX(110%);}to{transform:translateX(0);}}
@keyframes slideOut{from{transform:translateX(0);}to{transform:translateX(110%);}}
@keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}

/* ── SEARCH ── */
.search-bar{
  display:flex;gap:10px;background:var(--surface);
  border:1px solid var(--border2);border-radius:var(--radius);
  padding:8px 8px 8px 18px;max-width:600px;
  box-shadow:var(--shadow-sm);transition:border-color var(--transition);
}
.search-bar:focus-within{border-color:var(--accent);}
.search-bar input{flex:1;background:none;border:none;outline:none;color:var(--text);font-family:var(--font-body);font-size:15px;}
.search-bar input::placeholder{color:var(--muted);}

/* ── CARDS ── */
.grid-3{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:24px;}
.grid-2{display:grid;grid-template-columns:repeat(auto-fill,minmax(460px,1fr));gap:24px;}
.card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);overflow:hidden;
  transition:transform var(--transition),border-color var(--transition),box-shadow var(--transition);
  cursor:pointer;position:relative;
}
.card::before{
  content:'';position:absolute;inset:0;border-radius:var(--radius);
  background:linear-gradient(135deg,rgba(232,184,109,0.04),transparent);
  opacity:0;transition:opacity var(--transition);
}
.card:hover{transform:translateY(-5px);border-color:rgba(232,184,109,0.35);box-shadow:var(--shadow);}
.card:hover::before{opacity:1;}
.card-img{
  width:100%;height:200px;
  background:linear-gradient(135deg,var(--surface2),var(--surface3));
  display:flex;align-items:center;justify-content:center;font-size:56px;
  position:relative;overflow:hidden;
}
.card-img::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.5));
}
.card-body{padding:20px;}
.card-tag{
  display:inline-block;background:rgba(232,184,109,0.12);color:var(--accent);
  padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;
  text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px;
}
.card-title{font-family:var(--font-display);font-size:19px;font-weight:700;margin-bottom:8px;line-height:1.3;}
.card-meta{display:flex;gap:14px;color:var(--text2);font-size:12px;margin-bottom:14px;flex-wrap:wrap;}
.card-meta span{display:flex;align-items:center;gap:4px;}
.card-footer{display:flex;justify-content:space-between;align-items:center;}
.price{font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--accent);}

/* ── GLASS CARD ── */
.glass-card{
  background:var(--glass);backdrop-filter:blur(20px);
  border:1px solid var(--glass-border);border-radius:var(--radius);
  padding:24px;
}

/* ── SECTION HEADERS ── */
.section-header{text-align:center;margin-bottom:60px;}
.section-tag{display:inline-block;color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;margin-bottom:14px;}
.section-title{font-family:var(--font-display);font-size:clamp(26px,4vw,44px);font-weight:900;letter-spacing:-1px;margin-bottom:14px;}
.section-sub{color:var(--text2);max-width:520px;margin:0 auto;}

/* ── FORMS ── */
.form-group{margin-bottom:20px;}
.form-label{display:block;font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.8px;}
.form-input{
  width:100%;padding:12px 16px;
  background:var(--surface2);border:1px solid var(--border);
  border-radius:var(--radius-sm);color:var(--text);
  font-family:var(--font-body);font-size:15px;outline:none;
  transition:border-color var(--transition),box-shadow var(--transition);
}
.form-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow);}
.form-input::placeholder{color:var(--muted);}
.form-input.error{border-color:var(--red);}
.form-error{color:var(--red);font-size:12px;margin-top:5px;}
select.form-input option{background:var(--surface2);}
textarea.form-input{resize:vertical;min-height:100px;}

/* ── MODAL ── */
.modal-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,0.82);
  backdrop-filter:blur(12px);z-index:300;
  display:flex;align-items:center;justify-content:center;padding:24px;
}
.modal{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:20px;padding:40px;width:100%;max-width:480px;
  max-height:92vh;overflow-y:auto;
  animation:fadeUp 0.25s ease;
}
.modal-title{font-family:var(--font-display);font-size:28px;font-weight:900;margin-bottom:6px;}
.modal-sub{color:var(--text2);margin-bottom:28px;font-size:14px;}

/* ── TABS ── */
.tabs{display:flex;gap:4px;background:var(--surface2);padding:4px;border-radius:10px;margin-bottom:28px;}
.tab{
  flex:1;padding:9px 14px;border-radius:7px;border:none;
  background:none;color:var(--text2);font-family:var(--font-body);
  font-size:13px;font-weight:600;cursor:pointer;
  transition:all var(--transition);text-align:center;
}
.tab.active{background:var(--accent);color:#0a0a0f;}
.tab:not(.active):hover{background:var(--glass);color:var(--text);}

/* ── FILTER TAGS ── */
.filter-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;}
.filter-tag{
  padding:7px 16px;border-radius:100px;border:1px solid var(--border);
  background:none;color:var(--text2);font-size:13px;font-weight:500;
  cursor:pointer;transition:all var(--transition);font-family:var(--font-body);
}
.filter-tag:hover,.filter-tag.active{background:var(--accent);color:#0a0a0f;border-color:var(--accent);}

/* ── TABLE ── */
table{width:100%;border-collapse:collapse;}
th{text-align:left;padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--muted);border-bottom:1px solid var(--border);}
td{padding:14px 16px;border-bottom:1px solid var(--border);font-size:14px;}
tr:last-child td{border-bottom:none;}
tr:hover td{background:var(--glass);}
.table-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;}

/* ── BADGE ── */
.badge{display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:0.3px;}
.badge-success{background:rgba(78,203,141,0.15);color:var(--green);}
.badge-warn{background:rgba(232,184,109,0.15);color:var(--accent);}
.badge-danger{background:rgba(232,93,93,0.15);color:var(--red);}
.badge-info{background:rgba(122,176,255,0.15);color:var(--blue);}

/* ── ALERT ── */
.alert{padding:13px 17px;border-radius:10px;font-size:14px;margin-bottom:18px;display:flex;align-items:center;gap:10px;}
.alert-success{background:rgba(78,203,141,0.1);border:1px solid rgba(78,203,141,0.3);color:var(--green);}
.alert-error{background:rgba(232,93,93,0.1);border:1px solid rgba(232,93,93,0.3);color:var(--red);}
.alert-warn{background:rgba(232,184,109,0.1);border:1px solid rgba(232,184,109,0.3);color:var(--accent);}

/* ── TOAST ── */
.toast-container{position:fixed;bottom:24px;right:24px;z-index:1000;display:flex;flex-direction:column;gap:10px;pointer-events:none;}
.toast{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:12px;padding:14px 18px;min-width:280px;max-width:380px;
  box-shadow:var(--shadow);display:flex;align-items:center;gap:12px;
  pointer-events:all;font-size:14px;
  animation:slideIn 0.3s ease;
}
.toast.removing{animation:slideOut 0.3s ease forwards;}
.toast-icon{font-size:20px;flex-shrink:0;}
.toast-text{flex:1;}
.toast-title{font-weight:700;margin-bottom:2px;}
.toast-msg{color:var(--text2);font-size:13px;}
.toast-close{color:var(--muted);cursor:pointer;padding:2px;border-radius:4px;transition:color var(--transition);background:none;border:none;font-size:16px;}
.toast-close:hover{color:var(--text);}
.toast.success{border-left:3px solid var(--green);}
.toast.error{border-left:3px solid var(--red);}
.toast.info{border-left:3px solid var(--blue);}
.toast.warning{border-left:3px solid var(--accent);}

/* ── SKELETON ── */
.skeleton{
  background:linear-gradient(90deg,var(--surface2) 25%,var(--surface3) 50%,var(--surface2) 75%);
  background-size:200% 100%;animation:shimmer 1.5s infinite;
  border-radius:var(--radius-sm);
}
.skel-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;}
.skel-img{height:200px;}
.skel-body{padding:20px;}
.skel-line{height:14px;margin-bottom:10px;}
.skel-line.short{width:60%;}
.skel-line.medium{width:80%;}
.skel-line.full{width:100%;}

/* ── STEPS ── */
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;}
.step{text-align:center;}
.step-num{
  width:56px;height:56px;border-radius:50%;
  background:rgba(232,184,109,0.1);border:2px solid rgba(232,184,109,0.35);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--font-display);font-size:22px;font-weight:900;
  color:var(--accent);margin:0 auto 18px;
}
.step-title{font-weight:700;margin-bottom:8px;}
.step-desc{color:var(--text2);font-size:14px;}

/* ── DASHBOARD ── */
.dash-grid{display:grid;grid-template-columns:250px 1fr;gap:0;min-height:calc(100vh - 68px);}
.dash-sidebar{
  background:var(--surface);border-right:1px solid var(--border);
  padding:28px 0;position:sticky;top:68px;height:calc(100vh - 68px);overflow-y:auto;
}
.dash-nav-item{
  display:flex;align-items:center;gap:12px;padding:12px 24px;
  cursor:pointer;font-size:14px;font-weight:500;color:var(--text2);
  transition:all var(--transition);border:none;background:none;
  font-family:var(--font-body);width:100%;text-align:left;border-radius:0;
}
.dash-nav-item:hover{color:var(--text);background:var(--glass);}
.dash-nav-item.active{color:var(--accent);background:rgba(232,184,109,0.08);border-right:3px solid var(--accent);}
.dash-content{padding:36px;}
.stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:18px;margin-bottom:32px;}
.stat-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);padding:22px;position:relative;overflow:hidden;
  transition:transform var(--transition),box-shadow var(--transition);
}
.stat-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-sm);}
.stat-card::before{content:'';position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:rgba(232,184,109,0.06);}
.stat-card-icon{font-size:26px;margin-bottom:12px;opacity:0.9;}
.stat-card-num{font-family:var(--font-display);font-size:30px;font-weight:900;color:var(--accent);}
.stat-card-label{color:var(--text2);font-size:12px;margin-top:4px;}
.stat-card-trend{font-size:11px;color:var(--green);margin-top:6px;}

/* ── PROGRESS ── */
.prog-bar{height:5px;background:var(--surface2);border-radius:99px;overflow:hidden;}
.prog-fill{height:100%;border-radius:99px;transition:width 0.6s ease;}

/* ── PAGINATION ── */
.pagination{display:flex;gap:6px;align-items:center;justify-content:center;margin-top:36px;}
.page-btn{
  width:36px;height:36px;border-radius:8px;border:1px solid var(--border);
  background:none;color:var(--text2);font-size:14px;cursor:pointer;
  font-family:var(--font-body);transition:all var(--transition);display:flex;align-items:center;justify-content:center;
}
.page-btn:hover{border-color:var(--accent);color:var(--accent);}
.page-btn.active{background:var(--accent);border-color:var(--accent);color:#0a0a0f;font-weight:700;}
.page-btn:disabled{opacity:0.35;cursor:not-allowed;}

/* ── MISC ── */
.divider{height:1px;background:var(--border);margin:28px 0;}
.text-accent{color:var(--accent);}.text-muted{color:var(--muted);}.text-center{text-align:center;}
.fw-bold{font-weight:700;}.fw-900{font-weight:900;}
.mt-8{margin-top:8px;}.mt-16{margin-top:16px;}.mt-24{margin-top:24px;}.mt-32{margin-top:32px;}
.mb-8{margin-bottom:8px;}.mb-16{margin-bottom:16px;}.mb-24{margin-bottom:24px;}
.flex{display:flex;}.flex-between{display:flex;justify-content:space-between;align-items:center;}
.flex-center{display:flex;align-items:center;justify-content:center;}.gap-8{gap:8px;}.gap-12{gap:12px;}.gap-16{gap:16px;}
.detail-grid{display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:start;}
.sticky-card{position:sticky;top:84px;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;}
.info-row{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);font-size:14px;}
.info-row:last-child{border-bottom:none;}
.info-icon{font-size:18px;width:24px;flex-shrink:0;margin-top:1px;}
.info-label{color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;}
.avatar{width:40px;height:40px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:800;color:#0a0a0f;font-size:15px;flex-shrink:0;}
.org-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(78,203,141,0.1);border:1px solid rgba(78,203,141,0.3);color:var(--green);padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;}

/* ── QR BLOCK ── */
.qr-block{
  background:var(--surface2);border:1px solid var(--border);
  border-radius:12px;padding:20px;text-align:center;font-family:monospace;
}
.qr-rows{line-height:1.1;font-size:clamp(18px,3vw,28px);letter-spacing:-2px;color:var(--text);}

/* ── UPLOAD DROP ── */
.upload-drop{
  border:2px dashed var(--border2);border-radius:var(--radius);
  padding:40px 24px;text-align:center;cursor:pointer;
  transition:border-color var(--transition),background var(--transition);
}
.upload-drop:hover,.upload-drop.drag-over{border-color:var(--accent);background:rgba(232,184,109,0.04);}

/* ── RECHARTS OVERRIDE ── */
.recharts-tooltip-wrapper .recharts-default-tooltip{background:var(--surface) !important;border:1px solid var(--border) !important;border-radius:8px !important;color:var(--text) !important;}
.recharts-text{fill:var(--text2) !important;}
.recharts-cartesian-grid line{stroke:var(--border) !important;}

/* ── FOOTER ── */
footer{border-top:1px solid var(--border);padding:60px 0 32px;background:var(--surface);}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px;}
.footer-brand{font-family:var(--font-display);font-size:22px;font-weight:900;color:var(--accent);margin-bottom:14px;}
.footer-desc{color:var(--text2);font-size:14px;line-height:1.7;}
.footer-heading{font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:18px;color:var(--text);}
.footer-links{list-style:none;}
.footer-links li{margin-bottom:10px;}
.footer-links button{background:none;border:none;color:var(--text2);font-size:14px;cursor:pointer;font-family:var(--font-body);padding:0;transition:color var(--transition);}
.footer-links button:hover{color:var(--accent);}
.footer-bottom{border-top:1px solid var(--border);padding-top:22px;display:flex;justify-content:space-between;color:var(--muted);font-size:13px;}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .nav{padding:0 20px;}
  .nav-links{display:none;}
  .detail-grid{grid-template-columns:1fr;}
  .footer-grid{grid-template-columns:1fr 1fr;}
  .dash-grid{grid-template-columns:1fr;}
  .dash-sidebar{display:none;}
  .hero-title{font-size:clamp(32px,8vw,54px);}
}
@media(max-width:600px){
  .grid-3,.grid-2{grid-template-columns:1fr;}
  .stats-row{grid-template-columns:1fr 1fr;}
  .section{padding:48px 0;}
  .hero-stats{gap:24px;}
  .footer-grid{grid-template-columns:1fr;}
}

/* ── DARK MODE TOGGLE ── */
.mode-toggle{
  width:46px;height:26px;border-radius:13px;border:1px solid var(--border2);
  background:var(--surface2);cursor:pointer;position:relative;transition:background var(--transition);display:flex;align-items:center;padding:3px;
}
.mode-toggle .knob{
  width:18px;height:18px;border-radius:50%;background:var(--accent);
  transition:transform var(--transition);font-size:11px;display:flex;align-items:center;justify-content:center;
}
.light-mode .mode-toggle .knob{transform:translateX(20px);}
`;

// ─────────────────────────────────────────────────────────────
// 2. CONTEXTS
// ─────────────────────────────────────────────────────────────
const AuthCtx   = createContext(null);
const ToastCtx  = createContext(null);
const ThemeCtx  = createContext(null);
const EventCtx  = createContext(null);

// ─────────────────────────────────────────────────────────────
// 3. MOCK DATA
// ─────────────────────────────────────────────────────────────
const SEED_EVENTS = [
  { id:1,  title:"Mumbai Music Festival",       category:"Music",         date:"Dec 20, 2025", time:"6:00 PM",  location:"BKC, Mumbai",                  price:1499, emoji:"🎵", seats:320, booked:210 },
  { id:2,  title:"TechConf India 2025",          category:"Tech",          date:"Jan 15, 2026", time:"9:00 AM",  location:"Bengaluru Convention Centre",  price:2999, emoji:"💻", seats:500, booked:340 },
  { id:3,  title:"Comedy Night Special",         category:"Entertainment", date:"Dec 28, 2025", time:"8:00 PM",  location:"Nehru Centre, Mumbai",         price:799,  emoji:"😂", seats:200, booked:180 },
  { id:4,  title:"Art & Culture Expo",           category:"Arts",          date:"Jan 5, 2026",  time:"11:00 AM", location:"NGMA, New Delhi",              price:499,  emoji:"🎨", seats:400, booked:120 },
  { id:5,  title:"Startup Summit 2025",          category:"Business",      date:"Dec 22, 2025", time:"10:00 AM", location:"Hyderabad Int. Convention",    price:3499, emoji:"🚀", seats:600, booked:450 },
  { id:6,  title:"Yoga & Wellness Retreat",      category:"Health",        date:"Jan 10, 2026", time:"7:00 AM",  location:"Rishikesh",                    price:1999, emoji:"🧘", seats:100, booked:60  },
  { id:7,  title:"Bangalore Social Mixer",       category:"Social",        date:"Dec 24, 2025", time:"7:00 PM",  location:"Indiranagar, Bengaluru",       price:599,  emoji:"🥂", seats:150, booked:98  },
  { id:8,  title:"Delhi Speed Networking",       category:"Social",        date:"Jan 3, 2026",  time:"6:30 PM",  location:"Connaught Place, Delhi",       price:799,  emoji:"🤝", seats:120, booked:74  },
  { id:9,  title:"Mumbai Rooftop Social",        category:"Social",        date:"Jan 8, 2026",  time:"8:00 PM",  location:"Lower Parel, Mumbai",          price:899,  emoji:"🌆", seats:80,  booked:61  },
  { id:10, title:"Photography Masterclass",      category:"Arts",          date:"Jan 12, 2026", time:"10:00 AM", location:"Colaba, Mumbai",               price:2499, emoji:"📸", seats:60,  booked:44  },
  { id:11, title:"Blockchain Dev Summit",        category:"Tech",          date:"Jan 20, 2026", time:"9:00 AM",  location:"Whitefield, Bengaluru",        price:3999, emoji:"⛓️", seats:400, booked:220 },
  { id:12, title:"Fusion Dance Night",           category:"Entertainment", date:"Dec 30, 2025", time:"9:00 PM",  location:"Phoenix Mall, Pune",           price:1299, emoji:"💃", seats:250, booked:195 },
];

const CATEGORIES = ["All","Music","Tech","Entertainment","Arts","Business","Health","Social"];

const USER_BOOKINGS = [
  { id:"TKT-001", eventId:1, event:"Mumbai Music Festival",  emoji:"🎵", date:"Dec 20, 2025", tickets:2, total:2998, status:"Confirmed", seat:"A12, A13" },
  { id:"TKT-002", eventId:2, event:"TechConf India 2025",    emoji:"💻", date:"Jan 15, 2026", tickets:1, total:2999, status:"Confirmed", seat:"B07" },
  { id:"TKT-003", eventId:3, event:"Comedy Night Special",   emoji:"😂", date:"Dec 28, 2025", tickets:3, total:2397, status:"Pending",   seat:"C01–C03" },
  { id:"TKT-004", eventId:5, event:"Startup Summit 2025",    emoji:"🚀", date:"Dec 22, 2025", tickets:1, total:3499, status:"Cancelled", seat:"D05" },
];

const ATTENDEES = [
  { name:"Priya Sharma",  email:"priya@email.com",  event:"Music Festival",  tickets:2, date:"Dec 1",  city:"Mumbai",    status:"Confirmed" },
  { name:"Rahul Mehta",   email:"rahul@email.com",  event:"TechConf",        tickets:1, date:"Dec 3",  city:"Bengaluru", status:"Confirmed" },
  { name:"Anita Kumar",   email:"anita@email.com",  event:"Comedy Night",    tickets:3, date:"Dec 5",  city:"Pune",      status:"Pending"   },
  { name:"Vikram Patel",  email:"vikram@email.com", event:"Startup Summit",  tickets:2, date:"Dec 6",  city:"Hyderabad", status:"Confirmed" },
  { name:"Sneha Rao",     email:"sneha@email.com",  event:"Art & Culture",   tickets:1, date:"Dec 7",  city:"Delhi",     status:"Confirmed" },
  { name:"Karan Singh",   email:"karan@email.com",  event:"Social Mixer",    tickets:2, date:"Dec 8",  city:"Bengaluru", status:"Confirmed" },
];

const ALL_USERS = [
  { name:"Priya Sharma",  email:"priya@email.com",    role:"User",      joined:"Dec 1",  status:"Active",  bookings:3 },
  { name:"Rahul Mehta",   email:"rahul@email.com",    role:"Organizer", joined:"Nov 20", status:"Active",  bookings:0 },
  { name:"Admin Test",    email:"admin@eventify.in",  role:"Admin",     joined:"Jan 1",  status:"Active",  bookings:0 },
  { name:"Anita Kumar",   email:"anita@email.com",    role:"User",      joined:"Dec 5",  status:"Active",  bookings:2 },
  { name:"Suspicious X",  email:"sus@x.com",          role:"User",      joined:"Dec 10", status:"Flagged", bookings:7 },
  { name:"Vikram Patel",  email:"vikram@email.com",   role:"Organizer", joined:"Nov 10", status:"Active",  bookings:0 },
];

const TRANSACTIONS = [
  { id:"TXN-001", user:"Priya Sharma", event:"Music Festival", amount:2998, method:"UPI",         status:"Success",  date:"Dec 1" },
  { id:"TXN-002", user:"Rahul Mehta",  event:"TechConf",       amount:2999, method:"Card",        status:"Success",  date:"Dec 3" },
  { id:"TXN-003", user:"Anita Kumar",  event:"Comedy Night",   amount:2397, method:"UPI",         status:"Pending",  date:"Dec 5" },
  { id:"TXN-004", user:"Vikram Patel", event:"Social Mixer",   amount:599,  method:"Net Banking", status:"Success",  date:"Dec 6" },
  { id:"TXN-005", user:"Sneha Rao",    event:"Art & Culture",  amount:499,  method:"Wallet",      status:"Refunded", date:"Dec 7" },
];

const ORGANIZERS_LIST = [
  { name:"Elite Events India", events:6, revenue:"₹4.2L", attendees:1240, status:"Verified",  since:"Jan 2024" },
  { name:"Harmony Events",     events:2, revenue:"₹1.1L", attendees:320,  status:"Verified",  since:"Mar 2024" },
  { name:"StarLight Org",      events:0, revenue:"₹0",    attendees:0,    status:"Pending",   since:"Dec 2025" },
  { name:"TechWorld India",    events:3, revenue:"₹2.8L", attendees:780,  status:"Verified",  since:"Jun 2024" },
  { name:"ArtHouse Mumbai",    events:1, revenue:"₹0.6L", attendees:150,  status:"Suspended", since:"Aug 2024" },
];

// chart data
const REVENUE_DATA = [
  {month:"Jul",revenue:28},{month:"Aug",revenue:32},{month:"Sep",revenue:35},
  {month:"Oct",revenue:41},{month:"Nov",revenue:38},{month:"Dec",revenue:48},
];
const BOOKING_DATA = [
  {day:"Mon",bookings:35},{day:"Tue",bookings:60},{day:"Wed",bookings:45},
  {day:"Thu",bookings:80},{day:"Fri",bookings:55},{day:"Sat",bookings:90},{day:"Sun",bookings:40},
];
const CATEGORY_DATA = [
  {name:"Music",value:30},{name:"Tech",value:22},{name:"Arts",value:16},
  {name:"Business",value:12},{name:"Social",value:12},{name:"Health",value:8},
];
const PIE_COLORS = ["#e8b86d","#4ecb8d","#7ab0ff","#e85d5d","#c07d3a","#888"];

// ─────────────────────────────────────────────────────────────
// 4. HOOKS & UTILITIES
// ─────────────────────────────────────────────────────────────

// Simple React Hook Form substitute
function useForm(defaults = {}) {
  const [values, setValues]   = useState(defaults);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const register = (name, rules = {}) => ({
    value: values[name] ?? "",
    onChange: (e) => {
      const v = e.target.value;
      setValues(p => ({ ...p, [name]: v }));
      if (touched[name]) validate(name, v, rules);
    },
    onBlur: () => {
      setTouched(p => ({ ...p, [name]: true }));
      validate(name, values[name], rules);
    },
    className: `form-input${errors[name] ? " error" : ""}`,
  });

  const validate = (name, value, rules) => {
    let err = "";
    if (rules.required && !value?.toString().trim()) err = rules.required === true ? "This field is required" : rules.required;
    if (!err && rules.minLength && value?.length < rules.minLength) err = `Minimum ${rules.minLength} characters`;
    if (!err && rules.pattern && !rules.pattern.value.test(value)) err = rules.pattern.message;
    setErrors(p => ({ ...p, [name]: err }));
    return !err;
  };

  const validateAll = (schema) => {
    let valid = true;
    const newErrors = {};
    Object.entries(schema).forEach(([name, rules]) => {
      let err = "";
      const v = values[name];
      if (rules.required && !v?.toString().trim()) err = rules.required === true ? "Required" : rules.required;
      if (!err && rules.minLength && v?.length < rules.minLength) err = `Min ${rules.minLength} chars`;
      if (!err && rules.pattern && !rules.pattern.value.test(v)) err = rules.pattern.message;
      if (err) { newErrors[name] = err; valid = false; }
    });
    setErrors(newErrors);
    return valid;
  };

  const reset = () => { setValues(defaults); setErrors({}); setTouched({}); };
  const setValue = (name, val) => setValues(p => ({ ...p, [name]: val }));

  return { values, errors, register, validateAll, reset, setValue };
}

// Pagination hook
function usePagination(items, perPage = 6) {
  const [page, setPage] = useState(1);
  const total = Math.ceil(items.length / perPage);
  const slice = items.slice((page - 1) * perPage, page * perPage);
  return { page, setPage, total, slice };
}

// ─────────────────────────────────────────────────────────────
// 5. PROVIDER COMPONENTS
// ─────────────────────────────────────────────────────────────

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((title, msg = "", type = "info") => {
    const id = Date.now();
    setToasts(p => [...p, { id, title, msg, type }]);
    setTimeout(() => remove(id), 4000);
  }, []);
  const remove = useCallback((id) => {
    setToasts(p => p.map(t => t.id === id ? { ...t, removing: true } : t));
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 300);
  }, []);
  const icons = { success:"✅", error:"❌", info:"ℹ️", warning:"⚠️" };
  return (
    <ToastCtx.Provider value={{ add }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}${t.removing ? " removing" : ""}`}>
            <span className="toast-icon">{icons[t.type]}</span>
            <div className="toast-text">
              <div className="toast-title">{t.title}</div>
              {t.msg && <div className="toast-msg">{t.msg}</div>}
            </div>
            <button className="toast-close" onClick={() => remove(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setTokenState] = useState(null);
  const toast = useContext(ToastCtx);

  const refreshUser = useCallback(async () => {
    const t = getToken();
    if (!t) { setUser(null); setTokenState(null); return null; }
    try {
      const res = await api("/auth/me");
      const u = res.data?.user;
      if (u) {
        const normalized = {
          id: u.id?.toString?.() ?? u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          phone: u.phone || "",
          city: u.city || "",
          bio: u.bio || "",
          avatarUrl: u.avatarUrl || "",
          dateOfBirth: u.dateOfBirth,
          notificationPrefs: u.notificationPrefs || {},
          accountStatus: u.accountStatus,
          createdAt: u.createdAt,
        };
        setUser(normalized);
        setTokenState(t);
        return normalized;
      }
    } catch {
      setToken(null);
      setUser(null);
      setTokenState(null);
    }
    return null;
  }, []);

  useEffect(() => {
    const t = getToken();
    if (t) setTokenState(t);
    refreshUser();
  }, [refreshUser]);

  const login = ({ token: t, user: u }) => {
    setToken(t);
    setTokenState(t);
    setUser({
      id: u.id?.toString?.() ?? u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone || "",
      city: u.city || "",
      bio: u.bio || "",
      avatarUrl: u.avatarUrl || "",
      notificationPrefs: u.notificationPrefs || {},
    });
    toast?.add("Logged in!", `Welcome back, ${u.name.split(" ")[0]}`, "success");
  };

  const logout = () => {
    setUser(null);
    setTokenState(null);
    setToken(null);
    toast?.add("Logged out", "See you next time!", "info");
  };

  const isAuth = !!user;
  return (
    <AuthCtx.Provider value={{ user, token, login, logout, isAuth, refreshUser, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
}

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const toggle = () => setDark(d => !d);
  useEffect(() => {
    document.body.classList.toggle("light-mode", !dark);
  }, [dark]);
  return <ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>;
}

function EventProvider({ children }) {
  const { token, user } = useContext(AuthCtx);
  const [events, setEvents] = useState([]);
  const [organizerEvents, setOrganizerEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [organizerLoading, setOrganizerLoading] = useState(false);

  const refreshEvents = useCallback(async () => {
    setEventsLoading(true);
    try {
      const res = await api("/events?limit=100&page=1", { skipAuth: true });
      const list = res.data?.events || [];
      setEvents(list.map(normalizeEvent));
    } catch {
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  }, []);

  const refreshOrganizerEvents = useCallback(async () => {
    if (!token || (user?.role !== "organizer" && user?.role !== "admin")) {
      setOrganizerEvents([]);
      return;
    }
    setOrganizerLoading(true);
    try {
      const res = await api("/events/organizer/mine");
      const list = res.data?.events || [];
      setOrganizerEvents(list.map(normalizeEvent));
    } catch {
      setOrganizerEvents([]);
    } finally {
      setOrganizerLoading(false);
    }
  }, [token, user?.role]);

  useEffect(() => { refreshEvents(); }, []);
  useEffect(() => { refreshOrganizerEvents(); }, [token, user?.role]);

  const addEvent = async (payload) => {
    const body = {
      title: payload.title,
      description: payload.description || "",
      category: payload.category,
      date: payload.date,
      time: payload.time,
      location: payload.location,
      price: +payload.price,
      emoji: payload.emoji || "🎪",
      seats: +payload.seats,
      orgStatus: payload.orgStatus || "Active",
      bannerUrl: payload.bannerUrl || "",
    };
    await api("/events", { method: "POST", body });
    await refreshEvents();
    await refreshOrganizerEvents();
  };

  const updateEvent = async (id, data) => {
    await api(`/events/${id}`, { method: "PATCH", body: data });
    await refreshEvents();
    await refreshOrganizerEvents();
  };

  const deleteEvent = async (id) => {
    await api(`/events/${id}`, { method: "DELETE" });
    await refreshEvents();
    await refreshOrganizerEvents();
  };

  return (
    <EventCtx.Provider
      value={{
        events,
        organizerEvents,
        eventsLoading,
        organizerLoading,
        refreshEvents,
        refreshOrganizerEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventCtx.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────

const Badge = ({ status }) => {
  const map = {
    Confirmed:"badge-success",Active:"badge-success",Success:"badge-success",
    Verified:"badge-success",Approved:"badge-success",
    Pending:"badge-warn",Flagged:"badge-danger",Cancelled:"badge-danger",
    Suspended:"badge-danger",Refunded:"badge-info",Paused:"badge-warn",Draft:"badge-info",
  };
  return <span className={`badge ${map[status] || "badge-warn"}`}>{status}</span>;
};

const StatCard = ({ num, label, icon, trend }) => (
  <div className="stat-card">
    <div className="stat-card-icon">{icon}</div>
    <div className="stat-card-num">{num}</div>
    <div className="stat-card-label">{label}</div>
    {trend && <div className="stat-card-trend">↑ {trend}</div>}
  </div>
);

const MiniBar = ({ pct, color = "var(--accent)" }) => (
  <div style={{ width:80, height:6, background:"var(--surface2)", borderRadius:3 }}>
    <div style={{ width:pct+"%", height:"100%", background:color, borderRadius:3, transition:"width 0.6s ease" }} />
  </div>
);

function Sidebar({ title, subtitle, subtitleColor, items, active, setActive }) {
  return (
    <div className="dash-sidebar">
      <div style={{ padding:"0 24px 22px", borderBottom:"1px solid var(--border)", marginBottom:8 }}>
        <div style={{ fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:1.5, color:"var(--muted)" }}>{title}</div>
        {subtitle && <div style={{ marginTop:4, fontSize:12, color:subtitleColor || "var(--muted)" }}>{subtitle}</div>}
      </div>
      {items.map(item => (
        <button key={item.id} className={`dash-nav-item${active===item.id?" active":""}`} onClick={() => setActive(item.id)}>
          <span style={{ fontSize:16 }}>{item.icon}</span>
          <span>{item.label}</span>
          {item.badge && <span style={{ marginLeft:"auto", background:"var(--red)", color:"#fff", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:100 }}>{item.badge}</span>}
        </button>
      ))}
    </div>
  );
}

// QR Code Generator (ASCII-art style)
function QRCode({ value, size = 140 }) {
  const rows = [
    "▓▓▓▓▓▓▓ ▓ ▓▓▓▓▓▓▓",
    "▓     ▓ ▓ ▓     ▓",
    "▓ ▓▓▓ ▓ ▓ ▓ ▓▓▓ ▓",
    "▓ ▓▓▓ ▓ ▓ ▓ ▓▓▓ ▓",
    "▓     ▓   ▓     ▓",
    "▓▓▓▓▓▓▓ ▓ ▓▓▓▓▓▓▓",
    "        ▓        ",
    "▓▓ ▓ ▓▓▓ ▓▓▓ ▓▓▓",
    "▓▓▓▓▓▓▓ ▓▓ ▓▓▓▓▓",
    "        ▓ ▓ ▓▓▓▓",
    "▓▓▓▓▓▓▓ ▓▓▓ ▓▓▓▓",
    "▓     ▓ ▓ ▓ ▓▓▓▓",
    "▓ ▓▓▓ ▓ ▓▓▓ ▓▓▓▓",
    "▓     ▓  ▓ ▓ ▓▓▓",
    "▓▓▓▓▓▓▓ ▓▓▓ ▓▓▓▓",
  ];
  return (
    <div style={{ background:"#fff", padding:12, borderRadius:10, display:"inline-block" }}>
      <div style={{ fontFamily:"monospace", fontSize:9, lineHeight:1.15, color:"#111", letterSpacing:1, whiteSpace:"pre" }}>
        {rows.map((r,i) => <div key={i}>{r}</div>)}
      </div>
      <div style={{ fontSize:9, color:"#555", textAlign:"center", marginTop:6, fontFamily:"monospace" }}>{value}</div>
    </div>
  );
}

// Skeleton loader for event cards
function SkeletonCard() {
  return (
    <div className="skel-card">
      <div className="skeleton skel-img" />
      <div className="skel-body">
        <div className="skeleton skel-line short" />
        <div className="skeleton skel-line medium" style={{ height:18, marginBottom:14 }} />
        <div className="skeleton skel-line full" />
        <div className="skeleton skel-line full" />
        <div className="skeleton skel-line short" style={{ marginTop:16 }} />
      </div>
    </div>
  );
}

// PDF Ticket "generator" — opens printable page
function generatePDFTicket(booking, user) {
  const html = `
    <html><head><title>Ticket ${booking.id}</title>
    <style>
      body{font-family:sans-serif;background:#0a0a0f;color:#f0ede8;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
      .ticket{background:#13131a;border:2px solid #e8b86d;border-radius:16px;padding:40px;max-width:500px;width:100%;}
      h1{font-size:28px;color:#e8b86d;margin-bottom:4px;}
      .row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);}
      .label{color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;}
      .val{font-weight:700;}
      .qr{text-align:center;margin-top:24px;font-family:monospace;font-size:14px;line-height:1.4;color:#e8b86d;}
    </style></head>
    <body><div class="ticket">
      <h1>${booking.emoji} ${booking.event}</h1>
      <p style="color:#888;margin-bottom:24px">Eventify Digital Ticket</p>
      ${[["Booking ID",booking.id],["Attendee",user?.name||"Guest"],["Date",booking.date],
         ["Seats",booking.seat],["Tickets",booking.tickets],
         ["Total Paid","₹"+booking.total.toLocaleString()],["Status",booking.status]].map(([l,v])=>`
        <div class="row"><span class="label">${l}</span><span class="val">${v}</span></div>`).join("")}
      <div class="qr">
        <div>▓▓▓▓▓▓▓ ▓ ▓▓▓▓▓▓▓</div>
        <div>▓     ▓ ▓ ▓     ▓</div>
        <div>▓ ▓▓▓ ▓   ▓ ▓▓▓ ▓</div>
        <div>▓▓▓▓▓▓▓ ▓ ▓▓▓▓▓▓▓</div>
        <p style="font-size:11px;color:#888;margin-top:8px">${booking.id}</p>
      </div>
    </div></body></html>`;
  const w = window.open("","_blank");
  w.document.write(html);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

// Razorpay stub
function loadRazorpay(amount, name, onSuccess) {
  // In production: load Razorpay SDK and open checkout
  // Here we simulate a 1.5s delay then call onSuccess
  setTimeout(() => onSuccess({ razorpay_payment_id: "pay_"+Date.now() }), 1500);
}

// Cloudinary upload stub
async function uploadToCloudinary(file) {
  // In production: POST to https://api.cloudinary.com/v1_1/{cloud}/image/upload
  return new Promise(resolve => setTimeout(() => resolve({ url: URL.createObjectURL(file), public_id: "evt_"+Date.now() }), 1200));
}

// ─────────────────────────────────────────────────────────────
// 7. NAVBAR
// ─────────────────────────────────────────────────────────────
function Navbar({ page, setPage, setModal }) {
  const { user, logout, isAuth } = useContext(AuthCtx);
  const { dark, toggle } = useContext(ThemeCtx);
  const links = [
    { label:"Events",       page:"events" },
    { label:"How It Works", page:"how" },
    { label:"About",        page:"about" },
    { label:"Contact",      page:"contact" },
  ];
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("home")}>
        ✦ Eventify <span>BETA</span>
      </div>
      <div className="nav-links">
        {links.map(l => (
          <button key={l.page} className={`nav-link${page===l.page?" active":""}`} onClick={() => setPage(l.page)}>{l.label}</button>
        ))}
        {isAuth && user?.role==="organizer" && (
          <button className={`nav-link${page==="organizer"?" active":""}`} onClick={() => setPage("organizer")}>Dashboard</button>
        )}
        {isAuth && user?.role==="admin" && (
          <button className={`nav-link${page==="admin"?" active":""}`} onClick={() => setPage("admin")}>Admin</button>
        )}
      </div>
      <div className="nav-actions">
        {/* Dark/Light toggle */}
        <button className="mode-toggle" onClick={toggle} title={dark?"Switch to Light":"Switch to Dark"}>
          <div className="knob">{dark?"🌙":"☀️"}</div>
        </button>
        {isAuth ? (
          <>
            <div className="avatar" style={{ cursor:"pointer", border:"2px solid var(--accent)" }}
              onClick={() => setPage("account")} title="My Account">
              {user.name[0]}
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => { logout(); setPage("home"); }}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => setModal("login")}>Login</button>
            <button className="btn btn-primary btn-sm" onClick={() => setModal("register")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. EVENT CARD
// ─────────────────────────────────────────────────────────────
function EventCard({ event, setPage, setSelectedEvent }) {
  const pct = Math.round((event.booked / event.seats) * 100);
  return (
    <div className="card" onClick={() => { setSelectedEvent(event); setPage("event-detail"); }}>
      <div className="card-img">
        <span style={{ position:"relative", zIndex:1 }}>{event.emoji}</span>
        <div style={{ position:"absolute", bottom:12, left:12, zIndex:2 }}>
          <span className="card-tag">{event.category}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-title">{event.title}</div>
        <div className="card-meta">
          <span>📅 {event.date}</span>
          <span>⏰ {event.time}</span>
          <span>📍 {event.location}</span>
        </div>
        <div style={{ marginBottom:16 }}>
          <div className="flex-between mb-8" style={{ fontSize:12, color:"var(--text2)" }}>
            <span>{event.booked} booked</span>
            <span style={{ color: pct>85?"var(--red)":"var(--text2)" }}>{event.seats-event.booked} left</span>
          </div>
          <div className="prog-bar">
            <div className="prog-fill" style={{ width:pct+"%", background:pct>85?"var(--red)":"var(--accent)" }} />
          </div>
        </div>
        <div className="card-footer">
          <div className="price">₹{event.price.toLocaleString()}</div>
          <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); setSelectedEvent(event); setPage("booking"); }}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedEvent, setModal }) {
  const { isAuth } = useContext(AuthCtx);
  const { events, eventsLoading } = useContext(EventCtx);

  const featured = events.slice(0, 3);

  return (
    <div className="page">
      {/* HERO */}
      <div className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-float" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">✦ India's #1 Event Platform</div>
            <h1 className="hero-title">
              Discover &<br />
              <span className="accent">Live the Moment</span>
            </h1>
            <p className="hero-sub">Book tickets for concerts, tech summits, social mixers, art shows, and more — all in one place.</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => setPage("events")}>Explore Events →</button>
              {!isAuth && <button className="btn btn-ghost btn-lg" onClick={() => setModal("register")}>Create Account</button>}
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">2,400+</div><div className="stat-label">Events Listed</div></div>
              <div><div className="stat-num">180K+</div><div className="stat-label">Happy Attendees</div></div>
              <div><div className="stat-num">650+</div><div className="stat-label">Organizers</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED EVENTS */}
      <div className="section container">
        <div className="section-header">
          <div className="section-tag">Featured Events</div>
          <h2 className="section-title">Trending Near You</h2>
          <p className="section-sub">Handpicked events you won't want to miss this season</p>
        </div>
        {eventsLoading ? (
          <div className="grid-3">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>
        ) : (
          <div className="grid-3">
            {featured.map(e => <EventCard key={e.id} event={e} setPage={setPage} setSelectedEvent={setSelectedEvent} />)}
          </div>
        )}
        <div style={{ textAlign:"center", marginTop:40 }}>
          <button className="btn btn-ghost btn-lg" onClick={() => setPage("events")}>View All Events →</button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="section" style={{ background:"var(--surface)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Categories</div>
            <h2 className="section-title">Find Your Vibe</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:16 }}>
            {[["🎵","Music"],["💻","Tech"],["😂","Comedy"],["🎨","Arts"],["🚀","Business"],["🧘","Wellness"],["🥂","Social"]].map(([em,cat]) => (
              <div key={cat} className="card glass-card" style={{ textAlign:"center", padding:24 }} onClick={() => setPage("events")}>
                <div style={{ fontSize:32, marginBottom:10 }}>{em}</div>
                <div style={{ fontWeight:700, fontSize:14 }}>{cat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="section container">
        <div className="section-header">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">Book in 3 Easy Steps</h2>
        </div>
        <div className="steps">
          {[["1","Discover","Browse thousands of events by category, date, or location."],
            ["2","Book","Select your seats and pay securely with any method."],
            ["3","Enjoy","Get your QR ticket instantly. Just scan and walk in."]].map(([n,t,d]) => (
            <div key={n} className="step">
              <div className="step-num">{n}</div>
              <div className="step-title">{t}</div>
              <div className="step-desc">{d}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:48 }}>
          <button className="btn btn-primary btn-lg" onClick={() => setPage("how")}>Learn More →</button>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 10. EVENTS PAGE (with Search, Filter, Pagination)
// ─────────────────────────────────────────────────────────────
function EventsPage({ setPage, setSelectedEvent }) {
  const { events, eventsLoading } = useContext(EventCtx);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let res = events.filter(e =>
      (cat==="All" || e.category===cat) &&
      (e.title.toLowerCase().includes(search.toLowerCase()) ||
       e.location.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort==="price-asc")  res = [...res].sort((a,b) => a.price-b.price);
    if (sort==="price-desc") res = [...res].sort((a,b) => b.price-a.price);
    if (sort==="fill")       res = [...res].sort((a,b) => (b.booked/b.seats)-(a.booked/a.seats));
    return res;
  }, [events, cat, search, sort]);

  const { page, setPage: setP, total, slice } = usePagination(filtered, 6);

  return (
    <div className="page section container">
      <div className="flex-between mb-16">
        <div>
          <div className="section-tag">Browse Events</div>
          <h1 className="section-title" style={{ textAlign:"left", marginBottom:0 }}>All Events</h1>
        </div>
        <select className="form-input" style={{ width:"auto", padding:"8px 14px", fontSize:13 }} value={sort} onChange={e => { setSort(e.target.value); setP(1); }}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="fill">Most Popular</option>
        </select>
      </div>

      <div className="search-bar" style={{ maxWidth:"100%", marginBottom:20 }}>
        <span style={{ fontSize:18 }}>🔍</span>
        <input placeholder="Search events by name or city..." value={search}
          onChange={e => { setSearch(e.target.value); setP(1); }} />
        {search && <button className="btn btn-ghost btn-sm" onClick={() => setSearch("")}>✕</button>}
      </div>

      <div className="filter-tags">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-tag${cat===c?" active":""}`} onClick={() => { setCat(c); setP(1); }}>{c}</button>
        ))}
      </div>

      <div style={{ color:"var(--muted)", fontSize:13, marginBottom:16 }}>
        Showing {slice.length} of {filtered.length} events
      </div>

      {eventsLoading ? (
        <div className="grid-3">{[0,1,2,3,4,5].map(i => <SkeletonCard key={i} />)}</div>
      ) : filtered.length===0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:"var(--muted)" }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
          <p>No events found. Try a different search.</p>
          <button className="btn btn-ghost mt-16" onClick={() => { setCat("All"); setSearch(""); }}>Clear Filters</button>
        </div>
      ) : (
        <>
          <div className="grid-3">
            {slice.map(e => <EventCard key={e.id} event={e} setPage={setPage} setSelectedEvent={setSelectedEvent} />)}
          </div>
          {/* PAGINATION */}
          {total > 1 && (
            <div className="pagination">
              <button className="page-btn" disabled={page===1} onClick={() => setP(p => p-1)}>←</button>
              {Array.from({ length:total }, (_,i) => i+1).map(n => (
                <button key={n} className={`page-btn${page===n?" active":""}`} onClick={() => setP(n)}>{n}</button>
              ))}
              <button className="page-btn" disabled={page===total} onClick={() => setP(p => p+1)}>→</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 11. EVENT DETAIL PAGE
// ─────────────────────────────────────────────────────────────
function EventDetailPage({ event, setPage, setModal }) {
  const { isAuth } = useContext(AuthCtx);
  const toast = useContext(ToastCtx);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (!isAuth || !event?.id) { setWishlisted(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const res = await api("/wishlist");
        const evs = res.data?.events || [];
        const inList = evs.some((e) => String(e._id ?? e.id) === String(event.id));
        if (!cancelled) setWishlisted(inList);
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, [isAuth, event?.id]);

  const toggleWish = async () => {
    if (!isAuth) { setModal("login"); return; }
    try {
      if (wishlisted) {
        await api(`/wishlist/${event.id}`, { method: "DELETE" });
        setWishlisted(false);
        toast.add("Removed from Wishlist", "", "info");
      } else {
        await api(`/wishlist/${event.id}`, { method: "POST" });
        setWishlisted(true);
        toast.add("Added to Wishlist", "", "success");
      }
    } catch (e) {
      toast.add("Wishlist update failed", e.message || "", "error");
    }
  };

  if (!event) return <div className="page container section"><p>No event selected.</p></div>;
  const pct = Math.round((event.booked/event.seats)*100);
  const orgName = event.organizer?.name || "Verified Organizer";
  const orgInitial = orgName[0] || "E";

  return (
    <div className="page section">
      <div className="container">
        <button className="btn btn-ghost btn-sm mb-16" onClick={() => setPage("events")}>← Back to Events</button>
        <div className="detail-grid">
          <div>
            <div style={{ height:300, borderRadius:var_radius(), background:"linear-gradient(135deg,var(--surface2),var(--surface3))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:96, marginBottom:32, border:"1px solid var(--border)" }}>
              {event.emoji}
            </div>
            <span className="card-tag" style={{ fontSize:12, marginBottom:12, display:"inline-block" }}>{event.category}</span>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:900, letterSpacing:"-1px", marginBottom:20 }}>{event.title}</h1>
            <p style={{ color:"var(--text2)", marginBottom:28, lineHeight:1.8 }}>
              {event.description?.trim()
                ? event.description
                : <>Join us for an unforgettable experience at <strong style={{ color:"var(--text)" }}>{event.title}</strong>. One of India&apos;s most anticipated events of the season, bringing together the best talent, ideas, and entertainment under one roof. Come be part of something extraordinary.</>}
            </p>
            <h3 style={{ marginBottom:14, fontFamily:"var(--font-display)", fontSize:20 }}>What to Expect</h3>
            <ul style={{ color:"var(--text2)", paddingLeft:20, lineHeight:2.2, marginBottom:28 }}>
              <li>World-class performances and presentations</li>
              <li>Networking with industry professionals</li>
              <li>Exclusive merchandise and giveaways</li>
              <li>Food courts and refreshments on-site</li>
            </ul>
            <div className="divider" />
            <h3 style={{ marginBottom:14, fontFamily:"var(--font-display)", fontSize:20 }}>Organizer</h3>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div className="avatar" style={{ width:50, height:50, fontSize:20 }}>{orgInitial}</div>
              <div>
                <div className="fw-bold">{orgName}</div>
                <span className="org-badge">✓ Verified Organizer</span>
              </div>
            </div>
          </div>
          <div>
            <div className="sticky-card">
              <div className="price" style={{ fontSize:32, marginBottom:4 }}>₹{event.price.toLocaleString()}</div>
              <div style={{ color:"var(--muted)", fontSize:13, marginBottom:22 }}>per ticket</div>
              <div className="info-row">
                <span className="info-icon">📅</span>
                <div><div className="info-label">Date</div><div>{event.date}</div></div>
              </div>
              <div className="info-row">
                <span className="info-icon">⏰</span>
                <div><div className="info-label">Time</div><div>{event.time}</div></div>
              </div>
              <div className="info-row">
                <span className="info-icon">📍</span>
                <div><div className="info-label">Venue</div><div>{event.location}</div></div>
              </div>
              <div className="info-row">
                <span className="info-icon">🎟️</span>
                <div><div className="info-label">Availability</div><div>{event.seats-event.booked} / {event.seats} seats</div></div>
              </div>
              <div style={{ margin:"20px 0 8px" }}>
                <div className="prog-bar" style={{ height:7 }}>
                  <div className="prog-fill" style={{ width:pct+"%", background:pct>85?"var(--red)":"var(--accent)" }} />
                </div>
                <div style={{ fontSize:12, color:"var(--muted)", marginTop:5 }}>{pct}% seats filled</div>
              </div>
              <button className="btn btn-primary btn-lg" style={{ width:"100%", marginTop:22, justifyContent:"center" }}
                onClick={() => isAuth ? setPage("booking") : setModal("login")}>
                Book Tickets Now
              </button>
              <button className={`btn btn-ghost btn-sm`} style={{ width:"100%", marginTop:10, justifyContent:"center" }}
                onClick={toggleWish}>
                {wishlisted ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function var_radius() { return "var(--radius)"; } // helper

// ─────────────────────────────────────────────────────────────
// 12. BOOKING PAGE (3-Step + Razorpay)
// ─────────────────────────────────────────────────────────────
function BookingPage({ event, setPage, setModal }) {
  const { isAuth, user } = useContext(AuthCtx);
  const { refreshEvents } = useContext(EventCtx);
  const toast = useContext(ToastCtx);
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payTab, setPayTab] = useState("UPI");
  const [bookingId, setBookingId] = useState("");

  const { values, errors, register, validateAll } = useForm({ name:user?.name||"", email:user?.email||"", phone:"" });

  if (!isAuth) return (
    <div className="page section container" style={{ textAlign:"center" }}>
      <div style={{ fontSize:52, marginBottom:16 }}>🔐</div>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:12 }}>Login Required</h2>
      <p style={{ color:"var(--text2)", marginBottom:24 }}>Please log in to book tickets.</p>
      <button className="btn btn-primary" onClick={() => setModal("login")}>Login to Continue</button>
    </div>
  );
  if (!event) return <div className="page container section"><p>No event selected.</p></div>;

  const subtotal = event.price * qty;
  const fee = qty * 49;
  const total = subtotal + fee;

  const handlePay = () => {
    setPaying(true);
    loadRazorpay(total, event.title, async (response) => {
      try {
        const res = await api("/bookings", {
          method: "POST",
          body: {
            eventId: event.id,
            tickets: qty,
            paymentMethod: payTab,
            razorpayPaymentId: response.razorpay_payment_id || "",
            attendeeName: values.name,
            attendeeEmail: values.email,
            attendeePhone: values.phone,
          },
        });
        const b = res.data?.booking;
        setBookingId(b?.bookingId || "");
        await refreshEvents();
        setDone(true);
        toast.add("Booking Confirmed! 🎉", `Payment ID: ${response.razorpay_payment_id}`, "success");
      } catch (e) {
        toast.add("Booking failed", e.message || "Please try again", "error");
      } finally {
        setPaying(false);
      }
    });
  };

  if (done) return (
    <div className="page section container" style={{ maxWidth:560, margin:"0 auto" }}>
      <div style={{ textAlign:"center", padding:"48px 0" }}>
        <div style={{ fontSize:64, marginBottom:20 }}>🎉</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:36, marginBottom:12 }}>Booking Confirmed!</h2>
        <p style={{ color:"var(--text2)", marginBottom:32 }}>Your tickets are ready. Show the QR code at the gate.</p>
        <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:28, marginBottom:28, textAlign:"left" }}>
          <div style={{ textAlign:"center", marginBottom:20, fontSize:36 }}>{event.emoji}</div>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, marginBottom:16, textAlign:"center" }}>{event.title}</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, fontSize:14, marginBottom:24 }}>
            {[["Booking ID", bookingId],["Attendee", user.name],["Date", event.date],["Tickets", qty],["Venue", event.location],["Total Paid","₹"+total.toLocaleString()]].map(([l,v]) => (
              <div key={l}>
                <div style={{ color:"var(--muted)", fontSize:11, textTransform:"uppercase", letterSpacing:0.5, marginBottom:3 }}>{l}</div>
                <div className="fw-bold">{v}</div>
              </div>
            ))}
          </div>
          {/* QR CODE */}
          <div style={{ textAlign:"center" }}>
            <QRCode value={bookingId} />
            <div style={{ color:"var(--muted)", fontSize:12, marginTop:8 }}>Scan at gate for entry</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn btn-primary" onClick={() => generatePDFTicket(
            { id:bookingId, event:event.title, emoji:event.emoji, date:event.date, seat:"Auto", tickets:qty, total, status:"Confirmed" }, user
          )}>📥 Download PDF Ticket</button>
          <button className="btn btn-ghost" onClick={() => setPage("account")}>My Bookings</button>
          <button className="btn btn-ghost" onClick={() => setPage("events")}>Explore More</button>
        </div>
      </div>
    </div>
  );

  const steps = ["Select Tickets","Your Details","Payment"];

  return (
    <div className="page section">
      <div className="container" style={{ maxWidth:740 }}>
        <button className="btn btn-ghost btn-sm mb-16" onClick={() => setPage("event-detail")}>← Back</button>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:30, marginBottom:6 }}>Book Tickets</h1>
        <p style={{ color:"var(--text2)", marginBottom:32 }}>{event.title}</p>

        {/* STEPPER */}
        <div style={{ display:"flex", marginBottom:36 }}>
          {steps.map((s,i) => (
            <div key={s} style={{ flex:1, textAlign:"center" }}>
              <div style={{ display:"flex", alignItems:"center" }}>
                {i > 0 && <div style={{ flex:1, height:2, background:step>i?"var(--accent)":"var(--border)" }} />}
                <div style={{
                  width:34, height:34, borderRadius:"50%", flexShrink:0,
                  background:step>i?"var(--accent)":step===i+1?"rgba(232,184,109,0.2)":"var(--surface2)",
                  border:step===i+1?"2px solid var(--accent)":"2px solid var(--border)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, fontWeight:700,
                  color:step>i?"#0a0a0f":step===i+1?"var(--accent)":"var(--muted)",
                }}>
                  {step>i+1 ? "✓" : i+1}
                </div>
                {i<2 && <div style={{ flex:1, height:2, background:step>i+1?"var(--accent)":"var(--border)" }} />}
              </div>
              <div style={{ marginTop:7, fontSize:11, color:step===i+1?"var(--accent)":"var(--muted)" }}>{s}</div>
            </div>
          ))}
        </div>

        {step===1 && (
          <div>
            <div className="table-card" style={{ padding:24, marginBottom:20 }}>
              <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:18 }}>
                <div style={{ fontSize:40 }}>{event.emoji}</div>
                <div>
                  <div className="fw-bold" style={{ fontSize:16 }}>{event.title}</div>
                  <div style={{ color:"var(--text2)", fontSize:13 }}>📅 {event.date} • 📍 {event.location}</div>
                </div>
              </div>
              <div className="divider" />
              <div className="flex-between" style={{ marginTop:18 }}>
                <div><div className="fw-bold">Standard Ticket</div><div style={{ color:"var(--text2)", fontSize:13 }}>General admission</div></div>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setQty(Math.max(1,qty-1))}>−</button>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:700, minWidth:24, textAlign:"center" }}>{qty}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setQty(Math.min(10,qty+1))}>+</button>
                </div>
              </div>
            </div>
            <div className="table-card" style={{ padding:22, marginBottom:20 }}>
              <div className="flex-between mb-8"><span style={{ color:"var(--text2)" }}>Ticket Price</span><span>₹{event.price.toLocaleString()} × {qty}</span></div>
              <div className="flex-between mb-8"><span style={{ color:"var(--text2)" }}>Platform Fee</span><span>₹{fee.toLocaleString()}</span></div>
              <div className="divider" />
              <div className="flex-between"><span className="fw-bold">Total</span><span className="price">₹{total.toLocaleString()}</span></div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width:"100%", justifyContent:"center" }} onClick={() => setStep(2)}>Continue →</button>
          </div>
        )}

        {step===2 && (
          <div>
            <div className="table-card" style={{ padding:26, marginBottom:20 }}>
              <h3 style={{ marginBottom:20 }}>Attendee Details</h3>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input {...register("name", { required:true })} />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input {...register("email", { required:true, pattern:{ value:/\S+@\S+\.\S+/, message:"Valid email required" } })} />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input {...register("phone", { required:true, pattern:{ value:/^[6-9]\d{9}$/, message:"Enter valid 10-digit number" } })} placeholder="9XXXXXXXXX" />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              <button className="btn btn-ghost btn-lg" style={{ flex:1, justifyContent:"center" }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary btn-lg" style={{ flex:2, justifyContent:"center" }}
                onClick={() => { if (validateAll({ name:{required:true}, email:{required:true, pattern:{value:/\S+@\S+\.\S+/,message:""}}, phone:{required:true} })) setStep(3); }}>
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <div className="table-card" style={{ padding:26, marginBottom:20 }}>
              <h3 style={{ marginBottom:18 }}>Payment</h3>
              <div className="alert alert-warn">
                🔒 Powered by <strong>Razorpay</strong> — 256-bit SSL encrypted. Your payment is 100% secure.
              </div>
              <div className="tabs" style={{ marginBottom:20 }}>
                {["UPI","Card","Net Banking","Wallet"].map((t,i) => (
                  <button key={t} className={`tab${payTab===t?" active":""}`} onClick={() => setPayTab(t)}>{t}</button>
                ))}
              </div>
              {payTab==="UPI" && (
                <div className="form-group">
                  <label className="form-label">UPI ID</label>
                  <input className="form-input" placeholder="yourname@paytm / @gpay / @upi" />
                </div>
              )}
              {payTab==="Card" && (
                <>
                  <div className="form-group"><label className="form-label">Card Number</label><input className="form-input" placeholder="1234 5678 9012 3456" /></div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div className="form-group"><label className="form-label">Expiry (MM/YY)</label><input className="form-input" placeholder="12/27" /></div>
                    <div className="form-group"><label className="form-label">CVV</label><input className="form-input" placeholder="•••" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Cardholder Name</label><input className="form-input" placeholder="As on card" /></div>
                </>
              )}
              {payTab==="Net Banking" && (
                <div className="form-group">
                  <label className="form-label">Select Bank</label>
                  <select className="form-input">
                    <option>HDFC Bank</option><option>SBI</option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra</option>
                  </select>
                </div>
              )}
              {payTab==="Wallet" && (
                <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:16 }}>
                  {["Paytm","PhonePe","Amazon Pay","Mobikwik"].map(w => (
                    <div key={w} style={{ padding:"10px 18px", borderRadius:8, border:"1px solid var(--border)", cursor:"pointer", fontSize:14, fontWeight:600 }}>{w}</div>
                  ))}
                </div>
              )}
              <div className="flex-between" style={{ padding:"14px 0", borderTop:"1px solid var(--border)", marginTop:8 }}>
                <span className="fw-bold">Total Payable</span>
                <span className="price">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              <button className="btn btn-ghost btn-lg" style={{ flex:1, justifyContent:"center" }} onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-success btn-lg" style={{ flex:2, justifyContent:"center" }} disabled={paying} onClick={handlePay}>
                {paying ? "⏳ Processing..." : `Pay ₹${total.toLocaleString()} via Razorpay →`}
              </button>
            </div>
            <div style={{ textAlign:"center", color:"var(--muted)", fontSize:12, marginTop:14 }}>
              🔒 Secured by Razorpay · PCI DSS Compliant · SSL Encrypted
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 13. USER DASHBOARD
// ─────────────────────────────────────────────────────────────
function UserDashboard({ setPage, setModal }) {
  const { user, isAuth } = useContext(AuthCtx);
  const { refreshEvents } = useContext(EventCtx);
  const toast = useContext(ToastCtx);
  const [nav, setNav] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [wishlistEvents, setWishlistEvents] = useState([]);

  const loadBookings = useCallback(async () => {
    try {
      const res = await api("/bookings/me");
      setBookings((res.data?.bookings || []).map(normalizeBooking));
    } catch {
      setBookings([]);
    }
  }, []);

  const loadWishlist = useCallback(async () => {
    try {
      const res = await api("/wishlist");
      setWishlistEvents((res.data?.events || []).map(normalizeEvent));
    } catch {
      setWishlistEvents([]);
    }
  }, []);

  useEffect(() => {
    if (!isAuth) return;
    loadBookings();
    loadWishlist();
  }, [isAuth, loadBookings, loadWishlist]);

  const totalSpent = bookings.reduce((s, b) => s + (b.status !== "Cancelled" ? b.total : 0), 0);
  const upcoming = bookings.filter((b) => b.status === "Confirmed").length;

  if (!isAuth) return (
    <div className="page section container" style={{ textAlign:"center" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>👤</div>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:12 }}>Not Logged In</h2>
      <p style={{ color:"var(--text2)", marginBottom:24 }}>Please login to view your dashboard.</p>
      <button className="btn btn-primary" onClick={() => setModal("login")}>Login</button>
    </div>
  );

  const navItems = [
    { id:"overview", icon:"🏠", label:"Overview" },
    { id:"bookings", icon:"🎟️", label:"My Bookings" },
    { id:"wishlist", icon:"❤️",  label:"Wishlist" },
    { id:"profile",  icon:"👤", label:"Profile" },
    { id:"settings", icon:"⚙️", label:"Settings" },
  ];

  return (
    <div className="page" style={{ paddingTop:68 }}>
      <div className="dash-grid">
        <Sidebar title="My Account" items={navItems} active={nav} setActive={setNav} />
        <div className="dash-content">

          {nav==="overview" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:32, background:"linear-gradient(135deg,rgba(232,184,109,0.08),rgba(78,203,141,0.04))", border:"1px solid var(--border)", borderRadius:var_radius(), padding:26 }}>
                <div className="avatar" style={{ width:66, height:66, fontSize:26, border:"3px solid var(--accent)" }}>{user.name[0]}</div>
                <div style={{ flex:1 }}>
                  <h2 style={{ fontFamily:"var(--font-display)", fontSize:24, marginBottom:4 }}>Hey, {user.name.split(" ")[0]}! 👋</h2>
                  <div style={{ color:"var(--text2)", fontSize:14 }}>{user.email}</div>
                  <div style={{ marginTop:8, display:"flex", gap:8, flexWrap:"wrap" }}>
                    {user.role==="organizer" && <span className="org-badge">✓ Verified Organizer</span>}
                    <span style={{ background:"rgba(122,176,255,0.12)", color:"var(--blue)", padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:700 }}>Member since Dec 2024</span>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setNav("profile")}>Edit Profile</button>
              </div>
              <div className="stats-row" style={{ marginBottom:28 }}>
                <StatCard num={String(bookings.length)} label="Total Bookings" icon="🎟️" trend="Live from API" />
                <StatCard num={String(upcoming)} label="Upcoming Events" icon="📅" />
                <StatCard num={`₹${totalSpent.toLocaleString()}`} label="Total Spent" icon="💸" />
                <StatCard num={String(wishlistEvents.length)} label="Wishlist Items" icon="❤️" />
              </div>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, marginBottom:14 }}>Recent Bookings</h3>
              <div className="table-card" style={{ marginBottom:28 }}>
                <table>
                  <thead><tr><th>Event</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {bookings.slice(0,3).map(b => (
                      <tr key={b.id}>
                        <td><div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:22 }}>{b.emoji}</span>
                          <div><div style={{ fontWeight:600, fontSize:14 }}>{b.event}</div><div style={{ color:"var(--muted)", fontSize:11 }}>{b.id}</div></div>
                        </div></td>
                        <td style={{ color:"var(--text2)", fontSize:13 }}>{b.date}</td>
                        <td style={{ fontWeight:700, color:"var(--accent)" }}>₹{b.total.toLocaleString()}</td>
                        <td><Badge status={b.status} /></td>
                        <td><button className="btn btn-ghost btn-xs" onClick={() => setNav("bookings")}>View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav==="bookings" && (
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:20 }}>My Bookings</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {bookings.map(b => (
                  <div key={b.id} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22, display:"flex", gap:16, alignItems:"flex-start" }}>
                    <div style={{ fontSize:48, lineHeight:1 }}>{b.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                        <div>
                          <h3 style={{ fontFamily:"var(--font-display)", fontSize:19, marginBottom:4 }}>{b.event}</h3>
                          <div style={{ color:"var(--text2)", fontSize:13, display:"flex", gap:14 }}>
                            <span>📅 {b.date}</span>
                            <span>🎟️ {b.tickets} ticket{b.tickets>1?"s":""}</span>
                            <span>💺 {b.seat}</span>
                          </div>
                        </div>
                        <Badge status={b.status} />
                      </div>
                      <div style={{ marginTop:14, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                        <div>
                          <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:0.5, marginBottom:2 }}>Booking ID</div>
                          <div style={{ fontWeight:700, color:"var(--accent)" }}>{b.id}</div>
                        </div>
                        <div>
                          <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:0.5, marginBottom:2 }}>Total Paid</div>
                          <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"var(--accent)" }}>₹{b.total.toLocaleString()}</div>
                        </div>
                        <div style={{ display:"flex", gap:8 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => generatePDFTicket(b, user)}>📥 PDF</button>
                          {b.status==="Confirmed" && <button className="btn btn-ghost btn-sm">🔗 Share</button>}
                          {b.status!=="Cancelled" && <button className="btn btn-danger btn-sm" onClick={async () => {
                            try {
                              await api(`/bookings/${b.mongoId}/cancel`, { method: "PATCH" });
                              toast.add("Booking Cancelled","Refund will be processed in 5-7 days","info");
                              await loadBookings();
                              await refreshEvents();
                            } catch (e) {
                              toast.add("Could not cancel", e.message || "", "error");
                            }
                          }}>Cancel</button>}
                        </div>
                      </div>
                      {b.status==="Confirmed" && (
                        <div style={{ marginTop:14, padding:"12px 16px", background:"var(--surface2)", borderRadius:10, display:"flex", alignItems:"center", gap:16 }}>
                          <QRCode value={b.id} />
                          <div style={{ fontSize:13 }}>
                            <div className="fw-bold mb-8">QR Ticket Ready</div>
                            <div style={{ color:"var(--text2)" }}>Show at gate for instant entry</div>
                            <button className="btn btn-primary btn-sm" style={{ marginTop:10 }} onClick={() => generatePDFTicket(b, user)}>📥 Download PDF</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {nav==="wishlist" && (
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:22 }}>Wishlist</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:18 }}>
                {wishlistEvents.length === 0 ? (
                  <p style={{ color:"var(--muted)" }}>Your wishlist is empty. Browse events and tap ♡ on an event.</p>
                ) : (
                  wishlistEvents.map(e => (
                  <div key={e.id} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), overflow:"hidden" }}>
                    <div style={{ height:110, background:"var(--surface2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:48 }}>{e.emoji}</div>
                    <div style={{ padding:18 }}>
                      <span className="card-tag">{e.category}</span>
                      <h3 style={{ fontFamily:"var(--font-display)", fontSize:17, margin:"8px 0 4px" }}>{e.title}</h3>
                      <div style={{ color:"var(--text2)", fontSize:13, marginBottom:14 }}>📅 {e.date} · 📍 {e.location}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--accent)" }}>₹{e.price.toLocaleString()}</span>
                        <div style={{ display:"flex", gap:8 }}>
                          <button className="btn btn-danger btn-xs" onClick={async () => {
                            try {
                              await api(`/wishlist/${e.id}`, { method: "DELETE" });
                              await loadWishlist();
                              toast.add("Removed","Event removed from wishlist","info");
                            } catch (err) { toast.add("Error", err.message, "error"); }
                          }}>✕</button>
                          <button className="btn btn-primary btn-xs" onClick={() => { setPage("events"); }}>Book</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  )))}
              </div>
            </div>
          )}

          {nav==="profile" && <ProfileTab user={user} />}

          {nav==="settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user }) {
  const toast = useContext(ToastCtx);
  const { refreshUser, setUser } = useContext(AuthCtx);
  const { values, errors, register, validateAll, setValue } = useForm({
    fname: user?.name?.split(" ")[0] || "",
    lname: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "Mumbai",
    bio: user?.bio || "",
  });
  const [img, setImg] = useState(user?.avatarUrl || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const parts = user.name?.split(" ") || [];
    setValue("fname", parts[0] || "");
    setValue("lname", parts.slice(1).join(" ") || "");
    setValue("email", user.email || "");
    setValue("phone", user.phone || "");
    setValue("city", user.city || "Mumbai");
    setValue("bio", user.bio || "");
    setImg(user.avatarUrl || null);
  }, [user, setValue]);

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    toast.add("Uploading to Cloudinary...","","info");
    const res = await uploadToCloudinary(file);
    setImg(res.url);
    setUploading(false);
    try {
      await api("/users/me", { method: "PATCH", body: { avatarUrl: res.url } });
      await refreshUser();
      toast.add("Photo uploaded!","Profile picture updated","success");
    } catch (err) {
      toast.add("Could not save avatar", err.message || "", "error");
    }
  };

  const save = async () => {
    if (!validateAll({ fname:{required:true}, email:{required:true, pattern:{value:/\S+@\S+\.\S+/, message:"Valid email required"}} })) return;
    const name = `${values.fname} ${values.lname || ""}`.trim();
    try {
      await api("/users/me", {
        method: "PATCH",
        body: {
          name,
          email: values.email,
          phone: values.phone,
          city: values.city,
          bio: values.bio,
        },
      });
      const u = await refreshUser();
      if (u) setUser(u);
      toast.add("Profile Saved","Your changes have been saved","success");
    } catch (e) {
      toast.add("Save failed", e.message || "", "error");
    }
  };

  return (
    <div style={{ maxWidth:540 }}>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, marginBottom:6 }}>Edit Profile</h2>
      <p style={{ color:"var(--text2)", marginBottom:28, fontSize:14 }}>Update your personal information</p>
      <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:28, padding:22, background:"var(--surface2)", borderRadius:var_radius(), border:"1px solid var(--border)" }}>
        <div style={{ position:"relative" }}>
          {img ? (
            <img src={img} alt="profile" style={{ width:72, height:72, borderRadius:"50%", objectFit:"cover", border:"3px solid var(--accent)" }} />
          ) : (
            <div className="avatar" style={{ width:72, height:72, fontSize:28, border:"3px solid var(--accent)" }}>{user?.name?.[0]}</div>
          )}
        </div>
        <div>
          <div style={{ fontWeight:700, marginBottom:4 }}>Profile Photo</div>
          <div style={{ color:"var(--text2)", fontSize:13, marginBottom:10 }}>Uploaded via Cloudinary · PNG/JPG, max 2MB</div>
          <label className="btn btn-ghost btn-sm" style={{ cursor:"pointer" }}>
            {uploading ? "⏳ Uploading..." : "📷 Upload Photo"}
            <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleImgUpload} />
          </label>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="form-group"><label className="form-label">First Name *</label><input {...register("fname", { required:true })} />{errors.fname && <div className="form-error">{errors.fname}</div>}</div>
        <div className="form-group"><label className="form-label">Last Name</label><input {...register("lname")} /></div>
      </div>
      <div className="form-group"><label className="form-label">Email *</label><input {...register("email", { required:true, pattern:{value:/\S+@\S+\.\S+/, message:"Valid email"} })} />{errors.email && <div className="form-error">{errors.email}</div>}</div>
      <div className="form-group"><label className="form-label">Phone</label><input {...register("phone")} placeholder="+91 XXXXX XXXXX" /></div>
      <div className="form-group"><label className="form-label">City</label>
        <select {...register("city")} className="form-input">{["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai"].map(c => <option key={c}>{c}</option>)}</select>
      </div>
      <div className="form-group"><label className="form-label">Bio</label><textarea {...register("bio")} className="form-input" style={{ resize:"vertical" }} placeholder="Tell us a bit about yourself..." /></div>
      <button className="btn btn-primary" onClick={save}>💾 Save Changes</button>
    </div>
  );
}

function SettingsTab() {
  const toast = useContext(ToastCtx);
  const { user, refreshUser, logout } = useContext(AuthCtx);
  const { values, register } = useForm({ currentPwd:"", newPwd:"", confirmPwd:"" });
  const [toggles, setToggles] = useState({
    email: true, sms: true, remind: true, marketing: false, priceAlert: true,
  });

  useEffect(() => {
    const p = user?.notificationPrefs;
    if (!p) return;
    setToggles({
      email: p.email !== false,
      sms: p.sms !== false,
      remind: p.remind !== false,
      marketing: !!p.marketing,
      priceAlert: p.priceAlert !== false,
    });
  }, [user?.notificationPrefs]);

  const persistToggles = async (next) => {
    try {
      await api("/users/me", { method: "PATCH", body: { notificationPrefs: next } });
      await refreshUser();
    } catch (e) {
      toast.add("Could not save preferences", e.message || "", "error");
    }
  };

  const T = ({ name, label, desc }) => (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:"1px solid var(--border)" }}>
      <div><div style={{ fontWeight:600, fontSize:14 }}>{label}</div><div style={{ color:"var(--muted)", fontSize:12 }}>{desc}</div></div>
      <div
        onClick={() => {
          const next = { ...toggles, [name]: !toggles[name] };
          setToggles(next);
          persistToggles(next);
        }}
        style={{ width:44, height:24, borderRadius:12, background:toggles[name]?"var(--accent)":"var(--surface3)", border:"1px solid var(--border)", cursor:"pointer", position:"relative", flexShrink:0, transition:"background var(--transition)" }}>
        <div style={{ position:"absolute", top:3, left:toggles[name]?undefined:3, right:toggles[name]?3:undefined, width:16, height:16, borderRadius:"50%", background:toggles[name]?"#0a0a0f":"var(--muted)", transition:"all var(--transition)" }} />
      </div>
    </div>
  );

  const updatePassword = async () => {
    if (!values.currentPwd || !values.newPwd) {
      toast.add("Missing fields", "Fill all password fields", "error");
      return;
    }
    if (values.newPwd !== values.confirmPwd) {
      toast.add("Mismatch", "New passwords do not match", "error");
      return;
    }
    try {
      await api("/users/me/password", {
        method: "PATCH",
        body: { currentPassword: values.currentPwd, newPassword: values.newPwd },
      });
      toast.add("Password Updated","Your password has been changed","success");
    } catch (e) {
      toast.add("Password update failed", e.message || "", "error");
    }
  };

  const deleteAccount = async () => {
    const pwd = window.prompt("Enter your password to permanently delete your account:");
    if (!pwd) return;
    try {
      await api("/users/me", { method: "DELETE", body: { password: pwd } });
      logout();
      toast.add("Account deleted", "", "info");
    } catch (e) {
      toast.add("Could not delete account", e.message || "", "error");
    }
  };

  return (
    <div style={{ maxWidth:540 }}>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, marginBottom:6 }}>Settings</h2>
      <p style={{ color:"var(--text2)", marginBottom:28, fontSize:14 }}>Manage notifications and security</p>
      <h4 style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:"var(--text2)", marginBottom:14 }}>Notifications</h4>
      <div className="table-card" style={{ padding:"0 16px", marginBottom:28 }}>
        <T name="email"     label="Email Notifications" desc="Booking confirmations and updates" />
        <T name="sms"       label="SMS Alerts"          desc="OTP and booking status via SMS" />
        <T name="remind"    label="Event Reminders"     desc="24h reminder before your event" />
        <T name="marketing" label="Marketing Emails"    desc="Personalised event recommendations" />
        <T name="priceAlert"label="Price Drop Alerts"   desc="Know when wishlist events go on sale" />
      </div>
      <h4 style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:"var(--text2)", marginBottom:14 }}>Change Password</h4>
      <div className="table-card" style={{ padding:20, marginBottom:28 }}>
        <div className="form-group"><label className="form-label">Current Password</label><input {...register("currentPwd")} type="password" placeholder="••••••••" /></div>
        <div className="form-group"><label className="form-label">New Password</label><input {...register("newPwd")} type="password" placeholder="••••••••" /></div>
        <div className="form-group"><label className="form-label">Confirm New Password</label><input {...register("confirmPwd")} type="password" placeholder="••••••••" /></div>
        <button className="btn btn-primary btn-sm" onClick={updatePassword}>Update Password</button>
      </div>
      <div style={{ background:"rgba(232,93,93,0.06)", border:"1px solid rgba(232,93,93,0.25)", borderRadius:var_radius(), padding:20 }}>
        <div className="fw-bold" style={{ marginBottom:4 }}>Delete Account</div>
        <div style={{ color:"var(--muted)", fontSize:13, marginBottom:12 }}>This is permanent. All your data will be deleted.</div>
        <button className="btn btn-danger btn-sm" onClick={deleteAccount}>Delete My Account</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 14. ORGANIZER DASHBOARD (Full CRUD)
// ─────────────────────────────────────────────────────────────
const EMOJI_LIST = ["🎵","💻","😂","🎨","🚀","🧘","🎭","🏆","🎤","🎬","🍕","📸","🥂","🤝","🌆","⛓️","💃","🎊"];
const BLANK = { title:"", date:"", time:"", location:"", category:"Music", price:"", seats:"", description:"", emoji:"🎵", status:"Active" };

function OrganizerDashboard({ setPage }) {
  const { user, isAuth } = useContext(AuthCtx);
  const { organizerEvents, addEvent, updateEvent, deleteEvent } = useContext(EventCtx);
  const toast = useContext(ToastCtx);
  const [nav, setNav] = useState("overview");
  const [editId, setEditId] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [attSearch, setAttSearch] = useState("");
  const [bannerUrl, setBannerUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { values, errors, register, validateAll, reset, setValue } = useForm(BLANK);

  // derived
  const myEvents = organizerEvents;
  const totalRev = myEvents.reduce((s,e) => s + e.price * e.booked, 0);
  const totalBooked = myEvents.reduce((s,e) => s + e.booked, 0);

  const visibleEvents = myEvents.filter(e =>
    (filterCat==="All" || e.category===filterCat) &&
    (filterStatus==="All" || (e.orgStatus||"Active")===filterStatus)
  );
  const visibleAtt = ATTENDEES.filter(a =>
    a.name.toLowerCase().includes(attSearch.toLowerCase()) ||
    a.email.toLowerCase().includes(attSearch.toLowerCase())
  );

  const startEdit = (ev) => {
    setEditId(ev.id);
    setValue("title", ev.title); setValue("location", ev.location);
    setValue("category", ev.category); setValue("price", String(ev.price));
    setValue("seats", String(ev.seats)); setValue("description", ev.description || "");
    setValue("emoji", ev.emoji); setValue("status", ev.orgStatus || "Active");
    setValue("date",""); setValue("time","");
    setNav("create");
  };

  const publish = async (draft = false) => {
    if (!validateAll({
      title:{ required:"Title is required" },
      date:{ required:"Date is required" },
      time:{ required:"Time is required" },
      location:{ required:"Location is required" },
      price:{ required:"Price is required" },
      seats:{ required:"Seats required" },
      description:{ required:"Description required", minLength:10 },
    })) return;

    const dateStr = new Date(values.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
    const [h,m] = values.time.split(":");
    const hr = +h; const ampm = hr>=12?"PM":"AM"; const hr12 = hr%12||12;
    const timeStr = `${hr12}:${m} ${ampm}`;

    const payload = {
      title: values.title,
      date: dateStr,
      time: timeStr,
      location: values.location,
      category: values.category,
      price: +values.price,
      seats: +values.seats,
      description: values.description,
      emoji: values.emoji,
      orgStatus: draft ? "Draft" : (values.status || "Active"),
      bannerUrl: bannerUrl || "",
    };

    try {
      if (editId) {
        await updateEvent(editId, payload);
        toast.add("Event Updated! ✅","Changes saved successfully","success");
      } else {
        await addEvent(payload);
        toast.add("Event Published! 🚀","Your event is now live on Eventify","success");
      }
      reset();
      setEditId(null);
      setBannerUrl(null);
      setTimeout(() => setNav("events"), 600);
    } catch (e) {
      toast.add("Save failed", e.message || "Check fields and try again", "error");
    }
  };

  const handleBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    toast.add("Uploading banner...","Sending to Cloudinary","info");
    const res = await uploadToCloudinary(file);
    setBannerUrl(res.url);
    setUploading(false);
    toast.add("Banner uploaded!","","success");
  };

  const navItems = [
    { id:"overview",   icon:"📊", label:"Overview" },
    { id:"events",     icon:"🎪", label:"My Events" },
    { id:"create",     icon:"➕", label:editId?"Edit Event":"Create Event" },
    { id:"attendees",  icon:"👥", label:"Attendees" },
    { id:"revenue",    icon:"💰", label:"Revenue" },
    { id:"analytics",  icon:"📈", label:"Analytics" },
    { id:"settings",   icon:"⚙️", label:"Settings" },
  ];

  if (!isAuth || user?.role!=="organizer") return (
    <div className="page section container" style={{ textAlign:"center" }}>
      <div style={{ fontSize:52, marginBottom:16 }}>🚫</div>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:12 }}>Organizer Access Required</h2>
      <p style={{ color:"var(--text2)" }}>Login as an organizer to access this dashboard.</p>
    </div>
  );

  return (
    <div className="page" style={{ paddingTop:68 }}>
      {/* DELETE CONFIRM */}
      {confirmDel && (
        <div className="modal-overlay" onClick={() => setConfirmDel(null)}>
          <div className="modal" style={{ maxWidth:360 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:40, textAlign:"center", marginBottom:14 }}>⚠️</div>
            <div className="modal-title" style={{ textAlign:"center", fontSize:20 }}>Delete Event?</div>
            <div className="modal-sub" style={{ textAlign:"center" }}>This is permanent and cannot be undone.</div>
            <div style={{ display:"flex", gap:12 }}>
              <button className="btn btn-ghost btn-lg" style={{ flex:1, justifyContent:"center" }} onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="btn btn-danger btn-lg" style={{ flex:1, justifyContent:"center" }} onClick={async () => {
                try {
                  await deleteEvent(confirmDel);
                  setConfirmDel(null);
                  toast.add("Event Deleted","","warning");
                } catch (e) {
                  toast.add("Delete failed", e.message || "", "error");
                }
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="dash-grid">
        <Sidebar title="Organizer Panel" subtitle="✓ Verified Organizer" subtitleColor="var(--green)" items={navItems} active={nav} setActive={(id) => { if (id!=="create") { setEditId(null); reset(); } setNav(id); }} />
        <div className="dash-content">

          {nav==="overview" && (
            <div>
              <div className="flex-between mb-24">
                <div>
                  <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:4 }}>Welcome back, {user?.name?.split(" ")[0]}! 👋</h2>
                  <p style={{ color:"var(--text2)" }}>Your event performance at a glance.</p>
                </div>
                <button className="btn btn-primary" onClick={() => { reset(); setEditId(null); setNav("create"); }}>+ Create Event</button>
              </div>
              <div className="stats-row" style={{ marginBottom:32 }}>
                <StatCard num={myEvents.length}                    label="Total Events"    icon="🎪" trend="3 this month" />
                <StatCard num={totalBooked.toLocaleString()}       label="Total Attendees" icon="👥" trend="12% growth" />
                <StatCard num={"₹"+(totalRev/100000).toFixed(1)+"L"} label="Revenue"      icon="💰" />
                <StatCard num="4.8★"                               label="Avg. Rating"    icon="⭐" />
              </div>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, marginBottom:14 }}>Live Occupancy</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14, marginBottom:28 }}>
                {myEvents.slice(0,6).map(e => {
                  const pct = Math.round((e.booked/e.seats)*100);
                  const c = pct>85?"var(--red)":pct>60?"var(--accent)":"var(--green)";
                  return (
                    <div key={e.id} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:18 }}>
                      <div className="flex-between mb-8">
                        <div style={{ fontWeight:600, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.emoji} {e.title}</div>
                        <span style={{ color:c, fontWeight:700, fontSize:13, flexShrink:0 }}>{pct}%</span>
                      </div>
                      <div className="prog-bar" style={{ height:6, marginBottom:6 }}>
                        <div className="prog-fill" style={{ width:pct+"%", background:c }} />
                      </div>
                      <div style={{ fontSize:12, color:"var(--muted)" }}>{e.booked}/{e.seats} seats · {e.date}</div>
                    </div>
                  );
                })}
              </div>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, marginBottom:14 }}>Recent Registrations</h3>
              <div className="table-card">
                <table>
                  <thead><tr><th>Attendee</th><th>Event</th><th>Tickets</th><th>Status</th></tr></thead>
                  <tbody>
                    {ATTENDEES.slice(0,5).map(a => (
                      <tr key={a.name}>
                        <td><div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div className="avatar" style={{ width:32, height:32, fontSize:13 }}>{a.name[0]}</div>
                          <div><div style={{ fontWeight:600, fontSize:14 }}>{a.name}</div><div style={{ color:"var(--muted)", fontSize:11 }}>{a.email}</div></div>
                        </div></td>
                        <td style={{ fontSize:13 }}>{a.event}</td>
                        <td>{a.tickets}</td>
                        <td><Badge status={a.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav==="events" && (
            <div>
              <div className="flex-between mb-20">
                <div>
                  <h2 style={{ fontFamily:"var(--font-display)", fontSize:28 }}>My Events</h2>
                  <p style={{ color:"var(--text2)", fontSize:13 }}>{myEvents.length} events total</p>
                </div>
                <button className="btn btn-primary" onClick={() => { reset(); setEditId(null); setNav("create"); }}>➕ Create Event</button>
              </div>
              {/* Filters */}
              <div style={{ display:"flex", gap:12, marginBottom:18, flexWrap:"wrap" }}>
                <select className="form-input" style={{ width:"auto", padding:"8px 12px", fontSize:13 }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                  <option value="All">All Categories</option>
                  {CATEGORIES.filter(c=>c!=="All").map(c => <option key={c}>{c}</option>)}
                </select>
                <select className="form-input" style={{ width:"auto", padding:"8px 12px", fontSize:13 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option>Active</option><option>Paused</option><option>Draft</option>
                </select>
              </div>
              {visibleEvents.length===0 ? (
                <div style={{ textAlign:"center", padding:"50px 0", color:"var(--muted)" }}>
                  <div style={{ fontSize:48, marginBottom:14 }}>🎪</div>
                  <p>No events found. <button className="btn btn-primary btn-sm" style={{ marginLeft:8 }} onClick={() => { reset(); setEditId(null); setNav("create"); }}>Create one</button></p>
                </div>
              ) : (
                <div className="table-card">
                  <table>
                    <thead><tr><th>Event</th><th>Date</th><th>Occupancy</th><th>Revenue</th><th>Status</th><th style={{ textAlign:"right" }}>Actions</th></tr></thead>
                    <tbody>
                      {visibleEvents.map(e => {
                        const pct = Math.round((e.booked/e.seats)*100);
                        return (
                          <tr key={e.id}>
                            <td>
                              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                <span style={{ fontSize:22 }}>{e.emoji}</span>
                                <div><div style={{ fontWeight:600, fontSize:14 }}>{e.title}</div><div style={{ color:"var(--muted)", fontSize:11 }}>📍 {e.location}</div></div>
                              </div>
                            </td>
                            <td style={{ fontSize:13, color:"var(--text2)" }}>{e.date}</td>
                            <td>
                              <div style={{ fontSize:12, marginBottom:4 }}>{e.booked}/{e.seats} ({pct}%)</div>
                              <MiniBar pct={pct} color={pct>85?"var(--red)":"var(--accent)"} />
                            </td>
                            <td style={{ fontWeight:700, color:"var(--accent)" }}>₹{(e.price*e.booked).toLocaleString()}</td>
                            <td><Badge status={e.orgStatus||"Active"} /></td>
                            <td>
                              <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
                                <button className="btn btn-ghost btn-xs" onClick={() => startEdit(e)}>✏️ Edit</button>
                                <button className="btn btn-ghost btn-xs" onClick={async () => {
                                  try {
                                    const next = (e.orgStatus||"Active")==="Active" ? "Paused" : "Active";
                                    await updateEvent(e.id, { orgStatus: next });
                                    toast.add("Status Updated","","info");
                                  } catch (err) { toast.add("Update failed", err.message, "error"); }
                                }}>
                                  {(e.orgStatus||"Active")==="Active" ? "⏸" : "▶"}
                                </button>
                                <button className="btn btn-danger btn-xs" onClick={() => setConfirmDel(e.id)}>🗑</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {nav==="create" && (
            <div style={{ maxWidth:680 }}>
              <div className="flex-between mb-16">
                <div>
                  <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:4 }}>{editId?"Edit Event":"Create New Event"}</h2>
                  <p style={{ color:"var(--text2)", fontSize:14 }}>Fill in all details to publish your event.</p>
                </div>
                {editId && <button className="btn btn-ghost btn-sm" onClick={() => { setEditId(null); reset(); }}>+ New Instead</button>}
              </div>

              {/* Emoji picker */}
              <div className="form-group">
                <label className="form-label">Event Icon</label>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {EMOJI_LIST.map(em => (
                    <div key={em} onClick={() => setValue("emoji", em)}
                      style={{ width:42, height:42, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, cursor:"pointer", border:`2px solid ${values.emoji===em?"var(--accent)":"var(--border)"}`, background:values.emoji===em?"rgba(232,184,109,0.1)":"var(--surface2)", transition:"all var(--transition)" }}>
                      {em}
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:24, marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:"var(--muted)", marginBottom:18 }}>Basic Information</div>
                <div className="form-group">
                  <label className="form-label">Event Title *</label>
                  <input {...register("title", { required:"Title is required" })} placeholder="e.g. Mumbai Jazz Night 2025" />
                  {errors.title && <div className="form-error">{errors.title}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea {...register("description", { required:"Description required", minLength:10 })} className="form-input" placeholder="Describe what makes your event special..." />
                  {errors.description && <div className="form-error">{errors.description}</div>}
                  <div style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>{values.description?.length||0}/500 chars</div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select {...register("category")} className="form-input">{CATEGORIES.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}</select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event Type</label>
                    <select className="form-input"><option>In-Person</option><option>Online</option><option>Hybrid</option></select>
                  </div>
                </div>
              </div>

              {/* Date & Venue */}
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:24, marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:"var(--muted)", marginBottom:18 }}>Date & Venue</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input {...register("date", { required:"Date required" })} type="date" />
                    {errors.date && <div className="form-error">{errors.date}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Time *</label>
                    <input {...register("time", { required:"Time required" })} type="time" />
                    {errors.time && <div className="form-error">{errors.time}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Venue / Address *</label>
                  <input {...register("location", { required:"Location required" })} placeholder="Hall name, City" />
                  {errors.location && <div className="form-error">{errors.location}</div>}
                </div>
              </div>

              {/* Pricing */}
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:24, marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:"var(--muted)", marginBottom:18 }}>Tickets & Pricing</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div className="form-group">
                    <label className="form-label">Ticket Price (₹) *</label>
                    <input {...register("price", { required:"Price required" })} type="number" placeholder="1499" min="0" />
                    {errors.price && <div className="form-error">{errors.price}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Total Seats *</label>
                    <input {...register("seats", { required:"Seats required" })} type="number" placeholder="200" min="1" />
                    {errors.seats && <div className="form-error">{errors.seats}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Max Per Booking</label>
                    <input className="form-input" type="number" placeholder="10" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Early Bird Price (₹)</label>
                    <input className="form-input" type="number" placeholder="Optional" />
                  </div>
                </div>
              </div>

              {/* Banner upload */}
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:24, marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, color:"var(--muted)", marginBottom:18 }}>Event Banner (Cloudinary)</div>
                {bannerUrl ? (
                  <div style={{ position:"relative" }}>
                    <img src={bannerUrl} alt="banner" style={{ width:"100%", height:160, objectFit:"cover", borderRadius:10 }} />
                    <button className="btn btn-danger btn-xs" style={{ position:"absolute", top:8, right:8 }} onClick={() => setBannerUrl(null)}>✕ Remove</button>
                  </div>
                ) : (
                  <label className="upload-drop" style={{ display:"block" }}>
                    <div style={{ fontSize:36, marginBottom:10 }}>📷</div>
                    <div style={{ fontWeight:600, marginBottom:4 }}>Click to upload banner</div>
                    <div style={{ fontSize:13, color:"var(--muted)" }}>PNG, JPG — max 5MB · Uploaded to Cloudinary</div>
                    <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleBanner} />
                    {uploading && <div style={{ color:"var(--accent)", marginTop:8, fontSize:13 }}>⏳ Uploading...</div>}
                  </label>
                )}
              </div>

              {/* Live Preview */}
              <div style={{ background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:18, marginBottom:24 }}>
                <div style={{ fontSize:11, color:"var(--muted)", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Live Preview</div>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ fontSize:36, flexShrink:0 }}>{values.emoji}</div>
                  <div>
                    <div className="fw-bold" style={{ fontSize:16 }}>{values.title || "Your Event Title"}</div>
                    <div style={{ color:"var(--text2)", fontSize:13, marginTop:4 }}>
                      {values.date ? new Date(values.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "Date"} · {values.location || "Location"}
                    </div>
                    <div style={{ marginTop:6, display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
                      <span className="card-tag">{values.category}</span>
                      {values.price && <span style={{ color:"var(--accent)", fontWeight:700 }}>₹{(+values.price).toLocaleString()}</span>}
                      {values.seats && <span style={{ color:"var(--muted)", fontSize:12 }}>{values.seats} seats</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display:"flex", gap:12 }}>
                <button className="btn btn-primary btn-lg" onClick={() => publish(false)}>
                  {editId ? "💾 Save Changes" : "🚀 Publish Event"}
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => publish(true)}>📝 Draft</button>
                <button className="btn btn-ghost btn-lg" onClick={() => { reset(); setEditId(null); setNav("events"); }}>Cancel</button>
              </div>
            </div>
          )}

          {nav==="attendees" && (
            <div>
              <div className="flex-between mb-20">
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:28 }}>Attendees</h2>
                <div style={{ display:"flex", gap:10 }}>
                  <div className="search-bar" style={{ margin:0, maxWidth:260, padding:"6px 6px 6px 14px" }}>
                    <span>🔍</span><input placeholder="Search attendees..." value={attSearch} onChange={e => setAttSearch(e.target.value)} />
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={() => toast.add("CSV Exported","Attendee list downloaded","success")}>📥 Export CSV</button>
                </div>
              </div>
              <div className="stats-row" style={{ marginBottom:24 }}>
                <StatCard num={ATTENDEES.length}                             label="Total Registered" icon="👥" />
                <StatCard num={ATTENDEES.filter(a=>a.status==="Confirmed").length} label="Confirmed" icon="✅" />
                <StatCard num={ATTENDEES.filter(a=>a.status==="Pending").length}   label="Pending"   icon="⏳" />
              </div>
              <div className="table-card">
                <table>
                  <thead><tr><th>Attendee</th><th>Event</th><th>City</th><th>Tickets</th><th>Booked On</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {visibleAtt.map(a => (
                      <tr key={a.name}>
                        <td><div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div className="avatar" style={{ width:32, height:32, fontSize:13 }}>{a.name[0]}</div>
                          <div><div style={{ fontWeight:600, fontSize:14 }}>{a.name}</div><div style={{ color:"var(--muted)", fontSize:11 }}>{a.email}</div></div>
                        </div></td>
                        <td style={{ fontSize:13 }}>{a.event}</td>
                        <td style={{ color:"var(--text2)", fontSize:13 }}>{a.city}</td>
                        <td>{a.tickets}</td>
                        <td style={{ color:"var(--muted)", fontSize:13 }}>{a.date}</td>
                        <td><Badge status={a.status} /></td>
                        <td><button className="btn btn-ghost btn-xs" onClick={() => toast.add("Reminder Sent","Email sent to "+a.name,"success")}>📧</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav==="revenue" && (
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:24 }}>Revenue</h2>
              <div className="stats-row" style={{ marginBottom:28 }}>
                <StatCard num={"₹"+(totalRev/100000).toFixed(2)+"L"} label="Gross Revenue"   icon="💰" />
                <StatCard num={"₹"+(totalRev*.85/100000).toFixed(2)+"L"} label="Your Earnings" icon="🏦" />
                <StatCard num={totalBooked} label="Tickets Sold" icon="🎟️" />
              </div>
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:24, marginBottom:20 }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, marginBottom:20 }}>Revenue by Event</h3>
                {myEvents.sort((a,b) => (b.price*b.booked)-(a.price*a.booked)).map(e => {
                  const rev = e.price * e.booked;
                  const maxRev = Math.max(...myEvents.map(x=>x.price*x.booked))||1;
                  return (
                    <div key={e.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
                      <span style={{ fontSize:22, flexShrink:0 }}>{e.emoji}</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div className="fw-bold" style={{ fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.title}</div>
                        <div style={{ fontSize:12, color:"var(--muted)" }}>{e.booked} tickets · ₹{e.price.toLocaleString()}</div>
                        <div className="prog-bar" style={{ marginTop:6 }}>
                          <div className="prog-fill" style={{ width:Math.round((rev/maxRev)*100)+"%", background:"var(--accent)" }} />
                        </div>
                      </div>
                      <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--accent)", flexShrink:0 }}>₹{(rev/1000).toFixed(1)}K</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ background:"rgba(78,203,141,0.07)", border:"1px solid rgba(78,203,141,0.2)", borderRadius:var_radius(), padding:22 }}>
                <div className="flex-between">
                  <div><div className="fw-bold mb-8">Next Payout</div><div style={{ color:"var(--text2)", fontSize:13 }}>Expected by Dec 25, 2025</div></div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:900, color:"var(--green)" }}>₹{(totalRev*0.85/100000).toFixed(2)}L</div>
                  <button className="btn btn-success btn-sm" onClick={() => toast.add("Payout Requested","Processing in 2-3 business days","success")}>Request Early Payout</button>
                </div>
              </div>
            </div>
          )}

          {nav==="analytics" && (
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:24 }}>Analytics</h2>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
                {/* Bookings chart */}
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Bookings This Week</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={BOOKING_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" /><YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#e8b86d" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Revenue line */}
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Revenue Trend (₹L)</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={REVENUE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" /><YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#e8b86d" strokeWidth={3} dot={{ fill:"#e8b86d", r:5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Category pie */}
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Attendees by Category</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={CATEGORY_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                        {CATEGORY_DATA.map((entry,i) => <Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip /><Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Ratings */}
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Satisfaction Ratings</h4>
                  {[["5 ★",62],["4 ★",24],["3 ★",10],["2 ★",3],["1 ★",1]].map(([s,p]) => (
                    <div key={s} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:40, fontSize:13, color:"var(--accent)" }}>{s}</div>
                      <div style={{ flex:1, height:6, background:"var(--surface2)", borderRadius:3 }}>
                        <div style={{ width:p+"%", height:"100%", background:"var(--accent)", borderRadius:3 }} />
                      </div>
                      <div style={{ fontSize:12, color:"var(--muted)", width:32 }}>{p}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {nav==="settings" && (
            <div style={{ maxWidth:520 }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, marginBottom:6 }}>Organizer Settings</h2>
              <p style={{ color:"var(--text2)", marginBottom:28, fontSize:14 }}>Manage your organizer profile and payouts.</p>
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:26, marginBottom:22 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--text2)", textTransform:"uppercase", letterSpacing:0.8, marginBottom:18 }}>Organizer Profile</div>
                <div className="form-group"><label className="form-label">Organization Name</label><input className="form-input" defaultValue="Elite Events India" /></div>
                <div className="form-group"><label className="form-label">Website</label><input className="form-input" placeholder="https://yourwebsite.com" /></div>
                <div className="form-group"><label className="form-label">GST Number</label><input className="form-input" placeholder="29XXXXX1234X1ZX" /></div>
                <button className="btn btn-primary btn-sm" onClick={() => toast.add("Settings Saved","","success")}>Save</button>
              </div>
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:26 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--text2)", textTransform:"uppercase", letterSpacing:0.8, marginBottom:18 }}>Payout Bank Details</div>
                <div className="form-group"><label className="form-label">Account Number</label><input className="form-input" placeholder="XXXXXX1234" /></div>
                <div className="form-group"><label className="form-label">IFSC Code</label><input className="form-input" placeholder="HDFC0001234" /></div>
                <div className="form-group"><label className="form-label">PAN Number</label><input className="form-input" placeholder="ABCDE1234F" /></div>
                <button className="btn btn-primary btn-sm" onClick={() => toast.add("Bank Details Saved","","success")}>Save</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 15. ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────
function AdminDashboard() {
  const { isAuth, user } = useContext(AuthCtx);
  const toast = useContext(ToastCtx);
  const [nav, setNav] = useState("overview");
  const [userSearch, setUserSearch] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminStats, setAdminStats] = useState(null);

  const loadAdminData = useCallback(async () => {
    if (!isAuth || user?.role !== "admin") return;
    try {
      const [u, e, b, s] = await Promise.all([
        api("/admin/users"),
        api("/admin/events"),
        api("/admin/bookings"),
        api("/admin/stats"),
      ]);
      setAdminUsers((u.data?.users || []).map((x) => ({
        id: (x._id ?? x.id)?.toString?.() ?? String(x.id),
        name: x.name,
        email: x.email,
        role: (x.role || "user").charAt(0).toUpperCase() + (x.role || "user").slice(1),
        joined: x.createdAt ? new Date(x.createdAt).toLocaleDateString() : "—",
        status: x.accountStatus === "flagged" ? "Flagged" : "Active",
        bookings: 0,
      })));
      setAdminEvents((e.data?.events || []).map(normalizeEvent));
      setAdminBookings(b.data?.bookings || []);
      setAdminStats(s.data?.stats || null);
    } catch (err) {
      toast.add("Admin data load failed", err.message || "", "error");
    }
  }, [isAuth, user?.role, toast]);

  useEffect(() => {
    if (isAuth && user?.role === "admin") loadAdminData();
  }, [isAuth, user?.role, loadAdminData]);

  const navItems = [
    { id:"overview",   icon:"📊", label:"Overview",        badge:null },
    { id:"users",      icon:"👥", label:"Manage Users",    badge:"3" },
    { id:"events",     icon:"🎪", label:"Manage Events",   badge:null },
    { id:"payments",   icon:"💳", label:"Payments",        badge:null },
    { id:"organizers", icon:"🏢", label:"Organizers",      badge:"2" },
    { id:"reports",    icon:"📈", label:"Reports",         badge:null },
    { id:"settings",   icon:"⚙️", label:"System Settings", badge:null },
  ];

  if (!isAuth || user?.role!=="admin") return (
    <div className="page section container" style={{ textAlign:"center" }}>
      <div style={{ fontSize:52, marginBottom:16 }}>🚫</div>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:12 }}>Admin Access Required</h2>
      <p style={{ color:"var(--text2)" }}>Sign in with the admin account from your server configuration (see <code style={{ fontSize:13 }}>.env</code>).</p>
    </div>
  );

  return (
    <div className="page" style={{ paddingTop:68 }}>
      <div className="dash-grid">
        <Sidebar title="Admin Panel" subtitle="⚠ Super Admin" subtitleColor="var(--red)" items={navItems} active={nav} setActive={setNav} />
        <div className="dash-content">

          {nav==="overview" && (
            <div>
              <div className="flex-between mb-28">
                <div>
                  <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:4 }}>Admin Dashboard</h2>
                  <p style={{ color:"var(--text2)" }}>System-wide overview and controls</p>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="btn btn-ghost btn-sm">📥 Export Data</button>
                  <button className="btn btn-primary btn-sm" onClick={() => toast.add("Broadcast Sent","Notification sent to all users","success")}>📢 Broadcast</button>
                </div>
              </div>
              <div className="stats-row" style={{ marginBottom:32 }}>
                <StatCard num={adminUsers.length ? String(adminUsers.length) : (adminStats ? String(adminStats.users + adminStats.organizers) : "—")} label="Users (loaded)" icon="👥" trend="Live API" />
                <StatCard num={adminStats ? String(adminStats.organizers) : "—"} label="Organizers (role)" icon="🏢" trend="Live API" />
                <StatCard num={adminStats ? String(adminStats.events) : "—"} label="Events" icon="🎪" />
                <StatCard num={adminStats ? `₹${(adminStats.grossRevenue / 100000).toFixed(1)}L` : "—"} label="Gross Revenue" icon="💰" trend="Confirmed bookings" />
              </div>
              {/* Charts row */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22, marginBottom:28 }}>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:16 }}>Monthly Revenue (₹L)</h4>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={REVENUE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" /><YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#e8b86d" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:16 }}>Events by Category</h4>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={CATEGORY_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                        {CATEGORY_DATA.map((e,i) => <Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip /><Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:16 }}>System Health</h4>
                  {[["API Response","98ms","var(--green)"],["Server Uptime","99.97%","var(--green)"],["DB Query","12ms","var(--green)"],["Error Rate","0.03%","var(--accent)"]].map(([l,v,c]) => (
                    <div key={l} className="flex-between" style={{ padding:"9px 0", borderBottom:"1px solid var(--border)", fontSize:14 }}>
                      <span style={{ color:"var(--text2)" }}>{l}</span>
                      <span style={{ fontWeight:700, color:c }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:16 }}>Pending Approvals</h4>
                  {ORGANIZERS_LIST.filter(o=>o.status==="Pending").map(o => (
                    <div key={o.name} className="flex-between" style={{ padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                      <span style={{ fontSize:14, fontWeight:600 }}>{o.name}</span>
                      <div style={{ display:"flex", gap:6 }}>
                        <button className="btn btn-success btn-xs" onClick={() => toast.add("Approved","","success")}>✓</button>
                        <button className="btn btn-danger btn-xs" onClick={() => toast.add("Rejected","","error")}>✗</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {nav==="users" && (
            <div>
              <div className="flex-between mb-20">
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:28 }}>Manage Users</h2>
                <div style={{ display:"flex", gap:10 }}>
                  <div className="search-bar" style={{ margin:0, maxWidth:260, padding:"6px 6px 6px 14px" }}>
                    <span>🔍</span>
                    <input placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)} />
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => toast.add("Feature Coming Soon","","info")}>+ Add User</button>
                </div>
              </div>
              <div className="stats-row" style={{ marginBottom:22 }}>
                <StatCard num={String(adminUsers.length)} label="Loaded Users" icon="👥" />
                <StatCard num={String(adminUsers.filter((u) => u.role === "Organizer").length)} label="Organizers" icon="🏢" />
                <StatCard num={String(adminUsers.filter((u) => u.role === "Admin").length)} label="Admins" icon="🛡️" />
                <StatCard num={String(adminUsers.filter((u) => u.status === "Flagged").length)} label="Flagged" icon="🚩" />
              </div>
              <div className="table-card">
                <table>
                  <thead><tr><th>User</th><th>Role</th><th>Bookings</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {adminUsers.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
                      <tr key={u.email}>
                        <td><div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div className="avatar" style={{ width:34, height:34, fontSize:13 }}>{u.name[0]}</div>
                          <div><div style={{ fontWeight:600, fontSize:14 }}>{u.name}</div><div style={{ color:"var(--muted)", fontSize:11 }}>{u.email}</div></div>
                        </div></td>
                        <td><span className={`badge ${u.role==="Admin"?"badge-danger":u.role==="Organizer"?"badge-info":"badge-warn"}`}>{u.role}</span></td>
                        <td>{u.bookings}</td>
                        <td style={{ color:"var(--text2)", fontSize:13 }}>{u.joined}</td>
                        <td><Badge status={u.status} /></td>
                        <td>
                          <div style={{ display:"flex", gap:6 }}>
                            <button className="btn btn-ghost btn-xs" onClick={() => toast.add("Viewing "+u.name,"","info")}>View</button>
                            {u.status==="Flagged"
                              ? <button className="btn btn-success btn-xs" onClick={async () => {
                                try {
                                  await api(`/admin/users/${u.id}/status`, { method: "PATCH", body: { accountStatus: "active" } });
                                  await loadAdminData();
                                  toast.add("User Restored","","success");
                                } catch (err) { toast.add("Error", err.message, "error"); }
                              }}>Restore</button>
                              : <button className="btn btn-danger btn-xs" onClick={async () => {
                                try {
                                  await api(`/admin/users/${u.id}/status`, { method: "PATCH", body: { accountStatus: "flagged" } });
                                  await loadAdminData();
                                  toast.add("User Blocked","","warning");
                                } catch (err) { toast.add("Error", err.message, "error"); }
                              }}>Block</button>
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav==="events" && (
            <div>
              <div className="flex-between mb-20">
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:28 }}>Manage Events</h2>
                <div style={{ display:"flex", gap:8 }}>
                  {["All","Active","Pending","Cancelled"].map(s => (
                    <button key={s} className="filter-tag" style={{ fontSize:12, padding:"5px 14px" }}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="table-card">
                <table>
                  <thead><tr><th>Event</th><th>Organizer</th><th>Date</th><th>Fill %</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {adminEvents.map(e => {
                      const pct = Math.round((e.booked/e.seats)*100);
                      return (
                        <tr key={e.id}>
                          <td><div style={{ fontWeight:600 }}>{e.emoji} {e.title}</div><div style={{ color:"var(--muted)", fontSize:11 }}>📍 {e.location}</div></td>
                          <td style={{ fontSize:13, color:"var(--text2)" }}>{e.organizer?.name || "—"}</td>
                          <td style={{ fontSize:13, color:"var(--text2)" }}>{e.date}</td>
                          <td><div style={{ display:"flex", alignItems:"center", gap:6 }}><MiniBar pct={pct} /><span style={{ fontSize:12, color:"var(--muted)" }}>{pct}%</span></div></td>
                          <td style={{ fontWeight:700, color:"var(--accent)" }}>₹{(e.price*e.booked/1000).toFixed(1)}K</td>
                          <td><Badge status={e.orgStatus||"Active"} /></td>
                          <td><div style={{ display:"flex", gap:6 }}>
                            <button className="btn btn-ghost btn-xs" onClick={() => toast.add("Viewing event","","info")}>View</button>
                            <button className="btn btn-danger btn-xs" onClick={async () => {
                              if (!window.confirm("Remove this event from the platform?")) return;
                              try {
                                await api(`/events/${e.id}`, { method: "DELETE" });
                                await loadAdminData();
                                toast.add("Event removed","","warning");
                              } catch (err) { toast.add("Error", err.message, "error"); }
                            }}>Remove</button>
                          </div></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav==="payments" && (
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:22 }}>Payment Records</h2>
              <div className="stats-row" style={{ marginBottom:28 }}>
                <StatCard num="₹48L"   label="Gross Revenue"       icon="💰" />
                <StatCard num="₹2.4L"  label="Platform Fee (5%)"   icon="🏦" />
                <StatCard num="₹45.6L" label="Paid to Organizers"  icon="💸" />
                <StatCard num="3"       label="Pending Refunds"     icon="⏳" />
              </div>
              <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
                {["All","Success","Pending","Refunded","Failed"].map(s => (
                  <button key={s} className="filter-tag" style={{ fontSize:12, padding:"5px 14px" }}>{s}</button>
                ))}
              </div>
              <div className="table-card">
                <table>
                  <thead><tr><th>Transaction ID</th><th>User</th><th>Event</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {adminBookings.map((b) => {
                      const row = {
                        id: b.bookingId || b._id,
                        user: b.user?.name || "—",
                        event: b.event?.title || "—",
                        amount: b.total,
                        method: b.paymentMethod || "—",
                        date: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "—",
                        status: b.status === "Confirmed" ? "Success" : b.status,
                      };
                      return (
                      <tr key={String(b._id || b.bookingId)}>
                        <td style={{ color:"var(--accent)", fontWeight:700, fontSize:13 }}>{row.id}</td>
                        <td style={{ fontSize:13 }}>{row.user}</td>
                        <td style={{ fontSize:13, color:"var(--text2)" }}>{row.event}</td>
                        <td style={{ fontWeight:700 }}>₹{row.amount.toLocaleString()}</td>
                        <td style={{ fontSize:13 }}>{row.method}</td>
                        <td style={{ color:"var(--muted)", fontSize:13 }}>{row.date}</td>
                        <td><Badge status={row.status} /></td>
                        <td><button className="btn btn-ghost btn-xs">Details</button></td>
                      </tr>
                    );})}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav==="organizers" && (
            <div>
              <div className="flex-between mb-20">
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:28 }}>Organizers</h2>
                <button className="btn btn-primary btn-sm" onClick={() => toast.add("Invite sent","","success")}>+ Invite Organizer</button>
              </div>
              <div className="stats-row" style={{ marginBottom:22 }}>
                <StatCard num="650" label="Total"     icon="🏢" />
                <StatCard num="635" label="Verified"  icon="✅" />
                <StatCard num="12"  label="Pending"   icon="⏳" />
                <StatCard num="3"   label="Suspended" icon="🚫" />
              </div>
              <div className="table-card">
                <table>
                  <thead><tr><th>Organizer</th><th>Events</th><th>Attendees</th><th>Revenue</th><th>Since</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {ORGANIZERS_LIST.map(o => (
                      <tr key={o.name}>
                        <td><div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div className="avatar" style={{ width:34, height:34, fontSize:14 }}>{o.name[0]}</div>
                          <span style={{ fontWeight:600, fontSize:14 }}>{o.name}</span>
                        </div></td>
                        <td>{o.events}</td>
                        <td>{o.attendees.toLocaleString()}</td>
                        <td style={{ fontWeight:700, color:"var(--accent)" }}>{o.revenue}</td>
                        <td style={{ color:"var(--text2)", fontSize:13 }}>{o.since}</td>
                        <td><Badge status={o.status} /></td>
                        <td><div style={{ display:"flex", gap:6 }}>
                          {o.status==="Pending" && <button className="btn btn-success btn-xs" onClick={() => toast.add("Organizer Approved","","success")}>Approve</button>}
                          {o.status==="Verified" && <button className="btn btn-ghost btn-xs">View</button>}
                          {o.status==="Suspended"
                            ? <button className="btn btn-success btn-xs" onClick={() => toast.add("Organizer Restored","","success")}>Restore</button>
                            : <button className="btn btn-danger btn-xs" onClick={() => toast.add("Organizer Suspended","","warning")}>Suspend</button>
                          }
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav==="reports" && (
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:24 }}>Platform Analytics</h2>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Monthly Revenue (₹L)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={REVENUE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" /><YAxis />
                      <Tooltip /><Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#e8b86d" strokeWidth={3} dot={{ fill:"#e8b86d", r:5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Weekly Bookings</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={BOOKING_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" /><YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#4ecb8d" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Event Categories</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={CATEGORY_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75}>
                        {CATEGORY_DATA.map((e,i) => <Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip /><Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:22 }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:17, marginBottom:18 }}>Top Cities</h4>
                  {[["Mumbai",38],["Bengaluru",24],["Delhi",19],["Hyderabad",12],["Pune",7]].map(([city,pct],i) => (
                    <div key={city} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                      <div style={{ fontSize:13, color:"var(--muted)", width:16 }}>{i+1}</div>
                      <div style={{ flex:1, fontSize:13 }}>🏙️ {city}</div>
                      <MiniBar pct={pct} />
                      <div style={{ fontSize:12, color:"var(--accent)", fontWeight:700, width:32 }}>{pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {nav==="settings" && (
            <div style={{ maxWidth:580 }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, marginBottom:6 }}>System Settings</h2>
              <p style={{ color:"var(--text2)", marginBottom:28, fontSize:14 }}>Configure platform-wide settings</p>
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:26, marginBottom:22 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--text2)", textTransform:"uppercase", letterSpacing:0.8, marginBottom:18 }}>Platform Configuration</div>
                <div className="form-group"><label className="form-label">Platform Fee (%)</label><input className="form-input" defaultValue="5" type="number" /></div>
                <div className="form-group"><label className="form-label">Max Tickets per Booking</label><input className="form-input" defaultValue="10" type="number" /></div>
                <div className="form-group"><label className="form-label">Refund Window (hours)</label><input className="form-input" defaultValue="24" type="number" /></div>
                <div className="form-group"><label className="form-label">Support Email</label><input className="form-input" defaultValue="hello@eventify.in" /></div>
                <button className="btn btn-primary btn-sm" onClick={() => toast.add("Config Saved","","success")}>Save Configuration</button>
              </div>
              <div style={{ background:"rgba(232,93,93,0.06)", border:"1px solid rgba(232,93,93,0.28)", borderRadius:var_radius(), padding:24 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--red)", textTransform:"uppercase", letterSpacing:0.8, marginBottom:16 }}>Danger Zone</div>
                <div className="flex-between">
                  <div>
                    <div className="fw-bold" style={{ marginBottom:4 }}>Maintenance Mode</div>
                    <div style={{ color:"var(--muted)", fontSize:13 }}>Take the platform offline for maintenance.</div>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => toast.add("Maintenance Mode Enabled","Platform is now offline","warning")}>Enable</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 16. STATIC PAGES
// ─────────────────────────────────────────────────────────────
function HowItWorksPage() {
  return (
    <div className="page section container">
      <div className="section-header">
        <div className="section-tag">How It Works</div>
        <h1 className="section-title">Simple. Fast. Secure.</h1>
        <p className="section-sub">From discovery to entry — Eventify makes event booking effortless.</p>
      </div>
      <div style={{ display:"grid", gap:20, maxWidth:700, margin:"0 auto 80px" }}>
        {[["1","🔍","Discover Events","Browse thousands of events — filter by city, date, category, or price."],
          ["2","📝","Create an Account","Sign up free. One account to book tickets and track everything."],
          ["3","🎟️","Select & Book","Choose ticket type and quantity, then proceed to checkout."],
          ["4","💳","Pay via Razorpay","UPI, cards, net banking, or wallets — all SSL encrypted."],
          ["5","📧","Get Confirmation","Instant email with booking ID and QR code ticket."],
          ["6","🚪","Show QR & Walk In","Flash your QR at the gate. Enjoy the event!"]].map(([n,icon,title,desc]) => (
          <div key={n} style={{ display:"flex", gap:22, padding:26, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius() }}>
            <div className="step-num" style={{ margin:0, fontSize:18, flexShrink:0 }}>{n}</div>
            <div>
              <div style={{ fontSize:26, marginBottom:8 }}>{icon}</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:19, fontWeight:700, marginBottom:6 }}>{title}</div>
              <div style={{ color:"var(--text2)", lineHeight:1.7 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page section container">
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div className="section-tag text-center">About Us</div>
        <h1 className="section-title text-center">Building the Future<br />of Events in India</h1>
        <p style={{ color:"var(--text2)", textAlign:"center", fontSize:17, lineHeight:1.8, marginBottom:56 }}>
          Eventify was founded to make it effortless for anyone in India to discover and attend incredible events, and for organizers to manage them beautifully.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:56 }}>
          {[["🎯","Our Mission","Democratize event experiences across India."],
            ["👁️","Our Vision","A future where no great event goes unnoticed."],
            ["💡","Innovation","MERN stack, real-time notifications, AI recommendations."],
            ["🤝","Community","650+ organizers, 180K+ attendees trust Eventify."]].map(([icon,title,desc]) => (
            <div key={title} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:var_radius(), padding:26 }}>
              <div style={{ fontSize:34, marginBottom:14 }}>{icon}</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:19, fontWeight:700, marginBottom:8 }}>{title}</div>
              <div style={{ color:"var(--text2)", lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:44, textAlign:"center" }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, marginBottom:22 }}>Meet the Team</h2>
          <div style={{ display:"flex", justifyContent:"center", gap:28, flexWrap:"wrap" }}>
            {[["A","Aarav Shah","Co-Founder & CEO"],["P","Priya Nair","CTO & Lead Dev"],["R","Rohit Gupta","Head of Design"]].map(([init,name,role]) => (
              <div key={name} style={{ textAlign:"center" }}>
                <div className="avatar" style={{ width:68, height:68, fontSize:26, margin:"0 auto 12px", border:"3px solid var(--accent)" }}>{init}</div>
                <div className="fw-bold">{name}</div>
                <div style={{ color:"var(--muted)", fontSize:13 }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const toast = useContext(ToastCtx);
  const [sent, setSent] = useState(false);
  const { values, errors, register, validateAll } = useForm({ name:"", email:"", subject:"General Inquiry", message:"" });

  const send = async () => {
    if (!validateAll({ name:{required:true}, email:{required:true, pattern:{value:/\S+@\S+\.\S+/, message:"Valid email required"}}, message:{required:true, minLength:10} })) return;
    try {
      await api("/contact", {
        method: "POST",
        body: {
          name: values.name,
          email: values.email,
          subject: values.subject || "General Inquiry",
          message: values.message,
        },
        skipAuth: true,
      });
      setSent(true);
      toast.add("Message Sent!", "We'll reply within 24 hours", "success");
    } catch (e) {
      toast.add("Could not send", e.message || "Try again later", "error");
    }
  };

  return (
    <div className="page section container">
      <div style={{ maxWidth:880, margin:"0 auto" }}>
        <div className="section-header">
          <div className="section-tag">Contact Us</div>
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-sub">Questions, partnerships, or support — we're here to help.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:44 }}>
          <div>
            {[["📧","Email","hello@eventify.in"],["📞","Phone","+91 98765 43210"],["📍","Address","BKC, Mumbai 400051"],["🕐","Hours","Mon–Sat, 9 AM – 8 PM IST"]].map(([icon,label,val]) => (
              <div key={label} className="info-row"><span className="info-icon">{icon}</span><div><div className="info-label">{label}</div><div>{val}</div></div></div>
            ))}
            <div style={{ marginTop:28 }}>
              <div className="fw-bold mb-8">Follow Us</div>
              <div style={{ display:"flex", gap:10 }}>
                {["𝕏","in","f","▶"].map(s => (
                  <div key={s} style={{ width:40, height:40, borderRadius:9, background:"var(--surface2)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14, fontWeight:700 }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:32 }}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ fontSize:48, marginBottom:14 }}>✅</div>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, marginBottom:8 }}>Message Sent!</h3>
                <p style={{ color:"var(--text2)" }}>We'll get back to you within 24 hours.</p>
                <button className="btn btn-ghost mt-24" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, marginBottom:22 }}>Send a Message</h3>
                <div className="form-group"><label className="form-label">Full Name *</label><input {...register("name",{required:true})} placeholder="Your Name" />{errors.name&&<div className="form-error">{errors.name}</div>}</div>
                <div className="form-group"><label className="form-label">Email *</label><input {...register("email",{required:true,pattern:{value:/\S+@\S+\.\S+/,message:"Valid email"}})} placeholder="your@email.com" />{errors.email&&<div className="form-error">{errors.email}</div>}</div>
                <div className="form-group"><label className="form-label">Subject</label>
                  <select {...register("subject")} className="form-input"><option>General Inquiry</option><option>Partnership</option><option>Technical Support</option><option>Event Organizer</option></select>
                </div>
                <div className="form-group"><label className="form-label">Message *</label><textarea {...register("message",{required:true,minLength:10})} className="form-input" rows={4} placeholder="How can we help?" />{errors.message&&<div className="form-error">{errors.message}</div>}</div>
                <button className="btn btn-primary btn-lg" style={{ width:"100%", justifyContent:"center" }} onClick={send}>Send Message →</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 17. AUTH MODAL (JWT-powered)
// ─────────────────────────────────────────────────────────────
function AuthModal({ type, setModal, setPage }) {
  const { login } = useContext(AuthCtx);
  const toast = useContext(ToastCtx);
  const [mode, setMode] = useState(type);
  const { values, errors, register, validateAll } = useForm({ name:"", email:"", password:"", role:"user" });
  const [loading, setLoading] = useState(false);

  const SCHEMA_LOGIN    = { email:{required:true,pattern:{value:/\S+@\S+\.\S+/,message:"Valid email"}}, password:{required:true,minLength:6} };
  const SCHEMA_REGISTER = { ...SCHEMA_LOGIN, name:{required:true,minLength:2} };

  const submit = async () => {
    if (!validateAll(mode==="login" ? SCHEMA_LOGIN : SCHEMA_REGISTER)) return;
    setLoading(true);
    try {
      if (mode==="login") {
        const res = await api("/auth/login", {
          method: "POST",
          body: { email: values.email, password: values.password },
          skipAuth: true,
        });
        login(res.data);
        const role = res.data.user.role;
        setModal(null);
        if (role==="admin") setPage("admin");
        else if (role==="organizer") setPage("organizer");
        else setPage("account");
      } else {
        const res = await api("/auth/register", {
          method: "POST",
          body: {
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role || "user",
          },
          skipAuth: true,
        });
        login(res.data);
        const role = res.data.user.role;
        setModal(null);
        if (role==="organizer") setPage("organizer");
        else setPage("account");
      }
    } catch (e) {
      toast.add("Authentication failed", e.message || "Try again", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setModal(null)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{mode==="login" ? "Welcome Back" : "Join Eventify"}</div>
        <div className="modal-sub">{mode==="login" ? "Sign in to your account to continue" : "Create your free account today"}</div>

        {mode==="register" && (
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input {...register("name",{required:true,minLength:2})} placeholder="Your Name" />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input {...register("email",{required:true,pattern:{value:/\S+@\S+\.\S+/,message:"Valid email required"}})} placeholder="your@email.com" />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Password *</label>
          <input {...register("password",{required:true,minLength:6})} type="password" placeholder="••••••••" />
          {errors.password && <div className="form-error">{errors.password}</div>}
        </div>
        {mode==="register" && (
          <div className="form-group">
            <label className="form-label">Account Type</label>
            <select {...register("role")} className="form-input">
              <option value="user">Attendee</option>
              <option value="organizer">Event Organizer</option>
            </select>
          </div>
        )}

        {mode==="login" && (
          <div style={{ fontSize:12, color:"var(--muted)", marginBottom:16, padding:"10px 14px", background:"var(--surface2)", borderRadius:8 }}>
            💡 <strong>Demo:</strong> Use the admin account from your server <code style={{ fontSize:11 }}>.env</code> (default admin@eventify.in / admin123) or register as organizer.
          </div>
        )}

        <button className="btn btn-primary btn-lg" style={{ width:"100%", justifyContent:"center", marginBottom:16 }} onClick={submit} disabled={loading}>
          {loading ? "⏳ Please wait..." : mode==="login" ? "Login →" : "Create Account →"}
        </button>
        <p style={{ textAlign:"center", color:"var(--text2)", fontSize:14 }}>
          {mode==="login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span style={{ color:"var(--accent)", cursor:"pointer", fontWeight:700 }}
            onClick={() => { setMode(mode==="login"?"register":"login"); }}>
            {mode==="login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 18. FOOTER
// ─────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">✦ Eventify</div>
            <div className="footer-desc">India's premier event management platform. Discover, book, and manage events with ease.</div>
          </div>
          <div>
            <div className="footer-heading">Platform</div>
            <ul className="footer-links">
              {[["Browse Events","events"],["How It Works","how"],["For Organizers","organizer"],["Pricing","about"]].map(([l,p]) => (
                <li key={l}><button onClick={() => setPage(p)}>{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Company</div>
            <ul className="footer-links">
              {[["About Us","about"],["Contact","contact"],["Careers","about"],["Blog","about"]].map(([l,p]) => (
                <li key={l}><button onClick={() => setPage(p)}>{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Support</div>
            <ul className="footer-links">
              {["Help Center","Privacy Policy","Terms of Service","Refund Policy"].map(l => (
                <li key={l}><button>{l}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2025 Eventify. All rights reserved.</div>
          <div>Made with ♥ for event lovers across India</div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// 19. APP ROOT
// ─────────────────────────────────────────────────────────────
function AppInner() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  return (
    <>
      <style>{STYLES}</style>
      <Navbar page={page} setPage={setPage} setModal={setModal} />
      {modal && <AuthModal type={modal} setModal={setModal} setPage={setPage} />}

      {page==="home"         && <HomePage         setPage={setPage} setSelectedEvent={setSelectedEvent} setModal={setModal} />}
      {page==="events"       && <EventsPage        setPage={setPage} setSelectedEvent={setSelectedEvent} />}
      {page==="event-detail" && <EventDetailPage   event={selectedEvent} setPage={setPage} setModal={setModal} />}
      {page==="booking"      && <BookingPage       event={selectedEvent} setPage={setPage} setModal={setModal} />}
      {page==="account"      && <UserDashboard     setPage={setPage} setModal={setModal} />}
      {page==="organizer"    && <OrganizerDashboard setPage={setPage} />}
      {page==="admin"        && <AdminDashboard />}
      {page==="how"          && <HowItWorksPage />}
      {page==="about"        && <AboutPage />}
      {page==="contact"      && <ContactPage />}
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <EventProvider>
            <AppInner />
          </EventProvider>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
