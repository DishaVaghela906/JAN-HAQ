import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getAllSchemes } from '../utils/api';

export default function Schemes() {
  const [allSchemes, setAllSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // State for our filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [loading, setLoading] = useState(true);

  // Effect to fetch all schemes and extract categories once on component mount
  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      const schemesData = await getAllSchemes();
      setAllSchemes(schemesData);
      setFilteredSchemes(schemesData);
      
      // Automatically find all unique categories from the data
      const uniqueCategories = [...new Set(schemesData.map(scheme => scheme.schemeCategory))];
      setCategories(uniqueCategories.filter(Boolean)); // Filter out any null/undefined categories
      
      setLoading(false);
    };
    fetchSchemes();
  }, []);

  // Effect to apply filters whenever search term or selected category changes
  useEffect(() => {
    let filtered = allSchemes;

    // Apply text search filter
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(scheme =>
        scheme.scheme_name.toLowerCase().includes(lowercasedFilter) ||
        (scheme.details && scheme.details.toLowerCase().includes(lowercasedFilter))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(scheme => scheme.schemeCategory === selectedCategory);
    }

    setFilteredSchemes(filtered);
  }, [searchTerm, selectedCategory, allSchemes]);

  return (
    <div className="flex-grow max-w-7xl mx-auto py-16 px-6">
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Government Schemes</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Find and filter schemes that can help you.</p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Filter by keyword..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Content Grid */}
      {loading ? (
        <p className="text-center">Loading schemes...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme, index) => (
              <a href={scheme.referenceLink} target="_blank" rel="noopener noreferrer" key={index} className="block hover:scale-105 transition-transform">
                <Card
                  title={scheme.scheme_name}
                  description={scheme.details}
                  icon="💡"
                />
              </a>
            ))
          ) : (
            <p className="text-center col-span-full">No schemes match your filters.</p>
          )}
        </div>
      )}
      
    </div>
  );
}
