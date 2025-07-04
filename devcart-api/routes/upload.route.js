import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import { protect } from "../middlewares/protect.js";

const upload = multer({ storage });

const router = express.Router();

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    res.status(200).json({ imageUrl: req.file.path });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
