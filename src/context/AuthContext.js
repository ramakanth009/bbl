// import React, { createContext, useContext, useState, useEffect } from 'react';
// import apiService from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           // Optional: Verify token with a simple API call
//           // You could add a /verify endpoint or use any authenticated endpoint
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         // Token invalid or expired
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await apiService.login(username, password);
//       setIsAuthenticated(true);
//       setUser({ username });
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Login failed'
//       };
//     }
//   };

//   const register = async (username, password) => {
//     try {
//       await apiService.register(username, password);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.error || 'Registration failed'
//       };
//     }
//   };

//   const logout = async () => {
//     try {
//       await apiService.logout();
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       localStorage.removeItem('token');
//       setIsAuthenticated(false);
//       setUser(null);
//     }
//   };

//   const value = {
//     isAuthenticated,
//     user,
//     login,
//     register,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// AuthContext.js - Updated with fixes
import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && apiService.isAuthenticated()) {
          setIsAuthenticated(true);
          // Load user data
          try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            } else {
              // Try to get user info from token or API
              const userInfo = apiService.getUserInfo();
              if (userInfo) setUser(userInfo);
            }
          } catch (e) {
            console.error('Failed to parse stored user data:', e);
          }
        } else {
          clearAuthData();
        }

        // Check OAuth status
        try {
          const oauth = await apiService.checkOAuthStatus();
          setOauthStatus(oauth);
        } catch (error) {
          console.error('Failed to check OAuth status:', error);
          setOauthStatus({
            oauth_configured: false,
            google_available: false
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Clear authentication data
  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

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
        return { success: true, user: userData };
      }

      return { success: false, error: 'No token received' };
    } catch (error) {
      clearAuthData();
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (username, password) => {
    try {
      setLoading(true);
      await apiService.register(username, password);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Registration failed'
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
  const handleOAuthCallback = async () => {
    try {
      const result = apiService.processOAuthCallback();
      
      if (result.success && result.token) {
        // Set authentication state
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true, user: result.user };
      }

      return { success: false, error: result.error || result.message };
    } catch (error) {
      clearAuthData();
      return {
        success: false,
        error: error.message || 'OAuth callback processing failed'
      };
    }
  };

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
  const getUserInfo = () => {
    if (user) return user;
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) return JSON.parse(storedUser);
    } catch (e) {
      console.error('Failed to parse user data:', e);
    }
    return null;
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    oauthStatus,
    login,
    register,
    logout,
    loginWithGoogle,
    handleOAuthCallback,
    getUserInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
