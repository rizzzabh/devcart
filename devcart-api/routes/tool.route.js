import express from "express";
import { addTool } from "../controllers/tool.controller.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.post("/add", protect, addTool);

export default router;
