import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import User from "../models/User.js";
import Event from "../models/Event.js";

const SEED_EVENTS = [
  { title: "Mumbai Music Festival", category: "Music", date: "Dec 20, 2025", time: "6:00 PM", location: "BKC, Mumbai", price: 1499, emoji: "🎵", seats: 320, booked: 210, description: "Annual music celebration." },
  { title: "TechConf India 2025", category: "Tech", date: "Jan 15, 2026", time: "9:00 AM", location: "Bengaluru Convention Centre", price: 2999, emoji: "💻", seats: 500, booked: 340, description: "India's leading tech conference." },
  { title: "Comedy Night Special", category: "Entertainment", date: "Dec 28, 2025", time: "8:00 PM", location: "Nehru Centre, Mumbai", price: 799, emoji: "😂", seats: 200, booked: 180, description: "Stand-up comedy showcase." },
  { title: "Art & Culture Expo", category: "Arts", date: "Jan 5, 2026", time: "11:00 AM", location: "NGMA, New Delhi", price: 499, emoji: "🎨", seats: 400, booked: 120, description: "Contemporary art and culture." },
  { title: "Startup Summit 2025", category: "Business", date: "Dec 22, 2025", time: "10:00 AM", location: "Hyderabad Int. Convention", price: 3499, emoji: "🚀", seats: 600, booked: 450, description: "Founders and investors meet." },
  { title: "Yoga & Wellness Retreat", category: "Health", date: "Jan 10, 2026", time: "7:00 AM", location: "Rishikesh", price: 1999, emoji: "🧘", seats: 100, booked: 60, description: "Mindful weekend retreat." },
  { title: "Bangalore Social Mixer", category: "Social", date: "Dec 24, 2025", time: "7:00 PM", location: "Indiranagar, Bengaluru", price: 599, emoji: "🥂", seats: 150, booked: 98, description: "Networking mixer." },
  { title: "Delhi Speed Networking", category: "Social", date: "Jan 3, 2026", time: "6:30 PM", location: "Connaught Place, Delhi", price: 799, emoji: "🤝", seats: 120, booked: 74, description: "Rapid networking rounds." },
  { title: "Mumbai Rooftop Social", category: "Social", date: "Jan 8, 2026", time: "8:00 PM", location: "Lower Parel, Mumbai", price: 899, emoji: "🌆", seats: 80, booked: 61, description: "Rooftop sunset social." },
  { title: "Photography Masterclass", category: "Arts", date: "Jan 12, 2026", time: "10:00 AM", location: "Colaba, Mumbai", price: 2499, emoji: "📸", seats: 60, booked: 44, description: "Pro photography workshop." },
  { title: "Blockchain Dev Summit", category: "Tech", date: "Jan 20, 2026", time: "9:00 AM", location: "Whitefield, Bengaluru", price: 3999, emoji: "⛓️", seats: 400, booked: 220, description: "Web3 builders summit." },
  { title: "Fusion Dance Night", category: "Entertainment", date: "Dec 30, 2025", time: "9:00 PM", location: "Phoenix Mall, Pune", price: 1299, emoji: "💃", seats: 250, booked: 195, description: "Dance and DJ night." },
];

async function run() {
  await connectDb();
  const email = process.env.ADMIN_EMAIL || "admin@eventify.in";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  let admin = await User.findOne({ email });
  if (!admin) {
    admin = await User.create({
      name: "Admin User",
      email,
      password,
      role: "admin",
    });
    console.log("Created admin:", email);
  }
  const n = await Event.countDocuments();
  if (n === 0) {
    await Event.insertMany(SEED_EVENTS.map((e) => ({ ...e, organizer: admin._id })));
    console.log(`Inserted ${SEED_EVENTS.length} events`);
  } else {
    console.log("Events already exist, skipping event seed");
  }
  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
