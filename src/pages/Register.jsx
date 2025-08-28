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

    justifyContent: "flex-end",

    position: "relative",

    zIndex: 1,

    padding: "24px",

    "@media (max-width: 1200px)": {
      justifyContent: "center",

      padding: "20px",
    },

    "@media (max-width: 960px)": {
      padding: "16px",
    },

    "@media (max-width: 600px)": {
      padding: "12px",

      minHeight: "100vh",
    },

    "@media (max-width: 480px)": {
      padding: "8px",
    },

    "@media (max-width: 375px)": {
      padding: "4px",
    },
  },

  authCard: {
    width: "100%",

    maxWidth: 440,

    padding: "36px 36px 32px 36px",

    background: "none !important",

    backgroundColor: "transparent !important",

    border: "none !important",

    borderRadius: 28,

    boxShadow: "none !important",

    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",

    position: "relative",

    overflow: "hidden",

    "@media (max-width: 1200px)": {
      maxWidth: 400,

      padding: "32px 32px 28px 32px",
    },

    "@media (max-width: 960px)": {
      maxWidth: 380,

      padding: "28px 28px 24px 28px",

      borderRadius: 24,
    },

    "@media (max-width: 600px)": {
      maxWidth: "100%",

      padding: "24px 24px 20px 24px",

      borderRadius: 20,
    },

    "@media (max-width: 480px)": {
      padding: "20px 20px 16px 20px",

      borderRadius: 16,
    },

    "@media (max-width: 375px)": {
      padding: "16px 16px 12px 16px",

      borderRadius: 12,
    },
  },

  logoContainer: {
    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "18px",

    marginBottom: "36px",

    "@media (max-width: 960px)": {
      gap: "16px",

      marginBottom: "32px",
    },

    "@media (max-width: 600px)": {
      gap: "14px",

      marginBottom: "28px",

      flexDirection: "column",
    },

    "@media (max-width: 480px)": {
      gap: "12px",

      marginBottom: "24px",
    },

    "@media (max-width: 375px)": {
      gap: "10px",

      marginBottom: "20px",
    },
  },

  logoIcon: {
    width: 52,

    height: 52,

    backgroundColor: "#fff !important",

    borderRadius: 14,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    boxShadow: "0 8px 32px rgba(255,255,255,0.10)",

    "@media (max-width: 960px)": {
      width: 48,

      height: 48,

      borderRadius: 12,
    },

    "@media (max-width: 600px)": {
      width: 44,

      height: 44,

      borderRadius: 10,
    },

    "@media (max-width: 480px)": {
      width: 40,

      height: 40,

      borderRadius: 8,
    },

    "@media (max-width: 375px)": {
      width: 36,

      height: 36,
    },
  },

  styledTextField: {
    marginBottom: "22px",

    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent !important",

      border: "1.5px solid #fff",

      borderRadius: 14,

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

      "&.Mui-focused": {
        color: "#fff",
      },
    },

    "& .MuiInputBase-input": {
      color: "#fff",

      fontWeight: 500,

      letterSpacing: "0.02em",
    },

    "@media (max-width: 960px)": {
      marginBottom: "20px",

      "& .MuiOutlinedInput-root": {
        borderRadius: 12,
      },
    },

    "@media (max-width: 600px)": {
      marginBottom: "18px",

      "& .MuiOutlinedInput-root": {
        borderRadius: 10,
      },
    },

    "@media (max-width: 480px)": {
      marginBottom: "16px",

      "& .MuiOutlinedInput-root": {
        borderRadius: 8,
      },
    },

    "@media (max-width: 375px)": {
      marginBottom: "14px",
    },
  },

  registerButton: {
    width: "100%",

    padding: "13px",

    borderRadius: 14,

    backgroundColor: "#fff !important",

    color: "#111 !important",

    fontSize: "1.08rem",

    fontWeight: 700,

    textTransform: "none",

    marginBottom: "26px !important",

    marginTop: "26px !important",

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

    "@media (max-width: 960px)": {
      padding: "12px",

      fontSize: "1.04rem",

      borderRadius: 12,

      marginBottom: "24px !important",

      marginTop: "24px !important",
    },

    "@media (max-width: 600px)": {
      padding: "11px",

      fontSize: "1rem",

      borderRadius: 10,

      marginBottom: "22px !important",

      marginTop: "22px !important",
    },

    "@media (max-width: 480px)": {
      padding: "10px",

      fontSize: "0.96rem",

      borderRadius: 8,

      marginBottom: "20px !important",

      marginTop: "20px !important",
    },

    "@media (max-width: 375px)": {
      padding: "9px",

      fontSize: "0.92rem",

      marginBottom: "18px !important",

      marginTop: "18px !important",
    },
  },

  googleButton: {
    width: "100%",

    padding: "13px !important",

    borderRadius: 14,

    border: "0.2px solid #dadce0 !important",

    color: "#ffffff !important",

    textTransform: "none",

    marginBottom: "14px",

    fontWeight: 600,

    fontSize: "1rem",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "12px",

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

    "@media (max-width: 960px)": {
      padding: "12px !important",

      fontSize: "0.96rem",

      borderRadius: 12,

      gap: "10px",
    },

    "@media (max-width: 600px)": {
      padding: "11px !important",

      fontSize: "0.92rem",

      borderRadius: 10,

      gap: "8px",
    },

    "@media (max-width: 480px)": {
      padding: "10px !important",

      fontSize: "0.88rem",

      borderRadius: 8,

      gap: "6px",
    },

    "@media (max-width: 375px)": {
      padding: "9px !important",

      fontSize: "0.84rem",

      gap: "4px",
    },
  },

  divider: {
    display: "flex",

    alignItems: "center",

    margin: "28px 0",

    "&::before, &::after": {
      content: '""',

      flex: 1,

      height: 1,

      background: "linear-gradient(90deg, #222 0%, #444 100%)",
    },

    "@media (max-width: 960px)": {
      margin: "24px 0",
    },

    "@media (max-width: 600px)": {
      margin: "20px 0",
    },

    "@media (max-width: 480px)": {
      margin: "18px 0",
    },

    "@media (max-width: 375px)": {
      margin: "16px 0",
    },
  },

  dividerText: {
    padding: "0 18px",

    color: "#888",

    fontSize: "0.92rem",

    fontWeight: 500,

    letterSpacing: "0.03em",

    "@media (max-width: 960px)": {
      padding: "0 16px",

      fontSize: "0.9rem",
    },

    "@media (max-width: 600px)": {
      padding: "0 14px",

      fontSize: "0.88rem",
    },

    "@media (max-width: 480px)": {
      padding: "0 12px",

      fontSize: "0.86rem",
    },

    "@media (max-width: 375px)": {
      padding: "0 10px",

      fontSize: "0.84rem",
    },
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
    "@media (max-width: 960px)": {
      fontSize: "1.9rem !important",
    },

    "@media (max-width: 600px)": {
      fontSize: "1.7rem !important",
    },

    "@media (max-width: 480px)": {
      fontSize: "1.5rem !important",
    },

    "@media (max-width: 375px)": {
      fontSize: "1.3rem !important",
    },
  },

  logoText: {
    "@media (max-width: 960px)": {
      fontSize: "1.3rem !important",
    },

    "@media (max-width: 600px)": {
      fontSize: "1.2rem !important",

      textAlign: "center",
    },

    "@media (max-width: 480px)": {
      fontSize: "1.1rem !important",
    },

    "@media (max-width: 375px)": {
      fontSize: "1rem !important",
    },
  },

  logoIconResponsive: {
    "@media (max-width: 960px)": {
      fontSize: "36px !important",
    },

    "@media (max-width: 600px)": {
      fontSize: "32px !important",
    },

    "@media (max-width: 480px)": {
      fontSize: "28px !important",
    },

    "@media (max-width: 375px)": {
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
}));

