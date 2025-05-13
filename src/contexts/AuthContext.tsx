
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: string | null;
  userEmail: string | null;
  loading: boolean;
  login: (email: string, role: "admin" | "user") => Promise<boolean>;
  verifyOtp: (email: string, otp: string, role: "admin" | "user") => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        setUserRole(authService.getUserRole());
        setUserEmail(authService.getUserEmail());
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, role: "admin" | "user"): Promise<boolean> => {
    return await authService.requestOtp(email, role);
  };

  const verifyOtp = async (email: string, otp: string, role: "admin" | "user"): Promise<boolean> => {
    const response = await authService.verifyOtp(email, otp, role);
    
    if (response) {
      setIsAuthenticated(true);
      setUserRole(response.role);
      setUserEmail(email);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    navigate("/");
  };

  const value = {
    isAuthenticated,
    userRole,
    userEmail,
    loading,
    login,
    verifyOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
