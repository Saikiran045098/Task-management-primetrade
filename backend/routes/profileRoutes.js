import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET user profile
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name email"); // fetch name & email only
    console.log("user", user)
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
