import express from "express";
import { Order } from "../models/Order.js";
import { Tool } from "../models/Tool.js";
import {
  createNotification,
  createAdminNotification,
} from "./notification.controller.js";

export const addOrder = async (req, res) => {
  try {
    const { toolId, price } = req.body;
    const buyer = req.user._id;

    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: "Tool not found" });

    const order = new Order({
      tool: toolId,
      buyer,
      price,
    });

    await order.save();

    // Send notification to user
    await createNotification(
      req.user._id,
      "Order Placed Successfully",
      `Your order for ${tool.title} has been placed successfully.`,
      "order",
      "/my-orders"
    );

    // Send notification to admin
    await createAdminNotification(
      "New Order Received",
      `A new order has been placed for ${tool.title} by ${req.user.name}`,
      "order"
    );

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const buyer = req.user._id;
    const orders = await Order.find({ buyer })
      .populate("tool")
      .populate("buyer", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    const orders = await Order.find()
      .populate("tool")
      .populate("buyer", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};
