import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutAPI } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const userData = await getCurrentUser();
      clearTimeout(timeoutId);
      
      if (userData.authenticated) {
        setUser(userData);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Auth check failed:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshUser = async () => {
    const userData = await getCurrentUser();
    if (userData.authenticated) {
      setUser(userData);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};