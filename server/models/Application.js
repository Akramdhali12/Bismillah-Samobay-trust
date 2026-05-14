const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicantName: { type: String, required: true },
    fatherName: { type: String, required: true },
    nid: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    familyIncome: { type: Number, required: true },
    category: {
      type: String,
      enum: ["grant", "emergency", "debt-relief", "crowdfund", "student-aid"],
      required: true,
    },
    amountRequested: { type: Number, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);