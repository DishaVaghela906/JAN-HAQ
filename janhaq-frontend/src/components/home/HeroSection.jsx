import React from "react";
import { motion } from "framer-motion";
import { Button } from "../Button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils/createPageUrl";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-blue-950 dark:via-teal-950 dark:to-cyan-950"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400 dark:bg-teal-600 rounded-full blur-3xl opacity-20"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
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
  <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 dark:from-blue-300 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
    for your civic voice
  </span>
</h1>


          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            JanHaq helps you understand your rights, find the right government schemes,
            and connect with the proper authorities. No more confusion—just clear steps forward.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to={createPageUrl("Explore")}>
              <Button className="cta-button">
                Get Started <ArrowRight className="w-5 h-5 ml-2 inline-block" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex justify-center gap-8 flex-wrap"
        >
          {["Simple", "Clear", "Trustworthy"].map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            >
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {word}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
