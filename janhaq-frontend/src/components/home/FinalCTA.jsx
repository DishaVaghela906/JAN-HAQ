import React from "react";
import { motion } from "framer-motion";
import { Button } from "../Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils/createPageUrl";


const accentGradient = "from-blue-500 via-teal-500 to-cyan-500";

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle floating gradient elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 via-teal-400 to-cyan-400 dark:from-blue-700 dark:via-teal-700 dark:to-cyan-700 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 dark:from-teal-700 dark:via-cyan-700 dark:to-blue-700 rounded-full blur-3xl opacity-20"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Sparkles Icon */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Take the first step
            <br />
            <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
              toward clarity
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Join JanHaq today and discover how easy it can be to understand your rights,
            access government schemes, and connect with the right authorities.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to={createPageUrl("Explore")}>
              <Button
                size="lg"
                className={`group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl rounded-2xl px-12 py-7 text-xl font-semibold text-gray-900 dark:text-white overflow-hidden transition-all duration-300`}
              >
                {/* Gradient overlay */}
                <span className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300 rounded-2xl`} />
                <span className="relative flex items-center gap-3">
                  Join JanHaq Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 dark:text-gray-400 mt-6"
          >
            Free to use • No credit card required • Get started in seconds
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
