import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import { signToken } from "../utils/jwt.js";

const authResponse = (user) => ({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accountStatus: user.accountStatus,
    phone: user.phone,
    city: user.city,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    notificationPrefs: user.notificationPrefs,
  },
  token: signToken({ sub: user._id.toString(), role: user.role }),
});

export const register = catchAsync(async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  if (role === "admin") throw new ApiError(403, "Cannot register as admin");
  if (!["user", "organizer"].includes(role)) {
    throw new ApiError(400, "Invalid role — use user or organizer");
  }
  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(409, "Email already registered");
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ success: true, data: authResponse(user) });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  if (user.accountStatus === "flagged") {
    throw new ApiError(403, "Account suspended");
  }
  res.json({ success: true, data: authResponse(user) });
});

export const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        phone: user.phone,
        city: user.city,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        dateOfBirth: user.dateOfBirth,
        notificationPrefs: user.notificationPrefs,
        createdAt: user.createdAt,
      },
    },
  });
});
