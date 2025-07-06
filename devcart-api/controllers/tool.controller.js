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

export const getAllTools = async (req, res) => {
  try {
    const { search, tag, page = 1 } = req.query;
    const limit = 6;
    const skip = (parseInt(page) - 1) * limit;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (tag) {
      query.tags = { $regex: tag, $options: "i" };
    }

    const total = await Tool.countDocuments(query);

    const tools = await Tool.find(query)
      .populate("creator", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      tools,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tools" });
  }
};
export const getAllTags = async (req, res) => {
  try {
    const tools = await Tool.find();
    const allTags = tools
      .map((tool) => tool.tags.split(","))
      .flat()
      .map((tag) => tag.trim().toLowerCase());

    const uniqueTags = [...new Set(allTags)];
    res.status(200).json(uniqueTags);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tags" });
  }
};

export const toggleLike = async (req, res) => {
  const userId = req.user._id;
  const toolId = req.params.id;

  try {
    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: "Tool not found" });

    const liked = tool.likes.includes(userId);

    if (liked) {
      tool.likes.pull(userId);
    } else {
      tool.likes.push(userId);
    }

    await tool.save();

    res.status(200).json({
      liked: !liked,
      totalLikes: tool.likes.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle like" });
  }
};

export const deleteToolByAdmin = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.status(202).json({ message: "Tool deleted by Admin." });
  } catch (error) {
    res.status(401).json({ message: "ERROR deleting tool" });
  }
};

export const updateTool = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);

    if (!tool) return res.status(404).json({ message: "Tool not found" });

    if (req.user._id !== tool.creator.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to edit" });
    }

    const updated = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const validateTool = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.json(tool);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tool" });
  }
};
