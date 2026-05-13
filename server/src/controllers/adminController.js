import User from "../models/User.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

export const listUsers = catchAsync(async (req, res) => {
  const { search, status } = req.query;
  const q = {};
  if (search) {
    q.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
    ];
  }
  if (status === "active" || status === "flagged") q.accountStatus = status;
  const users = await User.find(q).sort({ createdAt: -1 }).limit(500).select("-password");
  res.json({ success: true, data: { users } });
});

export const updateUserStatus = catchAsync(async (req, res) => {
  const { accountStatus } = req.body;
  if (!["active", "flagged"].includes(accountStatus)) {
    throw new ApiError(400, "accountStatus must be active or flagged");
  }
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  if (user.role === "admin") throw new ApiError(403, "Cannot change status of admin accounts");
  user.accountStatus = accountStatus;
  await user.save();
  res.json({ success: true, data: { user } });
});

export const updateUserRole = catchAsync(async (req, res) => {
  const { role } = req.body;
  if (!["user", "organizer", "admin"].includes(role)) throw new ApiError(400, "Invalid role");
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  user.role = role;
  await user.save();
  res.json({ success: true, data: { user } });
});

export const listAllEvents = catchAsync(async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).populate("organizer", "name email");
  res.json({ success: true, data: { events } });
});

export const listAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(500)
    .populate("user", "name email")
    .populate("event", "title location date");
  res.json({ success: true, data: { bookings } });
});

export const platformStats = catchAsync(async (req, res) => {
  const [userCount, organizerCount, eventCount, bookingCount, revenueAgg] = await Promise.all([
    User.countDocuments({ role: "user" }),
    User.countDocuments({ role: "organizer" }),
    Event.countDocuments(),
    Booking.countDocuments({ status: "Confirmed" }),
    Booking.aggregate([
      { $match: { status: "Confirmed" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
  ]);
  const grossRevenue = revenueAgg[0]?.total || 0;
  res.json({
    success: true,
    data: {
      stats: {
        users: userCount,
        organizers: organizerCount,
        events: eventCount,
        confirmedBookings: bookingCount,
        grossRevenue,
      },
    },
  });
});
