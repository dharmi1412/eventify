import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const notificationSchema = new mongoose.Schema(
  {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: true },
    remind: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false },
    priceAlert: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // Legacy field from an older schema; some Atlas DBs still have a unique index on userName.
    userName: { type: String, trim: true, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user",
    },
    accountStatus: {
      type: String,
      enum: ["active", "flagged"],
      default: "active",
    },
    phone: { type: String, default: "" },
    city: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    bannerUrl: { type: String, default: "" },
    dateOfBirth: { type: Date },
    notificationPrefs: { type: notificationSchema, default: () => ({}) },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.pre("save", function prepareUser() {
  if (!this.userName && this.email) {
    this.userName = String(this.email).toLowerCase();
  }
  if (!this.isModified("password")) return;
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

export default mongoose.model("User", userSchema);
