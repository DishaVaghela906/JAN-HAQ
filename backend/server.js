require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require("fs");
const { pipeline } = require("@xenova/transformers");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// --- MongoDB Atlas Setup ---
const MONGO_URI = process.env.MONGO_URI; // your Atlas URI
const client = new MongoClient(MONGO_URI);
let db, departmentsCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("complaintsDB");
    departmentsCollection = db.collection("departments");
    console.log("✅ Connected to MongoDB Atlas");

    // Optional: Insert test documents if empty
    const count = await departmentsCollection.countDocuments();
    if (count === 0) {
      const testDepartments = [
        { name: "Roads", contact_person: "Rajesh Kumar", phone: "9876500001", email: "rajesh1@city.gov", city: "Vadodara" },
        { name: "Roads", contact_person: "Anil Mehta", phone: "9876500002", email: "anil@city.gov", city: "Ahmedabad" },
        { name: "Water", contact_person: "Anita Sharma", phone: "9876500003", email: "anita1@city.gov", city: "Vadodara" },
        { name: "Water", contact_person: "Rakesh Singh", phone: "9876500004", email: "rakesh@city.gov", city: "Ahmedabad" },
        { name: "Electricity", contact_person: "Mohan Shah", phone: "9876500005", email: "mohan1@city.gov", city: "Vadodara" },
        { name: "Health", contact_person: "Suman Joshi", phone: "9876500006", email: "suman1@city.gov", city: "Vadodara" },
        { name: "Sanitation", contact_person: "Deepak Mehta", phone: "9876500007", email: "deepak1@city.gov", city: "Vadodara" },
        { name: "Transport", contact_person: "Ajay Mehta", phone: "9876500008", email: "ajay2@city.gov", city: "Vadodara" },
        { name: "Education", contact_person: "Ramesh Joshi", phone: "9876500009", email: "ramesh@city.gov", city: "Vadodara" },
        { name: "Environment", contact_person: "Sunita Patel", phone: "9876500010", email: "sunita3@city.gov", city: "Vadodara" }
      ];
      await departmentsCollection.insertMany(testDepartments);
      console.log("✅ Inserted test department documents");
    }

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// --- Knowledge Base ---
const KB_PATH = path.join(__dirname, "../janhaq-frontend/src/data/knowledge_base.json");
let knowledge = [];
if (fs.existsSync(KB_PATH)) {
  knowledge = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));
  console.log(`✅ Loaded ${knowledge.length} items from knowledge_base.json`);
} else {
  console.warn("⚠️ knowledge_base.json not found!");
}

// Cosine similarity
function cosineSim(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return -1;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// --- Serve React build ---
const FRONTEND_BUILD = path.join(__dirname, "../janhaq-frontend/build");
app.use(express.static(FRONTEND_BUILD));
app.use("/data", express.static(path.join(__dirname, "../janhaq-frontend/src/data")));

// --- Explain Endpoint ---
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

// --- Get All Laws ---
const ALL_LAWS_PATH = path.join(__dirname, "../janhaq-frontend/src/data/all_laws.json");
app.get("/api/laws", (req, res) => {
  fs.readFile(ALL_LAWS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not load laws data." });
    res.json(JSON.parse(data));
  });
});

// --- Get All Schemes ---
const ALL_SCHEMES_PATH = path.join(__dirname, "../janhaq-frontend/src/data/schemes.json");
app.get("/api/schemes", (req, res) => {
  fs.readFile(ALL_SCHEMES_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not load schemes data." });
    res.json(JSON.parse(data));
  });
});

// --- Search Endpoint ---
let embedder = null;
app.get("/search", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.json([]);

  try {
    if (!embedder) {
      console.log("⚙️ Loading embedding model...");
      embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
      console.log("⚙️ Embedding model loaded.");
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

    res.json(results);
  } catch (err) {
    console.error("❌ Error in /search:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

// --- Personalized Recommendations ---
app.post("/api/recommendations", (req, res) => {
  const { role, interests } = req.body;
  if (!role && (!interests || interests.length === 0)) return res.json([]);

  const recommendations = knowledge.map(item => {
    let score = 0;
    const itemTags = item.tags || [];
    if (role && itemTags.includes(role)) score += 2;
    if (interests && interests.length > 0) {
      for (const interest of interests) {
        if (itemTags.includes(interest.toLowerCase())) score += 1;
      }
    }
    return { ...item, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 5);

  res.json(recommendations);
});

// --- Departments Endpoints ---
app.get("/api/departments", async (req, res) => {
  try {
    const departments = await departmentsCollection.find({}).toArray();
    res.json(departments);
  } catch (err) {
    console.error("❌ Error fetching departments:", err);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

app.get("/api/departments/search", async (req, res) => {
  const { name, city } = req.query;
  const filter = {};
  if (name) filter.name = name;
  if (city) filter.city = city;

  try {
    const results = await departmentsCollection.find(filter).toArray();
    res.json(results);
  } catch (err) {
    console.error("❌ Error searching departments:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

// --- Catch-all for React Router ---
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_BUILD, "index.html"));
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
