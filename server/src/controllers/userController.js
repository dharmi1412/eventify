import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

export const updateProfile = catchAsync(async (req, res) => {
  const { name, phone, city, bio, avatarUrl, dateOfBirth, notificationPrefs } = req.body;
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (phone !== undefined) updates.phone = phone;
  if (city !== undefined) updates.city = city;
  if (bio !== undefined) updates.bio = bio;
  if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;
  if (dateOfBirth !== undefined) updates.dateOfBirth = dateOfBirth;
  if (notificationPrefs !== undefined) updates.notificationPrefs = notificationPrefs;
  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });
  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        dateOfBirth: user.dateOfBirth,
        notificationPrefs: user.notificationPrefs,
      },
    },
  });
});

export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "currentPassword and newPassword are required");
  }
  if (newPassword.length < 6) throw new ApiError(400, "New password must be at least 6 characters");
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(400, "Current password is incorrect");
  }
  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: "Password updated" });
});

export const deleteAccount = catchAsync(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  if (!password || !(await user.comparePassword(password))) {
    throw new ApiError(400, "Valid password required to delete account");
  }
  await User.findByIdAndDelete(req.user._id);
  res.json({ success: true, message: "Account deleted" });
});
