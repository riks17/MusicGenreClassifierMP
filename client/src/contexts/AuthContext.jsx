import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/users/profile",
        {
          withCredentials: true,
        }
      );
      setUser(data);
    } catch (err) {
      console.error("Not authenticated");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUser(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        "http://localhost:3001/api/users/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUser(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to signup");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
