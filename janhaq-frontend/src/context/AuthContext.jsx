import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from '../utils/userDb'; // Import our new DB helper

const AuthContext = createContext(null);

// This key is for storing the *currently logged-in user's email* for session persistence
const SESSION_KEY = 'janhaqSessionEmail'; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On initial app load, check if there's an active session
  useEffect(() => {
    const sessionEmail = localStorage.getItem(SESSION_KEY);
    if (sessionEmail) {
      // If there is, fetch the full user data from our mock DB
      const fullUserData = getUser(sessionEmail);
      if (fullUserData) {
        setUser(fullUserData);
      }
    }
  }, []);

  // Login now looks up the user in our mock DB
  const login = (loginData) => {
    const fullUserData = getUser(loginData.email);
    if (fullUserData) {
      localStorage.setItem(SESSION_KEY, fullUserData.email); // Save current session
      setUser(fullUserData);
      return fullUserData;
    }
    return null; // User not found
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY); // Clear the session
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};