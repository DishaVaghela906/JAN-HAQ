import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../utils/api";
import OnboardingForm from "../components/OnboardingForm";

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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
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

    // Show onboarding form
    setShowOnboarding(true);
  };

  // Called when onboarding form is completed
  const handleRegister = async (profileData) => {
    setError("");
    setIsLoading(true);

    try {
      console.log('Register - Registering with profile:', profileData);
      
      // Register user with profile data from onboarding
      const data = await registerUser(
        form.fullName,
        form.email,
        form.password,
        profileData
      );

      console.log('Register - Registration successful:', {
        hasToken: !!data.token,
        hasUser: !!data.user,
        hasProfile: !!data.user?.profile,
        profile: data.user?.profile
      });

      // Verify we have complete data
      if (!data.token || !data.user) {
        throw new Error('Incomplete registration data received');
      }

      // Update AuthContext with token and complete user object (including profile)
      login({
        token: data.token,
        user: data.user,
      });

      console.log('Register - AuthContext updated, redirecting to dashboard');

      // Small delay to ensure context propagates
      setTimeout(() => {
        // Redirect to dashboard - recommendations will load automatically based on profile
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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-12">
      {!showOnboarding ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            Register for JanHaq
          </h2>

          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Next: Complete Profile"}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">
              Login
            </Link>
          </div>
        </div>
      ) : (
        <OnboardingForm
          onComplete={handleRegister}
          onCancel={handleOnboardingCancel}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}