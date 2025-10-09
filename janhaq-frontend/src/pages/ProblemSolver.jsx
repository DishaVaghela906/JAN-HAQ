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

  // This effect runs when the page loads with a query from the homepage
  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [searchParams]); // Rerun if the URL query parameter changes

  const handleSearch = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    setExplanations({}); // Clear old explanations

    try {
      const data = await searchProblem(searchQuery.trim());
      setResults(data);
      if (data.length === 0) {
        setError("No relevant laws or schemes found for your query.");
      }
    } catch (err) {
      setError("Failed to fetch search results. Please check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      setSearchParams({ q: query }); // Update URL query param to trigger the useEffect
  }

  const handleExplain = async (title, description) => {
    // Prevent multiple clicks while loading
    if (explanations[title]) return;

    setExplanations(prev => ({ ...prev, [title]: "Loading explanation..." }));
    const explanation = await explainItem(title, description);
    
    // Use the 'marked' library to convert Markdown to HTML
    const htmlExplanation = marked.parse(explanation || "No explanation available at the moment.");

    setExplanations(prev => ({
      ...prev,
      [title]: htmlExplanation,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Problem Solver</h1>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
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

      {/* Loading or Error State */}
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
  );
}
// import { useState } from "react";
// import { searchProblem, explainItem } from "../utils/api";
// import { marked } from "marked";

// export default function ProblemSolver() {
//   const [query, setQuery] = useState("");
//   const [category, setCategory] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [explanations, setExplanations] = useState({});

//   const categories = ["Environment", "Pollution", "Energy", "Forestry"];

//   const handleSearch = async () => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }
//     setLoading(true);

//     const data = await searchProblem(query.trim());

//     // Apply optional category filter
//     const filtered = category
//       ? data.filter(item =>
//           (item.tags || [])
//             .map(t => t.toLowerCase())
//             .includes(category.toLowerCase())
//         )
//       : data;

//     setResults(filtered);
//     setLoading(false);
//   };

//   const handleExplain = async (title, description) => {
//     setExplanations(prev => ({ ...prev, [title]: "Loading explanation..." }));
//     const explanation = await explainItem(title, description);
//     setExplanations(prev => ({
//       ...prev,
//       [title]: explanation || "No explanation available.",
//     }));
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-16">
//       <h1 className="text-3xl font-bold mb-6 text-center">Problem Solver</h1>

//       {/* Search bar */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
//         <input
//           type="text"
//           placeholder="Describe your problem..."
//           className="p-3 rounded-lg flex-1 border border-gray-300 dark:border-gray-600"
//           value={query}
//           onChange={e => setQuery(e.target.value)}
//           onKeyDown={e => e.key === "Enter" && handleSearch()}
//         />
//         <select
//           className="p-3 rounded-lg border border-gray-300 dark:border-gray-600"
//           value={category}
//           onChange={e => setCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {categories.map(c => (
//             <option key={c.toLowerCase()} value={c.toLowerCase()}>
//               {c}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={handleSearch}
//           className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Search
//         </button>
//       </div>

//       {/* Loading */}
//       {loading && <p className="text-center mb-4">Searching...</p>}

//       {/* No results */}
//       {results.length === 0 && !loading && <p className="text-center">No results found.</p>}

//       {/* Results */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {results.map(item => (
//           <div
//             key={item.title}
//             className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
//           >
//             <h3 className="font-semibold text-lg">{item.title}</h3>
//             <p className="mb-2">{item.description || "No description available."}</p>

//             {item.referenceLink && (
//               <a
//                 href={item.referenceLink}
//                 target="_blank"
//                 className="text-blue-600 hover:underline"
//               >
//                 Read full document
//               </a>
//             )}

//             <button
//               onClick={() => handleExplain(item.title, item.description)}
//               className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//             >
//               Explain
//             </button>

//             {explanations[item.title] && (
//               <div
//                 className="mt-2 p-2 border-l-4 border-blue-600 bg-gray-50 dark:bg-gray-800"
//                 dangerouslySetInnerHTML={{ __html: marked.parse(explanations[item.title]) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
