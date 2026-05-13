import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import eventRoutes from "./eventRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import contactRoutes from "./contactRoutes.js";
import adminRoutes from "./adminRoutes.js";
import wishlistRoutes from "./wishlistRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/bookings", bookingRoutes);
router.use("/contact", contactRoutes);
router.use("/admin", adminRoutes);
router.use("/wishlist", wishlistRoutes);

router.get("/health", (req, res) => {
  res.json({ success: true, message: "Eventify API is running" });
});

export default router;
