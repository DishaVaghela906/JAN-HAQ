import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { saveItem, unsaveItem, checkIfSaved } from "../utils/api";
import LoginPromptModal from "./LoginPromptModal";

export default function Card({ id, title, description, icon, referenceLink, tags = [] }) {
  const { isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const MAX_LENGTH = 120;

  // Check if item is already saved
  useEffect(() => {
    if (isAuthenticated && id) {
      checkSavedStatus();
    }
  }, [id, isAuthenticated]);

  const checkSavedStatus = async () => {
    try {
      const saved = await checkIfSaved(id);
      setIsSaved(saved);
    } catch (err) {
      console.error("Failed to check saved status:", err);
    }
  };

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    
    // Show login prompt if not authenticated
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setIsSaving(true);

    try {
      if (isSaved) {
        // Unsave
        await unsaveItem(id);
        setIsSaved(false);
      } else {
        // Save
        await saveItem(id, title, description, "law", referenceLink, tags);
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Failed to toggle save:", err);
      alert(err.message || "Failed to save item. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div
        className="relative rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between h-full"
        onClick={() => referenceLink && window.open(referenceLink, "_blank")}
      >
        {/* Save Button - Top Right */}
        <button
          onClick={handleSaveClick}
          disabled={isSaving}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
            isSaved
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isSaved ? "Remove from saved items" : "Save this item"}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          )}
        </button>

        {/* Icon + Title */}
        <div className="mb-4 flex items-center space-x-3 pr-10">
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

      {/* Login Prompt Modal */}
      <LoginPromptModal 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </>
  );
}
