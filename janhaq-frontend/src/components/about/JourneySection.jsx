import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Users } from "lucide-react"; 

// --- Journey Data ---
const journeySteps = [
    {
        icon: Lightbulb,
        title: "The Idea: Sparked by Frustration",
        year: "Phase I: Empathy",
        description: "We realized that complexity should never be a barrier to justice. Our mission began by analyzing the legal systems to understand exactly where citizens struggle the most.",
    },
    {
        icon: Users,
        title: "The Build: Quality & Trusted Beta",
        year: "Phase II: Validation",
        description: "Our small team rapidly built the core platform and initiated a private beta. We are currently testing with civic rights groups to guarantee accuracy, clarity, and zero bias before public release.",
    },
    {
        icon: TrendingUp,
        title: "The Future: Ready for Empowerment",
        year: "Phase III: Readiness",
        description: "We are in the final stage of refining the platform based on beta feedback. We are ensuring JanHaq is 100% ready to deliver confidence and accountability to every citizen upon launch.",
    },
];

// --- Animation Variants ---
const journeyStepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } 
};


export default function JourneySection() {
    return (
        <section id="journey" className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Rapid Journey to Launch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    From idea to functional platform in a rapid development cycle—driven by a passion for transparency.
                </p>
            </motion.div>

            <div className="relative flex flex-col items-center">
                {/* Vertical Timeline Line */}
                <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-sky-200 dark:bg-sky-800 hidden md:block"></div>

                {journeySteps.map((step, index) => {
                    const Icon = step.icon;
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            className={`flex w-full md:w-3/4 py-8 relative ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                            variants={journeyStepVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* Circle/Icon Marker */}
                            <div className="absolute hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 dark:bg-sky-400 z-10 top-1/2 transform -translate-y-1/2" style={{ left: isEven ? '50%' : '50%', marginLeft: isEven ? '-20px' : '-20px' }}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>

                            {/* Content Card */}
                            <div className={`w-full md:w-5/12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-t-4 border-sky-500 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                                <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mb-1">{step.year}</p>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}