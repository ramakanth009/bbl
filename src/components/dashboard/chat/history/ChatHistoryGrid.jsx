import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Chat,
  MoreVert,
  Delete,
  Refresh,
  AccessTime,
  Launch,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import apiService from '../../../../services/api';

const useStyles = makeStyles({
  historyContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    '& > *': {
      flex: '1 1 calc(33.333% - 12px)',
      minWidth: '300px',
      maxWidth: 'calc(33.333% - 12px)',
    },
    '@media (max-width: 1200px)': {
      '& > *': {
        flex: '1 1 calc(50% - 8px)',
        maxWidth: 'calc(50% - 8px)',
      },
    },
    '@media (max-width: 900px)': {
      '& > *': {
        flex: '1 1 100%',
        maxWidth: '100%',
      },
    },
  },
  sessionCard: {
    backgroundColor: '#232526',
    border: '1px solid #333',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    '&:hover': {
      borderColor: '#fff',
      transform: 'translateY(-2px)',
    },
    '&.loading': {
      cursor: 'not-allowed',
      opacity: 0.7,
    },
  },
  sessionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  sessionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  sessionMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '8px',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    color: '#666',
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px',
    color: '#888',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(35, 37, 38, 0.8)',
    borderRadius: 12,
  },
});

// Default to empty array to prevent undefined/null issues
const ChatHistoryGrid = ({ sessions = [], onSessionOpen, onRefreshSessions }) => {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loadingSessionId, setLoadingSessionId] = useState(null);
  const [error, setError] = useState(null);

  // Guard clause: if sessions is not an array, show loading state
  if (!Array.isArray(sessions)) {
    console.warn('Sessions prop is not an array:', sessions);
    return (
      <Box className={classes.emptyState}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Loading conversations...
        </Typography>
        <Typography variant="body2">
          Please wait while we fetch your chat history
        </Typography>
      </Box>
    );
  }

  // Filter out invalid sessions
  const validSessions = sessions.filter(session => 
    session.character && session.session_id && session.created_at
  );

  // Show empty state if no valid sessions exist
  if (validSessions.length === 0) {
    return (
      <Box className={classes.emptyState}>
        <Chat sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          No conversation history
        </Typography>
        <Typography variant="body2">
          Start chatting with characters to see your conversations here
        </Typography>
      </Box>
    );
  }

  const handleMenuOpen = (event, session) => {
    event.stopPropagation();
    setSelectedSession(session);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedSession(null);
  };

  const handleSessionClick = async (session) => {
    if (loadingSessionId === session.session_id) return;
    
    try {
      setLoadingSessionId(session.session_id);
      setError(null);
      
      console.log('Loading session:', session.session_id);
      
      // Load session messages using the API service
      const sessionData = await apiService.getSessionMessages(session.session_id);
      
      console.log('Session data received:', sessionData);
      
      // Create session object with messages in the expected format
      const sessionWithMessages = {
        sessionId: session.session_id,
        character: session.character,
        messages: sessionData.chat_history || [],
        createdAt: session.created_at,
        // Add any other session metadata
        ...session
      };
      
      console.log('Calling onSessionOpen with:', sessionWithMessages);
      
      // Call the onSessionOpen callback if provided
      if (onSessionOpen) {
        await onSessionOpen(sessionWithMessages);
      } else {
        console.warn('onSessionOpen callback not provided');
        // Fallback: You might want to navigate or handle this differently
        // Example: window.location.href = `/chat/${session.character}?session=${session.session_id}`;
      }
      
    } catch (error) {
      console.error('Failed to load session:', error);
      setError(`Failed to load session: ${error.message}`);
    } finally {
      setLoadingSessionId(null);
    }
  };

  const handleDeleteSession = async () => {
    try {
      // TODO: Implement session deletion API call when available
      // await apiService.deleteSession(selectedSession.session_id);
      console.log('Delete session:', selectedSession);
      
      // Refresh sessions list after deletion
      if (onRefreshSessions) {
        await onRefreshSessions();
      }
      
    } catch (error) {
      console.error('Failed to delete session:', error);
      setError(`Failed to delete session: ${error.message}`);
    }
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const getSessionDuration = (session) => {
    // Mock duration calculation - in real app, calculate from first/last message
    const durations = ['5 min', '12 min', '23 min', '45 min', '1 hr 15 min'];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const getMessageCount = (session) => {
    // Mock message count - in real app, get from session data
    return Math.floor(Math.random() * 20) + 5;
  };

  const groupSessionsByDate = (sessions) => {
    return sessions.reduce((acc, session) => {
      const label = formatDate(session.created_at);
      if (!acc[label]) {
        acc[label] = [];
      }
      acc[label].push(session);
      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByDate(validSessions);

  // Modify the session card content to show language
  const renderSessionCard = (session) => {
    const isLoading = loadingSessionId === session.session_id;
    
    return (
      <Card 
        key={session.session_id}
        className={`${classes.sessionCard} ${isLoading ? 'loading' : ''}`}
        onClick={() => !isLoading && handleSessionClick(session)}
      >
        <CardContent>
          <Box className={classes.sessionHeader}>
            <Box className={classes.sessionInfo}>
              <Avatar sx={{ width: 32, height: 32 }}>
                <Chat fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  Session {session.session_id}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {session.character}
                </Typography>
              </Box>
            </Box>

            <IconButton
              size="small"
              onClick={(e) => handleMenuOpen(e, session)}
              sx={{ opacity: 0.7 }}
              disabled={isLoading}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>

          <Box className={classes.sessionMeta}>
            <Box className={classes.metaRow}>
              <AccessTime fontSize="inherit" />
              <span>{getSessionDuration(session)}</span>
              <span>•</span>
              <span>{getMessageCount(session)} messages</span>
              {session.primary_language && (
                <>
                  <span>•</span>
                  <Chip 
                    label={session.primary_language.toUpperCase()}
                    size="small"
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                </>
              )}
            </Box>

            <Box className={classes.metaRow}>
              <span>Started: {new Date(session.created_at).toLocaleString()}</span>
            </Box>
          </Box>
        </CardContent>

        {isLoading && (
          <Box className={classes.loadingOverlay}>
            <CircularProgress size={24} color="primary" />
          </Box>
        )}
      </Card>
    );
  };

  return (
    <Box>
      {Object.entries(groupedSessions).map(([dateLabel, dateSessions], idx, arr) => (
        <Box key={dateLabel} sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {dateLabel}
            <Chip 
              label={`${dateSessions.length} conversation${dateSessions.length !== 1 ? 's' : ''}`}
              size="small"
              variant="outlined"
            />
          </Typography>

          <Box className={classes.historyContainer}>
            {dateSessions.map((session) => renderSessionCard(session))}
          </Box>

          {arr.length > 1 && idx < arr.length - 1 && (
            <Divider sx={{ mt: 3 }} />
          )}
        </Box>
      ))}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleSessionClick(selectedSession)}>
          <Launch sx={{ mr: 1 }} fontSize="small" />
          Open Session
        </MenuItem>
        <MenuItem onClick={() => handleSessionClick(selectedSession)}>
          <Refresh sx={{ mr: 1 }} fontSize="small" />
          Resume Chat
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteSession} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete Session
        </MenuItem>
      </Menu>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatHistoryGrid;