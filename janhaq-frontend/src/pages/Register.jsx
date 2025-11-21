import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../utils/api";
import OnboardingForm from "../components/OnboardingForm";

// Static positions for floating bubbles behind the person
const bubblePositions = [
  { top: "-10%", left: "10%" },
  { top: "5%", left: "75%" },
  { top: "55%", left: "90%" },
  { top: "75%", left: "25%" },
  { top: "20%", left: "-5%" },
  { top: "85%", left: "60%" },
];

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [floatingDocs, setFloatingDocs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJourneyAnimation, setShowJourneyAnimation] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Generate floating documents when user types
  useEffect(() => {
    if ((form.fullName || form.email || form.password) && !isSubmitting) {
      const newDoc = {
        id: Date.now(),
        x: Math.random() * 150 - 75,
        y: Math.random() * 80 - 40,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
      };
      setFloatingDocs((prev) => [...prev, newDoc]);

      setTimeout(() => {
        setFloatingDocs((prev) => prev.filter((doc) => doc.id !== newDoc.id));
      }, 2500);
    }
  }, [form.fullName.length, form.email.length, form.password.length, isSubmitting]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Show onboarding form after basic validation
  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Show journey animation and onboarding form
    setIsSubmitting(true);
    setShowJourneyAnimation(true);

    // Generate burst of documents on submit
    const burstDocs = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.cos((i / 12) * Math.PI * 2) * 120,
      y: Math.sin((i / 12) * Math.PI * 2) * 120,
      rotation: Math.random() * 720,
      delay: i * 0.05,
    }));
    setFloatingDocs(burstDocs);

    setTimeout(() => {
      setShowOnboarding(true);
      setIsSubmitting(false);
      setShowJourneyAnimation(false);
      setFloatingDocs([]);
    }, 2000);
  };

  // Called when onboarding form is completed
  const handleRegister = async (profileData) => {
    setError("");
    setIsLoading(true);

    try {
      console.log("Register - Registering with profile:", profileData);

      // Register user with profile data from onboarding
      const data = await registerUser(
        form.fullName,
        form.email,
        form.password,
        profileData
      );

      console.log("Register - Registration successful:", {
        hasToken: !!data.token,
        hasUser: !!data.user,
        hasProfile: !!data.user?.profile,
        profile: data.user?.profile,
      });

      // Verify we have complete data
      if (!data.token || !data.user) {
        throw new Error("Incomplete registration data received");
      }

      // Update AuthContext with token and complete user object (including profile)
      login({
        token: data.token,
        user: data.user,
      });

      console.log("Register - AuthContext updated, redirecting to dashboard");

      // Small delay to ensure context propagates
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (err) {
      console.error("Register Error:", err);

      // Handle specific error messages
      const errorMessage = err.message || "Registration failed";

      if (errorMessage.includes("already exists") || errorMessage.includes("duplicate")) {
        setError("User already exists with this email. Please login instead.");
      } else if (errorMessage.includes("required")) {
        setError("Please fill in all required fields.");
      } else if (errorMessage.includes("password")) {
        setError("Password must be at least 6 characters long.");
      } else {
        setError(errorMessage);
      }

      // Go back to registration form if error occurs
      setShowOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle onboarding cancel/back
  const handleOnboardingCancel = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center justify-center px-6 py-12">
        <OnboardingForm
          onComplete={handleRegister}
          onCancel={handleOnboardingCancel}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/25 via-teal-500/25 to-cyan-500/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 0],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-teal-500/25 via-cyan-500/25 to-blue-500/25 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl w-full flex items-center justify-between gap-16 relative z-10">
        {/* Left side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="flex-1 max-w-lg w-full"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />

            <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border border-slate-700/60">
              {/* Header */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-5xl font-black text-white">Register</h2>
                </div>
                <p className="text-gray-400 text-lg">
                  Start your journey with JanHaq
                </p>
              </motion.div>

              <form onSubmit={handleNext} className="space-y-6 mt-10">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full p-5 rounded-2xl border-2 border-slate-600 focus:border-cyan-500 bg-slate-900/70 text-white placeholder-gray-500 transition-all duration-300 text-lg focus:shadow-lg focus:shadow-cyan-500/20"
                    required
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-5 rounded-2xl border-2 border-slate-600 focus:border-cyan-500 bg-slate-900/70 text-white placeholder-gray-500 transition-all duration-300 text-lg focus:shadow-lg focus:shadow-cyan-500/20"
                    required
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Password
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    name="password"
                    placeholder="••••••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-5 rounded-2xl border-2 border-slate-600 focus:border-teal-500 bg-slate-900/70 text-white placeholder-gray-500 transition-all duration-300 text-lg focus:shadow-lg focus:shadow-teal-500/20"
                    required
                    minLength={6}
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-5 rounded-2xl border-2 border-slate-600 focus:border-teal-500 bg-slate-900/70 text-white placeholder-gray-500 transition-all duration-300 text-lg focus:shadow-lg focus:shadow-teal-500/20"
                    required
                    disabled={isLoading}
                  />
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="p-5 rounded-2xl bg-red-500/10 border-2 border-red-500/50 backdrop-blur-sm"
                    >
                      <p className="text-red-400 font-medium">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group mt-8"
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500"
                    style={{ backgroundSize: "200% auto" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundSize: "200% auto" }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                    {isLoading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                        />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Next: Complete Profile</span>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Footer links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 space-y-6"
              >
                <div className="flex items-center justify-center text-sm">
                  <span className="text-gray-400">Already have an account?</span>
                  <Link
                    to="/login"
                    className="ml-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                  >
                    Login
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="flex-1 hidden lg:flex flex-col items-center justify-center relative"
        >
          {/* Enhanced gradient background behind person */}
          <div className="absolute inset-0 -z-20">
            <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),transparent_60%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.35),transparent_55%)] opacity-80 blur-3xl" />
          </div>

          {/* Glowing circle behind person */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[26rem] h-[26rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(56,189,248,0.5),rgba(59,130,246,0.1),rgba(45,212,191,0.5),rgba(56,189,248,0.5))] rounded-full blur-3xl -z-10"
          />

          {/* Main illustration container */}
          <div className="relative z-10">
            {/* Floating bubbles behind person */}
            <div className="absolute inset-0 -z-10">
              {bubblePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 rounded-full border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-sm"
                  style={{ top: pos.top, left: pos.left }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Person */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <motion.div
                className="text-9xl filter drop-shadow-2xl"
                animate={{
                  filter: showJourneyAnimation
                    ? [
                        "drop-shadow(0 0 0px rgba(56, 189, 248, 0))",
                        "drop-shadow(0 0 36px rgba(56, 189, 248, 0.95))",
                        "drop-shadow(0 0 0px rgba(56, 189, 248, 0))",
                      ]
                    : "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))",
                }}
                transition={{ duration: 2 }}
              >
                🧑‍💼
              </motion.div>

              {/* Typing indicator */}
              {(form.fullName || form.email || form.password) && !isSubmitting && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -left-12 top-1/4 flex gap-1"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Travel Bag with packing animation */}
{/* Travel Bag with packing animation */}
<motion.div
  className="absolute -bottom-12 -left-12"
  animate={{
    scale: showJourneyAnimation ? [1, 1.2, 1] : 1,
  }}
  transition={{ duration: 2 }}
>
  <motion.div
    animate={{
      rotate: [0, -8, 8, -5, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative"
  >
    <div className="text-7xl relative filter drop-shadow-xl">
      💼

      {/* Floating documents being packed */}
      <AnimatePresence>
        {floatingDocs.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{
              x: doc.x,
              y: doc.y,
              opacity: 1,
              scale: 0.6,
              rotate: doc.rotation,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: isSubmitting ? [1, 1, 0] : 0,
              scale: 0.1,
              rotate: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: isSubmitting ? 2 : 1.8,
              delay: doc.delay,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 filter drop-shadow-lg"
          >
            <motion.div
              animate={{
                filter: isSubmitting
                  ? [
                      "drop-shadow(0 0 0px rgba(34, 197, 94, 0))",
                      "drop-shadow(0 0 12px rgba(34, 197, 94, 0.9))",
                      "drop-shadow(0 0 0px rgba(34, 197, 94, 0))",
                    ]
                  : "none",
              }}
              transition={{ duration: 2 }}
              className="w-7 h-9 rounded-md bg-slate-50/95 border border-emerald-400/60 shadow-lg"
            >
              <div className="w-4 h-[3px] mt-1 ml-1 rounded-full bg-emerald-400/80" />
              <div className="w-5 h-[2px] mt-1 ml-1 rounded-full bg-slate-300/90" />
              <div className="w-5 h-[2px] mt-1 ml-1 rounded-full bg-slate-300/70" />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </motion.div>
</motion.div>

          </div>

          {/* Text under illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-24 text-center"
          >
            <motion.h1
              className="text-5xl font-black mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #2563eb, #0d9488, #06b6d4, #2563eb)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Join JanHaq Today!
            </motion.h1>
            <p className="text-gray-300 text-xl font-light">
              Your journey to better information starts here
            </p>

            {/* Feature badges */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {[
                { text: "Secure Platform" },
                { text: "Personalized Feed" },
                { text: "Verified Content" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                >
                  <span className="text-sm font-medium text-gray-200">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
