import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRecommendations } from '../utils/api';
import Card from '../components/Card';
import RecommendationCard from '../components/RecommendationCard'; // Import our new component

export default function Dashboard() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to fetch recommendations when the component mounts
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user && user.profile) {
        setLoading(true);
        const recommendedItems = await getRecommendations(user.profile);
        setRecommendations(recommendedItems);
        setLoading(false);
      } else {
        // Handle cases where user has no profile (e.g., old account)
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user ? user.name : 'Guest'}!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">This is your personalized dashboard.</p>

        {/* --- Recommended For You Section --- */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          {loading ? (
            <p>Loading personalized recommendations...</p>
          ) : recommendations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((item, index) => (
                <RecommendationCard key={index} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              We don't have any specific recommendations for you yet. Try our Problem Solver to find what you need!
            </p>
          )}
        </section>
        
        {/* --- General Dashboard Links --- */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="My Complaints" icon="📝" description="View and track your complaints." />
            <Card title="Saved Items" icon="📚" description="Access your saved laws and schemes." />
            <Card title="Profile Settings" icon="⚙️" description="Update personal info and password." />
          </div>
        </section>
      </section>
    </div>
  );
}
// import Card from '../components/LawCard';

// export default function Dashboard() {
//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
    
//       <section className="max-w-7xl mx-auto py-16 px-6">
//         <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
//         <div className="grid md:grid-cols-3 gap-6">
//           <Card title="My Complaints" icon="📝" description="View and track your complaints." />
//           <Card title="Saved Laws & Schemes" icon="📚" description="Access your saved laws and schemes." />
//           <Card title="Profile Settings" icon="⚙️" description="Update personal info and password." />
//         </div>
//       </section>
//     </div>
//   );
// }
