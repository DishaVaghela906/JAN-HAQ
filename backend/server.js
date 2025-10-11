require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());

// Logging middleware - helps debug routing issues
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// --- MongoDB Setup ---
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);
let db, departmentsCollection, usersCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("complaintsDB");
    departmentsCollection = db.collection("departments");
    usersCollection = db.collection("users");
    console.log("✅ Connected to MongoDB Atlas");

    // Optional: Insert sample departments
    const count = await departmentsCollection.countDocuments();
    if (count === 0) {
      const testDepartments = [
        { name: "Roads", contact_person: "Rajesh Kumar", phone: "9876500001", email: "rajesh1@city.gov", city: "Vadodara" },
        { name: "Water", contact_person: "Anita Sharma", phone: "9876500003", email: "anita1@city.gov", city: "Vadodara" },
        { name: "Electricity", contact_person: "Mohan Shah", phone: "9876500005", email: "mohan1@city.gov", city: "Vadodara" },
        { name: "Health", contact_person: "Suman Joshi", phone: "9876500006", email: "suman1@city.gov", city: "Vadodara" },
        { name: "Transport", contact_person: "Ajay Mehta", phone: "9876500008", email: "ajay2@city.gov", city: "Vadodara" },
      ];
      await departmentsCollection.insertMany(testDepartments);
      console.log("✅ Inserted test department documents");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// --- Middleware: Verify JWT Token ---
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  console.log('🔐 Auth header received:', authHeader ? 'Yes' : 'No');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No valid authorization header');
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    console.log('✅ Token verified, user ID:', decoded.userId);
    
    // Store as string to ensure proper ObjectId conversion later
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// --- Knowledge Base ---
const KB_PATH = path.join(__dirname, "../janhaq-frontend/src/data/knowledge_base.json");
let knowledge = [];

try {
  if (fs.existsSync(KB_PATH)) {
    const fileContent = fs.readFileSync(KB_PATH, "utf8");
    knowledge = JSON.parse(fileContent);
    
    // Validate structure
    if (!Array.isArray(knowledge)) {
      console.error("❌ knowledge_base.json is not an array");
      knowledge = [];
    } else {
      console.log(`✅ Loaded ${knowledge.length} knowledge items from ${KB_PATH}`);
      
      // Log first item structure for debugging
      if (knowledge.length > 0) {
        console.log("📋 Sample knowledge item:", {
          type: knowledge[0].type,
          title: knowledge[0].title,
          hasTags: Array.isArray(knowledge[0].tags),
          tagCount: knowledge[0].tags?.length || 0,
          sampleTags: knowledge[0].tags?.slice(0, 3) || []
        });
      }
    }
  } else {
    console.error(`❌ Knowledge base file not found at: ${KB_PATH}`);
    console.error("   Please ensure knowledge_base.json exists in janhaq-frontend/src/data/");
  }
} catch (err) {
  console.error("❌ Error loading knowledge base:", err.message);
  knowledge = [];
}

// --- AUTH ROUTES ---

// Test endpoint to verify routing works
app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Auth routes working!" });
});

