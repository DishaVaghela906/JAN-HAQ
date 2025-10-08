// frontend/js/search.js

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("category");
const resultsDiv = document.getElementById("results");

// Base URL for backend
const BASE_URL = "http://localhost:3000"; // change if backend runs elsewhere

async function doSearch() {
  const q = searchInput.value.trim();
  const category = categorySelect.value;

  if (!q) {
    resultsDiv.innerHTML = "<p>Type something to search.</p>";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    // Optional category filter (case-insensitive)
    const filtered = category
      ? data.filter(item =>
          (item.tags || [])
            .map(t => t.toLowerCase())
            .includes(category.toLowerCase())
        )
      : data;

    if (filtered.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsDiv.innerHTML = filtered
      .map(item => `
        <div class="law-card">
          <h3>${item.title}</h3>
          <p>${item.description || "No description available."}</p>
          ${item.referenceLink ? `<a href="${item.referenceLink}" target="_blank">Read full document</a><br><br>` : ""}
          <button onclick="explainItem(
            '${item.title.replace(/'/g, "\\'")}',
            '${(item.description || "").replace(/'/g, "\\'")}',
            this.parentElement
          )">
            Explain
          </button>
        </div>
      `)
      .join("");
  } catch (err) {
    console.error("❌ Error fetching search:", err);
    resultsDiv.innerHTML = "<p>Error fetching search results.</p>";
  }
}

async function explainItem(title, description, cardElement) {
  const explanationDiv = document.createElement("div");
  explanationDiv.innerHTML = "<p>Loading explanation...</p>";
  cardElement.appendChild(explanationDiv);

  try {
    const res = await fetch(`${BASE_URL}/api/explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });

    const data = await res.json();

    explanationDiv.innerHTML = `
      <div class="explanation">${marked.parse(data.explanation)}</div>
    `;
  } catch (err) {
    console.error("❌ Error in explain:", err);
    explanationDiv.innerHTML = "<p>Error loading explanation.</p>";
  }
}

// Trigger search on Enter
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    doSearch();
  }
});
