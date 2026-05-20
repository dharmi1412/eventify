import { Router } from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import { uploadImage } from "../controllers/uploadController.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = Router();
router.post("/", protect, upload.single("file"), uploadImage);

export default router;
