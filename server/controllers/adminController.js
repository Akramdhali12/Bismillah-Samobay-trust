const Admin = require("../models/Admin");
const User = require("../models/User");

exports.createAdmin = async (req, res) => {
  try {
    if (!req.user.isSuperAdmin)
      return res.status(403).json({ message: "শুধুমাত্র সুপার অ্যাডমিন নতুন অ্যাডমিন যোগ করতে পারবেন" });

    const { name, email, password } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "ইমেইল ব্যবহৃত হচ্ছে" });

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({ success: true, admin: { id: admin._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  const admins = await Admin.find().select("-password");
  res.json({ success: true, admins });
};

exports.deleteAdmin = async (req, res) => {
  try {
    if (!req.user.isSuperAdmin)
      return res.status(403).json({ message: "অনুমতি নেই" });
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "অ্যাডমিন পাওয়া যায়নি" });
    if (admin.isSuperAdmin)
      return res.status(400).json({ message: "সুপার অ্যাডমিন মুছে ফেলা যাবে না" });
    await admin.deleteOne();
    res.json({ success: true, message: "অ্যাডমিন মুছে ফেলা হয়েছে" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, users });
};

// Dashboard stats
exports.getStats = async (req, res) => {
  const Application = require("../models/Application");
  const Recipient = require("../models/Recipient");
  const [users, pending, approved, rejected, recipients] = await Promise.all([
    User.countDocuments(),
    Application.countDocuments({ status: "pending" }),
    Application.countDocuments({ status: "approved" }),
    Application.countDocuments({ status: "rejected" }),
    Recipient.countDocuments(),
  ]);
  res.json({ success: true, stats: { users, pending, approved, rejected, recipients } });
};