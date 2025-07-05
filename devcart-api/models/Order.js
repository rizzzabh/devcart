import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
