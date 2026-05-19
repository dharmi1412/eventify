[...]
function useForm(defaults = {}) {
  [...]
  const register = (name, rules = {}) => ({
    value: values[name] ?? "",
    onChange: (e) => {
      [...]
    },
    onBlur: () => {
      setTouched(p => ({ ...p, [name]: true }));
      validate(name, values[name], rules);
    },
    className: `form-input${errors[name] ? " error" : ""}`,
  });

  const validate = (name, value, rules) => {
    [...]
  };

  const validateAll = (schema) => {
    [...]
  };

  const reset = () => { setValues(defaults); setErrors({}); setTouched({}); };
  const setValue = (name, val) => setValues(p => ({ ...p, [name]: val }));

  return { values, errors, register, validateAll, reset, setValue };
}

// Pagination hook
function usePagination(items, perPage = 6) {
  [...]
}
[...]
function ToastProvider({ children }) {
  [...]
}

function AuthProvider({ children }) {
  [...]
  const login = ({ token: t, user: u }) => {
    [...]
  };

  const logout = () => {
    [...]
  };
  [...]
}

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const toggle = () => setDark(d => !d);
  [...]
}

function EventProvider({ children }) {
  [...]
  const addEvent = async (payload) => {
    [...]
  };

  const updateEvent = async (id, data) => {
    [...]
  };

  const deleteEvent = async (id) => {
    [...]
  };
  [...]
}
[...]
const Badge = ({ status }) => {
  [...]
};

const StatCard = ({ num, label, icon, trend }) => (
  [...]
);

const MiniBar = ({ pct, color = "var(--accent)" }) => (
  [...]
);

function Sidebar({ title, subtitle, subtitleColor, items, active, setActive }) {
  [...]
}

// QR Code Generator (ASCII-art style)
function QRCode({ value, size = 140 }) {
  [...]
}

// Skeleton loader for event cards
function SkeletonCard() {
  [...]
}

// PDF Ticket "generator" — opens printable page
function generatePDFTicket(booking, user) {
  [...]
}

// Razorpay stub
function loadRazorpay(amount, name, onSuccess) {
  [...]
}

// Cloudinary upload stub
async function uploadToCloudinary(file) {
  // In production: POST to https://api.cloudinary.com/v1_1/{cloud}/image/upload
  return new Promise(resolve => setTimeout(() => resolve({ url: URL.createObjectURL(file), public_id: "evt_"+Date.now() }), 1200));
}
[...]
function Navbar({ page, setPage, setModal }) {
  [...]
}
[...]
function EventCard({ event, setPage, setSelectedEvent }) {
  [...]
}
[...]
function HomePage({ setPage, setSelectedEvent, setModal }) {
  [...]
}
[...]
function EventsPage({ setPage, setSelectedEvent }) {
  [...]
}
[...]
function EventDetailPage({ event, setPage, setModal }) {
  [...]
  const toggleWish = async () => {
    [...]
  };
  [...]
}

function var_radius() { return "var(--radius)"; } // helper
[...]
function BookingPage({ event, setPage, setModal }) {
  [...]
  const handlePay = () => {
    [...]
  };
  [...]
}
[...]
function UserDashboard({ setPage, setModal }) {
  [...]
}

function ProfileTab({ user }) {
  [...]
  const handleImgUpload = async (e) => {
    [...]
  };

  const save = async () => {
    [...]
  };
  [...]
}

function SettingsTab() {
  [...]
  const persistToggles = async (next) => {
    [...]
  };

  const T = ({ name, label, desc }) => (
    [...]
  );

  const updatePassword = async () => {
    [...]
  };

  const deleteAccount = async () => {
    [...]
  };
  [...]
}
[...]
function OrganizerDashboard({ setPage }) {
  [...]
  const startEdit = (ev) => {
    [...]
  };

  const publish = async (draft = false) => {
    [...]
  };

  const handleBanner = async (e) => {
    [...]
  };
  [...]
}
[...]
function AdminDashboard() {
  [...]
}
[...]
function HowItWorksPage() {
  [...]
}

function AboutPage() {
  [...]
}

function ContactPage() {
  [...]
  const send = async () => {
    [...]
  };
  [...]
}
[...]
function AuthModal({ type, setModal, setPage }) {
  [...]
  const submit = async () => {
    [...]
  };
  [...]
}
[...]
function Footer({ setPage }) {
  [...]
}
[...]
function AppInner() {
  [...]
}

export default function App() {
  [...]
}
