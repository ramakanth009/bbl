import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  WorkspacePremium,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../../context/AuthContext";
import GoogleLogo from "../../assets/google-logo.svg";
import apiService from "../../services/api";
import AuthFooter from "../../components/common/AuthFooter";
import AuthHeader from "../../components/common/AuthHeader";
 
const StarField = React.lazy(() => import("../../components/common/StarField"));

const useStyles = makeStyles(() => ({
  appRoot: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    padding: "16px",
    paddingBottom: '72px',
    "@media (max-height: 800px)": {
      padding: "8px",
    },
    "@media (max-height: 700px)": {
      padding: "4px",
      paddingBottom: '64px',
    },
  },

  authCard: {
    width: "100%",
    maxWidth: 900,
    padding: "24px",
    background: "none !important",
    backgroundColor: "transparent !important",
    border: "none !important",
    borderRadius: 24,
    boxShadow: "none !important",
    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
    position: "relative",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      maxWidth: 500,
      padding: "20px",
    },
    "@media (max-width: 600px)": {
      maxWidth: "100%",
      padding: "16px",
      borderRadius: 20,
    },
    "@media (max-height: 700px)": {
      padding: "16px",
    },
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "24px",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "12px",
      marginBottom: "20px",
    },
    "@media (max-height: 700px)": {
      marginBottom: "16px",
    },
  },

  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#fff !important",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 32px rgba(255,255,255,0.10)",
    "@media (max-width: 600px)": {
      width: 36,
      height: 36,
    },
  },

  formContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "16px",
    },
    "@media (max-height: 700px)": {
      gap: "12px",
      marginBottom: "16px",
    },
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
  },

  styledTextField: {
    marginBottom: "16px",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent !important",
      borderRadius: 12,
      height: "48px",
      transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
      "& fieldset": {
        border: "1.5px solid #fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
        boxShadow: "0 0 0 4px rgba(255,255,255,0.08)",
      },
      "&.Mui-error fieldset": {
        borderColor: "#f44336 !important",
        boxShadow: "0 0 0 4px rgba(244, 67, 54, 0.08) !important",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
      fontSize: "0.9rem",
      "&.Mui-focused": {
        color: "#fff",
      },
      "&.Mui-error": {
        color: "#f44336",
      },
    },
    "& .MuiInputBase-input": {
      color: "#fff",
      fontWeight: 500,
      letterSpacing: "0.02em",
      fontSize: "0.9rem",
    },
    "& .MuiFormHelperText-root": {
      color: "#aaa",
      fontSize: "0.7rem",
      marginTop: "4px",
      "&.Mui-error": {
        color: "#f44336",
      },
    },
    "@media (max-height: 700px)": {
      marginBottom: "12px",
      "& .MuiOutlinedInput-root": {
        height: "44px",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "0.65rem",
      },
    },
  },

  registerButton: {
    width: "100%",
    padding: "12px",
    borderRadius: 12,
    backgroundColor: "#fff !important",
    color: "#111 !important",
    fontSize: "1rem",
    fontWeight: 700,
    textTransform: "none",
    marginBottom: "20px !important",
    marginTop: "8px !important",
    boxShadow: "0 8px 32px rgba(255,255,255,0.10)",
    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
    "&:hover": {
      color: "#000",
      transform: "translateY(-2px) scale(1.01)",
      boxShadow: "0 12px 40px rgba(255,255,255,0.13)",
    },
    "&:disabled": {
      background: "transparent !important",
      color: "#fff !important",
    },
    "@media (max-height: 700px)": {
      padding: "10px",
      fontSize: "0.9rem",
      marginBottom: "16px !important",
    },
  },

  googleButton: {
    width: "100%",
    padding: "11px !important",
    borderRadius: 12,
    border: "0.2px solid #dadce0 !important",
    color: "#ffffff !important",
    textTransform: "none",
    marginBottom: "16px",
    fontWeight: 600,
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 1px 2px rgba(60,64,67,.08)",
    transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.05)",
      color: "#1a73e8",
      boxShadow: "0 2px 4px rgba(60,64,67,.13)",
    },
    "&:active": {
      background: "#ececec",
    },
    "&:focus": {
      outline: "2px solid #4285F4",
      outlineOffset: "2px",
    },
    "@media (max-height: 700px)": {
      padding: "9px !important",
      fontSize: "0.85rem",
      marginBottom: "12px",
    },
  },

  divider: {
    display: "flex",
    alignItems: "center",
    margin: "16px 0",
    "&::before, &::after": {
      content: '""',
      flex: 1,
      height: 1,
      background: "linear-gradient(90deg, #222 0%, #444 100%)",
    },
    "@media (max-height: 700px)": {
      margin: "12px 0",
    },
  },

  dividerText: {
    padding: "0 16px",
    color: "#888",
    fontSize: "0.85rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
  },

  styledLink: {
    color: "#fff",
    textDecoration: "underline",
    fontWeight: 600,
    transition: "color 0.3s",
    "&:hover": {
      color: "#fff",
    },
  },

  titleText: {
    fontSize: "1.6rem !important",
    "@media (max-width: 600px)": {
      fontSize: "1.4rem !important",
    },
    "@media (max-height: 700px)": {
      fontSize: "1.3rem !important",
    },
  },

  logoText: {
    fontSize: "1.2rem !important",
    "@media (max-width: 600px)": {
      fontSize: "1.1rem !important",
      textAlign: "center",
    },
    "@media (max-height: 700px)": {
      fontSize: "1rem !important",
    },
  },

  logoIconResponsive: {
    fontSize: "28px !important",
    "@media (max-width: 600px)": {
      fontSize: "24px !important",
    },
  },

  oauthUnavailable: {
    opacity: 0.7,
    cursor: "not-allowed",
    "&:hover": {
      backgroundColor: "transparent !important",
      color: "#fff !important",
      boxShadow: "none !important",
    },
  },

  compactAlert: {
    marginBottom: "16px",
    borderRadius: "10px",
    fontSize: "0.85rem",
    "& .MuiAlert-message": {
      fontSize: "0.85rem",
    },
  },

  compactTypography: {
    fontSize: "0.9rem",
    marginBottom: "16px",
    "@media (max-height: 700px)": {
      fontSize: "0.85rem",
      marginBottom: "12px",
    },
  },

  bottomSection: {
    marginTop: "auto",
  },

  oauthStatusMessage: {
    fontSize: '0.75rem',
    color: '#999',
    textAlign: 'center',
    marginBottom: '12px',
    minHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  copyright: {
    color: "#fff",
    opacity: 0.8,
    fontSize: "0.875rem",
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  },
  footerContainer: {
    width: '100%',
    padding: '12px 16px',
    position: 'fixed',
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    background: 'transparent',
  },
  footerInner: {
    width: '100%',
    maxWidth: 960,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
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
    fontSize: '0.875rem',
    opacity: 0.8,
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 1,
      textDecoration: 'underline',
    },
  },
}));

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [googleLoading, setGoogleLoading] = useState(false);
  
  // Field-specific error states
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  
  // Track validation states to avoid repeated checks
  const [fieldValidated, setFieldValidated] = useState({
    username: false,
    email: false,
    mobileNumber: false,
    password: false,
    confirmPassword: false,
  });

  const { register, loginWithGoogle, isAuthenticated, oauthStatus, oauthStatusLoading, isOAuthReady, getOAuthStatusMessage } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    if (error) {
      const errorMessages = {
        oauth_not_configured:
          "Google sign-in is temporarily unavailable. Please try regular registration.",
        authentication_failed:
          "Google authentication failed. Please try again.",
        user_info_failed: "Failed to get user information from Google.",
        access_denied: "Google access was denied. Please try again.",
      };
      setError(errorMessages[error] || message || "Authentication failed");
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Helper function to clear field error
  const clearFieldError = (fieldName) => {
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: ""
    }));
    setFieldValidated(prev => ({
      ...prev,
      [fieldName]: false
    }));
  };

  // Helper function to set field error
  const setFieldError = (fieldName, errorMessage) => {
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
    setFieldValidated(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  // Frontend validation based on backend requirements (NO API CALLS)
  const validateField = (fieldName, value) => {
    if (!value || value.trim() === "") {
      setFieldError(fieldName, "This field is required");
      return false;
    }

    switch (fieldName) {
      case 'username':
        // Backend validation: 3-50 characters, alphanumeric + dots, underscores, hyphens
        if (value.length < 3) {
          setFieldError(fieldName, 'Username should have at least 3 characters');
          return false;
        }
        if (value.length > 50) {
          setFieldError(fieldName, 'Username should have at most 50 characters');
          return false;
        }
        if (!/^[a-zA-Z0-9._-]+$/.test(value)) {
          setFieldError(fieldName, 'Username can only contain letters, numbers, dots, underscores, and hyphens');
          return false;
        }
        break;
        
      case 'email':
        // Backend validation: Valid email format, converted to lowercase
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          setFieldError(fieldName, 'Please enter a valid email address');
          return false;
        }
        break;
        
      case 'mobileNumber':
        // Backend validation: 10-digit Indian mobile number (6-9 prefix)
        const normalized = value.replace(/\s+/g, "").replace(/^(\+91|91)/, "");
        if (!/^[6-9]\d{9}$/.test(normalized)) {
          setFieldError(fieldName, 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9');
          return false;
        }
        break;
        
      case 'password':
        // Backend validation: Minimum 6 characters, maximum 100 characters
        if (value.length < 6) {
          setFieldError(fieldName, 'String should have at least 6 characters');
          return false;
        }
        if (value.length > 100) {
          setFieldError(fieldName, 'String should have at most 100 characters');
          return false;
        }
        break;
        
      default:
        break;
    }
    
    clearFieldError(fieldName);
    setFieldValidated(prev => ({
      ...prev,
      [fieldName]: true
    }));
    return true;
  };

  // Handle field blur (when user moves away from field) - NO API CALLS
  const handleFieldBlur = (fieldName, value) => {
    validateField(fieldName, value);
  };

  // Handle password confirmation validation
  const handleConfirmPasswordBlur = (value) => {
    if (!value) {
      setFieldError('confirmPassword', 'Please confirm your password');
    } else if (value !== password) {
      setFieldError('confirmPassword', 'Passwords do not match');
    } else {
      clearFieldError('confirmPassword');
    }
  };

  // Handle form submission with frontend validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");
    
    // Reset all field errors
    setFieldErrors({
      username: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
    
    // Validate all fields
    const isUsernameValid = validateField('username', username);
    const isEmailValid = validateField('email', email);
    const isMobileValid = validateField('mobileNumber', mobileNumber);
    const isPasswordValid = validateField('password', password);
    const isConfirmPasswordValid = password === confirmPassword && confirmPassword !== '';
    
    // Set confirm password error if needed
    if (!isConfirmPasswordValid) {
      setFieldError('confirmPassword', 'Passwords do not match');
    } else {
      clearFieldError('confirmPassword');
    }
    
    // If any validation fails, stop submission
    if (!isUsernameValid || !isEmailValid || !isMobileValid || !isPasswordValid || !isConfirmPasswordValid) {
      setLoading(false);
      setError("Please fill in all required fields correctly.");
      return;
    }

    try {
      const result = await register(username, email, mobileNumber, password);
      if (result.success) {
        navigate("/login");
      } else {
        // Parse backend error and map to specific fields if possible
        const errorMessage = result.error || 'Registration failed';
        
        // Try to map error to specific field
        if (errorMessage.toLowerCase().includes('username')) {
          setFieldError('username', errorMessage);
        } else if (errorMessage.toLowerCase().includes('email')) {
          setFieldError('email', errorMessage);
        } else if (errorMessage.toLowerCase().includes('mobile') || errorMessage.toLowerCase().includes('phone')) {
          setFieldError('mobileNumber', errorMessage);
        } else if (errorMessage.toLowerCase().includes('password')) {
          setFieldError('password', errorMessage);
        } else {
          // Show general error if we can't map to specific field
          setError(errorMessage);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (oauthStatusLoading) {
      setError('Please wait while we check Google sign-in availability.');
      return;
    }

    if (!isOAuthReady()) {
      setError("Google OAuth is not available. Please try again later or contact support.");
      return;
    }
    
    try {
      setGoogleLoading(true);
      setError("");
      loginWithGoogle();
    } catch (error) {
      console.error("Google registration failed:", error);
      setError("Failed to initiate Google registration. Please try again.");
      setGoogleLoading(false);
    }
  };

  const oauthStatusMessage = getOAuthStatusMessage();
  const showGoogleButton = !oauthStatusLoading;
  const isGoogleAvailable = isOAuthReady();

  return (
    <Box className={classes.appRoot}>
      <React.Suspense
        fallback={
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
              zIndex: -1,
            }}
          >
            <CircularProgress size={40} sx={{ color: "#fff" }} />
          </Box>
        }
      >
        <StarField />
      </React.Suspense>
      <AuthHeader />

      <Container component="main" className={classes.pageContainer}>
        <Fade in timeout={800}>
          <Card className={classes.authCard}>
            <Zoom in timeout={600}>
              <div className={classes.logoContainer}>
                <Box className={classes.logoIcon}>
                  <WorkspacePremium
                    className={classes.logoIconResponsive}
                    sx={{
                      fontSize: 32,
                      color: "#000",
                    }}
                  />
                </Box>
                <Typography
                  variant="h4"
                  component="h1"
                  className={classes.logoText}
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  GigaSpace
                </Typography>
              </div>
            </Zoom>

            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.titleText}
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              Create your account
            </Typography>

            <Typography
              variant="body1"
              className={classes.compactTypography}
              sx={{
                textAlign: "center",
                color: "#ccc",
                fontWeight: 500,
              }}
            >
              Join the legendary conversations
            </Typography>

            {error && (
              <Alert severity="error" className={classes.compactAlert}>
                {error}
              </Alert>
            )}

            {/* Google OAuth Section */}
            {showGoogleButton && (
              <Button
                className={`${classes.googleButton} ${!isGoogleAvailable ? classes.oauthUnavailable : ""}`}
                onClick={handleGoogleRegister}
                disabled={googleLoading || !isGoogleAvailable || oauthStatusLoading}
                disableElevation
                startIcon={
                  googleLoading ? (
                    <CircularProgress size={18} sx={{ color: "inherit" }} />
                  ) : oauthStatusLoading ? (
                    <CircularProgress size={18} sx={{ color: "inherit" }} />
                  ) : (
                    <img
                      src={GoogleLogo}
                      alt="Google"
                      style={{
                        width: "18px",
                        height: "18px",
                        opacity: isGoogleAvailable ? 1 : 0.5
                      }}
                    />
                  )
                }
              >
                {googleLoading ? "Connecting..." : oauthStatusLoading ? "Loading..." : "Continue with Google"}
              </Button>
            )}

            {/* OAuth Status Message */}
            <Box className={classes.oauthStatusMessage}>
              {oauthStatusMessage && (
                <Typography variant="caption">
                  {oauthStatusMessage}
                </Typography>
              )}
            </Box>

            <Box className={classes.divider}>
              <Typography className={classes.dividerText}>OR</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <div className={classes.formContainer}>
                <div className={classes.leftColumn}>
                  <TextField
                    label="Username"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (fieldErrors.username) {
                        clearFieldError('username');
                      }
                    }}
                    onBlur={() => handleFieldBlur('username', username)}
                    className={classes.styledTextField}
                    disabled={loading}
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                    placeholder="Unique username (3-50 chars)"
                  />

                  <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.toLowerCase());
                      if (fieldErrors.email) {
                        clearFieldError('email');
                      }
                    }}
                    onBlur={() => handleFieldBlur('email', email)}
                    className={classes.styledTextField}
                    disabled={loading}
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
                    placeholder="you@example.com"
                  />

                  <TextField
                    label="Mobile Number"
                    type="tel"
                    fullWidth
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (fieldErrors.mobileNumber) {
                        clearFieldError('mobileNumber');
                      }
                    }}
                    onBlur={() => handleFieldBlur('mobileNumber', mobileNumber)}
                    className={classes.styledTextField}
                    disabled={loading}
                    error={!!fieldErrors.mobileNumber}
                    helperText={fieldErrors.mobileNumber}
                    placeholder="10-digit Indian number"
                  />
                </div>

                <div className={classes.rightColumn}>
                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) {
                        clearFieldError('password');
                      }
                      if (fieldErrors.confirmPassword && confirmPassword && e.target.value === confirmPassword) {
                        clearFieldError('confirmPassword');
                      }
                    }}
                    onBlur={() => handleFieldBlur('password', password)}
                    className={classes.styledTextField}
                    disabled={loading}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                    placeholder="6-100 characters"
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
                  />

                  <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword) {
                        clearFieldError('confirmPassword');
                      }
                    }}
                    onBlur={() => handleConfirmPasswordBlur(confirmPassword)}
                    className={classes.styledTextField}
                    disabled={loading}
                    error={!!fieldErrors.confirmPassword}
                    helperText={fieldErrors.confirmPassword}
                    placeholder="Repeat password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: '#fff' }}
                            disabled={loading}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.registerButton}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} sx={{ color: "inherit" }} />
                  ) : null
                }
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </Box>

            <div className={classes.bottomSection}>
              <Typography
                variant="body2"
                className={classes.compactTypography}
                sx={{
                  textAlign: "center",
                  color: "#ccc",
                  marginBottom: "0px !important",
                }}
              >
                Already have an account?{" "}
                <Link to="/login" className={classes.styledLink}>
                  Sign in
                </Link>
              </Typography>
            </div>
          </Card>
        </Fade>
      </Container>
      
      {/* Footer */}
      <AuthFooter />
    </Box>
  );
};

export default Register;