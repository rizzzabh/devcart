import { Tool } from "../models/Tool.js";

export const addTool = async (req, res) => {
  try {
    const { title, description, price, image, tags } = req.body;

    const tool = await Tool.create({
      title: title,
      description: description,
      price: price,
      image: image,
      tags: tags,
      creator: req.user._id,
    });

    res.status(201).json(tool);
  } catch (error) {
    console.error("Add Tool Error:", err);
    res.status(500).json({ message: "Failed to add tool" });
  }
};
