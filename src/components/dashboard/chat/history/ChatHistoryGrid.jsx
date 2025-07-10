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
  Fade,
  Skeleton,
} from '@mui/material';
import {
  Chat,
  MoreVert,
  Delete,
  Refresh,
  AccessTime,
  Launch,
  MessageOutlined,
  Translate,
  CalendarToday,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import apiService from '../../../../services/api';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  historyContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
  },
  sessionCard: {
    background: 'linear-gradient(145deg, #1a1c1e 0%, #232729 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      borderColor: 'rgba(63, 81, 181, 0.5)',
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(63, 81, 181, 0.2)',
      '&::before': {
        opacity: 1,
      },
    },
    '&.loading': {
      cursor: 'not-allowed',
      opacity: 0.7,
      transform: 'none',
    },
  },
  sessionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  sessionInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  characterAvatar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  sessionTitle: {
    background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 600,
    fontSize: '1rem',
  },
  characterName: {
    color: '#9ca3af',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  sessionMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    color: '#6b7280',
    padding: '6px 0',
  },
  metaChip: {
    height: '24px',
    fontSize: '0.7rem',
    background: 'rgba(99, 102, 241, 0.1)',
    color: '#a5b4fc',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.2)',
    },
  },
  languageChip: {
    height: '20px',
    fontSize: '0.65rem',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(21, 128, 61, 0.1) 100%)',
    color: '#86efac',
    border: '1px solid rgba(34, 197, 94, 0.2)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '64px 24px',
    background: 'linear-gradient(145deg, #1a1c1e 0%, #232729 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  emptyIcon: {
    fontSize: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
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
    background: 'rgba(26, 28, 30, 0.9)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    zIndex: 2,
  },
  dateSection: {
    marginBottom: '32px',
  },
  dateHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  dateTitle: {
    background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
  },
  countChip: {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#93c5fd',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    fontSize: '0.7rem',
    height: '24px',
  },
  menuPaper: {
    background: 'linear-gradient(145deg, #1e2124 0%, #2f3136 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
  },
  menuItem: {
    color: '#e5e7eb',
    padding: '12px 16px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1)',
      color: '#a5b4fc',
    },
    '&.delete': {
      '&:hover': {
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#fca5a5',
      },
    },
  },
  loadingSkeleton: {
    background: 'linear-gradient(145deg, #1a1c1e 0%, #232729 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '20px',
  },
});

