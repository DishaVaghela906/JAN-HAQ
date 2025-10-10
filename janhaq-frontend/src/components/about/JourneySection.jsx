import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Users } from "lucide-react";

// --- Journey Data ---
const journeySteps = [
  {
    icon: Lightbulb,
    title: "The Idea: Sparked by Frustration",
    year: "Phase I: Empathy",
    description:
      "We realized that complexity should never be a barrier to justice. Our mission began by analyzing the legal systems to understand exactly where citizens struggle the most.",
  },
  {
    icon: Users,
    title: "The Build: Quality & Trusted Beta",
    year: "Phase II: Validation",
    description:
      "Our small team rapidly built the core platform and initiated a private beta. We are currently testing with civic rights groups to guarantee accuracy, clarity, and zero bias before public release.",
  },
  {
    icon: TrendingUp,
    title: "The Future: Ready for Empowerment",
    year: "Phase III: Readiness",
    description:
      "We are in the final stage of refining the platform based on beta feedback. We are ensuring JanHaq is 100% ready to deliver confidence and accountability to every citizen upon launch.",
  },
];

// --- Animation Variants ---
const journeyStepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Floating shapes animation config for independent drifting
const floatingShapeVariants = {
  animate: (custom) => ({
    y: [0, custom.yOffset, 0],
    x: [0, custom.xOffset, 0],
    rotate: [0, custom.rotate, -custom.rotate, 0],
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror",
      delay: custom.delay,
    },
  }),
};

export default function JourneySection({ isDark }) {
  return (
    <section
      id="journey"
      className="relative z-20 py-20 px-6 max-w-7xl mx-auto mt-8"
      aria-label="Journey timeline"
    >
      {/* Subtle floating decorative shapes */}
      <motion.div
        aria-hidden="true"
        className="absolute w-36 h-36 rounded-full opacity-20"
        style={{
          top: "10%",
          left: "15%",
          backgroundColor: isDark ? "rgba(14, 116, 144, 0.4)" : "rgba(56, 189, 248, 0.3)",
          filter: "blur(40px)",
          zIndex: -1,
        }}
        variants={floatingShapeVariants}
        custom={{ yOffset: 20, xOffset: 10, rotate: 15, duration: 10, delay: 0 }}
        animate="animate"
      />
      <motion.div
        aria-hidden="true"
        className="absolute w-24 h-24 rounded-full opacity-25"
        style={{
          bottom: "15%",
          right: "20%",
          backgroundColor: isDark ? "rgba(14, 116, 144, 0.3)" : "rgba(56, 189, 248, 0.25)",
          filter: "blur(35px)",
          zIndex: -1,
        }}
        variants={floatingShapeVariants}
        custom={{ yOffset: -15, xOffset: -20, rotate: 10, duration: 12, delay: 2 }}
        animate="animate"
      />
      <motion.div
        aria-hidden="true"
        className="absolute w-20 h-20 rounded-full opacity-15"
        style={{
          top: "50%",
          right: "10%",
          backgroundColor: isDark ? "rgba(14, 116, 144, 0.25)" : "rgba(56, 189, 248, 0.2)",
          filter: "blur(30px)",
          zIndex: -1,
        }}
        variants={floatingShapeVariants}
        custom={{ yOffset: 25, xOffset: -10, rotate: 20, duration: 11, delay: 1 }}
        animate="animate"
      />

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-20"
      >
        <div className="inline-block bg-white/80 dark:bg-gray-900/60 backdrop-blur-md px-8 py-5 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 drop-shadow-lg">
            Our Rapid Journey to Launch
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            From idea to functional platform in a rapid development cycle — driven by a passion for transparency.
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-sky-200 dark:bg-sky-800 hidden md:block"></div>

        {journeySteps.map((step, index) => {
          const Icon = step.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              className={`flex w-full md:w-3/4 py-8 relative ${
                isEven ? "md:justify-start" : "md:justify-end"
              }`}
              variants={journeyStepVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
              tabIndex={0}
              aria-label={`${step.year} - ${step.title}`}
            >
              {/* Marker with responsive hover and focus micro-interactions */}
              <motion.div
                whileHover={{
                  scale: 1.2,
                  boxShadow: isDark
                    ? "0 0 18px rgba(14, 116, 144, 0.8)"
                    : "0 0 18px rgba(56, 189, 248, 0.7)",
                }}
                whileFocus={{
                  scale: 1.2,
                  boxShadow: isDark
                    ? "0 0 18px rgba(14, 116, 144, 0.8)"
                    : "0 0 18px rgba(56, 189, 248, 0.7)",
                }}
                className="absolute hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 dark:bg-sky-400 z-10 top-1/2 transform -translate-y-1/2 cursor-pointer"
                style={{
                  left: "50%",
                  marginLeft: "-20px",
                }}
                tabIndex={0}
                role="button"
                aria-pressed="false"
                aria-label={`Timeline marker: ${step.title}`}
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>

              {/* Content Card with subtle lift on hover/focus */}
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: isDark
                    ? "0px 6px 20px rgba(14, 116, 144, 0.4)"
                    : "0px 6px 20px rgba(56, 189, 248, 0.35)",
                }}
                whileFocus={{
                  y: -6,
                  boxShadow: isDark
                    ? "0px 6px 20px rgba(14, 116, 144, 0.4)"
                    : "0px 6px 20px rgba(56, 189, 248, 0.35)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full md:w-5/12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-t-4 border-sky-500 ${
                  isEven ? "md:mr-auto" : "md:ml-auto"
                }`}
                tabIndex={-1}
              >
                <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mb-1">
                  {step.year}
                </p>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
