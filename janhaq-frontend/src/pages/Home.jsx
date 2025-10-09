import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to the ProblemSolver page with the user's query
      navigate(`/problem-solver?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      {/* Hero Section - The form is now functional */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 px-6 text-center flex flex-col items-center">
         <Navbar />
            
        <h1 className="text-5xl font-bold mb-6">
          Your Rights. Your Voice. Your Action.
        </h1>
        <p className="text-lg mb-8 max-w-2xl">
          Find the right laws, schemes, and departments to support your cause.
        </p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Type your problem..."
            className="p-3 rounded-lg w-80 sm:w-96 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-100 transition">
            Start Now
          </button>
        </form>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto py-16 grid md:grid-cols-3 gap-6 px-6">
        <Card title="Know Your Rights" icon="📜" />
        <Card title="File a Complaint" icon="📝" />
        <Card title="Explore Schemes" icon="💡" />
      </section>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Why JanHaq?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Card title="Awareness" icon="🧠" />
          <Card title="Transparency" icon="🔍" />
          <Card title="Empowerment" icon="💪" />
        </div>
      </section>
       <Footer />
    </>
  );
}

// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Card from '../components/Card';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 px-6 text-center flex flex-col items-center">
//         <h1 className="text-5xl font-bold mb-6">
//           Your Rights. Your Voice. Your Action.
//         </h1>
//         <p className="text-lg mb-8 max-w-2xl">
//           Find the right laws, schemes, and departments to support your cause.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
//           <input
//             type="text"
//             placeholder="Type your problem..."
//             className="p-3 rounded-lg w-80 sm:w-96 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           />
//           <button className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-100 transition">
//             Start Now
//           </button>
//         </div>
//       </section>

//       {/* Quick Access Cards */}
//       <section className="max-w-7xl mx-auto py-16 grid md:grid-cols-3 gap-6 px-6">
//         <Card title="Know Your Rights" icon="📜" />
//         <Card title="File a Complaint" icon="📝" />
//         <Card title="Explore Schemes" icon="💡" />
//       </section>

//       {/* Highlights Section */}
//       <section className="max-w-6xl mx-auto py-16 px-6">
//         <h2 className="text-3xl font-bold mb-8 text-center">Why JanHaq?</h2>
//         <div className="grid md:grid-cols-3 gap-6 text-center">
//           <Card title="Awareness" icon="🧠" />
//           <Card title="Transparency" icon="🔍" />
//           <Card title="Empowerment" icon="💪" />
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }
