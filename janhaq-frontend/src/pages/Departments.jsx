import { useEffect, useState } from 'react';
import Card from '../components/LawCard';
import { getAllDepartments } from '../utils/api';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const data = await getAllDepartments();
        setDepartments(data);
      } catch (error) {
        setDepartments([]);
      }
      setLoading(false);
    };
    fetchDepartments();
  }, []);

  return (
    <div className="flex-grow max-w-7xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Departments & Authorities</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore and connect with key government departments and authorities.
        </p>
      </div>

      {loading ? (
        <p className="text-center">Loading departments...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <Card
                key={dept.id || index}
                title={dept.name}
                description={dept.contact}
                icon="🏛️"
              />
            ))
          ) : (
            <p className="text-center col-span-full">No departments found.</p>
          )}
        </div>
      )}

      <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.95373531583453!3d-37.81720974202153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f06f31%3A0x5045675218ce7e33!2sVictoria%20State%20Library!5e0!3m2!1sen!2sus!4v1689616800000!5m2!1sen!2sus"
          width="100%"
          height="400"
          className="border-0"
          allowFullScreen=""
          loading="lazy"
          title="Departments Map"
        ></iframe>
      </div>
    </div>
  );
}