import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute: renders protected routes only if user is authenticated
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Not logged in, redirect to /login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
