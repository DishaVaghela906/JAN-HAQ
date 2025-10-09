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
export async function getAllLaws() {
  try {
    const response = await fetch(`${BASE_URL}/api/laws`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching all laws:", err);
    return []; // Return an empty array on error
  }
}

export async function getAllSchemes() {
  try {
    const response = await fetch(`${BASE_URL}/api/schemes`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching all schemes:", err);
    return []; // Return an empty array on error
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

export async function getAllDepartments() {
  const response = await fetch('/api/departments');
  if (!response.ok) throw new Error('Failed to fetch departments');
  return response.json();
}