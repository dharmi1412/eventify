import { Router } from "express";
import { param, body } from "express-validator";
import * as admin from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { requireRoles } from "../middleware/requireRoles.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.use(protect, requireRoles("admin"));

router.get("/stats", admin.platformStats);
router.get("/users", admin.listUsers);
router.patch(
  "/users/:id/status",
  [
    param("id").isMongoId(),
    body("accountStatus").isIn(["active", "flagged"]),
  ],
  validateRequest,
  admin.updateUserStatus
);
router.patch(
  "/users/:id/role",
  [
    param("id").isMongoId(),
    body("role").isIn(["user", "organizer", "admin"]),
  ],
  validateRequest,
  admin.updateUserRole
);
router.get("/events", admin.listAllEvents);
router.get("/bookings", admin.listAllBookings);

export default router;
