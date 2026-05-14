const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) return res.status(401).json({ message: "অনুমতি নেই, লগইন করুন" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin") {
      req.user = await Admin.findById(decoded.id);
    } else {
      req.user = await User.findById(decoded.id);
    }
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "অবৈধ টোকেন" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "শুধুমাত্র অ্যাডমিন অনুমোদিত" });
  next();
};

module.exports = { protect, adminOnly };