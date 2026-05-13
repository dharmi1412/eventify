import { Router } from "express";
import { body } from "express-validator";
import * as user from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.use(protect);

router.patch(
  "/me",
  [
    body("name").optional().trim().notEmpty(),
    body("phone").optional().isString(),
    body("city").optional().isString(),
    body("bio").optional().isString(),
    body("avatarUrl").optional().isString(),
    body("dateOfBirth").optional().isISO8601(),
    body("notificationPrefs").optional().isObject(),
  ],
  validateRequest,
  user.updateProfile
);

router.patch(
  "/me/password",
  [
    body("currentPassword").notEmpty(),
    body("newPassword").isLength({ min: 6 }),
  ],
  validateRequest,
  user.changePassword
);

router.delete(
  "/me",
  [body("password").notEmpty()],
  validateRequest,
  user.deleteAccount
);

export default router;
