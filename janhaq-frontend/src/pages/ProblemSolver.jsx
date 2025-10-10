import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProblem, explainItem } from "../utils/api";
import { marked } from "marked";

export default function ProblemSolver() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [explanations, setExplanations] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) handleSearch(initialQuery);
  }, [searchParams]);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    setExplanations({});

    try {
      const data = await searchProblem(searchQuery.trim());
      setResults(data);
      if (data.length === 0) setError("No relevant laws or schemes found for your query.");
    } catch {
      setError("Failed to fetch search results. Please check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const handleExplain = async (title, description) => {
    if (explanations[title]) return;
    setExplanations(prev => ({ ...prev, [title]: "Loading explanation..." }));
    const explanation = await explainItem(title, description);
    setExplanations(prev => ({ ...prev, [title]: marked.parse(explanation || "No explanation available.") }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 bg-pattern">

      {/* Top and bottom spacing + inner padding */}
      <div className="mt-[-100px] mb-[-140px] pt-24 pb-24 px-4 sm:px-6 lg:px-16">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Problem Solver</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Describe your problem and get relevant laws, schemes, and AI explanations.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Describe your problem..."
            className="p-3 rounded-lg flex-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 w-full"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Loading / Error */}
        {loading && <p className="text-center mb-4">Searching for relevant information...</p>}
        {error && !loading && <p className="text-center text-red-500">{error}</p>}

        {/* Results */}
        <div className="space-y-6">
          {results.map(item => (
            <div
              key={`${item.title}-${item.score}`}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
            >
              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">{item.title}</h3>
              <p className="my-2 text-gray-700 dark:text-gray-300">{item.description || "No description available."}</p>

              {item.referenceLink && (
                <a
                  href={item.referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline mr-4"
                >
                  Read full document
                </a>
              )}

              <button
                onClick={() => handleExplain(item.title, item.description)}
                disabled={!!explanations[item.title]}
                className="mt-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition disabled:opacity-50"
              >
                {explanations[item.title] ? 'Explained' : 'Explain with AI'}
              </button>

              {explanations[item.title] && (
                <div
                  className="prose dark:prose-invert max-w-none mt-4 p-4 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-700 rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: explanations[item.title] }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dotted Background Styling */}
      <style>
        {`
          .bg-pattern {
            background-color: #f9fafb;
            background-image: radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px);
            background-size: 15px 15px;
          }
          .dark .bg-pattern {
            background-color: #111827;
            background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}
      </style>
    </div>
  );
}
