import express from "express";
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notification.controller.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.get("/", protect, getUserNotifications);
router.put("/:notificationId/read", protect, markAsRead);
router.put("/mark-all-read", protect, markAllAsRead);

export default router;
