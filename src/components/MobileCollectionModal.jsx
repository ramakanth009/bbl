import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Backdrop,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Phone, Close } from '@mui/icons-material';

const useStyles = makeStyles({
  backdrop: {
    transition: 'all 0.3s ease-in-out',
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)', // Add blur effect
    WebkitBackdropFilter: 'blur(8px)', // For Safari
  },
  dialog: {
    '& .MuiDialog-paper': {
      background: 'linear-gradient(135deg, #1f1f23 0%, #171717 100%)',
      border: '1px solid #2a2a2e',
      borderRadius: '16px',
      minWidth: '320px',
      maxWidth: '420px',
      width: '90vw',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.1)',
      padding: '0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
        opacity: 1,
        borderRadius: '16px',
        pointerEvents: 'none',
        zIndex: 1,
      },
      '@media (max-width: 600px)': {
        width: '95vw',
        minWidth: '280px',
        margin: '16px',
        borderRadius: '12px',
        '&::before': {
          borderRadius: '12px',
        },
      },
    },
  },
  dialogContent: {
    padding: '32px !important',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 600px)': {
      padding: '24px !important',
    },
  },
  iconWrapper: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    color: 'white',
    fontSize: '24px',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 30px rgba(99, 102, 241, 0.5)',
    },
  },
  title: {
    margin: '0 0 8px !important',
    color: '#ffffff !important',
    fontSize: '1.5rem !important',
    fontWeight: '600 !important',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important',
    background: 'linear-gradient(90deg, #ffffff 0%, #a0a0a0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    '@media (max-width: 600px)': {
      fontSize: '1.25rem !important',
    },
  },
  subtitle: {
    margin: '0 0 24px !important',
    color: '#a0a0a0 !important',
    fontSize: '0.875rem !important',
    lineHeight: '1.4 !important',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important',
    '@media (max-width: 600px)': {
      fontSize: '0.8125rem !important',
      marginBottom: '20px !important',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: '0.875rem',
      backgroundColor: '#1f1f23',
      transition: 'all 0.2s ease',
      '& fieldset': {
        borderWidth: '1px',
        borderColor: '#2a2a2e',
      },
      '&:hover fieldset': {
        borderColor: '#6366f1',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6366f1',
        borderWidth: '2px',
      },
      '& input': {
        color: '#ffffff',
        padding: '12px 16px',
        '&::placeholder': {
          color: '#666666',
          opacity: 1,
        },
      },
    },
    '& .MuiInputLabel-root': {
      color: '#a0a0a0',
      fontWeight: '500',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '&.Mui-focused': {
        color: '#6366f1',
      },
    },
    '& .MuiFormHelperText-root': {
      color: '#666666 !important',
      fontSize: '0.75rem !important',
      marginTop: '6px !important',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important',
    },
  },
  submitButton: {
    padding: '12px 24px !important',
    fontSize: '0.875rem !important',
    fontWeight: '600 !important',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important',
    borderRadius: '8px !important',
    textTransform: 'none !important',
    transition: 'all 0.2s ease !important',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3) !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%) !important',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4) !important',
    },
    '&:disabled': {
      background: '#666666 !important',
      color: '#a0a0a0 !important',
      transform: 'none !important',
      cursor: 'not-allowed',
      boxShadow: 'none !important',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    color: '#ef4444', // Tailwind red-500
    background: 'rgba(239,68,68,0.08)', // subtle red background
    '&:hover': {
      color: '#fff',
      background: 'rgba(239,68,68,0.25)',
    },
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#ffffff',
  },
  errorAlert: {
    borderRadius: '8px !important',
    backgroundColor: 'rgba(239, 68, 68, 0.1) !important',
    border: '1px solid rgba(239, 68, 68, 0.3) !important',
    color: '#fca5a5 !important',
    '& .MuiAlert-icon': {
      color: '#ef4444 !important',
    },
    '& .MuiAlert-message': {
      fontSize: '0.8125rem',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  },
  noteBox: {
    marginTop: '16px',
    padding: '12px 16px',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '8px',
    fontSize: '0.75rem',
    color: '#fbbf24',
    textAlign: 'left',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    '& strong': {
      color: '#f59e0b',
    },
  },

});

function validateIndianMobile(input) {
  // Accepts: 9876543210, +91 9876543210, 91 9876543210
  let num = input.replace(/\D/g, '');
  if (num.length === 12 && num.startsWith('91')) num = num.slice(2);
  if (num.length === 13 && num.startsWith('91')) num = num.slice(2);
  if (num.length === 10 && /^[6-9]\d{9}$/.test(num)) return num;
  return null;
}

const MobileCollectionModal = ({
  open,
  onSubmit,
  onSkip,
  loading,
  error,
}) => {
  const classes = useStyles();
  const [mobile, setMobile] = useState('');
  const [localError, setLocalError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Add a smooth entrance animation
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validMobile = validateIndianMobile(mobile);
    if (!validMobile) {
      setLocalError('Please enter a valid Indian mobile number (10 digits, starts with 6-9)');
      return;
    }
    setLocalError('');
    await onSubmit(validMobile);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    if (localError) {
      setLocalError('');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        maxWidth={false}
        className={classes.dialog}
        BackdropComponent={Backdrop}
        BackdropProps={{
          className: classes.backdrop,
        }}
        disableEscapeKeyDown
        disableAutoFocus
      >
        <DialogContent className={classes.dialogContent}>
          {/* X Close Button */}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onSkip}
            disabled={loading}
            size="large"
          >
            <Close />
          </IconButton>

          {/* Icon */}
          <Box className={classes.iconWrapper}>
            <Phone />
          </Box>

          {/* Title and subtitle */}
          <Typography variant="h4" component="h2" className={classes.title}>
            Complete Your Profile
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            Please add your mobile number to enhance your experience and unlock premium features
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} className={classes.formContainer}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={mobile}
              onChange={handleMobileChange}
              placeholder="9876543210 or +91 9876543210"
              className={classes.textField}
              helperText="Supports formats: 9876543210, +91 9876543210, or 91 9876543210"
              disabled={loading}
              autoFocus
            />

            {/* Error Alert */}
            {(localError || error) && (
              <Alert severity="error" className={classes.errorAlert}>
                {localError || error}
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className={classes.submitButton}
            >
              {loading ? (
                <Box className={classes.loadingWrapper}>
                  <CircularProgress size={16} color="inherit" />
                  Submitting...
                </Box>
              ) : (
                'Add Mobile Number'
              )}
            </Button>
            {/* REMOVE: Skip Button */}
          </Box>

          {/* Note */}
          <Box className={classes.noteBox}>
            <Typography variant="body2" component="div">
              <strong>Note:</strong> Adding your mobile number helps us provide better support and security features.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileCollectionModal;