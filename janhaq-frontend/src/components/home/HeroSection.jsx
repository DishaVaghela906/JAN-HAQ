import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ Import useAuth

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // ✅ Get authentication status

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);
  }, []);

  // ✅ Handle Get Started button click
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // Light and dark gradients
  const lightGradient = [
    "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.15) 0%, transparent 50%)",
    "radial-gradient(circle at 100% 100%, rgba(20,184,166,0.15) 0%, transparent 50%)",
    "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 50%)",
  ];

  const darkGradient = [
    "radial-gradient(circle at 0% 0%, rgba(14,116,144,0.2) 0%, transparent 50%)",
    "radial-gradient(circle at 100% 100%, rgba(6,182,212,0.2) 0%, transparent 50%)",
    "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)",
  ];

  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 md:px-8 pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ background: isDark ? darkGradient : lightGradient }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800"
          >
            <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
              Your Rights, Simplified
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Finally, a clear path
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              for your civic voice
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            JanHaq helps you understand your rights, find the right government schemes,
            and connect with the proper authorities. No more confusion—just clear steps forward.
          </p>

          {/* ✅ Updated CTA Button with conditional behavior */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Button 
              onClick={handleGetStarted}
              className="cta-button"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'} 
              <ArrowRight className="w-5 h-5 ml-2 inline-block" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}