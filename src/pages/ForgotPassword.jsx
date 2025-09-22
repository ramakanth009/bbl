import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import {
  ArrowBack,
  WorkspacePremium,
  Email,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import apiService from '../services/api';
import AuthFooter from '../components/common/AuthFooter';
import AuthHeader from '../components/common/AuthHeader';

const StarField = React.lazy(() => import('../components/common/StarField'));

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
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
      fontSize: '0.9rem',
      '&.Mui-focused': {
        color: '#fff',
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
  submitButton: {
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
  backButton: {
    width: '100%',
    padding: '11px !important',
    borderRadius: 12,
    border: '1.5px solid #fff !important',
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
      boxShadow: '0 2px 4px rgba(60,64,67,.13)',
    },
    '@media (max-height: 700px)': {
      padding: '9px !important',
      fontSize: '0.85rem',
      marginBottom: '12px',
    },
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
  // Footer styles (fixed at bottom)
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

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await apiService.forgotPassword(email);
      setSuccess(result.message || 'If your email is registered, you\'ll receive a password reset link shortly.');
      setEmail(''); // Clear email field on success
    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Box className={classes.appRoot}>
      <React.Suspense fallback={<div />}>
        <StarField />
      </React.Suspense>
      <AuthHeader />
      
      <Container maxWidth="sm" className={classes.pageContainer}>
        <Fade in timeout={800}>
          <Card className={classes.authCard} style={{ position: 'relative', overflow: 'hidden' }}>
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
                  Reset Password
                </Typography>
                
                <Typography 
                  variant="body1" 
                  align="center" 
                  sx={{ 
                    color: '#fff',
                    mb: 4,
                    opacity: 0.9,
                  }}
                >
                  Enter your email address and we'll send you a link to reset your password
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

                {success && (
                  <Fade in>
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 3,
                        backgroundColor: 'transparent',
                        border: '1.5px solid #4caf50',
                        color: '#4caf50',
                        borderRadius: 2,
                        fontWeight: 500,
                      }}
                      icon={<Email sx={{ color: '#4caf50' }} />}
                    >
                      {success}
                    </Alert>
                  </Fade>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    autoFocus
                    className={classes.styledTextField}
                    disabled={loading}
                    helperText="We'll send a password reset link to this email"
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className={classes.submitButton}
                    startIcon={loading ? <CircularProgress size={20} sx={{ color: '#111' }} /> : null}
                  >
                    {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                  </Button>

                  <Button
                    onClick={handleBackToLogin}
                    className={classes.backButton}
                    disabled={loading}
                    startIcon={<ArrowBack />}
                  >
                    Back to Sign In
                  </Button>

                  <Box textAlign="center">
                    <Typography 
                      variant="body2" 
                      sx={{ color: '#fff', opacity: 0.8 }}
                    >
                      Remember your password?{' '}
                      <Link to="/login" className={classes.styledLink}>
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
          </Card>
        </Fade>
      </Container>
      {/* Footer */}
      <AuthFooter />
    </Box>
  );
};

export default ForgotPassword;
