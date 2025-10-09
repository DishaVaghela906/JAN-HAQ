import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllLaws } from '../utils/api'; 

export default function Laws() {
  const [allLaws, setAllLaws] = useState([]);
  const [filteredLaws, setFilteredLaws] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Effect to fetch all laws once when the component mounts
  useEffect(() => {
    const fetchLaws = async () => {
      setLoading(true);
      const lawsData = await getAllLaws();
      setAllLaws(lawsData);
      setFilteredLaws(lawsData);
      setLoading(false);
    };
    fetchLaws();
  }, []);

  // Effect to filter laws whenever the search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredLaws(allLaws);
      return;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = allLaws.filter(law =>
      law.title.toLowerCase().includes(lowercasedFilter) ||
      (law.description && law.description.toLowerCase().includes(lowercasedFilter))
    );
    setFilteredLaws(filteredData);
  }, [searchTerm, allLaws]);

  return (
    <div className="flex-grow max-w-7xl mx-auto py-16 px-6">
      <Navbar />
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Laws & Regulations</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Browse and filter through the legal knowledge base.</p>
      </div>

      {/* Filter Input */}
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Filter laws by title or keyword..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content Grid */}
      {loading ? (
        <p className="text-center">Loading laws...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaws.length > 0 ? (
            filteredLaws.map((law, index) => (
              <a href={law.referenceLink} target="_blank" rel="noopener noreferrer" key={index} className="block hover:scale-105 transition-transform">
                <Card
                  title={law.title}
                  description={law.description}
                  icon="📜"
                />
              </a>
            ))
          ) : (
            <p className="text-center col-span-full">No laws match your filter.</p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Card from '../components/Card';
// import { laws } from '../utils/mockData';

// export default function Laws() {
//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
//       <Navbar />

//       <div className="flex-grow max-w-7xl mx-auto py-16 px-6">
//         <h1 className="text-3xl font-bold mb-8">Laws & Regulations</h1>
//         <div className="grid md:grid-cols-3 gap-6">
//           {laws.map((law, index) => (
//             <Card
//               key={index}
//               title={law.title}
//               description={law.description}
//               icon="📜"
//             />
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
