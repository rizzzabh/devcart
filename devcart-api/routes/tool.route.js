import express from "express";
import {
  addTool,
  getAllTools,
  getAllTags,
  toggleLike,
} from "../controllers/tool.controller.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.post("/add", protect, addTool);
router.get("/", getAllTools);
router.get("/tags", getAllTags);
router.patch("/like/:id", protect, toggleLike);
export default router;
