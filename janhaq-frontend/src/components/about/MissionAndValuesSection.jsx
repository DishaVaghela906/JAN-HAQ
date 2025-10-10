import React from "react";
import { motion } from "framer-motion";
import { Zap, Handshake, Shield, Target, AlertTriangle, ArrowRightCircle } from "lucide-react"; 

// --- Data ---
const values = [
    { icon: Handshake, title: "Transparency", description: "Clear, unbiased access to all civic information." },
    { icon: Shield, title: "Empowerment", description: "Providing the tools needed to assert your rights." },
    { icon: Zap, title: "Simplicity", description: "Cutting through legal jargon with plain language." },
];

const missionPillars = [
    {
        icon: AlertTriangle,
        color: "text-red-500",
        title: "The Frustration",
        content: "The system is complex, filled with jargon, and deliberately opaque. We recognize that feeling of being lost and powerless when seeking your basic rights.",
        background: "bg-white dark:bg-gray-800 border-l-4 border-red-400 shadow-lg",
    },
    {
        icon: ArrowRightCircle,
        color: "text-teal-500",
        title: "The Clarity We Provide",
        content: "We translate laws and schemes into simple, actionable steps. Our solution is the direct, digital bridge to the information you need, eliminating complexity entirely.",
        background: "bg-white dark:bg-gray-800 border-l-4 border-teal-400 shadow-lg",
    },
    {
        icon: Target,
        color: "text-sky-500",
        title: "The Ultimate Impact",
        content: "To foster a society where every citizen feels confident, informed, and empowered. Our vision is a system built on transparency and genuine accountability.",
        background: "bg-white dark:bg-gray-800 border-l-4 border-sky-500 shadow-lg",
    },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, 
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, 
  hover: { 
    scale: 1.05, 
    y: -8, 
    rotate: 1.5, 
    boxShadow: "0 15px 45px rgba(4, 120, 87, 0.25)" // Teal shadow
  },
};

const missionBlockVariants = {
    hidden: { opacity: 0, x: -50 }, 
    visible: (custom) => ({ 
        opacity: 1, 
        x: 0, 
        transition: { 
            duration: 0.7, 
            delay: custom * 0.15, 
            ease: "easeOut" 
        } 
    }),
};


export default function MissionAndValuesSection() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            
            {/* Our Mission Block - REFINED CREATIVE LAYOUT */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} 
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Our Mission: From Complexity to Confidence
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    We've designed JanHaq to walk you through the entire civic process, step by step.
                </p>
            </motion.div>

            <div className="flex flex-col items-center space-y-12">
                {missionPillars.map((pillar, index) => {
                    const Icon = pillar.icon;
                    return (
                        <motion.div
                            key={pillar.title}
                            className={`w-full md:w-3/4 p-6 rounded-xl transition-all duration-500 ${pillar.background} ${index % 2 === 0 ? 'self-start md:pr-16' : 'self-end md:pl-16'}`}
                            variants={missionBlockVariants}
                            custom={index}
                            whileInView="visible"
                            initial="hidden"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="flex items-start text-left">
                                <motion.div 
                                    className={`p-4 rounded-full border-4 ${pillar.color} border-current flex-shrink-0`}
                                    animate={{ rotate: index % 2 === 0 ? 180 : -180 }} 
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                                </motion.div>
                                
                                <div className="ml-6">
                                    <h3 className={`text-2xl font-bold ${pillar.color} mb-2`}>{pillar.title}</h3>
                                    <p className="text-lg text-gray-800 dark:text-gray-200">{pillar.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Core Values (Guiding Principles) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} 
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mt-24 mb-12"
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Our Guiding Principles
                </h3>
            </motion.div>


            <motion.div 
                className="grid md:grid-cols-3 gap-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {values.map((value, index) => (
                    <motion.div
                        key={value.title}
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl text-center border-b-4 border-teal-400 hover:shadow-2xl transition duration-300 cursor-pointer"
                        variants={cardVariants}
                        whileHover="hover" 
                        transition={{ type: "spring", stiffness: 200, damping: 12 }} 
                    >
                        <value.icon className="w-12 h-12 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}