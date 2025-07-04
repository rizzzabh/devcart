import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    tags: {
      type: String,
      required: true,
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Tool = mongoose.model("Tool", ToolSchema);
