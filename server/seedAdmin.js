require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const connectDB = require("./config/db");

const seed = async () => {
  await connectDB();
  const exists = await Admin.findOne({ email: "admin@bismillahtrust.com" });
  if (exists) {
    console.log("Admin already exists");
    process.exit();
  }
  await Admin.create({
    name: "Super Admin",
    email: "admin@bismillahtrust.com",
    password: "admin12345",
    isSuperAdmin: true,
  });
  console.log("✅ Super admin created: admin@bismillahtrust.com / admin12345");
  process.exit();
};

seed();