const Register = () => {
  const classes = useStyles();

  // UPDATED: Added new state variables for email and mobile

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
    // Handle OAuth errors passed via URL params

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

  // NEW: Email validation function

  const validateEmail = (email) => {
    const regex = /^[\w.\-]+@[\w\-]+\.[\w.]{2,}$/;

    return regex.test(email);
  };

  // NEW: Mobile number validation function

  const validateMobile = (mobile) => {
    // Remove spaces and country code prefixes

    const normalized = mobile.replace(/\s+/g, "").replace(/^(\+91|91)/, "");

    // Check for 10-digit number starting with 6-9

    const regex = /^[6-9]\d{9}$/;

    return regex.test(normalized);
  };

  // UPDATED: Handle form submission with new fields

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all required fields

    if (!username || !email || !mobileNumber || !password || !confirmPassword) {
      setError("All fields are required");

      return;
    }

    // Validate email format

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");

      return;
    }

    // Validate mobile number

    if (!validateMobile(mobileNumber)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
      );

      return;
    }

    // Check password match

    if (password !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    // Check password length

    if (password.length < 6) {
      setError("Password must be at least 6 characters");

      return;
    }

    setLoading(true);

    setError("");

    // UPDATED: Call register with all four fields

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
      setError(
        "Google OAuth is not available. Please try again later or contact support."
      );

      return;
    }

    try {
      setGoogleLoading(true);

      setError("");

      // Initiate Google OAuth flow

      loginWithGoogle();

      // Note: User will be redirected to Google, so this component will unmount

      // The callback will be handled by the AuthCallback component
    } catch (error) {
      console.error("Google registration failed:", error);

      setError("Failed to initiate Google registration. Please try again.");

      setGoogleLoading(false);
    }
  };

  // Check if OAuth is available

  const isOAuthAvailable =
    oauthStatus?.oauth_configured && oauthStatus?.google_available;

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
                      fontSize: 40,

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

                    background:
                      "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",

                    backgroundClip: "text",

                    WebkitBackgroundClip: "text",

                    color: "transparent",

                    fontSize: "1.4rem",
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

                marginBottom: "8px",

                fontSize: "2rem",
              }}
            >
              Create your account
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",

                color: "#ccc",

                marginBottom: "32px",

                fontSize: "1rem",

                fontWeight: 500,
              }}
            >
              Join the legendary conversations
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{ marginBottom: "24px", borderRadius: "12px" }}
              >
                {error}
              </Alert>
            )}

            {/* Social Login Buttons */}

            <Button
              className={`${classes.googleButton} ${
                !isOAuthAvailable ? classes.oauthUnavailable : ""
              }`}
              onClick={handleGoogleRegister}
              disabled={googleLoading || !isOAuthAvailable}
              startIcon={
                googleLoading ? (
                  <CircularProgress size={20} sx={{ color: "inherit" }} />
                ) : (
                  <img
                    src={GoogleLogo}
                    alt="Google"
                    style={{
                      width: "20px",

                      height: "20px",
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

                  fontSize: "0.8rem",

                  marginBottom: "16px",
                }}
              >
                Google Sign-In temporarily unavailable
              </Typography>
            )}

            <Box className={classes.divider}>
              <Typography className={classes.dividerText}>OR</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Username"
                type="text"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                autoFocus
                className={classes.styledTextField}
                disabled={loading}
                helperText="3-50 characters, letters, numbers, dots, underscores, hyphens allowed"
                sx={{
                  "& .MuiFormHelperText-root": {
                    color: "#aaa",

                    fontSize: "0.75rem",
                  },
                }}
              />

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                margin="normal"
                required
                className={classes.styledTextField}
                disabled={loading}
                helperText="Valid email format required"
                sx={{
                  "& .MuiFormHelperText-root": {
                    color: "#aaa",

                    fontSize: "0.75rem",
                  },
                }}
              />

              <TextField
                label="Mobile Number"
                type="tel"
                fullWidth
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                margin="normal"
                required
                className={classes.styledTextField}
                disabled={loading}
                helperText="10-digit Indian mobile number (6-9 prefix). Formats: 9876543210, +91 9876543210"
                sx={{
                  "& .MuiFormHelperText-root": {
                    color: "#aaa",

                    fontSize: "0.75rem",
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                className={classes.styledTextField}
                disabled={loading}
                helperText="Minimum 6 characters"
                sx={{
                  "& .MuiFormHelperText-root": {
                    color: "#aaa",

                    fontSize: "0.75rem",
                  },
                }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                className={classes.styledTextField}
                disabled={loading}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.registerButton}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} sx={{ color: "inherit" }} />
                  ) : null
                }
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",

                color: "#ccc",

                fontSize: "0.95rem",
              }}
            >
              Already have an account?{" "}
              <Link to="/login" className={classes.styledLink}>
                Sign in
              </Link>
            </Typography>
          </Card>
        </Fade>
      </Container>
    </>
  );
};

export default Register;
