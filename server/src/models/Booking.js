import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    tickets: { type: Number, required: true, min: 1 },
    ticketPrice: { type: Number, required: true },
    platformFee: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Confirmed",
    },
    paymentMethod: { type: String, default: "UPI" },
    razorpayPaymentId: { type: String, default: "" },
    attendeeName: { type: String, required: true },
    attendeeEmail: { type: String, required: true },
    attendeePhone: { type: String, required: true },
    seatLabel: { type: String, default: "General" },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ event: 1 });

export default mongoose.model("Booking", bookingSchema);
