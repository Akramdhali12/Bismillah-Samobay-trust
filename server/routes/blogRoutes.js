const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", protect, adminOnly, upload.single("image"), createBlog);
router.put("/:id", protect, adminOnly, upload.single("image"), updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

module.exports = router;