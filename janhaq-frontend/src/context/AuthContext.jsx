import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  // Load token + user (including profile) from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    console.log('AuthContext - Loading from localStorage:', {
      hasToken: !!storedToken,
      hasUser: !!storedUser
    });

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        console.log('AuthContext - Parsed user:', {
          userId: parsedUser._id,
          name: parsedUser.name,
          hasProfile: !!parsedUser.profile,
          profile: parsedUser.profile
        });

        setToken(storedToken);
        setUser(parsedUser);
      } catch (err) {
        console.error("AuthContext - Failed to parse stored user:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    
    setLoading(false); // ✅ Mark loading as complete
  }, []);

  // Login: expects { token, user } from backend
  const login = (loginData) => {
    console.log('AuthContext - Login called with:', {
      hasToken: !!loginData?.token,
      hasUser: !!loginData?.user,
      userId: loginData?.user?._id
    });

    if (!loginData || !loginData.token || !loginData.user) {
      console.error('AuthContext - Invalid login data');
      return null;
    }

    // Validate user structure
    if (!loginData.user._id) {
      console.error('AuthContext - User missing _id');
      return null;
    }

    // Use the user object as-is from backend (don't modify profile)
    const userToStore = loginData.user;

    console.log('AuthContext - Setting user:', {
      userId: userToStore._id,
      name: userToStore.name,
      hasProfile: !!userToStore.profile,
      profileRole: userToStore.profile?.role,
      profileInterests: userToStore.profile?.interests
    });

    setToken(loginData.token);
    setUser(userToStore);

    localStorage.setItem("token", loginData.token);
    localStorage.setItem("user", JSON.stringify(userToStore));

    console.log('AuthContext - Login complete');

    return userToStore;
  };

  // Update user profile (triggers re-render in Dashboard)
  const updateProfile = (newProfile) => {
    console.log('AuthContext - updateProfile called with:', newProfile);

    if (!user) {
      console.error('AuthContext - No user to update');
      return null;
    }

    const updatedUser = {
      ...user,
      profile: newProfile,
    };

    console.log('AuthContext - Updated user:', {
      userId: updatedUser._id,
      profileRole: updatedUser.profile?.role,
      profileInterests: updatedUser.profile?.interests
    });

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    console.log('AuthContext - Profile updated successfully');

    return updatedUser;
  };

  // Update entire user object (useful after API calls)
  const updateUser = (updatedUserData) => {
    console.log('AuthContext - updateUser called');

    if (!updatedUserData || !updatedUserData._id) {
      console.error('AuthContext - Invalid user data for update');
      return null;
    }

    console.log('AuthContext - Setting updated user:', {
      userId: updatedUserData._id,
      hasProfile: !!updatedUserData.profile,
      profile: updatedUserData.profile
    });

    setUser(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    return updatedUserData;
  };

  // Refresh user from localStorage (useful after external updates)
  const refreshUser = () => {
    console.log('AuthContext - Refreshing user from localStorage');

    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        console.log('AuthContext - User refreshed:', {
          userId: parsedUser._id,
          hasProfile: !!parsedUser.profile
        });

        setUser(parsedUser);
        return parsedUser;
      } catch (err) {
        console.error("AuthContext - Failed to refresh user:", err);
        return null;
      }
    }
    
    console.log('AuthContext - No user to refresh');
    return null;
  };

  // Check if profile is complete (for onboarding)
  // Only requires role and interests (not ageGroup)
  const isProfileComplete = () => {
    if (!user || !user.profile) {
      console.log('AuthContext - isProfileComplete: No user or profile');
      return false;
    }

    const { role, interests } = user.profile;

    const complete = (
      role && 
      role.trim() !== "" &&
      interests && 
      Array.isArray(interests) && 
      interests.length > 0
    );

    console.log('AuthContext - isProfileComplete:', {
      hasRole: !!role,
      role: role,
      interestsCount: interests?.length || 0,
      complete
    });

    return complete;
  };

  // Logout: clear all
  const logout = () => {
    console.log('AuthContext - Logging out');
    
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading, // ✅ Expose loading state
        login,
        logout,
        updateProfile,
        updateUser,
        refreshUser,
        isProfileComplete,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);