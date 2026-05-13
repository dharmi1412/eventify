import "dotenv/config";
import app from "./app.js";
import { connectDb } from "./config/db.js";
import User from "./models/User.js";
import Event from "./models/Event.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL || "admin@eventify.in";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    return;
  }
  await User.create({
    name: "Admin User",
    email,
    password,
    role: "admin",
  });
  console.log(`Seeded admin user: ${email}`);
}

async function seedEventsIfEmpty() {
  const count = await Event.countDocuments();
  if (count > 0) return;
  const admin = await User.findOne({ role: "admin" });
  if (!admin) return;
  const seed = [
    { title: "Mumbai Music Festival", category: "Music", date: "Dec 20, 2025", time: "6:00 PM", location: "BKC, Mumbai", price: 1499, emoji: "🎵", seats: 320, booked: 210, description: "Annual music celebration." },
    { title: "TechConf India 2025", category: "Tech", date: "Jan 15, 2026", time: "9:00 AM", location: "Bengaluru Convention Centre", price: 2999, emoji: "💻", seats: 500, booked: 340, description: "India's leading tech conference." },
    { title: "Comedy Night Special", category: "Entertainment", date: "Dec 28, 2025", time: "8:00 PM", location: "Nehru Centre, Mumbai", price: 799, emoji: "😂", seats: 200, booked: 180, description: "Stand-up comedy showcase." },
    { title: "Art & Culture Expo", category: "Arts", date: "Jan 5, 2026", time: "11:00 AM", location: "NGMA, New Delhi", price: 499, emoji: "🎨", seats: 400, booked: 120, description: "Contemporary art and culture." },
    { title: "Startup Summit 2025", category: "Business", date: "Dec 22, 2025", time: "10:00 AM", location: "Hyderabad Int. Convention", price: 3499, emoji: "🚀", seats: 600, booked: 450, description: "Founders and investors meet." },
    { title: "Yoga & Wellness Retreat", category: "Health", date: "Jan 10, 2026", time: "7:00 AM", location: "Rishikesh", price: 1999, emoji: "🧘", seats: 100, booked: 60, description: "Mindful weekend retreat." },
    { title: "Bangalore Social Mixer", category: "Social", date: "Dec 24, 2025", time: "7:00 PM", location: "Indiranagar, Bengaluru", price: 599, emoji: "🥂", seats: 150, booked: 98, description: "Networking mixer." },
    { title: "Delhi Speed Networking", category: "Social", date: "Jan 3, 2026", time: "6:30 PM", location: "Connaught Place, Delhi", price: 799, emoji: "🤝", seats: 120, booked: 74, description: "Rapid networking rounds." },
  ];
  await Event.insertMany(seed.map((e) => ({ ...e, organizer: admin._id })));
  console.log(`Seeded ${seed.length} demo events`);
}

const PORT = process.env.PORT || 5000;

await connectDb();
await ensureAdminUser();
if (process.env.SEED_ON_START === "true") {
  await seedEventsIfEmpty();
}

app.listen(PORT, () => {
  console.log(`Eventify API listening on port ${PORT}`);
});
app.use(cors())