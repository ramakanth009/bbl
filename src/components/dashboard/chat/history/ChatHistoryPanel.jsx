import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import {
  Close,
  Add,
  Chat,
  AccessTime,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 400,
    height: '100vh',
    backgroundColor: theme?.palette?.background?.paper || '#232526',
    borderLeft: `1px solid ${theme?.palette?.divider || '#333'}`,
    zIndex: 1500,
    transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme?.shadows?.[8] || '0 0 20px rgba(0,0,0,0.5)',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    '@media (max-width: 600px)': {
      width: '100vw',
      right: 0,
      borderRadius: 0,
    },
  },
  panelContainerClosed: {
    right: -400,
    '@media (max-width: 600px)': {
      right: '-100vw',
    },
    boxShadow: 'none',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: `1px solid ${theme?.palette?.divider || '#333'}`,
    backgroundColor: theme?.palette?.background?.default || '#232526',
    borderTopLeftRadius: 16,
  },
  panelContent: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: theme?.palette?.background?.paper || '#232526',
    borderBottomLeftRadius: 16,
  },
  scrollableList: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0',
  },
  sessionItem: {
    margin: '4px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme?.palette?.action?.hover || '#292b2f',
    },
    '&.selected': {
      backgroundColor: theme?.palette?.action?.selected || '#222',
      borderLeft: `3px solid ${theme?.palette?.primary?.main || '#fff'}`,
    },
  },
  newSessionButton: {
    margin: '12px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    padding: '12px',
    backgroundColor: theme?.palette?.primary?.main || '#fff',
    color: theme?.palette?.primary?.contrastText || '#232526',
    borderRadius: 8,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme?.palette?.primary?.dark || '#bbb',
    },
  },
  sessionMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '4px',
    fontSize: '0.75rem',
    color: theme?.palette?.text?.secondary || '#888',
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1400,
    opacity: 1,
    visibility: 'visible',
    transition: 'all 0.3s ease',
  },
  backdropClosed: {
    opacity: 0,
    visibility: 'hidden',
  },
}));

const ChatHistoryPanel = ({ 
  open, 
  onClose, 
  sessions, 
  currentSessionId, 
  onSessionSelect, 
  onNewSession,
  characterName 
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const formatSessionDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const formatSessionTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Box
        className={
          open
            ? classes.backdrop
            : `${classes.backdrop} ${classes.backdropClosed}`
        }
        onClick={onClose}
      />
      <Box
        className={
          open
            ? classes.panelContainer
            : `${classes.panelContainer} ${classes.panelContainerClosed}`
        }
        style={{ right: open ? 0 : undefined }}
      >
        <Box className={classes.panelHeader}>
          <Box>
            <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
              Chat History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {characterName}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: theme.palette.text.secondary }}>
            <Close />
          </IconButton>
        </Box>

        <Box className={classes.panelContent}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onNewSession}
            fullWidth
            className={classes.newSessionButton}
          >
            Start New Conversation
          </Button>

          <Box sx={{ px: 2, pb: 1 }}>
            <Typography variant="caption" color="text.disabled">
              {sessions.length} conversation{sessions.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Box className={classes.scrollableList + ' history-panel'}>
            {sessions.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4, px: 3 }}>
                <Chat sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  No previous conversations
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Start chatting to see your history here
                </Typography>
              </Box>
            ) : (
              <List dense>
                {sessions.map((session) => (
                  <ListItem
                    key={session.session_id}
                    onClick={() => onSessionSelect(session.session_id)}
                    className={
                      currentSessionId === session.session_id
                        ? `${classes.sessionItem} selected`
                        : classes.sessionItem
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Chat fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" fontWeight="medium">
                            Session {session.session_id}
                          </Typography>
                          {currentSessionId === session.session_id && (
                            <Chip
                              label="Active"
                              size="small"
                              color="primary"
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box className={classes.sessionMeta}>
                          <AccessTime fontSize="inherit" />
                          <span>{formatSessionDate(session.created_at)}</span>
                          <span>•</span>
                          <span>{formatSessionTime(session.created_at)}</span>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatHistoryPanel;