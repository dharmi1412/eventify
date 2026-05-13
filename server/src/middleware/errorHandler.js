import ApiError from "../utils/ApiError.js";

export default function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500;
  const payload = {
    success: false,
    message: err.message || "Internal Server Error",
  };
  if (process.env.NODE_ENV !== "production" && err.stack) {
    payload.stack = err.stack;
  }
  if (err.details) payload.details = err.details;
  if (status === 500 && !err.isOperational) {
    payload.message = "Internal Server Error";
  }
  res.status(status).json(payload);
}
