import express from "express";
import { Order } from "../models/Order.js";
import { Tool } from "../models/Tool.js";

export const addOrder = async (req, res) => {
  try {
    const { toolId, price } = req.body;
    const buyer = req.user._id; // assuming protect middleware sets req.user

    // Optionally, check if tool exists
    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: "Tool not found" });

    const order = new Order({
      tool: toolId,
      buyer,
      price,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const buyer = req.user._id; // assuming protect middleware sets req.user
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
    // Optionally, check if user is admin (if not handled by middleware)
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
