import Notification from "../models/Notification.js";
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
    const notification = {
      title,
      message,
      type,
      timestamp: new Date(),
    };

    // Send real-time notification to all admins
    sendAdminNotification(notification);

    return notification;
  } catch (error) {
    console.error("Error creating admin notification:", error);
  }
};
