import express from "express";
import { addTool, getAllTools } from "../controllers/tool.controller.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.post("/add", protect, addTool);
router.get("/", getAllTools);
export default router;
