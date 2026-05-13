import { Router } from "express";
import { body } from "express-validator";
import * as auth from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 characters"),
    body("role").optional().isIn(["user", "organizer"]),
  ],
  validateRequest,
  auth.register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  validateRequest,
  auth.login
);

router.get("/me", protect, auth.getMe);

export default router;
