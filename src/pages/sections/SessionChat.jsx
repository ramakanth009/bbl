import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import apiService from '../../services/api';

const useStyles = makeStyles({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '16px',
    '@media (max-width: 1200px)': {
      gap: '14px',
      minHeight: '55vh',
    },
    '@media (max-width: 960px)': {
      gap: '12px',
      minHeight: '50vh',
    },
    '@media (max-width: 600px)': {
      gap: '10px',
      minHeight: '45vh',
      padding: '0 16px',
    },
    '@media (max-width: 480px)': {
      gap: '8px',
      minHeight: '40vh',
      padding: '0 12px',
    },
    '@media (max-width: 375px)': {
      gap: '6px',
      minHeight: '35vh',
      padding: '0 8px',
    },
  },
  errorContainer: {
    padding: '40px 20px',
    textAlign: 'center',
    '@media (max-width: 1200px)': {
      padding: '36px 18px',
    },
    '@media (max-width: 960px)': {
      padding: '32px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '28px 14px',
    },
    '@media (max-width: 480px)': {
      padding: '24px 12px',
    },
    '@media (max-width: 375px)': {
      padding: '20px 8px',
    },
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '12px',
    '& .MuiAlert-message': {
      color: '#fecaca',
    },
    '& .MuiAlert-icon': {
      color: '#ef4444',
    },
    '@media (max-width: 960px)': {
      borderRadius: '10px',
    },
    '@media (max-width: 600px)': {
      borderRadius: '8px',
      '& .MuiAlert-message': {
        fontSize: '0.875rem',
      },
    },
    '@media (max-width: 480px)': {
      borderRadius: '6px',
      '& .MuiAlert-message': {
        fontSize: '0.825rem',
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiAlert-message': {
        fontSize: '0.8rem',
      },
    },
  },
  backText: {
    '@media (max-width: 600px)': {
      fontSize: '0.875rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.825rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
    },
  },
  loadingText: {
    '@media (max-width: 600px)': {
      fontSize: '0.875rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.825rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
    },
  },
});

const SessionChat = () => {
  const classes = useStyles();
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  const [sessionData, setSessionData] = useState(null);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      loadSessionData();
    }
  }, [sessionId]);

  const loadSessionData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading session data for:', sessionId);
      
      // Fetch session messages
      const sessionMessages = await apiService.getSessionMessages(sessionId);
      
      // Fetch all sessions to get session metadata
      const allSessions = await apiService.getSessions();
      const currentSession = allSessions.find(s => 
        s.session_id === sessionId || s.session_id === parseInt(sessionId)
      );
      
      if (!currentSession) {
        throw new Error('Session not found');
      }
      
      console.log('Session found:', currentSession);
      console.log('Session messages:', sessionMessages);
      
      // Create character object from session data
      const characterData = {
        name: currentSession.character,
        img: currentSession.img || undefined,
        description: currentSession.description || '',
        native_language: currentSession.native_language || 
                        currentSession.primary_language || 'english',
      };
      
      // Format session data for ChatPanel
      const formattedSessionData = {
        sessionId: currentSession.session_id,
        character: currentSession.character,
        messages: sessionMessages.chat_history || [],
        createdAt: currentSession.created_at,
        ...currentSession
      };
      
      setCharacter(characterData);
      setSessionData(formattedSessionData);
      
    } catch (error) {
      console.error('Failed to load session:', error);
      setError(error.message || 'Failed to load session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseChat = () => {
    // Navigate back to history page
    navigate('/dashboard/history');
  };

  const handleBackToHistory = () => {
    // Navigate back to history page
    navigate('/dashboard/history');
  };

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress sx={{ color: '#6366f1' }} size={40} />
        <Typography variant="body2" sx={{ color: '#9ca3af' }} className={classes.loadingText}>
          Loading session...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.errorContainer}>
        <Alert 
          severity="error" 
          className={classes.errorAlert}
          sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}
        >
          {error}
        </Alert>
        <Typography 
          variant="body2" 
          className={classes.backText}
          sx={{ 
            color: '#9ca3af', 
            cursor: 'pointer',
            '&:hover': { color: '#6366f1' }
          }}
          onClick={handleBackToHistory}
        >
          ← Back to History
        </Typography>
      </Box>
    );
  }

  if (!character || !sessionData) {
    return (
      <Box className={classes.errorContainer}>
        <Alert 
          severity="warning" 
          className={classes.errorAlert}
          sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}
        >
          Session data not found
        </Alert>
        <Typography 
          variant="body2" 
          className={classes.backText}
          sx={{ 
            color: '#9ca3af', 
            cursor: 'pointer',
            '&:hover': { color: '#6366f1' }
          }}
          onClick={handleBackToHistory}
        >
          ← Back to History
        </Typography>
      </Box>
    );
  }

  return (
    <ChatPanel
      open={true}
      character={character}
      onClose={handleCloseChat}
      onBack={handleBackToHistory}
      initialMessages={sessionData.messages}
      initialSessionId={sessionData.sessionId}
    />
  );
};

export default SessionChat;