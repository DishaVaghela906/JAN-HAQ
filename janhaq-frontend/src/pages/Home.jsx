import React from "react";
import { motion } from "framer-motion";

import HeroSection from "../components/home/HeroSection";
import FeatureCard from "../components/home/FeatureCard";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ImpactSection from "../components/home/ImpactSection";
import FinalCTA from "../components/home/FinalCTA";

import { BookOpen, Search, Users } from "lucide-react";

// Import Landing Page CSS separately
import '../styles/home.css';



export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <HeroSection />

      {/* Key Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Know Your Rights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            JanHaq simplifies complex civic information into clear, actionable guidance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={BookOpen}
            title="Understand Your Rights"
            description="Access plain-language summaries of your legal rights. No legal jargon—just clear explanations you can understand and act on."
            delay={0.1}
            accentColor="blue"
          />
          <FeatureCard
            icon={Search}
            title="Find Relevant Schemes"
            description="Discover government schemes you qualify for with step-by-step guidance. Get the benefits you deserve without the confusion."
            delay={0.2}
            accentColor="teal"
          />
          <FeatureCard
            icon={Users}
            title="Connect with Authorities"
            description="Find verified contact information for the right government departments. Reach the people who can help you directly."
            delay={0.3}
            accentColor="cyan"
          />
        </div>
      </section>

      <HowItWorksSection />
      <ImpactSection />
      <FinalCTA />
    </div>
  );
}
