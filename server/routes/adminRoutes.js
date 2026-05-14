const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  getAllUsers,
  getStats,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect, adminOnly);

router.post("/create", createAdmin);
router.get("/list", getAllAdmins);
router.delete("/:id", deleteAdmin);
router.get("/users", getAllUsers);
router.get("/stats", getStats);

module.exports = router;