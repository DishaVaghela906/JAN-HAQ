import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ComplaintGenerator() {
  const [complaint, setComplaint] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit logic
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Generate a Complaint</h1>

        {submitted ? (
          <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg text-green-900 dark:text-green-100 text-center">
            Your complaint has been saved successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Category</option>
              <option value="corruption">Corruption</option>
              <option value="public-services">Public Services</option>
              <option value="environment">Environment</option>
            </select>

            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe your issue..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              rows="6"
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Submit Complaint
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
