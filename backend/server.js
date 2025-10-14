require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pipeline } = require("@xenova/transformers");

const app = express();
const port = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString().split('T')[1].split('.')[0]} - ${req.method} ${req.path}`);
  next();
});

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ========================================
// MONGODB SETUP
// ========================================

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);
let db, departmentsCollection, usersCollection, complaintsCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("complaintsDB");
    departmentsCollection = db.collection("departments");
    usersCollection = db.collection("users");
    complaintsCollection = db.collection("complaints");
    console.log("✅ Connected to MongoDB Atlas");

    // Insert sample departments if empty
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
      console.log("✅ Inserted sample departments");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// ========================================
// JWT AUTHENTICATION MIDDLEWARE
// ========================================

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ========================================
// KNOWLEDGE BASE & DATA FILES
// ========================================

const KB_PATH = path.join(__dirname, "../janhaq-frontend/src/data/knowledge_base.json");
const ALL_LAWS_PATH = path.join(__dirname, "../janhaq-frontend/src/data/all_laws.json");
const ALL_SCHEMES_PATH = path.join(__dirname, "../janhaq-frontend/src/data/schemes.json");

let knowledge = [];

// Load knowledge base with embeddings for search
if (fs.existsSync(KB_PATH)) {
  knowledge = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));
  console.log(`✅ Loaded ${knowledge.length} items from knowledge_base.json`);
} else {
  console.warn("⚠️ knowledge_base.json not found!");
}

// ========================================
// HELPER FUNCTIONS
// ========================================

// Cosine similarity for semantic search

// Fixed version - change line 91 in your server.js
function cosineSim(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return -1;  // ✅ FIXED: Added ! before vecB
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ========================================
// AUTH ROUTES
// ========================================

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, fullName, email, password, profile } = req.body;
    const userName = name || fullName;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: userName,
      email,
      password: hashedPassword,
      profile: profile || { ageGroup: "", role: "", interests: [] },
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { userId: result.insertedId.toString(), email }, 
      process.env.JWT_SECRET || "defaultsecret", 
      { expiresIn: "7d" }
    );

    const userResponse = {
      _id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      profile: newUser.profile,
      createdAt: newUser.createdAt
    };

    console.log(`✅ User registered: ${email}`);

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

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email }, 
      process.env.JWT_SECRET || "defaultsecret", 
      { expiresIn: "7d" }
    );

    const userResponse = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      profile: user.profile || { ageGroup: "", role: "", interests: [] },
      createdAt: user.createdAt
    };

    console.log(`✅ User logged in: ${email}`);

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

// Get Profile
app.get("/api/auth/profile", verifyToken, async (req, res) => {
  try {
    const user = await usersCollection.findOne(
      { _id: new ObjectId(req.userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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

// Update Profile
app.put("/api/auth/profile", verifyToken, async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({ message: "Profile data is required" });
    }

    const userId = new ObjectId(req.userId);

    const updateResult = await usersCollection.updateOne(
      { _id: userId },
      { 
        $set: { 
          'profile.ageGroup': profile.ageGroup || "",
          'profile.role': profile.role || "",
          'profile.interests': profile.interests || [],
          updatedAt: new Date() 
        } 
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await usersCollection.findOne(
      { _id: userId },
      { projection: { password: 0 } }
    );

    console.log(`✅ Profile updated: ${updatedUser.email}`);

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
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// ========================================
// RECOMMENDATIONS
// ========================================

// POST: Get recommendations based on profile
app.post("/api/recommendations", async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({ message: "Profile is required" });
    }

    const role = (profile.role || "").toLowerCase().trim();
    const interests = Array.isArray(profile.interests) 
      ? profile.interests.map(i => String(i).toLowerCase().trim()).filter(i => i.length > 0)
      : [];

    if (!role && interests.length === 0) {
      return res.json([]);
    }

    console.log(`📊 Recommendations for role: ${role}, interests: [${interests.join(', ')}]`);

    const recommendations = knowledge
      .map(item => {
        let score = 0;
        const itemTags = Array.isArray(item.tags) 
          ? item.tags.map(t => String(t).toLowerCase().trim())
          : [];

        if (role && itemTags.includes(role)) score += 2;
        interests.forEach(interest => {
          if (itemTags.includes(interest)) score += 1;
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    console.log(`✅ Found ${recommendations.length} recommendations`);
    res.json(recommendations);
  } catch (err) {
    console.error("❌ Recommendations Error:", err);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

// GET: Get recommendations for authenticated user
app.get("/api/recommendations", verifyToken, async (req, res) => {
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(req.userId) });
    
    if (!user || !user.profile) {
      return res.json([]);
    }

    const role = (user.profile.role || "").toLowerCase().trim();
    const interests = Array.isArray(user.profile.interests)
      ? user.profile.interests.map(i => String(i).toLowerCase().trim()).filter(i => i.length > 0)
      : [];

    if (!role && interests.length === 0) {
      return res.json([]);
    }

    const recommendations = knowledge
      .map(item => {
        let score = 0;
        const itemTags = Array.isArray(item.tags)
          ? item.tags.map(t => String(t).toLowerCase().trim())
          : [];

        if (role && itemTags.includes(role)) score += 2;
        interests.forEach(interest => {
          if (itemTags.includes(interest)) score += 1;
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json(recommendations);
  } catch (err) {
    console.error("❌ Recommendations Error:", err);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

// ========================================
// LAWS & SCHEMES (Your Working Code)
// ========================================

app.get("/api/laws", (req, res) => {
  console.log("📚 Request received for /api/laws");
  fs.readFile(ALL_LAWS_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading all_laws.json:", err);
      return res.status(500).json({ error: "Could not load laws data." });
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/schemes", (req, res) => {
  console.log("📋 Request received for /api/schemes");
  fs.readFile(ALL_SCHEMES_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading schemes.json:", err);
      return res.status(500).json({ error: "Could not load schemes data." });
    }
    res.json(JSON.parse(data));
  });
});

// ========================================
// PROBLEM SOLVER - SEMANTIC SEARCH (Your Working Code)
// ========================================

let embedder = null;

app.get("/search", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.json([]);

  try {
    if (!embedder) {
      console.log("⚙️ Loading embedding model...");
      embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
      console.log("✅ Embedding model loaded.");
    }

    const raw = await embedder(q, { pooling: "mean", normalize: true });
    const qVec = Array.from(raw.data);

    const results = knowledge.map(item => {
      const title = item.title || "Untitled";
      const description = item.description || item.details || "";
      return {
        title,
        description,
        referenceLink: item.referenceLink || item.url || "",
        score: cosineSim(qVec, item.embedding),
      };
    })
    .filter(r => r.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

    console.log(`🔍 Search "${q}" found ${results.length} results`);
    res.json(results);
  } catch (err) {
    console.error("❌ Error in /search:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

// ========================================
// AI EXPLAIN (Your Working Code)
// ========================================

app.post("/api/explain", async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });

  const prompt = `
