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
    // Remove fixed width - will be set dynamically via inline styles
    height: '100vh',
    backgroundColor: theme?.palette?.background?.paper || '#232526',
    borderLeft: `1px solid ${theme?.palette?.divider || '#333'}`,
    zIndex: 1500,
    transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s ease', // Added width transition
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme?.shadows?.[8] || '0 0 20px rgba(0,0,0,0.5)',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    // Mobile responsive widths
    '@media (max-width: 600px)': {
      width: '100vw !important', // Force full width on mobile
      right: '0 !important',
      borderRadius: 0,
    },
    '@media (max-width: 480px)': {
      width: '100vw !important',
    },
    '@media (max-width: 375px)': {
      width: '100vw !important',
    },
  },
  panelContainerClosed: {
    // Dynamic right position will be set via inline styles
    boxShadow: 'none',
    '@media (max-width: 600px)': {
      right: '-100vw !important',
    },
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: `1px solid ${theme?.palette?.divider || '#333'}`,
    backgroundColor: theme?.palette?.background?.default || '#232526',
    borderTopLeftRadius: 16,
    '@media (max-width: 1200px)': {
      padding: '18px 22px',
    },
    '@media (max-width: 960px)': {
      padding: '16px 20px',
    },
    '@media (max-width: 600px)': {
      padding: '14px 18px',
      borderTopLeftRadius: 0,
    },
    '@media (max-width: 480px)': {
      padding: '12px 16px',
    },
    '@media (max-width: 375px)': {
      padding: '10px 14px',
    },
  },
  panelContent: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: theme?.palette?.background?.paper || '#232526',
    borderBottomLeftRadius: 16,
    '@media (max-width: 600px)': {
      borderBottomLeftRadius: 0,
    },
  },
  scrollableList: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0',
    '@media (max-width: 1200px)': {
      padding: '7px 0',
    },
    '@media (max-width: 960px)': {
      padding: '6px 0',
    },
    '@media (max-width: 600px)': {
      padding: '5px 0',
    },
    '@media (max-width: 480px)': {
      padding: '4px 0',
    },
    '@media (max-width: 375px)': {
      padding: '3px 0',
    },
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
    '@media (max-width: 1200px)': {
      margin: '3px 10px',
      borderRadius: 7,
    },
    '@media (max-width: 960px)': {
      margin: '2px 8px',
      borderRadius: 6,
    },
    '@media (max-width: 600px)': {
      margin: '1px 6px',
      borderRadius: 5,
    },
    '@media (max-width: 480px)': {
      margin: '1px 4px',
      borderRadius: 4,
    },
    '@media (max-width: 375px)': {
      margin: '1px 2px',
      borderRadius: 3,
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
    '@media (max-width: 1200px)': {
      margin: '10px',
      padding: '10px',
      borderRadius: 7,
    },
    '@media (max-width: 960px)': {
      margin: '8px',
      padding: '8px',
      borderRadius: 6,
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      margin: '6px',
      padding: '6px',
      borderRadius: 5,
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      margin: '4px',
      padding: '4px',
      borderRadius: 4,
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      margin: '2px',
      padding: '2px',
      borderRadius: 3,
      fontSize: '0.75rem',
    },
  },
  sessionMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '4px',
    fontSize: '0.75rem',
    color: theme?.palette?.text?.secondary || '#888',
    '@media (max-width: 1200px)': {
      fontSize: '0.7rem',
      gap: '3px',
      marginTop: '3px',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.65rem',
      gap: '2px',
      marginTop: '2px',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.6rem',
      gap: '1px',
      marginTop: '1px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.55rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.5rem',
    },
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
  headerTitle: {
    '@media (max-width: 960px)': {
      fontSize: '1.15rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.05rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
    },
  },
  headerSubtitle: {
    '@media (max-width: 960px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
  },
  closeButton: {
    '@media (max-width: 600px)': {
      padding: '6px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.2rem',
      },
    },
    '@media (max-width: 480px)': {
      padding: '4px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.1rem',
      },
    },
    '@media (max-width: 375px)': {
      padding: '2px',
      '& .MuiSvgIcon-root': {
        fontSize: '1rem',
      },
    },
  },
  emptyStateIcon: {
    fontSize: 48,
    color: 'text.disabled',
    marginBottom: '16px',
    '@media (max-width: 960px)': {
      fontSize: 44,
      marginBottom: '14px',
    },
    '@media (max-width: 600px)': {
      fontSize: 40,
      marginBottom: '12px',
    },
    '@media (max-width: 480px)': {
      fontSize: 36,
      marginBottom: '10px',
    },
    '@media (max-width: 375px)': {
      fontSize: 32,
      marginBottom: '8px',
    },
  },
  emptyStateContainer: {
    textAlign: 'center',
    padding: '32px 24px',
    '@media (max-width: 1200px)': {
      padding: '28px 20px',
    },
    '@media (max-width: 960px)': {
      padding: '24px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '20px 12px',
    },
    '@media (max-width: 480px)': {
      padding: '16px 8px',
    },
    '@media (max-width: 375px)': {
      padding: '12px 4px',
    },
  },
  emptyStateText: {
    '@media (max-width: 960px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
  },
  sessionCountText: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingBottom: '8px',
    '@media (max-width: 1200px)': {
      paddingLeft: '14px',
      paddingRight: '14px',
      paddingBottom: '7px',
    },
    '@media (max-width: 960px)': {
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingBottom: '6px',
    },
    '@media (max-width: 600px)': {
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingBottom: '5px',
    },
    '@media (max-width: 480px)': {
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingBottom: '4px',
    },
    '@media (max-width: 375px)': {
      paddingLeft: '6px',
      paddingRight: '6px',
      paddingBottom: '3px',
    },
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      '@media (max-width: 960px)': {
        fontSize: '0.85rem',
      },
      '@media (max-width: 600px)': {
        fontSize: '0.8rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.75rem',
      },
      '@media (max-width: 375px)': {
        fontSize: '0.7rem',
      },
    },
  },
  activeChip: {
    height: 20,
    fontSize: '0.7rem',
    '@media (max-width: 1200px)': {
      height: 18,
      fontSize: '0.65rem',
    },
    '@media (max-width: 960px)': {
      height: 16,
      fontSize: '0.6rem',
    },
    '@media (max-width: 600px)': {
      height: 14,
      fontSize: '0.55rem',
    },
    '@media (max-width: 480px)': {
      height: 12,
      fontSize: '0.5rem',
    },
    '@media (max-width: 375px)': {
      height: 10,
      fontSize: '0.45rem',
    },
  },
}));

