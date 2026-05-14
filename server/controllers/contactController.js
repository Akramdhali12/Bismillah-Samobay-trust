const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const c = await Contact.create(req.body);
    res.status(201).json({ success: true, message: "বার্তা পাঠানো হয়েছে" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  const list = await Contact.find().sort("-createdAt");
  res.json({ success: true, contacts: list });
};

exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};