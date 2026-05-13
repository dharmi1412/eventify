import { Router } from "express";
import { param } from "express-validator";
import * as wishlist from "../controllers/wishlistController.js";
import { protect } from "../middleware/auth.js";
import { requireRoles } from "../middleware/requireRoles.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.use(protect, requireRoles("user", "organizer", "admin"));

router.get("/", wishlist.getWishlist);
router.post(
  "/:eventId",
  [param("eventId").isMongoId()],
  validateRequest,
  wishlist.addToWishlist
);
router.delete(
  "/:eventId",
  [param("eventId").isMongoId()],
  validateRequest,
  wishlist.removeFromWishlist
);

export default router;
