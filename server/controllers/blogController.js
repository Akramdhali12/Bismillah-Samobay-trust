const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
  const { type } = req.query;
  const filter = type ? { type } : {};
  const blogs = await Blog.find(filter).sort("-createdAt");
  res.json({ success: true, blogs });
};

exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "পাওয়া যায়নি" });
  res.json({ success: true, blog });
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const blog = await Blog.create({ title, content, type, image });
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  const updates = req.body;
  if (req.file) updates.image = `/uploads/${req.file.filename}`;
  const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json({ success: true, blog });
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};