const BASE_URL = "http://localhost:3000"; // backend URL

export async function searchProblem(query) {
  if (!query) return [];
  try {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching search results:", err);
    return [];
  }
}

export async function explainItem(title, description) {
  if (!title) return null;
  try {
    const response = await fetch(`${BASE_URL}/api/explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    return data.explanation;
  } catch (err) {
    console.error("Error fetching explanation:", err);
    return null;
  }
}
