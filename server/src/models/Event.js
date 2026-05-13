import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    emoji: { type: String, default: "🎪" },
    seats: { type: Number, required: true, min: 1 },
    booked: { type: Number, default: 0, min: 0 },
    orgStatus: {
      type: String,
      enum: ["Active", "Draft", "Pending", "Cancelled", "Paused"],
      default: "Active",
    },
    bannerUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

eventSchema.index({ title: "text", location: "text", description: "text" });
eventSchema.index({ category: 1, orgStatus: 1 });

export default mongoose.model("Event", eventSchema);
