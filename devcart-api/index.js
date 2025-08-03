import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import toolRoutes from "./routes/tool.route.js";
import uploadRoute from "./routes/upload.route.js";
import orderRoutes from "./routes/order.route.js";
import notificationRoutes from "./routes/notification.route.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/order", orderRoutes);
app.use("/api/notifications", notificationRoutes);

const connectedUsers = new Map();

io.on("connection", (socket) => {
  socket.on("authenticate", (userId) => {
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
  });

  socket.on("disconnect", () => {
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
    }
  });

  socket.on("join-admin-room", () => {
    socket.join("admin-room");
    console.log("user joined admin room");
  });
  socket.on("join-user-room", (userId) => {
    socket.join(`user-${userId}`);
  });
});

export const sendNotification = (userId, notification) => {
  const socketId = connectedUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit("new-notification", notification);
  }
};
export const sendAdminNotification = (notification) => {
  io.to("admin-room").emit("new-admin-notification", notification);
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongo is connected");
    server.listen(PORT, () => {
      console.log("Server is working with Socket.IO");
    });
  })
  .catch((err) => console.log("Database connection error"));
