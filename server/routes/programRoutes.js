const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getPrograms);
router.get("/:id", getProgram);
router.post("/", protect, adminOnly, upload.single("image"), createProgram);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProgram);
router.delete("/:id", protect, adminOnly, deleteProgram);

module.exports = router;