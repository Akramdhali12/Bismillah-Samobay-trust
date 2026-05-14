const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    type: { type: String, enum: ["news", "success-story"], default: "news" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);