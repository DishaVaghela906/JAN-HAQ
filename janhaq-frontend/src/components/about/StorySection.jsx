import React from "react";
import { motion } from "framer-motion";

export default function StorySection() {
  // Small floating circles configuration
  const circles = [
    { size: 12, top: "5%", left: "10%", delay: 0, lightColor: "rgba(14,165,233,0.5)", darkColor: "rgba(6,182,212,0.4)" },
    { size: 16, top: "15%", left: "50%", delay: 1, lightColor: "rgba(6,182,212,0.5)", darkColor: "rgba(14,165,233,0.3)" },
    { size: 10, top: "25%", left: "30%", delay: 0.5, lightColor: "rgba(14,165,233,0.4)", darkColor: "rgba(6,182,212,0.3)" },
    { size: 14, top: "35%", left: "70%", delay: 1.5, lightColor: "rgba(6,182,212,0.4)", darkColor: "rgba(14,165,233,0.3)" },
    { size: 8, top: "45%", left: "20%", delay: 0.8, lightColor: "rgba(14,165,233,0.3)", darkColor: "rgba(6,182,212,0.2)" },
  ];

  return (
    <section className="relative overflow-hidden py-24 border-b border-transparent">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{
          background: `linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 50%, #06B6D4 100%)`,
        }}
      />

      {/* Animated Radial Blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-200/40 dark:bg-cyan-500/30 filter blur-3xl animate-blob"
        animate={{ x: [0, 50, -30, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-blue-300/30 dark:bg-blue-700/20 filter blur-3xl animate-blob animation-delay-2000"
        animate={{ x: [0, -40, 50, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small floating circles */}
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${c.size}px`,
            height: `${c.size}px`,
            top: c.top,
            left: c.left,
            backgroundColor: c.lightColor,
          }}
          animate={{
            y: [0, -15, 15, 0],
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "loop",
            delay: c.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 text-center relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-cyan-800 dark:text-cyan-300">
          JanHaq: Powering Your Civic Voice
        </h1>
        <p className="text-xl text-cyan-900 dark:text-gray-300 max-w-4xl mx-auto mb-12 font-light">
          We started JanHaq with a single idea: <b>civic rights shouldn't be a maze.</b>{" "}
          Our platform exists to cut through the complexity and place the power back in your hands.
        </p>

        <div className="flex justify-center">
          <motion.a
            href="#journey"
            className="px-10 py-4 bg-white text-cyan-600 font-bold text-lg rounded-full shadow-2xl transition duration-300 transform"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#0E7490",
              color: "#FFFFFF",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Our Story So Far
          </motion.a>
        </div>
      </motion.div>

      {/* CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
}
