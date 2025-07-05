import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import toolRoutes from "./routes/tool.route.js";
import uploadRoute from "./routes/upload.route.js";
import orderRoutes from "./routes/order.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/order", orderRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongo is connected : ) ");
    app.listen(PORT, () => {
      console.log("Server is working");
    });
  })
  .catch((err) => console.log("Database connection error"));
