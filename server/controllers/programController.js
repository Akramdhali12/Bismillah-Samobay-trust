const Program = require("../models/Program");

exports.getPrograms = async (req, res) => {
  const programs = await Program.find().sort("-createdAt");
  res.json({ success: true, programs });
};

exports.getProgram = async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) return res.status(404).json({ message: "পাওয়া যায়নি" });
  res.json({ success: true, program });
};

exports.createProgram = async (req, res) => {
  try {
    const { title, description, isActive } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const program = await Program.create({ title, description, image, isActive });
    res.status(201).json({ success: true, program });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProgram = async (req, res) => {
  const updates = req.body;
  if (req.file) updates.image = `/uploads/${req.file.filename}`;
  const program = await Program.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json({ success: true, program });
};

exports.deleteProgram = async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};