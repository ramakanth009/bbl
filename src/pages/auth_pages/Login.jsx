import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Fade,
  Zoom,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff, 
  WorkspacePremium,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../context/AuthContext';
import GoogleLogo from '../../assets/google-logo.svg';
import AuthFooter from '../../components/common/AuthFooter';
import AuthHeader from '../../components/common/AuthHeader';

const StarField = React.lazy(() => import('../../components/common/StarField'));
const useStyles = makeStyles(() => ({
  appRoot: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    padding: '16px',
    paddingBottom: '72px',
    '@media (max-height: 800px)': {
      padding: '8px',
    },
    '@media (max-height: 700px)': {
      padding: '4px',
      paddingBottom: '64px',
    },
  },
  authCard: {
    width: '100%',
    maxWidth: 440,
    padding: '36px 36px 32px 36px',
    background: 'none !important',
    backgroundColor: 'transparent !important',
    border: 'none !important',
    borderRadius: 28,
    boxShadow: 'none !important',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 1200px)': {
      maxWidth: 400,
      padding: '32px 32px 28px 32px',
    },
    '@media (max-width: 960px)': {
      maxWidth: 380,
      padding: '28px 28px 24px 28px',
      borderRadius: 24,
    },
    '@media (max-width: 600px)': {
      maxWidth: '100%',
      padding: '24px 24px 20px 24px',
      borderRadius: 20,
    },
    '@media (max-width: 480px)': {
      padding: '20px 20px 16px 20px',
      borderRadius: 16,
    },
    '@media (max-width: 375px)': {
      padding: '16px 16px 12px 16px',
      borderRadius: 12,
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '18px',
    marginBottom: '36px',
    '@media (max-width: 960px)': {
      gap: '16px',
      marginBottom: '32px',
    },
    '@media (max-width: 600px)': {
      gap: '14px',
      marginBottom: '28px',
      flexDirection: 'column',
    },
    '@media (max-width: 480px)': {
      gap: '12px',
      marginBottom: '24px',
    },
    '@media (max-width: 375px)': {
      gap: '10px',
      marginBottom: '20px',
    },
  },
  logoIcon: {
    width: 52,
    height: 52,
    background: 'linear-gradient(135deg, #fff 0%, #bbb 100%)',
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(255,255,255,0.10)',
    '@media (max-width: 960px)': {
      width: 48,
      height: 48,
      borderRadius: 12,
    },
    '@media (max-width: 600px)': {
      width: 44,
      height: 44,
      borderRadius: 10,
    },
    '@media (max-width: 480px)': {
      width: 40,
      height: 40,
      borderRadius: 8,
    },
    '@media (max-width: 375px)': {
      width: 36,
      height: 36,
    },
  },
  styledTextField: {
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'transparent !important',
      border: '1.5px solid #fff',
      borderRadius: 12,
      height: '48px',
      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
      '& fieldset': {
        border: 'none',
      },
      '&:hover': {
        backgroundColor: 'transparent',
        border: '1.5px solid #fff',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        border: '1.5px solid #fff',
        boxShadow: '0 0 0 4px rgba(255,255,255,0.08)',
      },
      '&.Mui-error': {
        border: '1.5px solid #f44336',
        boxShadow: '0 0 0 4px rgba(244, 67, 54, 0.08)'
      },
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
      fontSize: '0.9rem',
      '&.Mui-focused': {
        color: '#fff',
      },
      '&.Mui-error': {
        color: '#f44336',
      },
    },
    '& .MuiInputBase-input': {
      color: '#fff',
      fontWeight: 500,
      letterSpacing: '0.02em',
      fontSize: '0.9rem',
    },
    '& .MuiFormHelperText-root': {
      color: '#aaa',
      fontSize: '0.7rem',
      marginTop: '4px',
      '&.Mui-error': {
        color: '#f44336',
      },
    },
    '@media (max-height: 700px)': {
      marginBottom: '12px',
      '& .MuiOutlinedInput-root': {
        height: '44px',
      },
      '& .MuiFormHelperText-root': {
        fontSize: '0.65rem',
      },
    },
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    borderRadius: 12,
    backgroundColor: '#fff !important',
    color: '#111 !important',
    fontSize: '1rem',
    fontWeight: 700,
    textTransform: 'none',
    marginBottom: '20px !important',
    marginTop: '8px !important',
    boxShadow: '0 8px 32px rgba(255,255,255,0.10)',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    '&:hover': {
      color: '#000',
      transform: 'translateY(-2px) scale(1.01)',
      boxShadow: '0 12px 40px rgba(255,255,255,0.13)',
    },
    '&:disabled': {
      background: 'transparent !important',
      color: '#fff !important',
    },
    '@media (max-height: 700px)': {
      padding: '10px',
      fontSize: '0.9rem',
      marginBottom: '16px !important',
    },
  },
  googleButton: {
    width: '100%',
    padding: '11px !important',
    borderRadius: 12,
    border: '0.2px solid #dadce0 !important',
    color: '#ffffff !important',
    textTransform: 'none',
    marginBottom: '16px',
    fontWeight: 600,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 1px 2px rgba(60,64,67,.08)',
    transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: '#1a73e8',
      boxShadow: '0 2px 4px rgba(60,64,67,.13)',
    },
    '&:active': {
      background: '#ececec',
    },
    '&:focus': {
      outline: '2px solid #4285F4',
      outlineOffset: '2px',
    },
    '@media (max-height: 700px)': {
      padding: '9px !important',
      fontSize: '0.85rem',
      marginBottom: '12px',
    },
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0',
    '&::before, &::after': {
      content: '""',
      flex: 1,
      height: 1,
      background: 'linear-gradient(90deg, #222 0%, #444 100%)',
    },
    '@media (max-height: 700px)': {
      margin: '12px 0',
    },
  },
  dividerText: {
    padding: '0 16px',
    color: '#888',
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
  styledLink: {
    color: '#fff',
    textDecoration: 'underline',
    fontWeight: "bold",
    transition: 'color 0.3s',
    '&:hover': {
      color: '#eee',
    },
  },
  titleText: {
    '@media (max-width: 960px)': {
      fontSize: '1.9rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.7rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.3rem !important',
    },
  },
  logoText: {
    '@media (max-width: 960px)': {
      fontSize: '1.3rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem !important',
      textAlign: 'center',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem !important',
    },
  },
  logoIconResponsive: {
    '@media (max-width: 960px)': {
      fontSize: '36px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '32px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '28px !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '24px !important',
    },
  },
  oauthUnavailable: {
    opacity: 0.5,
    cursor: 'not-allowed !important',
    pointerEvents: 'none',
  },
  oauthStatusMessage: {
    fontSize: '0.75rem',
    color: '#999',
    textAlign: 'center',
    marginBottom: '12px',
    minHeight: '18px', // Reserve space to prevent layout shift
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    width: '100%',
    padding: '12px 16px',
    position: 'fixed',
    left: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    pointerEvents: 'auto',
  },
  footerInner: {
    width: '100%',
    maxWidth: 960,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    color: '#aaa',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '8px',
      textAlign: 'center',
    },
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 600px)': {
      gap: '12px',
    },
  },
  footerLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
    borderBottom: '1px dashed rgba(255,255,255,0.35)',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 0.85,
    },
  },
  copyright: {
    color: '#aaa',
    fontSize: '0.9rem',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [oauthStatusLoading, setOauthStatusLoading] = useState(true);
  const { login, loginWithGoogle, isAuthenticated, oauthStatus, checkOAuthStatus } = useAuth();
  const navigate = useNavigate();

  // Field-specific error states for inline helper text
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    // Handle OAuth errors passed via URL params
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    if (error) {
      const errorMessages = {
        'oauth_not_configured': 'Google sign-in is temporarily unavailable. Please try regular login.',
        'authentication_failed': 'Google authentication failed. Please try again.',
        'user_info_failed': 'Failed to get user information from Google.',
        'access_denied': 'Google access was denied. Please try again.'
      };

      setError(errorMessages[error] || message || 'Authentication failed');
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Check OAuth status on component mount with better error handling
  useEffect(() => {
    const fetchOAuthStatus = async () => {
      setOauthStatusLoading(true);
      try {
        await checkOAuthStatus();
      } catch (error) {
        console.warn('OAuth status check failed:', error);
        // Don't show error to user, just disable OAuth silently
      } finally {
        setOauthStatusLoading(false);
      }
    };

    fetchOAuthStatus();
  }, [checkOAuthStatus]);

  // Field-specific validation messages
  const validateField = (name, value) => {
    if (!value || value.trim() === '') {
      const messages = {
        username: 'Please type your username',
        password: 'Please type your password'
      };
      setFieldErrors((prev) => ({ ...prev, [name]: messages[name] || 'This field is required' }));
      return false;
    }
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before calling API
    const isUsernameOk = validateField('username', username);
    const isPasswordOk = validateField('password', password);
    if (!isUsernameOk || !isPasswordOk) {
      return; // Do not proceed if fields are empty
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(username, password);

      if (result.success) {
        // Navigation is handled by the useEffect above
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Check OAuth availability with more detailed logic
    if (oauthStatusLoading) {
      setError('Please wait while we check Google sign-in availability.');
      return;
    }

    if (!oauthStatus?.oauth_configured || !oauthStatus?.google_available) {
      setError('Google OAuth is not available. Please use regular login or contact support.');
      return;
    }

    try {
      setGoogleLoading(true);
      setError('');

      loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Failed to initiate Google login. Please try again.');
      setGoogleLoading(false);
    }
  };

  // Determine OAuth availability with better logic
  const getOAuthAvailability = () => {
    if (oauthStatusLoading) {
      return {
        available: false,
        message: 'Checking availability...',
        showButton: true
      };
    }

    if (!oauthStatus) {
      return {
        available: false,
        message: 'Unable to check Google Sign-In status',
        showButton: false
      };
    }

    if (!oauthStatus.oauth_configured) {
      return {
        available: false,
        message: 'Google Sign-In not configured',
        showButton: false
      };
    }

    if (!oauthStatus.google_available) {
      return {
        available: false,
        message: 'Google Sign-In temporarily unavailable',
        showButton: false
      };
    }

    return {
      available: true,
      message: '',
      showButton: true
    };
  };

  const oauthAvailability = getOAuthAvailability();

  return (
    <Box className={classes.appRoot}>
      <React.Suspense fallback={<div />}>
        <StarField />
      </React.Suspense>
      <AuthHeader />
      <Container maxWidth="sm" className={classes.pageContainer}>
        <Fade in timeout={800}>
          <Card className={classes.authCard} style={{ position: 'relative', overflow: 'hidden' }}>
            <Zoom in timeout={1000}>
              <Box>
                <Box className={classes.logoContainer}>
                  <Box className={classes.logoIcon}>
                    <WorkspacePremium sx={{ color: '#232526', fontSize: 40, filter: 'drop-shadow(0 1px 4px #bbb)' }} className={classes.logoIconResponsive} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold"
                    className={classes.logoText}
                    sx={{ 
                      background: '#fff',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.02em',
                    }}
                  >
                    GigaSpace
                  </Typography>
                </Box>

                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  align="center" 
                  gutterBottom
                  className={classes.titleText}
                  sx={{ 
                    color: '#fff',
                    fontSize: '2.1rem',
                    mb: 1,
                    letterSpacing: '0.01em',
                  }}
                >
                  Welcome back
                </Typography>

                <Typography 
                  variant="body1" 
                  align="center" 
                  sx={{ 
                    color: '#fff',
                    mb: 4,
                  }}
                >
                  Sign in to continue your legendary conversations
                </Typography>

                {error && (
                  <Fade in>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3,
                        backgroundColor: 'transparent',
                        border: '1.5px solid #f44336',
                        color: '#f44336',
                        borderRadius: 2,
                        fontWeight: 500,
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}

                {/* Google OAuth Section with Better Handling */}
                {oauthAvailability.showButton && (
                  <Button
                    className={`${classes.googleButton} ${!oauthAvailability.available ? classes.oauthUnavailable : ''}`}
                    onClick={handleGoogleLogin}
                    disabled={googleLoading || !oauthAvailability.available || oauthStatusLoading}
                    disableElevation
                    startIcon={
                      googleLoading ? (
                        <CircularProgress size={20} sx={{ color: '#fff' }} />
                      ) : oauthStatusLoading ? (
                        <CircularProgress size={20} sx={{ color: '#fff' }} />
                      ) : (
                        <img 
                          src={GoogleLogo} 
                          alt="Google" 
                          style={{ 
                            width: 22, 
                            height: 22, 
                            display: 'block',
                            opacity: oauthAvailability.available ? 1 : 0.5 
                          }} 
                        />
                      )
                    }
                  >
                    {googleLoading ? 'Connecting...' : oauthStatusLoading ? 'Loading...' : 'Continue with Google'}
                  </Button>
                )}

                {/* OAuth Status Message */}
                <Box className={classes.oauthStatusMessage}>
                  {oauthAvailability.message && (
                    <Typography variant="caption">
                      {oauthAvailability.message}
                    </Typography>
                  )}
                </Box>

                <Box className={classes.divider}>
                  <Typography className={classes.dividerText}>OR</Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (fieldErrors.username) {
                        setFieldErrors((prev) => ({ ...prev, username: '' }));
                      }
                    }}
                    onBlur={() => validateField('username', username)}
                    margin="normal"
                    autoFocus
                    className={classes.styledTextField}
                    disabled={loading}
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) {
                        setFieldErrors((prev) => ({ ...prev, password: '' }));
                      }
                    }}
                    onBlur={() => validateField('password', password)}
                    margin="normal"
                    className={classes.styledTextField}
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#fff' }}
                            disabled={loading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                  />

                  <Button
                    type="submit"
                    disabled={loading || googleLoading}
                    className={classes.loginButton}
                    startIcon={loading ? <CircularProgress size={20} sx={{ color: '#111' }} /> : null}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <Box textAlign="center" sx={{ mb: 2 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ color: '#fff', mb: 1 }}
                    >
                      <Link to="/forgot-password" className={classes.styledLink}>
                        Forgot your password?
                      </Link>
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: '#fff' }}
                    >
                      Don't have an account?{' '}
                      <Link to="/register" className={classes.styledLink}>
                        Create one
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Zoom>
          </Card>
        </Fade>
      </Container>
      {/* Footer */}
      <AuthFooter />
    </Box>
  );
};

export default Login;