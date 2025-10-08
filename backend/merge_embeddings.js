// backend/merge_embeddings.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LAWS_PATH = path.join(__dirname, "laws_with_embeddings.json");
const SCHEMES_PATH = path.join(__dirname, "../frontend/data/schemes_with_embeddings.json");
const OUT_PATH = path.join(__dirname, "../frontend/data/knowledge_base.json");

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function normalizeLaws(laws) {
  return laws.map(law => ({
    type: "law",
    title: law.title,
    description: law.description || "",
    tags: law.tags || [],
    referenceLink: law.referenceLink || null,
    embedding: law.embedding
  }));
}

function normalizeSchemes(schemes) {
  return schemes.map(s => ({
    type: "scheme",
    title: s.scheme_name,
    details: s.details,
    benefits: s.benefits,
    eligibility: s.eligibility,
    application: s.application,
    documents: s.documents,
    level: s.level,
    category: s.schemeCategory,
    tags: s.tags || [],
    embedding: s.embedding
  }));
}

function main() {
  console.log("📂 Loading laws & schemes...");
  const laws = loadJson(LAWS_PATH);
  const schemes = loadJson(SCHEMES_PATH);

  console.log(`✅ ${laws.length} laws loaded`);
  console.log(`✅ ${schemes.length} schemes loaded`);

  const merged = [...normalizeLaws(laws), ...normalizeSchemes(schemes)];

  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2), "utf8");
  console.log(`🎉 Merged dataset saved to ${OUT_PATH}`);
}

main();
