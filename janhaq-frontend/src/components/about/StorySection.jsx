import React from "react";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react"; // Using ArrowRightCircle for consistency

export default function StorySection() {
    return (
        <section className="bg-sky-500 dark:bg-gray-800 py-24 border-b border-sky-600 dark:border-gray-700">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }} 
                className="max-w-6xl mx-auto px-6 text-center"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white dark:text-sky-400">
                    JanHaq: Powering Your Civic Voice
                </h1>
                <p className="text-xl text-sky-100 dark:text-gray-300 max-w-4xl mx-auto mb-12 font-light">
                    We started JanHaq with a single idea: **civic rights shouldn't be a maze.** Our platform exists to cut through the complexity and place the power back in your hands.
                </p>

                <div className="flex justify-center">
                    <motion.a 
                        href="#journey"
                        className="px-10 py-4 bg-white text-sky-600 font-bold text-lg rounded-full shadow-2xl transition duration-300 transform"
                        whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "#0369A1", 
                            color: "#FFFFFF",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
                        }} 
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }} 
                    >
                        Our Story So Far
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}