const ChatHistoryPanel = ({ 
  open, 
  onClose, 
  sessions, 
  currentSessionId, 
  onSessionSelect, 
  onNewSession,
  characterName,
  sidebarState = { isOpen: true, isMobile: false, sidebarWidth: 280, isCollapsed: false } // Added sidebarState prop
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // Calculate panel width based on sidebar state
  const calculatePanelWidth = () => {
    if (sidebarState.isMobile || (typeof window !== 'undefined' && window.innerWidth <= 600)) {
      return '100vw'; // Full width on mobile
    }
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    
    // Determine sidebar width based on collapse state and screen size
    let sidebarWidth;
    if (sidebarState.isCollapsed) {
      // Collapsed sidebar widths
      if (viewportWidth <= 960) {
        sidebarWidth = 60;
      } else if (viewportWidth <= 1200) {
        sidebarWidth = 65;
      } else {
        sidebarWidth = 70;
      }
    } else {
      // Expanded sidebar widths
      if (viewportWidth <= 960) {
        sidebarWidth = 240;
      } else if (viewportWidth <= 1200) {
        sidebarWidth = 260;
      } else {
        sidebarWidth = 280;
      }
    }
    
    // Calculate available space and determine panel width
    const availableWidth = viewportWidth - sidebarWidth;
    
    // Different panel widths based on sidebar state
    if (sidebarState.isCollapsed) {
      // Expand panel when sidebar is collapsed (more space available)
      const expandedWidth = Math.min(500, Math.max(400, availableWidth * 0.35)); // Between 400-500px or 35% of available space
      return expandedWidth;
    } else {
      // Use standard width when sidebar is expanded
      const standardWidth = Math.min(400, Math.max(360, availableWidth * 0.3)); // Between 360-400px or 30% of available space
      if (viewportWidth <= 1200) return 380;
      if (viewportWidth <= 960) return 360;
      return standardWidth;
    }
  };

  // Fixed formatSessionDate function to handle "YYYY-MM-DD HH:MM:SS IST" format
  const formatSessionDate = (dateString) => {
    if (!dateString) {
      console.warn('formatSessionDate received empty dateString');
      return 'Unknown Date';
    }

    let date;
    
    try {
      // Handle different date formats
      if (typeof dateString === 'string') {
        // Check if it's a Unix timestamp string
        if (dateString.match(/^\d+$/)) {
          const timestamp = parseInt(dateString);
          date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
        }
        // Handle "YYYY-MM-DD HH:MM:SS IST" format from your backend
        else if (dateString.includes('IST')) {
          // Remove IST and parse the datetime part
          const cleanDateString = dateString.replace(' IST', '').trim();
          // Convert to ISO format for better parsing
          const isoString = cleanDateString.replace(' ', 'T') + '+05:30'; // IST is UTC+5:30
          date = new Date(isoString);
        }
        // Handle other date formats
        else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date created from:', dateString);
        return 'Invalid Date';
      }
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays <= 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString();
      
    } catch (error) {
      console.error('Error parsing session date:', dateString, error);
      return 'Invalid Date';
    }
  };

  // Fixed formatSessionTime function to handle "YYYY-MM-DD HH:MM:SS IST" format
  const formatSessionTime = (dateString) => {
    if (!dateString) {
      console.warn('formatSessionTime received empty dateString');
      return 'Unknown Time';
    }

    let date;
    
    try {
      // Handle different date formats
      if (typeof dateString === 'string') {
        // Check if it's a Unix timestamp string
        if (dateString.match(/^\d+$/)) {
          const timestamp = parseInt(dateString);
          date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
        }
        // Handle "YYYY-MM-DD HH:MM:SS IST" format from your backend
        else if (dateString.includes('IST')) {
          // Remove IST and parse the datetime part
          const cleanDateString = dateString.replace(' IST', '').trim();
          // Convert to ISO format for better parsing
          const isoString = cleanDateString.replace(' ', 'T') + '+05:30'; // IST is UTC+5:30
          date = new Date(isoString);
        }
        // Handle other date formats
        else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date for time formatting:', dateString);
        return 'Invalid Time';
      }
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
    } catch (error) {
      console.error('Error formatting session time:', dateString, error);
      return 'Invalid Time';
    }
  };

  // Calculate dynamic panel width and right position
  const panelWidth = calculatePanelWidth();
  const panelStyle = {
    width: panelWidth,
    right: open ? 0 : -panelWidth, // Slide out based on actual calculated width
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
        style={panelStyle} // Apply dynamic width and position
      >
        <Box className={classes.panelHeader}>
          <Box>
            <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main} className={classes.headerTitle}>
              Chat History
            </Typography>
            <Typography variant="body2" color="text.secondary" className={classes.headerSubtitle}>
              {characterName}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: theme.palette.text.secondary }} className={classes.closeButton}>
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

          <Box className={classes.sessionCountText}>
            <Typography variant="caption" color="text.disabled">
              {sessions.length} conversation{sessions.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Box className={classes.scrollableList + ' history-panel'}>
            {sessions.length === 0 ? (
              <Box className={classes.emptyStateContainer}>
                <Chat className={classes.emptyStateIcon} />
                <Typography variant="body2" color="text.secondary" className={classes.emptyStateText}>
                  No previous conversations
                </Typography>
                <Typography variant="caption" color="text.disabled" className={classes.emptyStateText}>
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
                    <ListItemIcon sx={{ 
                      minWidth: 36,
                      '@media (max-width: 1200px)': {
                        minWidth: 34,
                      },
                      '@media (max-width: 960px)': {
                        minWidth: 32,
                      },
                      '@media (max-width: 600px)': {
                        minWidth: 30,
                      },
                      '@media (max-width: 480px)': {
                        minWidth: 28,
                      },
                      '@media (max-width: 375px)': {
                        minWidth: 26,
                      },
                    }}>
                      <Chat fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listItemText}
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
                              className={classes.activeChip}
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