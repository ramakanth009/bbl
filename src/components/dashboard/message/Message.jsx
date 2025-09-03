import React from 'react';
import { Box, Paper, Avatar, Typography } from '@mui/material';
import { Check, DoneAll } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  messageWrapper: {
    display: 'flex',
    marginBottom: '16px',
    width: '100%',
    '@media (max-width: 1200px)': {
      marginBottom: '14.4px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '12.8px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '8px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '6px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '4px',
    },
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageWrapperAssistant: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '85%',
    padding: '8px 12px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    lineHeight: 1.4,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    '@media (max-width: 1200px)': {
      maxWidth: '80%',
      padding: '11.2px 14.4px',
      borderRadius: '10px',
      fontSize: '0.85rem',
    },
    '@media (max-width: 960px)': {
      maxWidth: '85%',
      padding: '10.4px 12.8px',
      borderRadius: '8px',
      fontSize: '0.825rem',
    },
    '@media (max-width: 600px)': {
      maxWidth: '90%',
      padding: '8px 10px',
      borderRadius: '18px',
      fontSize: '0.9rem',
      lineHeight: 1.3,
    },
    '@media (max-width: 480px)': {
      maxWidth: '85%',
      padding: '8px 10px',
      fontSize: '0.875rem',
    },
    '@media (max-width: 375px)': {
      maxWidth: '82%',
      padding: '7px 9px',
      fontSize: '0.85rem',
      lineHeight: 1.2,
    },
  },
  messageContentUser: {
    backgroundColor: '#6366f1 ',
    color: '#ffffff',
    border: 'none',
    borderRadius: '18px 18px 4px 18px',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
    alignSelf: 'flex-end',
    '@media (max-width: 600px)': {
      backgroundColor: '#6366f1',
      borderRadius: '20px 20px 5px 20px',
    },
  },
  messageContentAssistant: {
    backgroundColor: '#1e1e1e ',
    color: '#ffffff ',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '18px 18px 18px 4px',
    alignSelf: 'flex-start',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    '@media (max-width: 600px)': {
      backgroundColor: '#1e1e1e ',
      borderRadius: '20px 20px 20px 5px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },
  },
  messageWithAvatar: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    maxWidth: '100%',
    '@media (max-width: 600px)': {
      gap: '4px',
    },
  },
  messageWithAvatarUser: {
    flexDirection: 'row-reverse',
  },
  messageWithAvatarAssistant: {
    flexDirection: 'row',
  },
  characterAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    '@media (max-width: 600px)': {
      width: '28px',
      height: '28px',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
    },
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: '#6366f1',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    '@media (max-width: 600px)': {
      width: '28px',
      height: '28px',
      fontSize: '0.75rem',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
      fontSize: '0.7rem',
    },
  },
  messageText: {
    flex: 1,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
  messageFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '4px',
    marginTop: '2px',
    minHeight: '16px',
  },
  messageTime: {
    fontSize: '0.7rem',
    color: '#ffffff',
    lineHeight: 1,
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
    },
  },
  messageStatus: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '4px',
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
    },
    '@media (max-width: 600px)': {
      '& .MuiSvgIcon-root': {
        fontSize: '14px',
      },
    },
  },
  // WhatsApp-style status colors
  statusPending: {
    color: '#ffffff',
  },
  statusSent: {
    color: '#ffffff',
  },
  statusDelivered: {
    color: '#ffffff',
  },
  statusRead: {
    color: '#4fc3f7',
  },
});

// WhatsApp-style Message Status Component
const MessageStatusIndicator = ({ message, loading }) => {
  const classes = useStyles();
  
  if (message.role !== "user") return null;
  
  const getStatusIcon = () => {
    if (loading && message.tempId) {
      // Message is being sent
      return <Check className={classes.statusPending} />;
    }
    if (message.read) {
      // Blue double tick - message read
      return <DoneAll className={classes.statusRead} />;
    }
    if (message.delivered) {
      // Gray double tick - message delivered
      return <DoneAll className={classes.statusDelivered} />;
    }
    if (message.sent) {
      // Single gray tick - message sent
      return <Check className={classes.statusSent} />;
    }
    // Pending - single light gray tick
    return <Check className={classes.statusPending} />;
  };

  return (
    <Box className={classes.messageStatus}>
      {getStatusIcon()}
    </Box>
  );
};

