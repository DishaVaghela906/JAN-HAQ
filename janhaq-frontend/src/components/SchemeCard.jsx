import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { saveItem, unsaveItem, checkIfSaved } from "../utils/api";
import LoginPromptModal from "./LoginPromptModal";

export default function SchemeCard({ id, title = "No Title", description = "No description", icon, referenceLink, tags = [] }) {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const openOfficialLink = () => {
    if (referenceLink) window.open(referenceLink, "_blank");
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
        await saveItem(id, title, description, "scheme", referenceLink, tags);
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
      {/* Card */}
      <div
        className="relative rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
        onClick={openOfficialLink} // Clicking the card opens official link
      >
        {/* Save Button - Top Right */}
        <button
          onClick={handleSaveClick}
          disabled={isSaving}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-all z-10 ${
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

        <div className="mb-4 flex items-center space-x-3 pr-10">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-bold dark:text-white">{title}</h2>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {description.length <= MAX_LENGTH
            ? description
            : `${description.slice(0, MAX_LENGTH)}...`}
          {description.length > MAX_LENGTH && (
            <span
              onClick={openModal}
              className="text-blue-600 dark:text-blue-400 font-medium ml-1 hover:underline cursor-pointer"
            >
              Read More
            </span>
          )}
        </p>

        {description.length > MAX_LENGTH && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Click anywhere on the card to view official details
          </span>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-2xl w-full shadow-xl relative">
            <h2 className="text-xl font-bold mb-4 dark:text-white">{title}</h2>
            <p className="text-gray-800 dark:text-gray-300 mb-6">{description}</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      <LoginPromptModal 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </>
  );
}
