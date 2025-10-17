import React from 'react';
import { BookOpen, Award } from 'lucide-react'; // Icons for laws vs schemes

export default function RecommendationCard({ item }) {
  // Determine type: law or scheme
  const isLaw = item.type === 'law';
  const icon = isLaw ? <BookOpen className="text-blue-500" /> : <Award className="text-green-500" />;

  const title = item.title || "Untitled";
  const description = item.description || item.details || "No details available.";
  const link = item.referenceLink || item.url || "#";

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow rounded-lg p-6 flex flex-col justify-between border border-gray-100 dark:border-gray-700">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{title}</h3>
          {icon}
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {description}
        </p>
        {/* Optional tags display */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm font-semibold text-blue-600 hover:underline self-start"
      >
        View Details →
      </a>
    </div>
  );
}
