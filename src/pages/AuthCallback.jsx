// src/pages/AuthCallback.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(true);
  const { handleOAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const result = await handleOAuthCallback();
        
        if (result.success) {
          // Successfully authenticated, redirect to dashboard
          navigate('/dashboard', { replace: true });
        } else {
          // OAuth failed, redirect to login with error
          setError(result.error || 'Authentication failed');
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError('Authentication failed. Please try again.');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      } finally {
        setProcessing(false);
      }
    };

    processCallback();
  }, [handleOAuthCallback, navigate]);

  if (error) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100vh"
        gap={2}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body2" color="text.secondary">
          Redirecting to login...
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress size={48} />
      <Typography variant="h6" color="text.primary">
        {processing ? 'Completing sign in...' : 'Redirecting...'}
      </Typography>
    </Box>
  );
};

export default AuthCallback;
