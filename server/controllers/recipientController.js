const Recipient = require("../models/Recipient");

// PUBLIC: list
exports.getRecipients = async (req, res) => {
  const list = await Recipient.find().sort("-helpedAt");
  res.json({ success: true, recipients: list });
};

// ADMIN: create
exports.createRecipient = async (req, res) => {
  try {
    const r = await Recipient.create(req.body);
    res.status(201).json({ success: true, recipient: r });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: update
exports.updateRecipient = async (req, res) => {
  const r = await Recipient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, recipient: r });
};

// ADMIN: delete
exports.deleteRecipient = async (req, res) => {
  await Recipient.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};