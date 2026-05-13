import ContactMessage from "../models/ContactMessage.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

export const submitContact = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const doc = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({
    success: true,
    message: "Message received — we will reply within 24 hours",
    data: { id: doc._id },
  });
});

export const listContactMessages = catchAsync(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(200);
  res.json({ success: true, data: { messages } });
});

export const markContactRead = catchAsync(async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!msg) throw new ApiError(404, "Message not found");
  res.json({ success: true, data: { message: msg } });
});
