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
  Grid,
} from "@mui/material";
import { WorkspacePremium } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../context/AuthContext";
import GoogleLogo from "../assets/google-logo.svg";

const StarField = React.lazy(() => import("../components/common/StarField"));

const useStyles = makeStyles(() => ({
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    padding: "16px",
    "@media (max-height: 800px)": {
      padding: "8px",
    },
    "@media (max-height: 700px)": {
      padding: "4px",
    },
  },

  authCard: {
    width: "100%",
    maxWidth: 900, // Increased for side-by-side layout
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
      border: "1.5px solid #fff",
      borderRadius: 12,
      height: "48px", // Fixed height for consistency
      transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
      "& fieldset": {
        border: "none",
      },
      "&:hover": {
        backgroundColor: "transparent",
        border: "1.5px solid #fff",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        border: "1.5px solid #fff",
        boxShadow: "0 0 0 4px rgba(255,255,255,0.08)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
      fontSize: "0.9rem",
      "&.Mui-focused": {
        color: "#fff",
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
}));

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, loginWithGoogle, isAuthenticated, oauthStatus } = useAuth();
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

  const validateEmail = (email) => {
    const regex = /^[\w.\-]+@[\w\-]+\.[\w.]{2,}$/;
    return regex.test(email);
  };

  const validateMobile = (mobile) => {
    const normalized = mobile.replace(/\s+/g, "").replace(/^(\+91|91)/, "");
    const regex = /^[6-9]\d{9}$/;
    return regex.test(normalized);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !mobileNumber || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!validateMobile(mobileNumber)) {
      setError("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    const result = await register(username, email, mobileNumber, password);
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    if (!oauthStatus?.oauth_configured || !oauthStatus?.google_available) {
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

  const isOAuthAvailable = oauthStatus?.oauth_configured && oauthStatus?.google_available;

  return (
    <>
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
                  Bring Back Legends
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

            <Button
              className={`${classes.googleButton} ${
                !isOAuthAvailable ? classes.oauthUnavailable : ""
              }`}
              onClick={handleGoogleRegister}
              disabled={googleLoading || !isOAuthAvailable}
              startIcon={
                googleLoading ? (
                  <CircularProgress size={18} sx={{ color: "inherit" }} />
                ) : (
                  <img
                    src={GoogleLogo}
                    alt="Google"
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                )
              }
            >
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </Button>

            {!isOAuthAvailable && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "center",
                  color: "#888",
                  fontSize: "0.75rem",
                  marginBottom: "12px",
                }}
              >
                Google Sign-In temporarily unavailable
              </Typography>
            )}

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
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                    className={classes.styledTextField}
                    disabled={loading}
                    helperText="3-50 characters allowed"
                  />

                  <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                    className={classes.styledTextField}
                    disabled={loading}
                    helperText="Valid email format required"
                  />

                  <TextField
                    label="Mobile Number"
                    type="tel"
                    fullWidth
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className={classes.styledTextField}
                    disabled={loading}
                    helperText="10-digit Indian mobile (6-9 prefix)"
                  />
                </div>

                <div className={classes.rightColumn}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={classes.styledTextField}
                    disabled={loading}
                    helperText="Minimum 6 characters"
                  />

                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={classes.styledTextField}
                    disabled={loading}
                    helperText="Must match password"
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
    </>
  );
};

export default Register;