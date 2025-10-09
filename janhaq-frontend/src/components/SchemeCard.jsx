import { useState } from "react";

export default function SchemeCard({ title = "No Title", description = "No description", icon, referenceLink }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const MAX_LENGTH = 120;

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

  return (
    <>
      {/* Card */}
      <div
        className="relative rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
        onClick={openOfficialLink} // Clicking the card opens official link
      >
        <div className="mb-4 flex items-center space-x-3">
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
    </>
  );
}
