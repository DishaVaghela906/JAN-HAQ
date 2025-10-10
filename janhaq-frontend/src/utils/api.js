const BASE_URL = "http://localhost:3000"; // backend URL

export async function searchProblem(query) {
  if (!query) return [];
  try {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching search results:", err);
    return [];
  }
}

export async function getAllLaws() {
  try {
    const response = await fetch(`${BASE_URL}/api/laws`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching all laws:", err);
    return [];
  }
}

export async function getAllSchemes() {
  try {
    const response = await fetch(`${BASE_URL}/api/schemes`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching all schemes:", err);
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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.explanation;
  } catch (err) {
    console.error("Error fetching explanation:", err);
    return null;
  }
}

// ✅ Updated: getAllDepartments now uses BASE_URL
export async function getAllDepartments() {
  try {
    const response = await fetch(`${BASE_URL}/api/departments`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log("Fetched departments:", data); // debug log
    return data;
  } catch (err) {
    console.error("Error fetching departments:", err);
    return [];
  }
}

export async function getRecommendations(profile) {
  try {
    const response = await fetch(`${BASE_URL}/api/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    return [];
  }
}
