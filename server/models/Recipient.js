const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    helpType: { type: String, required: true }, // e.g. "চিকিৎসা সহায়তা"
    amount: { type: Number },
    helpedAt: { type: Date, default: Date.now },
    note: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipient", recipientSchema);