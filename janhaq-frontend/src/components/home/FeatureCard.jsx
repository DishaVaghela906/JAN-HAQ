import React from "react";
import { motion } from "framer-motion";
import Card from "../Card";

const accentColors = {
  blue: {
    light: "from-[#3b82f6] to-[#06b6d4]",       // gradient overlay
    glow: "group-hover:shadow-[0_12px_30px_rgba(59,130,246,0.2)]", // hover shadow
    border: "group-hover:border-[#3b82f6]/50",  // hover border
    icon: "text-[#3b82f6] dark:text-[#3b82f6]", // icon color
    bg: "bg-[#ebf8ff] dark:bg-[#0A192F]",       // icon background
  },
  teal: {
    light: "from-[#14b8a6] to-[#0e7490]",
    glow: "group-hover:shadow-[0_12px_30px_rgba(20,184,166,0.2)]",
    border: "group-hover:border-[#14b8a6]/50",
    icon: "text-[#14b8a6] dark:text-[#14b8a6]",
    bg: "bg-[#d5f5f0] dark:bg-[#112240]",
  },
  cyan: {
    light: "from-[#06b6d4] to-[#0891b2]",
    glow: "group-hover:shadow-[0_12px_30px_rgba(6,182,212,0.2)]",
    border: "group-hover:border-[#06b6d4]/50",
    icon: "text-[#06b6d4] dark:text-[#06b6d4]",
    bg: "bg-[#e0f7fa] dark:bg-[#0e3740]",
  },
};

export default function FeatureCard({ icon: Icon, title, description, delay, accentColor = "blue" }) {
  const colors = accentColors[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className={`relative h-full p-8 border-2 border-gray-200 dark:border-gray-700 ${colors.border} transition-all duration-300 shadow-lg ${colors.glow} hover:shadow-2xl bg-white dark:bg-gray-800 overflow-hidden`}>
        
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.light} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Icon with animated background */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}>
            <Icon className={`w-8 h-8 ${colors.icon}`} />
          </div>
        </motion.div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* Decorative corner element */}
        <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${colors.light} opacity-10 rounded-tl-full group-hover:opacity-20 transition-opacity duration-300`} />
      </Card>
    </motion.div>
  );
}
