// backend/embed_local.js
const fs = require("fs");
const path = require("path");
const { pipeline } = require("@xenova/transformers");

const INPUT_PATH = path.join(__dirname, "..", "frontend", "data", "all_laws.json");
const OUT_PATH = path.join(__dirname, "laws_with_embeddings.json");

// Helper: turn a law object into plain text
function lawText(law) {
  const tags = Array.isArray(law.tags) ? law.tags.join(", ") : "";
  return `${law.title}. ${law.description || ""}. Tags: ${tags}`;
}

// Helper: normalize output of transformer to plain JS array
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
  console.log("Loading laws file:", INPUT_PATH);
  const raw = fs.readFileSync(INPUT_PATH, "utf8");
  const laws = JSON.parse(raw);
  console.log(`Found ${laws.length} laws.`);

  console.log("Loading local embedding model...");
  const model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const out = [];
  for (let i = 0; i < laws.length; i++) {
    const law = laws[i];
    const text = lawText(law);
    console.log(`Embedding ${i + 1}/${laws.length}: ${law.title}`);

    const embRaw = await model(text, { pooling: "mean", normalize: true });
    const embedding = normalizeOutput(embRaw);

    out.push({
      title: law.title,
      description: law.description || "",
      tags: law.tags || [],
      referenceLink: law.referenceLink || null,
      embedding
    });

    if ((i + 1) % 25 === 0 || i === laws.length - 1) {
      fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), "utf8");
      console.log(`Saved progress: ${out.length} embeddings -> ${OUT_PATH}`);
    }
  }

  console.log("✅ Done. Total embeddings:", out.length);
  console.log("File saved at:", OUT_PATH);
}

main().catch(err => {
  console.error("Error during embedding:", err);
  process.exit(1);
});
