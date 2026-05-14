const express = require("express");
const router = express.Router();
const {
  getRecipients,
  createRecipient,
  updateRecipient,
  deleteRecipient,
} = require("../controllers/recipientController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getRecipients);
router.post("/", protect, adminOnly, createRecipient);
router.put("/:id", protect, adminOnly, updateRecipient);
router.delete("/:id", protect, adminOnly, deleteRecipient);

module.exports = router;