You are a legal explainer.
Explain the following Indian law or government scheme in clear, simple language.
Format the response in Markdown with headings and bullet points.

## 1. What it is
- Plain explanation
- Main features

## 2. Why it exists
- Purpose
- Problems it addresses

## 3. What it means for ordinary people
- Direct impact on citizens
- Rights, responsibilities, benefits, penalties

Title: ${title}
Details: ${description || "No details provided"}
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-oss-120b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} ${text}`);
    }

    const data = await response.json();
    const explanation = data?.choices?.[0]?.message?.content || "No explanation generated.";
    res.json({ explanation });
  } catch (err) {
    console.error("❌ Error in /api/explain:", err);
    res.status(500).json({ error: "Failed to get explanation" });
  }
});

// ========================================
// DEPARTMENTS
// ========================================

app.get("/api/departments", async (req, res) => {
  try {
    const departments = await departmentsCollection.find({}).toArray();
    res.json(departments);
  } catch (err) {
    console.error("❌ Departments Error:", err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

// ========================================
// COMPLAINTS
// ========================================

app.post("/api/complaints", verifyToken, async (req, res) => {
  try {
    const { department, description, location } = req.body;

    if (!department || !description) {
      return res.status(400).json({ message: "Department and description are required" });
    }

    const complaint = {
      userId: req.userId,
      userEmail: req.userEmail,
      department,
      description,
      location: location || "",
      status: "pending",
      createdAt: new Date(),
    };

    const result = await complaintsCollection.insertOne(complaint);

    console.log(`✅ Complaint submitted by ${req.userEmail}`);

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: {
        _id: result.insertedId.toString(),
        ...complaint
      }
    });
  } catch (err) {
    console.error("❌ Submit Complaint Error:", err);
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

app.get("/api/complaints", verifyToken, async (req, res) => {
  try {
    const complaints = await complaintsCollection
      .find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(complaints);
  } catch (err) {
    console.error("❌ Get Complaints Error:", err);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    knowledgeBase: knowledge.length,
    mongodb: db ? "connected" : "disconnected",
    embedder: embedder ? "loaded" : "not loaded"
  });
});

// ========================================
// SERVE FRONTEND
// ========================================

const FRONTEND_BUILD = path.join(__dirname, "../janhaq-frontend/build");

// Serve data folder for direct access
app.use("/data", express.static(path.join(__dirname, "../janhaq-frontend/src/data")));

if (fs.existsSync(FRONTEND_BUILD)) {
  console.log('✅ Serving React build');
  app.use(express.static(FRONTEND_BUILD));

  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/search') || req.path.startsWith('/data/')) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.sendFile(path.join(FRONTEND_BUILD, "index.html"));
  });
} else {
  console.log('⚠️ React build not found. Run frontend with: npm start');
  
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/search') || req.path.startsWith('/data/')) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(503).json({ 
      message: 'Frontend not available',
      hint: 'Run "npm start" in frontend directory'
    });
  });
}

// ========================================
// START SERVER
// ========================================

app.listen(port, () => {
  console.log('='.repeat(60));
  console.log(`✅ JanHaq Server running at http://localhost:${port}`);
  console.log(`📊 Knowledge Base: ${knowledge.length} items loaded`);
  console.log(`🗄️  MongoDB: ${db ? 'Connected ✓' : 'Disconnected ✗'}`);
  console.log(`🤖 AI Explain: ${process.env.OPENROUTER_API_KEY ? 'Configured ✓' : 'Not configured ✗'}`);
  console.log('='.repeat(60));
});