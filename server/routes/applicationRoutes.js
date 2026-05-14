const express = require("express");
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createApplication);
router.get("/my", protect, getMyApplications);

router.get("/", protect, adminOnly, getAllApplications);
router.put("/:id", protect, adminOnly, updateApplicationStatus);
router.delete("/:id", protect, adminOnly, deleteApplication);

module.exports = router;