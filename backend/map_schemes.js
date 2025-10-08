// backend/map_schemes.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pipeline } from "@xenova/transformers";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_PATH = path.join(__dirname, "..", "frontend", "data", "schemes.json");
const OUT_PATH = path.join(__dirname, "..", "frontend", "data", "schemes_with_embeddings.json");

// --- Helper: turn scheme object into text ---
function schemeText(s) {
  return `${s.scheme_name || ""}. ${s.details || ""}. ${s.benefits || ""}. ${s.eligibility || ""}. Category: ${s.category || ""}`;
}

// --- Helper: normalize model output (like embed_local.js) ---
function normalizeOutput(out) {
  if (out && typeof out === "object" && out.data) {
    out = out.data;
  }
  while (Array.isArray(out) && out.length === 1 && Array.isArray(out[0])) {
    out = out[0];
  }
  if (out instanceof Float32Array || out instanceof Float64Array) {
    return Array.from(out);
  }
  if (Array.isArray(out)) {
    if (Array.isArray(out[0])) {
      const dims = out[0].length;
      const sums = new Array(dims).fill(0);
      for (const tokenVec of out) {
        for (let i = 0; i < dims; i++) sums[i] += tokenVec[i];
      }
      return sums.map(x => x / out.length);
    } else {
      return out;
    }
  }
  throw new Error("Unexpected embedding output format");
}

async function main() {
  console.log("📂 Loading schemes file:", INPUT_PATH);
  const raw = fs.readFileSync(INPUT_PATH, "utf8");
  const schemes = JSON.parse(raw);
  console.log(`✅ Found ${schemes.length} schemes.`);

  console.log("⚙️ Loading local embedding model...");
  const model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const out = [];
  for (let i = 0; i < schemes.length; i++) {
    const s = schemes[i];
    console.log(`✨ Embedding ${i + 1}/${schemes.length}: ${s.scheme_name}`);

    const text = schemeText(s);
    const embRaw = await model(text, { pooling: "mean", normalize: true });
    const embedding = normalizeOutput(embRaw);

    out.push({
      ...s,
      embedding
    });

    // Save progress every 25 or at the end
    if ((i + 1) % 25 === 0 || i === schemes.length - 1) {
      fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), "utf8");
      console.log(`💾 Saved progress: ${out.length} embeddings -> ${OUT_PATH}`);
    }
  }

  console.log("🎉 Done. Total embeddings:", out.length);
  console.log("📌 File saved at:", OUT_PATH);
}

main().catch(err => {
  console.error("❌ Error during embedding:", err);
  process.exit(1);
});
