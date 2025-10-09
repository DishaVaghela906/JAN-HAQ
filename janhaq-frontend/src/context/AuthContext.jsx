import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for a user on initial app load
  useEffect(() => {
    const storedUser = localStorage.getItem('janhaqUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (userData) => {
    // In a real app, you'd get this from a backend API
    const fakeUserData = { email: userData.email, name: 'Guest User' };
    localStorage.setItem('janhaqUser', JSON.stringify(fakeUserData));
    setUser(fakeUserData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('janhaqUser');
    setUser(null);
  };

  // The value provided to consuming components
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};