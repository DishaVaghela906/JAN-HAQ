import React from "react";

// Import all separated components
import StorySection from "../components/about/StorySection";
import JourneySection from "../components/about/JourneySection";
import MissionAndValuesSection from "../components/about/MissionAndValuesSection";
import TeamSection from "../components/about/TeamSection";
import FinalAboutCTA from "../components/about/FinalAboutCTA";


// --- Main About Component ---
export default function About() {
  return (
    // Applied custom background class to the main container
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 bg-pattern">
      
      <StorySection />
      
      <JourneySection />
      
      <MissionAndValuesSection />

      <TeamSection />
      
      <FinalAboutCTA />

      {/* Style block for the custom background texture */}
      <style>
        {`
          /* LIGHT MODE: Visible diagonal pattern for a sophisticated texture */
          .bg-pattern {
            background-color: #f9fafb; /* bg-gray-50 */
            background-image: linear-gradient(135deg, #f3f4f6 10%, transparent 10%),
                              linear-gradient(45deg, #f3f4f6 10%, transparent 10%);
            background-size: 15px 15px;
            background-position: 0 0, 7.5px 7.5px; 
          }
          
          /* DARK MODE: Subtle dark dot texture for a premium, non-flat background */
          .dark .bg-pattern {
            background-color: #111827; /* bg-gray-900 */
            background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}
      </style>
    </div>
  );
}