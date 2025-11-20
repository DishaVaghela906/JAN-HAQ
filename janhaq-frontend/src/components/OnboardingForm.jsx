import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  School,
  Wheat,
  Home,
  HeartHandshake,
  UserCheck,
  X,
  Shield,   // optional extra icon
} from "lucide-react";

const roles = [
  { name: "Student", icon: <School />, key: "student" },
  { name: "Working Professional", icon: <Briefcase />, key: "professional" },
  { name: "Farmer", icon: <Wheat />, key: "farmer" },
  { name: "Senior Citizen", icon: <UserCheck />, key: "senior" },
  { name: "Homemaker/Parent", icon: <Home />, key: "parent" },
  { name: "Social Worker", icon: <HeartHandshake />, key: "social_worker" },
];

const interestsList = [
  "Education",
  "Healthcare",
  "Agriculture",
  "Business",
  "Housing",
  "Consumer Rights",
  "Finance",
  "Environment",
  "Employment",
  "Social Welfare",
];

export default function OnboardingForm({
  onComplete,
  onCancel,
  isLoading = false,
  initialProfile = null, // For editing existing profile
  isEditing = false, // Flag to indicate edit mode
}) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    ageGroup: "",
    role: "",
    interests: [],
  });

  // Pre-fill form with existing profile data when editing
  useEffect(() => {
    if (initialProfile) {
      console.log("OnboardingForm - Pre-filling with profile:", initialProfile);
      setProfile({
        ageGroup: initialProfile.ageGroup || "",
        role: initialProfile.role || "",
        interests: initialProfile.interests || [],
      });
    }
  }, [initialProfile]);

  // Toggle interest selection (max 3)
  const handleInterestToggle = (interest) => {
    if (isLoading) return; // Prevent changes during submission

    setProfile((prev) => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : prev.interests.length < 3
        ? [...prev.interests, interest]
        : prev.interests; // Don't add if already 3 selected
      return { ...prev, interests: newInterests };
    });
  };

  const handleRoleSelect = (roleKey) => {
    if (isLoading) return;
    setProfile((prev) => ({ ...prev, role: roleKey }));
    setStep(3); // auto-move to interests step
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1 && !isLoading) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    if (profile.interests.length > 0 && !isLoading) {
      console.log("OnboardingForm - Submitting profile:", profile);
      onComplete(profile);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Age group
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-50">
              {isEditing ? "Update Your Age Group" : "Welcome to JanHaq!"}
            </h2>
            <p className="mb-6 text-gray-300">
              {isEditing
                ? "Update your age group to refine your recommendations."
                : "Let's personalize your experience. First, what's your age group?"}
            </p>
            <select
              value={profile.ageGroup}
              onChange={(e) =>
                setProfile({ ...profile, ageGroup: e.target.value })
              }
              disabled={isLoading}
              className="w-full p-3 rounded-xl border border-slate-600 bg-slate-900/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
            >
              <option value="" className="bg-slate-900">
                Select Age Group
              </option>
              <option value="18-25" className="bg-slate-900">
                18-25
              </option>
              <option value="26-40" className="bg-slate-900">
                26-40
              </option>
              <option value="41-60" className="bg-slate-900">
                41-60
              </option>
              <option value="60+" className="bg-slate-900">
                60+
              </option>
            </select>
          </div>
        );

      case 2: // Role selection
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-50">
              {isEditing ? "Update Your Role" : "Which of these best describes you?"}
            </h2>
            <p className="mb-6 text-gray-300">
              This helps us find relevant information for you.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roles.map((r) => (
                <div
                  key={r.key}
                  onClick={() => handleRoleSelect(r.key)}
                  className={`p-4 border rounded-2xl text-center cursor-pointer transition
                    ${
                      profile.role === r.key
                        ? "bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-500 text-white border-transparent shadow-lg shadow-cyan-500/40"
                        : "border-slate-600 bg-slate-900/60 hover:bg-slate-800/80 hover:border-cyan-500/60"
                    }
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <div
                    className={`flex justify-center mb-2 ${
                      profile.role === r.key ? "text-white" : "text-cyan-400"
                    }`}
                  >
                    {r.icon}
                  </div>
                  <span className="font-semibold text-sm text-gray-100">
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Interests
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-50">
              {isEditing ? "Update Your Interests" : "What are you interested in?"}
            </h2>
            <p className="mb-6 text-gray-300">
              Select up to 3 topics that matter most to you.
            </p>
            <div className="flex flex-wrap gap-2">
              {interestsList.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-full transition font-medium text-sm
                    ${
                      profile.interests.includes(interest)
                        ? "bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 text-white shadow-md shadow-cyan-500/40"
                        : "bg-slate-800 text-gray-200 hover:bg-slate-700"
                    }
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Selected: {profile.interests.length}/3
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Icons we’ll float in the background like your login page
  const floatingIcons = [Briefcase, School, Wheat, Home, HeartHandshake, UserCheck, Shield];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/90 backdrop-blur-md overflow-hidden">
      {/* Animated background layer (moving symbols + lines + bubbles) */}
      {/* Animated background layer (moving symbols + lines + bubbles) */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  {/* Radial gradient glows */}
  <div className="absolute -top-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/25 via-teal-500/25 to-cyan-500/25 blur-3xl" />
  <div className="absolute -bottom-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-500/25 via-teal-500/25 to-blue-500/25 blur-3xl" />

  {/* Orbiting icons around center */}
  <div className="absolute inset-0 flex items-center justify-center">
    {Array.from({ length: 14 }).map((_, i) => {
      const Icon = floatingIcons[i % floatingIcons.length];
      const angle = (i / 14) * Math.PI * 2;
      const baseRadius = 220;
      const radius = baseRadius + (i % 3) * 25;

      return (
        <motion.div
          key={`icon-${i}`}
          className="absolute text-cyan-400/20"
          initial={{
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
          }}
          animate={{
            x: Math.cos(angle + Math.PI / 4) * (radius + 20),
            y: Math.sin(angle + Math.PI / 4) * (radius + 20),
            rotate: [0, 360],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: 18 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        >
          <Icon className="w-8 h-8" strokeWidth={1.4} />
        </motion.div>
      );
    })}

    {/* Flowing lines */}
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={`line-${i}`}
        className="absolute w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ transformOrigin: "center" }}
        animate={{
          rotate: [i * 45, i * 45 + 360],
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.45, 0.15],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          delay: i * 0.25,
        }}
      />
    ))}

    {/* Floating bubbles */}
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.div
        key={`bubble-${i}`}
        className="absolute rounded-full bg-cyan-400/10 border border-cyan-400/20"
        style={{
          width: 18 + Math.random() * 40,
          height: 18 + Math.random() * 40,
        }}
        animate={{
          x: [Math.random() * 420 - 210, Math.random() * 420 - 210],
          y: [Math.random() * 320 - 160, -260],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
</div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial gradient glows */}
        <div className="absolute -top-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/25 via-teal-500/25 to-cyan-500/25 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-500/25 via-teal-500/25 to-blue-500/25 blur-3xl" />

        {/* Orbiting icons around center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 14 }).map((_, i) => {
            const Icon = floatingIcons[i % floatingIcons.length];
            const angle = (i / 14) * Math.PI * 2;
            const baseRadius = 220;
            const radius = baseRadius + (i % 3) * 25;

            return (
              <motion.div
                key={`icon-${i}`}
                className="absolute text-cyan-400/20"
                initial={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                }}
                animate={{
                  x: Math.cos(angle + Math.PI / 4) * (radius + 20),
                  y: Math.sin(angle + Math.PI / 4) * (radius + 20),
                  rotate: [0, 360],
                  opacity: [0.08, 0.25, 0.08],
                }}
                transition={{
                  duration: 18 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
              >
                <Icon className="w-8 h-8" strokeWidth={1.4} />
              </motion.div>
            );
          })}

          {/* Flowing lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              style={{ transformOrigin: "center" }}
              animate={{
                rotate: [i * 45, i * 45 + 360],
                scale: [1, 1.4, 1],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.25,
              }}
            />
          ))}

          {/* Floating bubbles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-cyan-400/10 border border-cyan-400/20"
              style={{
                width: 18 + Math.random() * 40,
                height: 18 + Math.random() * 40,
              }}
              animate={{
                x: [Math.random() * 420 - 210, Math.random() * 420 - 210],
                y: [Math.random() * 320 - 160, -260],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main card container */}
      <div className="relative w-full max-w-2xl z-10">
        {/* Gradient border glow behind card */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 opacity-60 blur-xl" />

        <div className="relative bg-slate-900/90 border border-slate-700/70 rounded-3xl shadow-2xl p-8">
          {/* Close button (only show if onCancel is provided and not loading) */}
          {onCancel && !isLoading && (
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 border border-slate-600/70 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>
          )}

          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                {isEditing ? "Edit Profile - " : ""}Step {step} of 3
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          {renderStep()}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 gap-4">
            {step > 1 ? (
              <button
                onClick={handleBack}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl bg-slate-800 text-gray-100 font-semibold hover:bg-slate-700 border border-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
            ) : (
              <div /> // Empty div to maintain flex spacing
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !profile.ageGroup) ||
                  (step === 2 && !profile.role) ||
                  isLoading
                }
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 text-white font-semibold hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={profile.interests.length === 0 || isLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 text-white font-semibold hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? isEditing
                    ? "Saving Changes..."
                    : "Creating Account..."
                  : isEditing
                  ? "Save Changes"
                  : "Finish Setup"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
