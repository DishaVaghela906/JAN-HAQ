import { useState } from "react";
import { searchProblem, explainItem } from "../utils/api";
import { marked } from "marked";

export default function ProblemSolver() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [explanations, setExplanations] = useState({});

  const categories = ["Environment", "Pollution", "Energy", "Forestry"];

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);

    const data = await searchProblem(query.trim());

    // Apply optional category filter
    const filtered = category
      ? data.filter(item =>
          (item.tags || [])
            .map(t => t.toLowerCase())
            .includes(category.toLowerCase())
        )
      : data;

    setResults(filtered);
    setLoading(false);
  };

  const handleExplain = async (title, description) => {
    setExplanations(prev => ({ ...prev, [title]: "Loading explanation..." }));
    const explanation = await explainItem(title, description);
    setExplanations(prev => ({
      ...prev,
      [title]: explanation || "No explanation available.",
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Problem Solver</h1>

      {/* Search bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Describe your problem..."
          className="p-3 rounded-lg flex-1 border border-gray-300 dark:border-gray-600"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
        <select
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.toLowerCase()} value={c.toLowerCase()}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center mb-4">Searching...</p>}

      {/* No results */}
      {results.length === 0 && !loading && <p className="text-center">No results found.</p>}

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {results.map(item => (
          <div
            key={item.title}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="mb-2">{item.description || "No description available."}</p>

            {item.referenceLink && (
              <a
                href={item.referenceLink}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Read full document
              </a>
            )}

            <button
              onClick={() => handleExplain(item.title, item.description)}
              className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Explain
            </button>

            {explanations[item.title] && (
              <div
                className="mt-2 p-2 border-l-4 border-blue-600 bg-gray-50 dark:bg-gray-800"
                dangerouslySetInnerHTML={{ __html: marked.parse(explanations[item.title]) }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
