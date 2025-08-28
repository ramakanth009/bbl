// AuthContext.js - Updated with fixes, new profile management, and single mount enforcement

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
  const [profileStatus, setProfileStatus] = useState(null);
  const [needsMobileCollection, setNeedsMobileCollection] = useState(false);
  const [mobileCollectionSkipped, setMobileCollectionSkipped] = useState(false); // NEW

  // Add refs to prevent multiple simultaneous API calls
  const profileStatusLoadingRef = useRef(false);
  const oauthStatusLoadingRef = useRef(false);
  const contextMountedRef = useRef(false);

  // Memoized function to load profile status (prevents recreation on every render)
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
      
      if (profile.needs_mobile) {
        setNeedsMobileCollection(true);
      } else {
        setNeedsMobileCollection(false);
      }
      
      return profile;
    } catch (error) {
      console.error('Failed to load profile status:', error);
      return null;
    } finally {
      profileStatusLoadingRef.current = false;
    }
  }, [profileStatus]);

  // Memoized function to load OAuth status
  const loadOAuthStatus = useCallback(async () => {
    if (oauthStatusLoadingRef.current) {
      console.log('OAuth status already loading, skipping...');
      return oauthStatus;
    }

    try {
      oauthStatusLoadingRef.current = true;
      const oauth = await apiService.checkOAuthStatus();
      setOauthStatus(oauth);
      return oauth;
    } catch (error) {
      console.error('Failed to check OAuth status:', error);
      setOauthStatus({
        oauth_configured: false,
        google_available: false
      });
      return null;
    } finally {
      oauthStatusLoadingRef.current = false;
    }
  }, [oauthStatus]);

  // Clear authentication data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setProfileStatus(null);
    setNeedsMobileCollection(false);
  }, []);

  // Check authentication status on initial load - FIXED with proper dependencies
  useEffect(() => {
    if (contextMountedRef.current) {
      console.warn('AuthProvider mounted more than once. This may cause duplicate API calls.');
    }
    contextMountedRef.current = true;

    let isMounted = true; // Cleanup flag
    
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token && apiService.isAuthenticated()) {
          setIsAuthenticated(true);
          
          // Load user data
          try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              const userData = JSON.parse(storedUser);
              if (isMounted) {
                setUser(userData);
                // Check if mobile collection is needed from stored data
                if (userData.is_oauth_user && userData.needs_mobile) {
                  setNeedsMobileCollection(true);
                }
              }
            } else {
              // Try to get user info from token
              const userInfo = apiService.getUserInfo();
              if (userInfo && isMounted) setUser(userInfo);
            }
          } catch (e) {
            console.error('Failed to parse stored user data:', e);
          }

          // Load profile status ONLY ONCE on initial authentication check
          if (isMounted && !profileStatusLoadingRef.current && !profileStatus) {
            await loadProfileStatus(true); // Force load on initial check
          }
        } else {
          if (isMounted) clearAuthData();
        }
        
        // Check OAuth status ONLY ONCE
        if (isMounted) {
          await loadOAuthStatus();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        if (isMounted) clearAuthData();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Only run once on mount

  // Login with username/password
  const login = async (username, password) => {
    if (!username || !password) {
      return {
        success: false,
        error: 'Username and password are required'
      };
    }
    
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
      if (!oauthStatus?.oauth_configured || !oauthStatus?.google_available) {
        throw new Error('Google OAuth is not available');
      }
      apiService.initiateGoogleLogin();
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  // Handle OAuth callback
  const handleOAuthCallback = useCallback(async () => {
    setLoading(true); // Block API calls until done
    try {
      const result = apiService.processOAuthCallback();
      if (result.success && result.token) {
        setUser(result.user);
        setIsAuthenticated(true);
        if (result.user.needs_mobile) {
          setNeedsMobileCollection(true);
          setMobileCollectionSkipped(false); // Reset skip state
        }
        await loadProfileStatus(true);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error || result.message };
    } catch (error) {
      clearAuthData();
      return {
        success: false,
        error: error.message || 'OAuth callback processing failed'
      };
    } finally {
      setLoading(false); // Only allow API calls after auth state is set
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

      setNeedsMobileCollection(false);
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

  // NEW: Skip mobile collection handler
  const skipMobileCollection = useCallback(() => {
    setNeedsMobileCollection(false);
    setMobileCollectionSkipped(true);
    // Optionally update user/profile status to reflect skip
    setProfileStatus(prev => ({
      ...prev,
      needs_mobile: false,
      mobile_skipped: true
    }));
  }, []);

  // Refresh profile status - now uses the memoized function
  const refreshProfileStatus = useCallback(async () => {
    return await loadProfileStatus(true);
  }, [loadProfileStatus]);

  // Logout
  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
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

  const value = {
    isAuthenticated,
    user,
    loading,
    oauthStatus,
    profileStatus,
    needsMobileCollection,
    mobileCollectionSkipped, // NEW
    login,
    register,
    logout,
    loginWithGoogle,
    handleOAuthCallback,
    getUserInfo,
    updateMobile,
    skipMobileCollection, // NEW
    refreshProfileStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};