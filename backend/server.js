require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require("fs");
const { pipeline } = require("@xenova/transformers");

const app = express();
const port = 3000;

// Load knowledge base
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

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve React build
const FRONTEND_BUILD = path.join(__dirname, "../janhaq-frontend/build");
app.use(express.static(FRONTEND_BUILD));
app.use("/data", express.static(path.join(__dirname, "../janhaq-frontend/src/data")));

// Explain endpoint (fixed)
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
    // Use Node 18+ built-in fetch (no import needed)
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

// Search endpoint
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

// Catch-all for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_BUILD, "index.html"));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
