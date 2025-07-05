import express from "express";
import { protect } from "../middlewares/protect.js";
import { isAdmin } from "../middlewares/admin.js";
import {
  addOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, addOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, isAdmin, getAllOrders);

export default router;
