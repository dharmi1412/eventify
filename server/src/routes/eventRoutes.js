import { Router } from "express";
import { query, param, body } from "express-validator";
import * as events from "../controllers/eventController.js";
import { protect, optionalAuth } from "../middleware/auth.js";
import { requireRoles } from "../middleware/requireRoles.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.get(
  "/",
  optionalAuth,
  [
    query("category").optional().isString(),
    query("search").optional().isString(),
    query("sort").optional().isIn(["default", "price-asc", "price-desc", "fill"]),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
  ],
  validateRequest,
  events.listEvents
);

router.get("/organizer/mine", protect, requireRoles("organizer", "admin"), events.myOrganizerEvents);

router.get("/:id", [param("id").isMongoId()], validateRequest, events.getEvent);

router.post(
  "/",
  protect,
  requireRoles("organizer", "admin"),
  [
    body("title").trim().notEmpty(),
    body("description").optional().isString(),
    body("category").trim().notEmpty(),
    body("date").notEmpty(),
    body("time").notEmpty(),
    body("location").trim().notEmpty(),
    body("price").isFloat({ min: 0 }),
    body("emoji").optional().isString(),
    body("seats").isInt({ min: 1 }),
    body("orgStatus").optional().isIn(["Active", "Draft", "Pending", "Cancelled", "Paused"]),
    body("bannerUrl").optional().isString(),
  ],
  validateRequest,
  events.createEvent
);

router.patch(
  "/:id",
  protect,
  [param("id").isMongoId()],
  validateRequest,
  events.updateEvent
);

router.delete(
  "/:id",
  protect,
  [param("id").isMongoId()],
  validateRequest,
  events.deleteEvent
);

export default router;