// Register - Creates new user (profile optional, will be completed during onboarding)
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    console.log('📝 Registration attempt:', { name, email, hasProfile: !!profile });

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with empty or provided profile
    const newUser = {
      name,
      email,
      password: hashedPassword,
      profile: profile || { ageGroup: "", role: "", interests: [] },
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    // Generate JWT token - store ID as string
    const token = jwt.sign(
      { userId: result.insertedId.toString(), email }, 
      process.env.JWT_SECRET || "defaultsecret", 
      { expiresIn: "7d" }
    );

    // Return user without password
    const userResponse = {
      _id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      profile: newUser.profile,
      createdAt: newUser.createdAt
    };

    console.log(`✅ User registered: ${email} with ID: ${result.insertedId}`);

    res.status(201).json({ 
      token, 
      user: userResponse,
      message: "Registration successful"
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login - Only succeeds if user is registered, returns full user with profile
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔑 Login attempt:', email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token - store ID as string
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email }, 
      process.env.JWT_SECRET || "defaultsecret", 
      { expiresIn: "7d" }
    );

    // Return full user object with profile (exclude password)
    const userResponse = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      profile: user.profile || { ageGroup: "", role: "", interests: [] },
      createdAt: user.createdAt
    };

    console.log(`✅ User logged in: ${email} with ID: ${user._id}`);

    res.json({
      token,
      user: userResponse,
      message: "Login successful"
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Get current user profile (protected route)
app.get("/api/auth/profile", verifyToken, async (req, res) => {
  try {
    console.log('👤 Fetching profile for user ID:', req.userId);
    
    // Convert string ID to ObjectId
    let userId;
    try {
      userId = new ObjectId(req.userId);
    } catch (err) {
      console.error('❌ Invalid user ID format:', req.userId);
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await usersCollection.findOne(
      { _id: userId },
      { projection: { password: 0 } }
    );

    if (!user) {
      console.log('❌ User not found with ID:', req.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log('✅ Profile fetched for:', user.email);

    res.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      profile: user.profile || { ageGroup: "", role: "", interests: [] },
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error("❌ Get Profile Error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// Update user profile (protected route) - Used for onboarding and profile updates
app.put("/api/auth/profile", verifyToken, async (req, res) => {
  try {
    const { profile } = req.body;

    console.log('📝 Profile update request for user ID:', req.userId);
    console.log('📝 New profile data:', JSON.stringify(profile, null, 2));

    if (!profile) {
      return res.status(400).json({ message: "Profile data is required" });
    }

    // Validate profile structure
    if (!profile.role && (!profile.interests || profile.interests.length === 0)) {
      return res.status(400).json({ message: "Profile must have at least a role or interests" });
    }

    // Convert string ID to ObjectId
    let userId;
    try {
      userId = new ObjectId(req.userId);
      console.log('✅ ObjectId created:', userId.toString());
    } catch (err) {
      console.error('❌ Invalid user ID format:', req.userId, err);
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // First check if user exists
    const existingUser = await usersCollection.findOne({ _id: userId });
    if (!existingUser) {
      console.log('❌ User not found with ID:', userId.toString());
      return res.status(404).json({ message: "User not found in database" });
    }

    console.log('✅ User found:', existingUser.email);
    console.log('📊 Current profile:', JSON.stringify(existingUser.profile, null, 2));

    // Perform update using updateOne (more reliable than findOneAndUpdate)
    const updateResult = await usersCollection.updateOne(
      { _id: userId },
      { 
        $set: { 
          'profile.ageGroup': profile.ageGroup || existingUser.profile?.ageGroup || "",
          'profile.role': profile.role || existingUser.profile?.role || "",
          'profile.interests': profile.interests || existingUser.profile?.interests || [],
          updatedAt: new Date() 
        } 
      }
    );

    console.log('📊 Update result:', {
      matched: updateResult.matchedCount,
      modified: updateResult.modifiedCount
    });

    if (updateResult.matchedCount === 0) {
      console.log('❌ No user matched for update');
      return res.status(404).json({ message: "User not found during update" });
    }

    // Fetch updated user
    const updatedUser = await usersCollection.findOne(
      { _id: userId },
      { projection: { password: 0 } }
    );

    if (!updatedUser) {
      console.log('❌ Could not fetch updated user');
      return res.status(500).json({ message: "Update succeeded but could not fetch result" });
    }

    console.log(`✅ Profile updated successfully for: ${updatedUser.email}`);
    console.log('✅ New profile:', JSON.stringify(updatedUser.profile, null, 2));

    res.json({
      user: {
        _id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        profile: updatedUser.profile,
        createdAt: updatedUser.createdAt
      },
      message: "Profile updated successfully"
    });
  } catch (err) {
    console.error("❌ Update Profile Error:", err);
    console.error("❌ Error stack:", err.stack);
    res.status(500).json({ 
      message: "Failed to update profile", 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// --- RECOMMENDATIONS ---

// POST: Get recommendations based on provided profile
app.post("/api/recommendations", async (req, res) => {
  try {
    const { profile } = req.body;

    // Validate request body
    if (!profile) {
      return res.status(400).json({ 
        message: "Profile is required in request body",
        example: {
          profile: {
            role: "student",
            interests: ["education", "healthcare"]
          }
        }
      });
    }

    // Extract and normalize profile fields
    const role = (profile.role || "").toLowerCase().trim();
    const interests = Array.isArray(profile.interests) 
      ? profile.interests.map(i => String(i).toLowerCase().trim()).filter(i => i.length > 0)
      : [];

    // If no role and no interests, return empty
    if (!role && interests.length === 0) {
      console.log("⚠️ Empty profile - no recommendations");
      return res.json([]);
    }

    // Check if knowledge base is loaded
    if (!knowledge || knowledge.length === 0) {
      console.error("❌ Knowledge base is empty or not loaded");
      return res.status(500).json({ 
        message: "Knowledge base not available",
        hint: "Check if knowledge_base.json exists and is properly formatted"
      });
    }

    console.log(`📊 Generating recommendations for role: "${role}", interests: [${interests.join(', ')}]`);
    console.log(`📚 Knowledge base has ${knowledge.length} items`);

    // Score and filter knowledge base items
    const recommendations = knowledge
      .map(item => {
        let score = 0;
        
        // Normalize item tags
        const itemTags = Array.isArray(item.tags) 
          ? item.tags.map(t => String(t).toLowerCase().trim())
          : [];

        // Role matching: +2 points if role matches any tag
        if (role && itemTags.includes(role)) {
          score += 2;
        }

        // Interest matching: +1 point for each matching interest
        interests.forEach(interest => {
          if (itemTags.includes(interest)) {
            score += 1;
          }
        });

        // Return item with score
        return {
          ...item,
          score
        };
      })
      .filter(item => item.score > 0)          // Only items with some relevance
      .sort((a, b) => b.score - a.score)      // Sort by score descending
      .slice(0, 5);                            // Top 5 recommendations

    console.log(`✅ Found ${recommendations.length} recommendations`);
    
    // Log top recommendations for debugging
    recommendations.forEach((rec, idx) => {
      console.log(`  ${idx + 1}. ${rec.title} (score: ${rec.score})`);
    });

    res.json(recommendations);
  } catch (err) {
    console.error("❌ Recommendations Error:", err);
    res.status(500).json({ 
      message: "Failed to fetch recommendations",
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// GET: Get recommendations based on authenticated user's profile (protected route)
app.get("/api/recommendations", verifyToken, async (req, res) => {
  try {
    // Convert string ID to ObjectId
    let userId;
    try {
      userId = new ObjectId(req.userId);
    } catch (err) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await usersCollection.findOne({ _id: userId });
    
    if (!user || !user.profile) {
      console.log("⚠️ User has no profile");
      return res.json([]);
    }

    const profile = user.profile;
    const role = (profile.role || "").toLowerCase().trim();
    const interests = Array.isArray(profile.interests)
      ? profile.interests.map(i => String(i).toLowerCase().trim()).filter(i => i.length > 0)
      : [];

    if (!role && interests.length === 0) {
      console.log("⚠️ User profile is empty");
      return res.json([]);
    }

    // Check if knowledge base is loaded
    if (!knowledge || knowledge.length === 0) {
      console.error("❌ Knowledge base is empty or not loaded");
      return res.json([]);
    }

    console.log(`📊 Generating recommendations for authenticated user: ${user.email}`);
    console.log(`   Role: "${role}", Interests: [${interests.join(', ')}]`);

    const recommendations = knowledge
      .map(item => {
        let score = 0;
        const itemTags = Array.isArray(item.tags)
          ? item.tags.map(t => String(t).toLowerCase().trim())
          : [];

        if (role && itemTags.includes(role)) {
          score += 2;
        }

        interests.forEach(interest => {
          if (itemTags.includes(interest)) {
            score += 1;
          }
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    console.log(`✅ Found ${recommendations.length} recommendations for ${user.email}`);

    res.json(recommendations);
  } catch (err) {
    console.error("❌ Recommendations Error:", err);
    res.status(500).json({ 
      message: "Failed to fetch recommendations",
      error: err.message
    });
  }
});

// --- Departments ---
app.get("/api/departments", async (req, res) => {
  try {
    const departments = await departmentsCollection.find({}).toArray();
    res.json(departments);
  } catch (err) {
    console.error("❌ Departments Error:", err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

// --- Serve React build ---
const FRONTEND_BUILD = path.join(__dirname, "../janhaq-frontend/build");
app.use(express.static(FRONTEND_BUILD));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_BUILD, "index.html"));
});

app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));