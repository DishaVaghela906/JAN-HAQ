import React from "react";
import { motion } from "framer-motion";
import { Compass, Lightbulb, Rocket } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Explore",
    description: "Choose your topic or issue area from our organized categories",
    color: "blue",
  },
  {
    icon: Lightbulb,
    title: "Understand",
    description: "Get clear guidance, resources, and plain-language explanations",
    color: "teal",
  },
  {
    icon: Rocket,
    title: "Act",
    description: "Take the right steps confidently or contact the authority directly",
    color: "cyan",
  },
];

const accentColors = {
  blue: {
    bg: "bg-blue-50 dark:bg-[#0A192F]",
    border: "border-blue-200 dark:border-gray-700",
    text: "text-blue-600 dark:text-blue-400",
    gradient: "from-[#3b82f6] to-[#06b6d4]",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-[#112240]",
    border: "border-teal-200 dark:border-gray-700",
    text: "text-teal-600 dark:text-teal-400",
    gradient: "from-[#14b8a6] to-[#0e7490]",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-[#0e3740]",
    border: "border-cyan-200 dark:border-gray-700",
    text: "text-cyan-600 dark:text-cyan-400",
    gradient: "from-[#06b6d4] to-[#0891b2]",
  },
};

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How JanHaq Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Three simple steps to understanding your rights and taking action
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Flow Line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-teal-300 to-cyan-300 dark:from-blue-700 dark:via-teal-700 dark:to-cyan-700" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => {
              const colors = accentColors[step.color];

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Step Number Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
                    viewport={{ once: true }}
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg text-white font-bold text-lg`}
                  >
                    {index + 1}
                  </motion.div>

                  <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 pt-12 border-2 ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300 h-full`}>
                    <div className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg transition-shadow duration-300`}>
                      <step.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
