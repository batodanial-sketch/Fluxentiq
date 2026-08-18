import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Create a standalone Axios instance for authenticated API calls
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header if a token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Verify stored session on app load
  const checkUserAuth = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoadingAuth(false);
      return;
    }

    try {
      setIsLoadingAuth(true);
      setAuthError(null);
      
      // Fetch user data using standard endpoint
      const response = await apiClient.get('/auth/me');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Session verification failed:', error);
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
      setAuthError({
        type: 'auth_required',
        message: error.response?.data?.message || 'Session expired. Please log in again.'
      });
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  // Standard Login Function
  const login = async (credentials) => {
    try {
      setAuthError(null);
      const response = await apiClient.post('/auth/login', credentials);
      const { token, user: userData } = response.data;

      if (token) {
        localStorage.setItem('auth_token', token);
        setUser(userData);
        setIsAuthenticated(true);
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setAuthError({ type: 'login_error', message });
      throw new Error(message);
    }
  };

  // Standard Logout Function
  const logout = (redirectUrl = '/login') => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        authError,
        login,
        logout,
        checkUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};