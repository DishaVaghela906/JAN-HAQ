import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Building2 } from "lucide-react";

const stats = [
  {
    icon: FileText,
    value: "10K+",
    label: "Rights Explained",
    color: "blue",
  },
  {
    icon: Shield,
    value: "500+",
    label: "Schemes Indexed",
    color: "teal",
  },
  {
    icon: Building2,
    value: "100+",
    label: "Verified Departments",
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

export default function ImpactSection() {
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
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Empowering citizens to act
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              with clarity and confidence
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
            Join thousands of informed citizens who are taking control of their civic journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const colors = accentColors[stat.color];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 ${colors.border} shadow-lg group-hover:shadow-2xl transition-all duration-300 text-center overflow-hidden`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg transition-shadow duration-300`}>
                      <stat.icon className={`w-10 h-10 ${colors.text}`} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                      {stat.label}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
