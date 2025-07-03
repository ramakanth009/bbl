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
    '&:hover': {
      borderColor: '#fff',
      transform: 'translateY(-2px)',
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
});

const ChatHistoryGrid = ({ sessions, onSessionOpen }) => {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (loading) return;
    
    try {
      setLoading(true);
      
      // Load session messages using the API service
      const sessionData = await apiService.getSessionMessages(session.session_id);
      
      // Create session object with messages
      const sessionWithMessages = {
        ...session,
        messages: sessionData.chat_history
      };
      
      // Call the onSessionOpen callback if provided
      if (onSessionOpen) {
        onSessionOpen(sessionWithMessages);
      } else {
        // Fallback: Log for debugging
        console.log('Opening session:', sessionWithMessages);
        
        // Example: If you have navigation, you could navigate like this:
        // window.location.href = `/chat/${session.character}?session=${session.session_id}`;
      }
      
    } catch (error) {
      console.error('Failed to load session:', error);
      // You might want to show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async () => {
    try {
      // TODO: Implement session deletion API call when available
      // await apiService.deleteSession(selectedSession.session_id);
      console.log('Delete session:', selectedSession);
      
      // You would typically refresh the sessions list after deletion
      // or remove the session from the local state
      
    } catch (error) {
      console.error('Failed to delete session:', error);
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

  const groupSessionsByCharacter = (sessions) => {
    return sessions.reduce((acc, session) => {
      if (!acc[session.character]) {
        acc[session.character] = [];
      }
      acc[session.character].push(session);
      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByCharacter(sessions);

  if (sessions.length === 0) {
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

  return (
    <Box>
      {loading && (
        <Box className={classes.loadingContainer}>
          <CircularProgress size={24} />
        </Box>
      )}
      
      {Object.entries(groupedSessions).map(([character, characterSessions]) => (
        <Box key={character} sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {character}
            <Chip 
              label={`${characterSessions.length} conversation${characterSessions.length !== 1 ? 's' : ''}`}
              size="small"
              variant="outlined"
            />
          </Typography>
          
          <Box className={classes.historyContainer}>
            {characterSessions.map((session) => (
              <Card 
                key={session.session_id}
                className={classes.sessionCard}
                onClick={() => handleSessionClick(session)}
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
                          {formatDate(session.created_at)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, session)}
                      sx={{ opacity: 0.7 }}
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
                    </Box>
                    
                    <Box className={classes.metaRow}>
                      <span>Started: {new Date(session.created_at).toLocaleString()}</span>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          
          {Object.keys(groupedSessions).length > 1 && (
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
    </Box>
  );
};

export default ChatHistoryGrid;