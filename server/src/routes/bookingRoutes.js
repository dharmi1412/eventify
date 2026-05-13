import { Router } from "express";
import { body, param } from "express-validator";
import * as bookings from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  [
    body("eventId").isMongoId(),
    body("tickets").optional().isInt({ min: 1, max: 10 }),
    body("paymentMethod").optional().isString(),
    body("razorpayPaymentId").optional().isString(),
    body("attendeeName").trim().notEmpty(),
    body("attendeeEmail").isEmail().normalizeEmail(),
    body("attendeePhone").trim().notEmpty(),
  ],
  validateRequest,
  bookings.createBooking
);

router.get("/me", bookings.listMyBookings);

router.get("/event/:eventId", [param("eventId").isMongoId()], validateRequest, bookings.listBookingsForEvent);

router.get("/:id", [param("id").isMongoId()], validateRequest, bookings.getBooking);

router.patch("/:id/cancel", [param("id").isMongoId()], validateRequest, bookings.cancelBooking);

export default router;
