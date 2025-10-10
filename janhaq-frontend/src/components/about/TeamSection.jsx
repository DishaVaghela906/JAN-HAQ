import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react"; 

// --- Team Data ---
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


export default function TeamSection() {
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