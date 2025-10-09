import React from "react";
import { motion } from "framer-motion";
import { Zap, Handshake, Shield, Target, Lightbulb, TrendingUp, Users, AlertTriangle, ArrowRightCircle } from "lucide-react"; 

// --- Data ---
const team = [
  {
    name: "Disha Sharma",
    role: "Project Lead",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Verma",
    role: "Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Singh",
    role: "Designer",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const values = [
    { icon: Handshake, title: "Transparency", description: "Clear, unbiased access to all civic information." },
    { icon: Shield, title: "Empowerment", description: "Providing the tools needed to assert your rights." },
    { icon: Zap, title: "Simplicity", description: "Cutting through legal jargon with plain language." },
];

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

const journeyStepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } 
};

// VARIANTS REFINEMENT: Updated Mission Block Animation
const missionBlockVariants = {
    hidden: { opacity: 0, x: -50 }, // Start from the left
    visible: (custom) => ({ 
        opacity: 1, 
        x: 0, 
        transition: { 
            duration: 0.7, 
            delay: custom * 0.15, // Staggered entry
            ease: "easeOut" 
        } 
    }),
};


// --- Components ---

// 1. Introduction & Story Section (Hero)
function StorySection() {
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

// 2. Our Journey Section (Timeline)
function JourneySection() {
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

// 3. Our Mission and Core Values Section (Creative Layout)
function MissionAndValuesSection() {
    const missionPillars = [
        {
            icon: AlertTriangle,
            color: "text-red-500",
            title: "The Frustration",
            content: "The system is complex, filled with jargon, and deliberately opaque. We recognize that feeling of being lost and powerless when seeking your basic rights.",
            background: "bg-white dark:bg-gray-800 border-l-4 border-red-400 shadow-lg", // Light border for subtle effect
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
                            // LAYOUT ENHANCEMENT: Cards are slightly offset (left/right) for dynamic flow
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
                                    // REFINED ANIMATION: Slower rotation for a more professional visual
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

// 4. Team Section
function TeamSection() {
    const teamCardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, 
        hover: {
            scale: 1.07, 
            y: -10, 
            boxShadow: "0 15px 40px rgba(14, 165, 233, 0.4)", 
            transition: { duration: 0.15, ease: "easeOut" }
        },
        initial: { scale: 1, y: 0, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", transition: { duration: 0.1 } }
    };

    return (
        <section id="team" className="py-20 px-6 max-w-7xl mx-auto bg-gray-100 dark:bg-gray-950 rounded-2xl my-16 shadow-inner">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} 
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    The Dedicated Faces Behind JanHaq
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    A small, dedicated team passionate about making civic rights accessible to everyone.
                </p>
            </motion.div>

            <motion.div
                className="grid gap-10 md:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {team.map((member) => (
                    <motion.div
                        key={member.name}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center cursor-pointer transition duration-500 border-t-4 border-sky-500"
                        variants={teamCardVariants} 
                        whileHover="hover"
                        initial="initial"
                    >
                        <motion.img
                            src={member.img}
                            alt={member.name}
                            className="w-32 h-32 rounded-full mb-5 border-4 border-sky-600 shadow-lg object-cover"
                            whileHover={{ scale: 1.25, rotate: 15 }} 
                            transition={{ type: "spring", stiffness: 150, damping: 8 }} 
                        />
                        <h3 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{member.name}</h3>
                        <p className="text-sky-600 dark:text-sky-400 font-medium tracking-wide text-lg">{member.role}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

// 5. Final Mission CTA
function FinalMissionCTA() {
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

// --- Main About Component ---
export default function About() {
  return (
    // Applied custom background class to the main container
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 bg-pattern">
      
      <StorySection />
      
      <JourneySection />
      
      <MissionAndValuesSection />

      <TeamSection />
      
      <FinalMissionCTA />

      {/* Style block for the custom background texture */}
      <style>
        {`
          /* LIGHT MODE: Visible diagonal pattern for a sophisticated texture */
          .bg-pattern {
            background-color: #f9fafb; /* bg-gray-50 */
            background-image: linear-gradient(135deg, #f3f4f6 10%, transparent 10%),
                              linear-gradient(45deg, #f3f4f6 10%, transparent 10%);
            background-size: 15px 15px;
            background-position: 0 0, 7.5px 7.5px; 
          }
          
          /* DARK MODE: Subtle dark dot texture for a premium, non-flat background */
          .dark .bg-pattern {
            background-color: #111827; /* bg-gray-900 */
            background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}
      </style>
    </div>
  );
}