import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import { PLATFORM_FEE_PER_TICKET } from "./eventController.js";

function makeBookingId() {
  return `TKT-${Date.now().toString(36).toUpperCase()}`;
}

export const createBooking = catchAsync(async (req, res) => {
  const {
    eventId,
    tickets,
    paymentMethod = "UPI",
    razorpayPaymentId = "",
    attendeeName,
    attendeeEmail,
    attendeePhone,
  } = req.body;
  const t = Math.min(10, Math.max(1, +tickets || 1));
  const session = await mongoose.startSession();
  let booking;
  try {
    await session.withTransaction(async () => {
      const event = await Event.findById(eventId).session(session);
      if (!event) throw new ApiError(404, "Event not found");
      if (["Draft", "Cancelled"].includes(event.orgStatus)) {
        throw new ApiError(400, "Event is not available for booking");
      }
      if (event.seats - event.booked < t) {
        throw new ApiError(400, "Not enough seats available");
      }
      const ticketPrice = event.price;
      const platformFee = t * PLATFORM_FEE_PER_TICKET;
      const total = ticketPrice * t + platformFee;
      event.booked += t;
      await event.save({ session });
      booking = await Booking.create(
        [
          {
            bookingId: makeBookingId(),
            user: req.user._id,
            event: event._id,
            tickets: t,
            ticketPrice,
            platformFee,
            total,
            status: "Confirmed",
            paymentMethod,
            razorpayPaymentId,
            attendeeName,
            attendeeEmail,
            attendeePhone,
            seatLabel: `G${Math.floor(Math.random() * 900) + 100}`,
          },
        ],
        { session }
      );
    });
  } finally {
    session.endSession();
  }
  const populated = await Booking.findById(booking[0]._id).populate("event");
  res.status(201).json({ success: true, data: { booking: populated } });
});

export const listMyBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("event", "title emoji date location price category");
  res.json({ success: true, data: { bookings } });
});

export const getBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("event");
  if (!booking) throw new ApiError(404, "Booking not found");
  res.json({ success: true, data: { booking } });
});

export const cancelBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!booking) throw new ApiError(404, "Booking not found");
  if (booking.status === "Cancelled") throw new ApiError(400, "Already cancelled");
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const event = await Event.findById(booking.event).session(session);
      if (event) {
        event.booked = Math.max(0, event.booked - booking.tickets);
        await event.save({ session });
      }
      booking.status = "Cancelled";
      await booking.save({ session });
    });
  } finally {
    session.endSession();
  }
  res.json({ success: true, data: { booking } });
});

export const listBookingsForEvent = catchAsync(async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) throw new ApiError(404, "Event not found");
  const isOwner = event.organizer.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) throw new ApiError(403, "Not allowed");
  const bookings = await Booking.find({ event: event._id })
    .populate("user", "name email phone")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: { bookings } });
});
