const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", submitContact);
router.get("/", protect, adminOnly, getContacts);
router.delete("/:id", protect, adminOnly, deleteContact);

module.exports = router;