import { useState } from "react";

export default function Card({ title, description, icon, referenceLink }) {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 120;

  const toggleExpanded = (e) => {
    e.stopPropagation(); // prevent triggering the card click
    setExpanded(!expanded);
  };

  return (
    <div
      className="relative rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between h-full"
      onClick={() => referenceLink && window.open(referenceLink, "_blank")}
    >
      {/* Icon + Title */}
      <div className="mb-4 flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-lg font-bold dark:text-white">{title}</h2>
      </div>

      {/* Description with Read More toggle */}
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {description.length <= MAX_LENGTH
          ? description
          : expanded
          ? description
          : `${description.slice(0, MAX_LENGTH)}...`}
        {description.length > MAX_LENGTH && (
          <span
            onClick={toggleExpanded}
            className="text-blue-600 dark:text-blue-400 font-medium ml-1 hover:underline cursor-pointer"
          >
            {expanded ? "Show Less" : "Read More"}
          </span>
        )}
      </p>

      {/* Official link hint always visible at bottom */}
      <div className="mt-auto">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Click anywhere on the card to view on India Code
        </span>
      </div>
    </div>
  );
}
