import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Call API - returns full user object with profile
      const userData = await loginUser(email, password);

      console.log('Login - User received from API:', userData);
      
      // Verify the user object has the expected structure
      if (!userData || !userData._id) {
        throw new Error('Invalid user data received from server');
      }

      console.log('Login - User profile:', userData.profile);
      
      // Check if profile is complete
      const profileComplete = userData.profile && 
                             userData.profile.role && 
                             userData.profile.role.trim() !== '' &&
                             userData.profile.interests && 
                             Array.isArray(userData.profile.interests) && 
                             userData.profile.interests.length > 0;
      
      console.log('Login - Profile complete:', profileComplete);

      // Get token from localStorage (set by loginUser API call)
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      console.log('Login - Token retrieved:', 'Yes');

      // Update AuthContext with user data (this will trigger Dashboard re-render)
      login({ 
        token, 
        user: userData 
      });

      console.log('Login - Context updated successfully');
      
      // Small delay to ensure context is updated before navigation
      setTimeout(() => {
        console.log('Login - Redirecting to dashboard');
        navigate("/dashboard");
      }, 100);

    } catch (err) {
      console.error("Login Error:", err);
      
      // Handle specific error messages
      const errorMessage = err.message || "Login failed";
      
      if (errorMessage.includes("not found") || errorMessage.includes("not registered")) {
        setError("User not registered. Please register first.");
      } else if (errorMessage.includes("Invalid password") || errorMessage.includes("password")) {
        setError("Invalid password. Please try again.");
      } else if (errorMessage.includes("required") || errorMessage.includes("email")) {
        setError("Please enter both email and password.");
      } else if (errorMessage.includes("token")) {
        setError("Authentication failed. Please try again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Login to JanHaq
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/register" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
            Register Now
          </Link>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
            Forgot Password?
          </a>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
          New to JanHaq?{" "}
          <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}