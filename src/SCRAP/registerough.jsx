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
  Fade,
  Zoom,
  CircularProgress,
} from '@mui/material';
import { WorkspacePremium } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../context/AuthContext';
import GoogleLogo from '../assets/google-logo.svg';

const StarField = React.lazy(() => import('../components/common/StarField'));

const useStyles = makeStyles(() => ({
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
    padding: '24px',
    '@media (max-width: 1200px)': {
      justifyContent: 'center',
      padding: '20px',
    },
    '@media (max-width: 960px)': {
      padding: '16px',
    },
    '@media (max-width: 600px)': {
      padding: '12px',
      minHeight: '100vh',
    },
    '@media (max-width: 480px)': {
      padding: '8px',
    },
    '@media (max-width: 375px)': {
      padding: '4px',
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
    backgroundColor: '#fff !important',
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
  styledTextField: {
    marginBottom: '22px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'transparent !important',
      border: '1.5px solid #fff',
      borderRadius: 14,
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
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
      '&.Mui-focused': {
        color: '#fff',
      },
    },
    '& .MuiInputBase-input': {
      color: '#fff',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    '@media (max-width: 960px)': {
      marginBottom: '20px',
      '& .MuiOutlinedInput-root': {
        borderRadius: 12,
      },
    },
    '@media (max-width: 600px)': {
      marginBottom: '18px',
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
      },
    },
    '@media (max-width: 480px)': {
      marginBottom: '16px',
      '& .MuiOutlinedInput-root': {
        borderRadius: 8,
      },
    },
    '@media (max-width: 375px)': {
      marginBottom: '14px',
    },
  },
  registerButton: {
    width: '100%',
    padding: '13px',
    borderRadius: 14,
    backgroundColor: '#fff !important',
    color: '#111 !important',
    fontSize: '1.08rem',
    fontWeight: 700,
    textTransform: 'none',
    marginBottom: '26px !important',
    marginTop: '26px !important',
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
    '@media (max-width: 960px)': {
      padding: '12px',
      fontSize: '1.04rem',
      borderRadius: 12,
      marginBottom: '24px !important',
      marginTop: '24px !important',
    },
    '@media (max-width: 600px)': {
      padding: '11px',
      fontSize: '1rem',
      borderRadius: 10,
      marginBottom: '22px !important',
      marginTop: '22px !important',
    },
    '@media (max-width: 480px)': {
      padding: '10px',
      fontSize: '0.96rem',
      borderRadius: 8,
      marginBottom: '20px !important',
      marginTop: '20px !important',
    },
    '@media (max-width: 375px)': {
      padding: '9px',
      fontSize: '0.92rem',
      marginBottom: '18px !important',
      marginTop: '18px !important',
    },
  },
  googleButton: {
    width: '100%',
    padding: '13px !important',
    borderRadius: 14,
    border: '0.2px solid #dadce0 !important',
    color: '#ffffff !important',
    textTransform: 'none',
    marginBottom: '14px',
    fontWeight: 600,
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    boxShadow: '0 1px 2px rgba(60,64,67,.08)',
    transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: '#1a73e8',
      borderColor: '#dadce0',
    },
    '&:disabled': {
      backgroundColor: 'transparent',
      color: '#ffffff',
      opacity: 0.7,
    },
    '@media (max-width: 960px)': {
      padding: '12px !important',
      fontSize: '0.96rem',
      borderRadius: 12,
      marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
      padding: '11px !important',
      fontSize: '0.92rem',
      borderRadius: 10,
      gap: '10px',
      marginBottom: '10px',
    },
    '@media (max-width: 480px)': {
      padding: '10px !important',
      fontSize: '0.88rem',
      borderRadius: 8,
      gap: '8px',
      marginBottom: '8px',
    },
    '@media (max-width: 375px)': {
      padding: '9px !important',
      fontSize: '0.84rem',
      gap: '6px',
      marginBottom: '6px',
    },
  },
  divider: {
    position: 'relative',
    margin: '20px 0',
    textAlign: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent)',
    },
    '@media (max-width: 960px)': {
      margin: '18px 0',
    },
    '@media (max-width: 600px)': {
      margin: '16px 0',
    },
    '@media (max-width: 480px)': {
      margin: '14px 0',
    },
    '@media (max-width: 375px)': {
      margin: '12px 0',
    },
  },
  dividerText: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    padding: '0 16px',
    fontSize: '0.9rem',
    fontWeight: 500,
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
      padding: '0 14px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
      padding: '0 12px',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.75rem',
      padding: '0 10px',
    },
  },
  styledLink: {
    color: '#fff !important',
    textDecoration: 'none',
    fontWeight: 600,
    borderBottom: '1px solid transparent',
    transition: 'border-bottom-color 0.2s',
    '&:hover': {
      borderBottomColor: '#fff',
    },
  },
  oauthUnavailable: {
    opacity: 0.5,
    cursor: 'not-allowed !important',
    pointerEvents: 'none',
  },
}));

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { register, loginWithGoogle, isAuthenticated, oauthStatus } = useAuth();
  const navigate = useNavigate();

  // Handle OAuth errors passed via URL params
  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    
    if (error) {
      const errorMessages = {
        'oauth_not_configured': 'Google sign-in is temporarily unavailable. Please try regular registration.',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const result = await register(username, password);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    if (!oauthStatus?.oauth_configured || !oauthStatus?.google_available) {
      setError('Google OAuth is not available. Please try again later or contact support.');
      return;
    }

    try {
      setGoogleLoading(true);
      setError('');
      
      // Initiate Google OAuth flow
      loginWithGoogle();
      
      // Note: User will be redirected to Google, so this component will unmount
      // The callback will be handled by the AuthCallback component
    } catch (error) {
      console.error('Google signup failed:', error);
      setError('Failed to initiate Google signup. Please try again.');
      setGoogleLoading(false);
    }
  };

  // Check if OAuth is available
  const isOAuthAvailable = oauthStatus?.oauth_configured && oauthStatus?.google_available;

  return (
    <>
      <React.Suspense fallback={<div />}>
        <StarField />
      </React.Suspense>
      <Container maxWidth="sm" className={classes.pageContainer}>
        <Fade in timeout={800}>
          <Card className={classes.authCard} style={{ position: 'relative', overflow: 'hidden' }}>
            <Zoom in timeout={1000}>
              <Box>
                <Box className={classes.logoContainer}>
                  <Box className={classes.logoIcon}>
                    <WorkspacePremium 
                      sx={{ color: '#232526', fontSize: 40, filter: 'drop-shadow(0 1px 4px #bbb)' }} 
                      className={classes.logoIconResponsive} 
                    />
                  </Box>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold"
                    className={classes.logoText}
                    sx={{ 
                      color: '#fff',
                      background: 'linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.8) 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitTextFillColor: 'transparent',
                      textAlign: 'center'
                    }}
                  >
                    Character Chat
                  </Typography>
                </Box>

                <Typography 
                  variant="h4" 
                  fontWeight="700"
                  sx={{ 
                    color: '#fff', 
                    marginBottom: 3,
                    textAlign: 'center'
                  }}
                  className={classes.titleText}
                >
                  Create Account
                </Typography>

                <Button
                  fullWidth
                  onClick={handleGoogleSignup}
                  disabled={googleLoading || !isOAuthAvailable}
                  className={`${classes.googleButton} ${!isOAuthAvailable ? classes.oauthUnavailable : ''}`}
                  startIcon={
                    googleLoading ? (
                      <CircularProgress size={20} sx={{ color: '#fff' }} />
                    ) : (
                      <img 
                        src={GoogleLogo} 
                        alt="Google" 
                        style={{ 
                          width: 22, 
                          height: 22, 
                          display: 'block',
                          opacity: !isOAuthAvailable ? 0.5 : 1 
                        }} 
                      />
                    )
                  }
                >
                  {googleLoading ? 'Connecting...' : 'Continue with Google'}
                </Button>

                {!isOAuthAvailable && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#999', 
                      display: 'block', 
                      textAlign: 'center', 
                      mb: 2,
                      fontSize: '0.75rem' 
                    }}
                  >
                    Google Sign-Up temporarily unavailable
                  </Typography>
                )}

                <Box className={classes.divider}>
                  <Typography className={classes.dividerText}>OR</Typography>
                </Box>

                {error && (
                  <Fade in>
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        backgroundColor: 'transparent',
                        border: '1.5px solid #444',
                        color: '#fff',
                        borderRadius: 2,
                        fontWeight: 500,
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    required
                    autoFocus
                    className={classes.styledTextField}
                    disabled={loading}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    className={classes.styledTextField}
                    disabled={loading}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    required
                    className={classes.styledTextField}
                    disabled={loading}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className={classes.registerButton}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <Box textAlign="center">
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Already have an account?{' '}
                      <Link to="/login" className={classes.styledLink}>
                        Sign in
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Zoom>
          </Card>
        </Fade>
      </Container>
    </>
  );
};

export default Register;