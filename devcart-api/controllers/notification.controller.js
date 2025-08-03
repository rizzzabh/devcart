import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import { User } from "../models/User.js";
import { sendNotification, sendAdminNotification } from "../index.js";

// Get user notifications
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await Notification.findByIdAndUpdate(notificationId, { read: true });

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification" });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications" });
  }
};

// Create notification (utility function)
export const createNotification = async (
  recipientId,
  title,
  message,
  type = "general",
  link = null
) => {
  try {
    console.log("Creating notification for user:", recipientId);

    const notification = new Notification({
      recipient: recipientId,
      title,
      message,
      type,
      link,
    });

    await notification.save();

    // Send real-time notification
    sendNotification(recipientId, notification);

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

// Create admin notification
export const createAdminNotification = async (
  title,
  message,
  type = "admin"
) => {
  try {

    // Find all admin users
    const adminUsers = await User.find({ role: "admin" });
    console.log("Found", adminUsers.length, "admin users");

    // Create notifications for all admins
    const notifications = [];
    for (const admin of adminUsers) {
      const notification = new Notification({
        recipient: admin._id,
        title,
        message,
        type,
      });

      await notification.save();
      notifications.push(notification);

      // Send real-time notification to each admin individually
      sendNotification(admin._id, notification);
    }

    return notifications;
  } catch (error) {
    console.error("Error creating admin notification:", error);
  }
};