const ChatHistoryGrid = ({ sessions = [], onSessionOpen, onRefreshSessions }) => {
  const classes = useStyles();
  const { category } = useParams(); // Get category from route if present
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loadingSessionId, setLoadingSessionId] = useState(null);
  const [error, setError] = useState(null);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <Box className={classes.loadingSkeleton}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="text" width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
        <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      </Box>
      <Skeleton variant="text" width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
      <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
    </Box>
  );

  // Guard clause: if sessions is not an array, show loading state
  if (!Array.isArray(sessions)) {
    console.warn('Sessions prop is not an array:', sessions);
    return (
      <Box className={classes.historyContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </Box>
    );
  }

  // Optionally filter sessions by category if session has a category property
  const filteredSessions = category
    ? sessions.filter(session => session.category === category)
    : sessions;

  // Filter out invalid sessions
  const validSessions = filteredSessions.filter(session => 
    session.character && session.session_id && session.created_at
  );

  // Show empty state if no valid sessions exist
  if (validSessions.length === 0) {
    return (
      <Fade in timeout={500}>
        <Box className={classes.emptyState}>
          <MessageOutlined className={classes.emptyIcon} />
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#e5e7eb' }}>
            No conversation history
          </Typography>
          <Typography variant="body1" sx={{ color: '#9ca3af', maxWidth: 400, mx: 'auto' }}>
            Start chatting with characters to see your conversations appear here. 
            Your chat history will be organized by date for easy browsing.
          </Typography>
        </Box>
      </Fade>
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
      
      const sessionData = await apiService.getSessionMessages(session.session_id);
      
      console.log('Session data received:', sessionData);
      
      const sessionWithMessages = {
        sessionId: session.session_id,
        character: session.character,
        messages: sessionData.chat_history || [],
        createdAt: session.created_at,
        ...session
      };
      
      console.log('Calling onSessionOpen with:', sessionWithMessages);
      
      if (onSessionOpen) {
        await onSessionOpen(sessionWithMessages);
      } else {
        console.warn('onSessionOpen callback not provided');
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
      console.log('Delete session:', selectedSession);
      
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
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getSessionDuration = (session) => {
    const durations = ['5 min', '12 min', '23 min', '45 min', '1 hr 15 min'];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const getMessageCount = (session) => {
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

  const renderSessionCard = (session, index) => {
    const isLoading = loadingSessionId === session.session_id;
    
    return (
      <Fade in timeout={300 + index * 100} key={session.session_id}>
        <Card 
          className={`${classes.sessionCard} ${isLoading ? 'loading' : ''}`}
          onClick={() => !isLoading && handleSessionClick(session)}
        >
          <CardContent sx={{ padding: '20px !important' }}>
            <Box className={classes.sessionHeader}>
              <Box className={classes.sessionInfo}>
                <Avatar className={classes.characterAvatar} sx={{ width: 40, height: 40 }}>
                  <Chat fontSize="small" sx={{ color: '#ffffff' }} />
                </Avatar>
                <Box>
                  <Typography className={classes.sessionTitle}>
                    {session.character}
                  </Typography>
                  <Typography className={classes.characterName}>
                    Session {String(session.session_id).substring(0, 8)}
                  </Typography>
                </Box>
              </Box>

              {/* <IconButton
                size="small"
                onClick={(e) => handleMenuOpen(e, session)}
                sx={{ 
                  opacity: 0.7, 
                  color: '#9ca3af',
                  '&:hover': { 
                    opacity: 1, 
                    color: '#e5e7eb',
                    background: 'rgba(255,255,255,0.1)' 
                  }
                }}
                disabled={isLoading}
              >
                <MoreVert fontSize="small" />
              </IconButton> */}
            </Box>

            <Box className={classes.sessionMeta}>
              <Box className={classes.metaRow}>
                <AccessTime fontSize="inherit" />
                <span>{getSessionDuration(session)}</span>
                <Chip 
                  icon={<MessageOutlined style={{ fontSize: '12px' }} />}
                  label={`${getMessageCount(session)} messages`}
                  size="small"
                  className={classes.metaChip}
                />
                {session.primary_language && (
                  <Chip 
                    icon={<Translate style={{ fontSize: '10px' }} />}
                    label={session.primary_language.toUpperCase()}
                    size="small"
                    className={classes.languageChip}
                  />
                )}
              </Box>

              <Box className={classes.metaRow}>
                <CalendarToday fontSize="inherit" />
                <span>{new Date(session.created_at).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </Box>
            </Box>
          </CardContent>

          {isLoading && (
            <Box className={classes.loadingOverlay}>
              <CircularProgress size={32} sx={{ color: '#667eea' }} />
            </Box>
          )}
        </Card>
      </Fade>
    );
  };

  return (
    <Box>
      {Object.entries(groupedSessions).map(([dateLabel, dateSessions]) => (
        <Box key={dateLabel} className={classes.dateSection}>
          <Box className={classes.dateHeader}>
            <Typography className={classes.dateTitle} variant="h5">
              {dateLabel}
            </Typography>
            <Chip 
              label={`${dateSessions.length} conversation${dateSessions.length !== 1 ? 's' : ''}`}
              size="small"
              className={classes.countChip}
            />
          </Box>

          <Box className={classes.historyContainer}>
            {dateSessions.map((session, index) => renderSessionCard(session, index))}
          </Box>
        </Box>
      ))}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          className: classes.menuPaper,
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleSessionClick(selectedSession)} className={classes.menuItem}>
          <Launch sx={{ mr: 1, fontSize: 18 }} />
          Open Session
        </MenuItem>
        <MenuItem onClick={() => handleSessionClick(selectedSession)} className={classes.menuItem}>
          <Refresh sx={{ mr: 1, fontSize: 18 }} />
          Resume Chat
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <MenuItem onClick={handleDeleteSession} className={`${classes.menuItem} delete`}>
          <Delete sx={{ mr: 1, fontSize: 18 }} />
          Delete Session
        </MenuItem>
      </Menu>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error"
          sx={{
            background: 'linear-gradient(145deg, #dc2626 0%, #b91c1c 100%)',
            color: '#fff',
            '& .MuiAlert-icon': { color: '#fff' }
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatHistoryGrid;