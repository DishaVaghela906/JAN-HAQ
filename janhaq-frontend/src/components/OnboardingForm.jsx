import React, { useState } from 'react';
import { Briefcase, School, Wheat, Home, HeartHandshake, UserCheck } from 'lucide-react';

// Data for our form steps
const roles = [
  { name: 'Student', icon: <School />, key: 'student' },
  { name: 'Working Professional', icon: <Briefcase />, key: 'professional' },
  { name: 'Farmer', icon: <Wheat />, key: 'farmer' },
  { name: 'Senior Citizen', icon: <UserCheck />, key: 'senior' },
  { name: 'Homemaker/Parent', icon: <Home />, key: 'parent' },
  { name: 'Social Worker', icon: <HeartHandshake />, key: 'social_worker' },
];

const interests = [
  'Education', 'Healthcare', 'Agriculture', 'Business', 'Housing', 'Consumer Rights', 'Finance', 'Environment'
];

export default function OnboardingForm({ onComplete }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    ageGroup: '',
    role: '',
    interests: [],
  });

  const handleInterestToggle = (interest) => {
    setProfile(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      // Limit to 3 interests
      return { ...prev, interests: newInterests.slice(0, 3) };
    });
  };

  const handleRoleSelect = (roleKey) => {
    setProfile(prev => ({ ...prev, role: roleKey }));
    setStep(3); // Move to next step automatically
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to JanHaq!</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Let's personalize your experience. First, what's your age group?</p>
            <select
              value={profile.ageGroup}
              onChange={(e) => setProfile({ ...profile, ageGroup: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Age Group</option>
              <option value="18-25">18-25</option>
              <option value="26-40">26-40</option>
              <option value="41-60">41-60</option>
              <option value="60+">60+</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Which of these best describes you?</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">This helps us find relevant information for you.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roles.map(r => (
                <div
                  key={r.key}
                  onClick={() => handleRoleSelect(r.key)}
                  className="p-4 border rounded-lg text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition"
                >
                  <div className="flex justify-center mb-2 text-blue-500">{r.icon}</div>
                  <span className="font-semibold">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">What are you interested in?</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Select up to 3 topics.</p>
            <div className="flex flex-wrap gap-2">
              {interests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-full transition ${
                    profile.interests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg">
        {renderStep()}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-600">
              Back
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} disabled={step === 1 && !profile.ageGroup} className="px-6 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-400">
              Next
            </button>
          ) : (
            <button onClick={() => onComplete(profile)} className="px-6 py-2 rounded-lg bg-green-600 text-white">
              Finish Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}