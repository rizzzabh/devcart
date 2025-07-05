import express from "express";
import {
  addTool,
  getAllTools,
  getAllTags,
  toggleLike,
  deleteToolByAdmin,
} from "../controllers/tool.controller.js";
import { protect } from "../middlewares/protect.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.post("/add", protect, addTool);
router.get("/", getAllTools);
router.get("/tags", getAllTags);
router.patch("/like/:id", protect, toggleLike);
router.delete("/:id", protect, isAdmin, deleteToolByAdmin);
export default router;
