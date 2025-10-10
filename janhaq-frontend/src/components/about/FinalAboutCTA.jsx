import React from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react"; 

export default function FinalAboutCTA() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }}
                className="text-center p-12 bg-sky-600 rounded-2xl shadow-2xl transform hover:scale-[1.01] transition duration-300" 
            >
                <Target className="w-12 h-12 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-extrabold mb-4 text-white">
                    Fostering Transparency, Building Trust.
                </h2>
                <p className="text-xl text-sky-200 max-w-3xl mx-auto">
                    Every feature on JanHaq is designed to uphold your right to information. Join us in making the civic process simpler and fairer for everyone.
                </p>
            </motion.div>
        </section>
    );
}