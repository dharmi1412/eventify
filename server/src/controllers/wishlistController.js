import Wishlist from "../models/Wishlist.js";
import Event from "../models/Event.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

export const getWishlist = catchAsync(async (req, res) => {
  let list = await Wishlist.findOne({ user: req.user._id }).populate("events");
  if (!list) list = await Wishlist.create({ user: req.user._id, events: [] });
  res.json({ success: true, data: { events: list.events } });
});

export const addToWishlist = catchAsync(async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) throw new ApiError(404, "Event not found");
  const list = await Wishlist.findOneAndUpdate(
    { user: req.user._id },
    { $addToSet: { events: event._id } },
    { new: true, upsert: true }
  ).populate("events");
  res.json({ success: true, data: { events: list.events } });
});

export const removeFromWishlist = catchAsync(async (req, res) => {
  const list = await Wishlist.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { events: req.params.eventId } },
    { new: true }
  ).populate("events");
  res.json({ success: true, data: { events: list?.events || [] } });
});
