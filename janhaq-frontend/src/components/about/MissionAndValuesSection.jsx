import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Handshake,
  Shield,
  Target,
  AlertTriangle,
  ArrowRightCircle,
} from "lucide-react";

// --- Content Data ---
const values = [
  {
    icon: Handshake,
    title: "Transparency",
    description: "Clear, unbiased access to all civic information.",
  },
  {
    icon: Shield,
    title: "Empowerment",
    description: "Providing the tools needed to assert your rights.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description: "Cutting through legal jargon with plain language.",
  },
];

const missionPillars = [
  {
    icon: AlertTriangle,
    color: "text-red-500",
    title: "The Frustration",
    content:
      "The system is complex, filled with jargon, and deliberately opaque. We recognize that feeling of being lost and powerless when seeking your basic rights.",
    background: "bg-white dark:bg-gray-800 border-l-4 border-red-400 shadow-lg",
  },
  {
    icon: ArrowRightCircle,
    color: "text-teal-500",
    title: "The Clarity We Provide",
    content:
      "We translate laws and schemes into simple, actionable steps. Our solution is the direct, digital bridge to the information you need, eliminating complexity entirely.",
    background: "bg-white dark:bg-gray-800 border-l-4 border-teal-400 shadow-lg",
  },
  {
    icon: Target,
    color: "text-sky-500",
    title: "The Ultimate Impact",
    content:
      "To foster a society where every citizen feels confident, informed, and empowered. Our vision is a system built on transparency and genuine accountability.",
    background: "bg-white dark:bg-gray-800 border-l-4 border-sky-500 shadow-lg",
  },
];

// --- Animation Variants ---

// Container variant for staggering children
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
      ease: "easeOut",
    },
  },
};

// Card entrance, hover and tap animation for values
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
  hover: {
    scale: 1.08,
    y: -10,
    rotate: 2,
    boxShadow: "0 18px 50px rgba(4, 120, 87, 0.35)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.96,
    transition: { type: "spring", stiffness: 500, damping: 15 },
  },
};

// Mission pillar entrance with stagger using custom delay
const missionBlockVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: custom * 0.18,
      ease: "easeOut",
    },
  }),
};

// Floating orbiting shape animation variant
const floatingShapeVariant = {
  animate: (custom) => ({
    rotate: [0, 360],
    x: [
      0,
      custom.direction === "left" ? -15 : 15,
      0,
      custom.direction === "left" ? 15 : -15,
      0,
    ],
    y: [
      0,
      custom.direction === "left" ? -10 : 10,
      0,
      custom.direction === "left" ? 10 : -10,
      0,
    ],
    transition: {
      duration: 15 + custom.delay,
      repeat: Infinity,
      ease: "linear",
      delay: custom.delay,
    },
  }),
};

export default function MissionAndValuesSection() {
  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-visible">
      {/* Floating orbiting shapes - subtle, lightweight and transparent */}
      <motion.div
        aria-hidden="true"
        custom={{ direction: "left", delay: 0 }}
        variants={floatingShapeVariant}
        animate="animate"
        className="absolute rounded-full w-24 h-24 bg-teal-400 opacity-20 top-10 left-10 filter blur-lg pointer-events-none select-none"
        style={{ zIndex: -1 }}
      />
      <motion.div
        aria-hidden="true"
        custom={{ direction: "right", delay: 5 }}
        variants={floatingShapeVariant}
        animate="animate"
        className="absolute rounded-full w-28 h-28 bg-sky-400 opacity-15 top-1/2 right-20 filter blur-xl pointer-events-none select-none"
        style={{ zIndex: -1 }}
      />
      <motion.div
        aria-hidden="true"
        custom={{ direction: "left", delay: 8 }}
        variants={floatingShapeVariant}
        animate="animate"
        className="absolute rounded-full w-20 h-20 bg-teal-300 opacity-10 bottom-10 right-10 filter blur-lg pointer-events-none select-none"
        style={{ zIndex: -1 }}
      />

      {/* Mission Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-5 drop-shadow-md">
          Our Mission: From Complexity to Confidence
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide">
          We've designed JanHaq to walk you through the entire civic process, step
          by step.
        </p>
      </motion.div>

      {/* Mission Pillars with smooth left-right slide and slow infinite icon rotation */}
      <div className="flex flex-col items-center space-y-14 max-w-5xl mx-auto">
        {missionPillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              className={`w-full md:w-4/5 p-6 rounded-xl transition-all duration-500 ${pillar.background} ${
                index % 2 === 0 ? "self-start md:pr-20" : "self-end md:pl-20"
              }`}
              variants={missionBlockVariants}
              custom={index}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true, amount: 0.6 }}
              tabIndex={0}
              aria-label={`${pillar.title} - mission pillar`}
              // Micro-interactions: subtle elevation on hover/focus
              whileHover={{ y: -6, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" }}
              whileFocus={{ y: -6, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start text-left">
                <motion.div
                  className={`p-5 rounded-full border-4 ${pillar.color} border-current flex-shrink-0 shadow-md`}
                  animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                  // Icon micro-interaction: subtle float on hover
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <Icon className={`w-7 h-7 ${pillar.color}`} />
                </motion.div>

                <div className="ml-8">
                  <h3
                    className={`text-2xl font-bold ${pillar.color} mb-3 select-none`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                    {pillar.content}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Core Values Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mt-24 mb-12"
      >
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide drop-shadow-md">
          Our Guiding Principles
        </h3>
      </motion.div>

      {/* Core Values Cards with scale, shadow & rotate micro-interactions */}
      <motion.div
        className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {values.map((value) => (
          <motion.div
            key={value.title}
            className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl text-center border-b-4 border-teal-400 cursor-pointer select-none"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            tabIndex={0}
            role="button"
            aria-label={`Guiding principle: ${value.title}`}
          >
            <value.icon className="w-14 h-14 text-teal-500 dark:text-teal-400 mx-auto mb-5 drop-shadow-sm" />
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white tracking-wide">
              {value.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
