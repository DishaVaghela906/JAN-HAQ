import { useState } from "react";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";

export default function SavedItemCard({ 
  itemId,
  title, 
  description, 
  type,
  referenceLink,
  tags,
  onUnsave 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const MAX_LENGTH = 150;

  const handleUnsave = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Remove "${title}" from saved items?`)) {
      setIsRemoving(true);
      await onUnsave(itemId);
    }
  };

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const openLink = () => {
    if (referenceLink) {
      window.open(referenceLink, "_blank");
    }
  };

  // Type badge color
  const typeColor = type === "law" 
    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

  return (
    <div
      className={`relative rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
        isRemoving ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {/* Header: Type Badge + Bookmark Icon */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${typeColor}`}>
          {type}
        </span>
        <button
          onClick={handleUnsave}
          disabled={isRemoving}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          title="Remove from saved items"
        >
          {isRemoving ? (
            <div className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold dark:text-white mb-3 flex items-center gap-2">
        <Bookmark className="w-5 h-5 text-purple-600 dark:text-purple-400 fill-current" />
        {title}
      </h2>

      {/* Description with Read More toggle */}
      {description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
          {description.length <= MAX_LENGTH
            ? description
            : isExpanded
            ? description
            : `${description.slice(0, MAX_LENGTH)}...`}
          {description.length > MAX_LENGTH && (
            <span
              onClick={toggleExpanded}
              className="text-blue-600 dark:text-blue-400 font-medium ml-1 hover:underline cursor-pointer"
            >
              {isExpanded ? " Show Less" : " Read More"}
            </span>
          )}
        </p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* View Details Button */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        {referenceLink ? (
          <button
            onClick={openLink}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            View Details
            <ExternalLink className="w-4 h-4" />
          </button>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center block">
            No reference link available
          </span>
        )}
      </div>
    </div>
  );
}
