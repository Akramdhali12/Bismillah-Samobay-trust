const User = require("../models/User");
const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// USER REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: "সব ঘর পূরণ করুন" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "ইমেইল ইতিমধ্যে আছে" });

    const user = await User.create({ name, email, phone, password });
    const token = generateToken(user._id, "user");

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "ভুল ইমেইল বা পাসওয়ার্ড" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "ভুল ইমেইল বা পাসওয়ার্ড" });

    const token = generateToken(user._id, "user");
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN LOGIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) return res.status(401).json({ message: "ভুল তথ্য" });

    const match = await admin.matchPassword(password);
    if (!match) return res.status(401).json({ message: "ভুল তথ্য" });

    const token = generateToken(admin._id, "admin");
    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isSuperAdmin: admin.isSuperAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CURRENT USER/ADMIN
exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user, role: req.role });
};