// Format timestamp for display
const formatMessageTime = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    // Handle different timestamp formats
    let date;
    if (typeof timestamp === 'string') {
      // If it's a string with timezone info (like "2025-09-03 20:04:07 IST")
      if (timestamp.includes('IST') || timestamp.includes('GMT')) {
        // Replace IST with +0530 to make it a valid timezone offset
        const formattedTimestamp = timestamp.replace('IST', '+0530');
        date = new Date(formattedTimestamp);
      } else {
        // If no timezone info, assume local time
        date = new Date(timestamp);
      }
    } else if (typeof timestamp === 'number') {
      // If it's a number, check if it's in seconds or milliseconds
      if (timestamp < 1000000000000) {
        // Likely in seconds, convert to milliseconds
        date = new Date(timestamp * 1000);
      } else {
        // Already in milliseconds
        date = new Date(timestamp);
      }
    } else {
      // If it's already a Date object
      date = new Date(timestamp);
    }
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid timestamp:', timestamp);
      return '';
    }
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (messageDate.getTime() === today.getTime()) {
      // Today - show time only
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Other days - show date and time
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  } catch (error) {
    console.warn('Error formatting timestamp:', timestamp, error);
    return '';
  }
};

const Message = ({ message, character, className, loading }) => {
  const classes = useStyles();

  // Determine if this is a user message
  const isUser = message.role === 'user';
  const hasUserInput = message.user_input && message.user_input !== message.content;

  // Get user's first letter for avatar
  const getUserInitial = () => {
    return 'U'; // Default to 'U' for User
  };

  // For assistant messages
  if (!isUser && character) {
    return (
      <Box className={`${classes.messageWrapper} ${classes.messageWrapperAssistant}`}>
        <Box className={`${classes.messageWithAvatar} ${classes.messageWithAvatarAssistant}`}>
          <Avatar
            src={character.img}
            alt={character.name}
            className={classes.characterAvatar}
          />
          <Paper 
            className={`${classes.messageContent} ${classes.messageContentAssistant} ${className || ''}`}
            elevation={0}
          >
            {/* Show original user input if different from processed content */}
            {hasUserInput && (
              <Typography 
                variant="caption" 
                sx={{ 
                  fontStyle: 'italic', 
                  opacity: 0.7, 
                  fontSize: '0.7rem',
                  marginBottom: '4px',
                  display: 'block'
                }}
              >
                User said: "{message.user_input}"
              </Typography>
            )}
            
            {/* Main message content */}
            <Box className={classes.messageText}>
              {message.content}
            </Box>

            {/* Message footer with timestamp */}
            <Box className={classes.messageFooter}>
              <Typography className={classes.messageTime}>
                {formatMessageTime(message.timestamp)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }

  // For user messages
  return (
    <Box className={`${classes.messageWrapper} ${classes.messageWrapperUser}`}>
      <Box className={`${classes.messageWithAvatar} ${classes.messageWithAvatarUser}`}>
        {/* User Avatar */}
        <Box className={classes.userAvatar}>
          {getUserInitial()}
        </Box>
        
        <Paper 
          className={`${classes.messageContent} ${classes.messageContentUser} ${className || ''}`}
          elevation={0}
        >
          {/* Main message content */}
          <Box className={classes.messageText}>
            {message.content}
          </Box>

          {/* Message footer with timestamp and status */}
          <Box className={classes.messageFooter}>
            <Typography className={classes.messageTime}>
              {formatMessageTime(message.timestamp)}
            </Typography>
            <MessageStatusIndicator 
              message={message} 
              loading={loading && message.tempId} 
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;