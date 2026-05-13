import { Router } from "express";
import { body, param } from "express-validator";
import * as contact from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";
import { requireRoles } from "../middleware/requireRoles.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("subject").optional().trim(),
    body("message").trim().isLength({ min: 10 }),
  ],
  validateRequest,
  contact.submitContact
);

router.get("/", protect, requireRoles("admin"), contact.listContactMessages);

router.patch(
  "/:id/read",
  protect,
  requireRoles("admin"),
  [param("id").isMongoId()],
  validateRequest,
  contact.markContactRead
);

export default router;
