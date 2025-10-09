import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component acts as a guard for our protected routes
const ProtectedRoute = () => {
  const { user } = useAuth();

  // If the user is not logged in, redirect them to the /login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, show the page they were trying to access
  return <Outlet />;
};

export default ProtectedRoute;