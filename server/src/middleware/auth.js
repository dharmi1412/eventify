import { verifyToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";

export const protect = catchAsync(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized — missing bearer token");
  }
  const token = header.slice(7);
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    throw new ApiError(401, "Not authorized — invalid or expired token");
  }
  const user = await User.findById(decoded.sub);
  if (!user) throw new ApiError(401, "User no longer exists");
  if (user.accountStatus === "flagged") {
    throw new ApiError(403, "Account has been suspended. Contact support.");
  }
  req.user = user;
  next();
});

export const optionalAuth = catchAsync(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next();
  try {
    const decoded = verifyToken(header.slice(7));
    const user = await User.findById(decoded.sub);
    if (user && user.accountStatus === "active") req.user = user;
  } catch {
    /* ignore invalid optional token */
  }
  next();
});
