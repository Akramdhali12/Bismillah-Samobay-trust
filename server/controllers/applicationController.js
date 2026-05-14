const Application = require("../models/Application");

// USER: submit application
exports.createApplication = async (req, res) => {
  try {
    const {
      applicantName,
      fatherName,
      nid,
      phone,
      address,
      familyIncome,
      category,
      amountRequested,
      reason,
    } = req.body;

    const app = await Application.create({
      user: req.user._id,
      applicantName,
      fatherName,
      nid,
      phone,
      address,
      familyIncome,
      category,
      amountRequested,
      reason,
    });

    res.status(201).json({ success: true, application: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER: get own applications
exports.getMyApplications = async (req, res) => {
  const apps = await Application.find({ user: req.user._id }).sort("-createdAt");
  res.json({ success: true, applications: apps });
};

// ADMIN: get all applications
exports.getAllApplications = async (req, res) => {
  const apps = await Application.find()
    .populate("user", "name email phone")
    .sort("-createdAt");
  res.json({ success: true, applications: apps });
};

// ADMIN: update status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "আবেদন পাওয়া যায়নি" });
    app.status = status || app.status;
    app.adminNote = adminNote ?? app.adminNote;
    await app.save();
    res.json({ success: true, application: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: delete
exports.deleteApplication = async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "মুছে ফেলা হয়েছে" });
};