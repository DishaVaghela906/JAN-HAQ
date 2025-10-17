import React, { useState, useEffect } from 'react';
import { Briefcase, School, Wheat, Home, HeartHandshake, UserCheck, X } from 'lucide-react';

const roles = [
  { name: 'Student', icon: <School />, key: 'student' },
  { name: 'Working Professional', icon: <Briefcase />, key: 'professional' },
  { name: 'Farmer', icon: <Wheat />, key: 'farmer' },
  { name: 'Senior Citizen', icon: <UserCheck />, key: 'senior' },
  { name: 'Homemaker/Parent', icon: <Home />, key: 'parent' },
  { name: 'Social Worker', icon: <HeartHandshake />, key: 'social_worker' },
];

const interestsList = [
  'Education', 'Healthcare', 'Agriculture', 'Business', 'Housing', 
  'Consumer Rights', 'Finance', 'Environment', 'Employment', 'Social Welfare'
];

export default function OnboardingForm({ 
  onComplete, 
  onCancel, 
  isLoading = false,
  initialProfile = null, // For editing existing profile
  isEditing = false // Flag to indicate edit mode
}) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    ageGroup: '',
    role: '',
    interests: [],
  });

  // Pre-fill form with existing profile data when editing
  useEffect(() => {
    if (initialProfile) {
      console.log('OnboardingForm - Pre-filling with profile:', initialProfile);
      setProfile({
        ageGroup: initialProfile.ageGroup || '',
        role: initialProfile.role || '',
        interests: initialProfile.interests || [],
      });
    }
  }, [initialProfile]);

  // Toggle interest selection (max 3)
  const handleInterestToggle = (interest) => {
    if (isLoading) return; // Prevent changes during submission

    setProfile(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : prev.interests.length < 3
        ? [...prev.interests, interest]
        : prev.interests; // Don't add if already 3 selected
      return { ...prev, interests: newInterests };
    });
  };

  const handleRoleSelect = (roleKey) => {
    if (isLoading) return;
    setProfile(prev => ({ ...prev, role: roleKey }));
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
      console.log('OnboardingForm - Submitting profile:', profile);
      onComplete(profile);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Age group
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {isEditing ? 'Update Your Age Group' : 'Welcome to JanHaq!'}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {isEditing 
                ? 'Update your age group to refine your recommendations.' 
                : "Let's personalize your experience. First, what's your age group?"}
            </p>
            <select
              value={profile.ageGroup}
              onChange={(e) => setProfile({ ...profile, ageGroup: e.target.value })}
              disabled={isLoading}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">Select Age Group</option>
              <option value="18-25">18-25</option>
              <option value="26-40">26-40</option>
              <option value="41-60">41-60</option>
              <option value="60+">60+</option>
            </select>
          </div>
        );

      case 2: // Role selection
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {isEditing ? 'Update Your Role' : 'Which of these best describes you?'}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              This helps us find relevant information for you.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roles.map(r => (
                <div
                  key={r.key}
                  onClick={() => handleRoleSelect(r.key)}
                  className={`p-4 border rounded-lg text-center cursor-pointer transition
                    ${profile.role === r.key 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className={`flex justify-center mb-2 ${profile.role === r.key ? 'text-white' : 'text-blue-500'}`}>
                    {r.icon}
                  </div>
                  <span className="font-semibold text-sm">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Interests
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {isEditing ? 'Update Your Interests' : 'What are you interested in?'}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Select up to 3 topics that matter most to you.
            </p>
            <div className="flex flex-wrap gap-2">
              {interestsList.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-full transition font-medium text-sm
                    ${profile.interests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Selected: {profile.interests.length}/3
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl relative">
        {/* Close button (only show if onCancel is provided and not loading) */}
        {onCancel && !isLoading && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isEditing ? 'Edit Profile - ' : ''}Step {step} of 3
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
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
              className="px-6 py-3 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
          ) : (
            <div></div> // Empty div to maintain flex spacing
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={(step === 1 && !profile.ageGroup) || (step === 2 && !profile.role) || isLoading}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={profile.interests.length === 0 || isLoading}
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? (isEditing ? 'Saving Changes...' : 'Creating Account...') 
                : (isEditing ? 'Save Changes' : 'Finish Setup')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}