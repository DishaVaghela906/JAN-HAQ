import React from 'react';
import { BookOpen, Award } from 'lucide-react'; // Using icons for clarity

export default function RecommendationCard({ item }) {
  // Determine if the item is a law or a scheme based on its properties
  const isLaw = item.type === 'law';
  const icon = isLaw ? <BookOpen className="text-blue-500" /> : <Award className="text-green-500" />;
  const description = item.description || item.details || "No details available.";

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow rounded-lg p-6 flex flex-col justify-between border border-gray-100 dark:border-gray-700">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{item.title}</h3>
          {icon}
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {description}
        </p>
      </div>
      <a
        href={item.referenceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm font-semibold text-blue-600 hover:underline self-start"
      >
        View Details →
      </a>
    </div>
  );
}