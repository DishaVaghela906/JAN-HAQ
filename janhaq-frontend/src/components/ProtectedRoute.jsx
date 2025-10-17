import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute: renders protected routes only if user is authenticated
 * Shows loading state while checking authentication to prevent flickering
 */
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // ✅ Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ Not logged in, redirect to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ User is authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;