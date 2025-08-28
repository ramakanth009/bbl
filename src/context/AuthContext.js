// AuthContext.js - Updated with proper OAuth status handling

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [oauthStatus, setOauthStatus] = useState(null);
  const [oauthStatusLoading, setOauthStatusLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState(null);

  // Add refs to prevent multiple simultaneous API calls
  const profileStatusLoadingRef = useRef(false);
  const oauthStatusLoadingRef = useRef(false);
  const contextMountedRef = useRef(false);

  // Memoized function to load profile status
  const loadProfileStatus = useCallback(async (force = false) => {
    // Prevent multiple simultaneous calls
    if (profileStatusLoadingRef.current && !force) {
      console.log('Profile status already loading, skipping...');
      return profileStatus;
    }

    try {
      profileStatusLoadingRef.current = true;
      console.log('🔄 Loading user profile status...');
      
      const profile = await apiService.getUserProfileStatus();
      
      console.log('✅ Profile status loaded:', profile);
      setProfileStatus(profile);
      
      return profile;
    } catch (error) {
      console.error('Failed to load profile status:', error);
      return null;
    } finally {
      profileStatusLoadingRef.current = false;
    }
  }, [profileStatus]);

  // Improved OAuth status loading with proper state management
  const checkOAuthStatus = useCallback(async (force = false) => {
    // Prevent multiple simultaneous calls unless forced
    if (oauthStatusLoadingRef.current && !force) {
      console.log('OAuth status already loading, skipping...');
      return oauthStatus;
    }

    try {
      oauthStatusLoadingRef.current = true;
      setOauthStatusLoading(true);
      
      console.log('🔄 Checking OAuth status...');
      const status = await apiService.checkOAuthStatus();
      
      console.log('✅ OAuth status loaded:', status);
      setOauthStatus(status);
      
      return status;
    } catch (error) {
      console.error('❌ Failed to check OAuth status:', error);
      
      // Set default values when OAuth check fails
      const fallbackStatus = {
        status: 'error',
        oauth_configured: false,
        google_available: false,
        error: 'Failed to check OAuth configuration'
      };
      
      setOauthStatus(fallbackStatus);
      return fallbackStatus;
    } finally {
      oauthStatusLoadingRef.current = false;
      setOauthStatusLoading(false);
    }
  }, [oauthStatus]);

  // Clear authentication data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setProfileStatus(null);
  }, []);

  // Check authentication status on initial load
  useEffect(() => {
    if (contextMountedRef.current) {
      console.warn('AuthProvider mounted more than once. This may cause duplicate API calls.');
    }
    contextMountedRef.current = true;

    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing authentication...');
        
        // Check OAuth status first (this doesn't require authentication)
        await checkOAuthStatus(true);
        
        // Then check user authentication
        const token = localStorage.getItem('token');
        
        if (token && apiService.isAuthenticated()) {
          console.log('✅ Valid token found');
          setIsAuthenticated(true);
          
          // Load user data
          try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              const userData = JSON.parse(storedUser);
              if (isMounted) {
                setUser(userData);
                console.log('✅ User data loaded from localStorage');
              }
            } else {
              // Try to get user info from token
              const userInfo = apiService.getUserInfo();
              if (userInfo && isMounted) {
                setUser(userInfo);
                console.log('✅ User data loaded from token');
              }
            }
          } catch (e) {
            console.error('❌ Failed to parse stored user data:', e);
          }

          // Load profile status for authenticated users
          if (isMounted && !profileStatusLoadingRef.current) {
            await loadProfileStatus(true);
          }
        } else {
          console.log('❌ No valid token found');
          if (isMounted) clearAuthData();
        }
        
      } catch (error) {
        console.error('❌ Auth initialization error:', error);
        if (isMounted) clearAuthData();
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log('✅ Auth initialization complete');
        }
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once

  // Login with username/password
  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await apiService.login(username, password);
      
      if (response.token) {
        const userData = response.user || { username };
        setUser(userData);
        setIsAuthenticated(true);
        
        // Load profile status after successful login
        await loadProfileStatus(true);
        
        return { success: true, user: userData };
      }
      return { success: false, error: 'No token received' };
    } catch (error) {
      clearAuthData();
      return {
        success: false,
        error: error.response?.data?.error || error.response?.data?.detail || error.message || 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  // Register new user with email and mobile number
  const register = async (username, email, mobile_number, password) => {
    try {
      setLoading(true);
      await apiService.register(username, email, mobile_number, password);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.response?.data?.detail || error.message || 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth login
  const loginWithGoogle = () => {
    try {
      // Check if OAuth status is still loading
      if (oauthStatusLoading) {
        throw new Error('Please wait while we check Google sign-in availability');
      }
      
      if (!oauthStatus?.oauth_configured || !oauthStatus?.google_available) {
        throw new Error('Google OAuth is not available at this time');
      }
      
      console.log('🔄 Initiating Google OAuth flow...');
      apiService.initiateGoogleLogin();
    } catch (error) {
      console.error('❌ Google login failed:', error);
      throw error;
    }
  };

  // Handle OAuth callback
  const handleOAuthCallback = useCallback(async () => {
    setLoading(true);
    try {
      console.log('🔄 Processing OAuth callback...');
      const result = apiService.processOAuthCallback();
      
      if (result.success && result.token) {
        console.log('✅ OAuth callback successful');
        setUser(result.user);
        setIsAuthenticated(true);
        
        // Load profile status after OAuth login
        await loadProfileStatus(true);
        
        return { success: true, user: result.user };
      }
      
      console.log('❌ OAuth callback failed:', result.error);
      return { success: false, error: result.error || result.message };
    } catch (error) {
      console.error('❌ OAuth callback processing error:', error);
      clearAuthData();
      return {
        success: false,
        error: error.message || 'OAuth callback processing failed'
      };
    } finally {
      setLoading(false);
    }
  }, [loadProfileStatus, clearAuthData]);

  // Update mobile number
  const updateMobile = async (mobile_number) => {
    try {
      setLoading(true);
      await apiService.updateUserMobile(mobile_number);
      
      // Update local user data
      const updatedUser = { ...user, mobile_number };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update profile status
      setProfileStatus(prev => ({
        ...prev,
        mobile_number,
        profile_complete: true,
        needs_mobile: false
      }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to update mobile number'
      };
    } finally {
      setLoading(false);
    }
  };

  // Refresh profile status
  const refreshProfileStatus = useCallback(async () => {
    return await loadProfileStatus(true);
  }, [loadProfileStatus]);

  // Refresh OAuth status (useful for retry scenarios)
  const refreshOAuthStatus = useCallback(async () => {
    return await checkOAuthStatus(true);
  }, [checkOAuthStatus]);

  // Logout
  const logout = async () => {
    try {
      console.log('🔄 Logging out...');
      await apiService.logout();
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    } finally {
      clearAuthData();
    }
  };

  // Get current user info
  const getUserInfo = useCallback(() => {
    if (user) return user;
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) return JSON.parse(storedUser);
    } catch (e) {
      console.error('Failed to parse user data:', e);
    }
    return null;
  }, [user]);

  // Helper function to check if OAuth is ready
  const isOAuthReady = useCallback(() => {
    return !oauthStatusLoading && oauthStatus?.oauth_configured && oauthStatus?.google_available;
  }, [oauthStatusLoading, oauthStatus]);

  // Helper function to get OAuth status message
  const getOAuthStatusMessage = useCallback(() => {
    if (oauthStatusLoading) {
      return 'Checking Google Sign-In availability...';
    }
    
    if (!oauthStatus) {
      return 'Unable to check Google Sign-In status';
    }
    
    if (!oauthStatus.oauth_configured) {
      return 'Google Sign-In not configured';
    }
    
    if (!oauthStatus.google_available) {
      return 'Google Sign-In temporarily unavailable';
    }
    
    return null; // No message needed when everything is working
  }, [oauthStatusLoading, oauthStatus]);

  const value = {
    // State
    isAuthenticated,
    user,
    loading,
    oauthStatus,
    oauthStatusLoading,
    profileStatus,
    
    // Auth methods
    login,
    register,
    logout,
    loginWithGoogle,
    handleOAuthCallback,
    getUserInfo,
    
    // Profile methods
    updateMobile,
    refreshProfileStatus,
    
    // OAuth methods and helpers
    checkOAuthStatus,
    refreshOAuthStatus,
    isOAuthReady,
    getOAuthStatusMessage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};