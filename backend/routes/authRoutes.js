import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// --- Middleware to verify JWT token ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.userId = decoded.id; // Store user ID from token
    next();
  });
};

// --- Register ---
router.post("/register", async (req, res) => {
  try {
    const { name, fullName, email, password, profile } = req.body;

    // Accept both 'name' and 'fullName' for compatibility
    const userName = name || fullName;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: userName,
      email,
      password: hashedPassword,
      profile: profile || { ageGroup: "", role: "", interests: [] },
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Return user without password
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profile: newUser.profile,
    };

    console.log("User registered successfully:", userResponse._id);

    res.status(201).json({ token, user: userResponse });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// --- Login ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Return user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile || { ageGroup: "", role: "", interests: [] },
    };

    console.log("User logged in successfully:", userResponse._id);

    res.json({ token, user: userResponse });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// --- Get Current User Profile (Protected) ---
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile || { ageGroup: "", role: "", interests: [] },
    };

    console.log("Profile fetched for user:", userResponse._id);

    res.json(userResponse);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// --- Update User Profile (Protected) ---
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({ message: "Profile data is required" });
    }

    console.log("Updating profile for user:", req.userId);
    console.log("New profile data:", profile);

    // Find user by ID from token
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profile fields
    user.profile = {
      ageGroup: profile.ageGroup || user.profile?.ageGroup || "",
      role: profile.role || user.profile?.role || "",
      interests: profile.interests || user.profile?.interests || [],
    };

    await user.save();

    // Return updated user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    };

    console.log("Profile updated successfully for user:", userResponse._id);

    res.json({ user: userResponse });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;