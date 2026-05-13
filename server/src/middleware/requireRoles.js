import ApiError from "../utils/ApiError.js";

export function requireRoles(...allowed) {
  return (req, res, next) => {
    if (!req.user) return next(new ApiError(401, "Authentication required"));
    if (!allowed.includes(req.user.role)) {
      return next(new ApiError(403, "You do not have permission for this action"));
    }
    next();
  };
}
