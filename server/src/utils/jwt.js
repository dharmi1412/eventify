import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

export function signToken(payload) {
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token) {
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return jwt.verify(token, secret);
}
