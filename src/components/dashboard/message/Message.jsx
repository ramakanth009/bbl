import React, { useState, useEffect } from 'react';
import { Box, Paper, Avatar } from '@mui/material';
// import { VolumeUp, Stop } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
// import GroundingInfo from './GroundingInfo';

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
      marginBottom: '11.2px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '9.6px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '8px',
    },
  },
  messageWrapperUser: {
    justifyContent: 'flex-end', // Push user messages to the right
  },
  messageWrapperAssistant: {
    justifyContent: 'flex-start', // Keep assistant messages on the left
  },
  messageContent: {
    maxWidth: '85%', // Increased from 70% to allow more space
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    lineHeight: 1.4,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    position: 'relative',
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
      padding: '9.6px 11.2px',
      borderRadius: '6px',
      fontSize: '0.8rem',
      lineHeight: 1.3,
    },
    '@media (max-width: 480px)': {
      maxWidth: '95%',
      padding: '8.8px 9.6px',
      borderRadius: '4px',
      fontSize: '0.775rem',
    },
    '@media (max-width: 375px)': {
      maxWidth: '98%',
      padding: '8px 8px',
      fontSize: '0.75rem',
      lineHeight: 1.2,
    },
  },
  messageContentUser: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '18px 18px 4px 18px', // More rounded for user messages
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
  },
  messageContentAssistant: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '18px 18px 18px 4px', // More rounded for assistant messages
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  messageWithAvatar: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    maxWidth: '100%',
    '@media (max-width: 1200px)': {
      gap: '7px',
    },
    '@media (max-width: 960px)': {
      gap: '6px',
    },
    '@media (max-width: 600px)': {
      gap: '5px',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
    },
    '@media (max-width: 375px)': {
      gap: '3px',
    },
  },
  messageWithAvatarUser: {
    flexDirection: 'row-reverse', // Reverse order for user messages (avatar on right)
  },
  messageWithAvatarAssistant: {
    flexDirection: 'row', // Normal order for assistant messages (avatar on left)
  },
  characterAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    flexShrink: 0,
    '@media (max-width: 1200px)': {
      width: '30px',
      height: '30px',
    },
    '@media (max-width: 960px)': {
      width: '28px',
      height: '28px',
    },
    '@media (max-width: 600px)': {
      width: '26px',
      height: '26px',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
    },
    '@media (max-width: 375px)': {
      width: '22px',
      height: '22px',
    },
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    flexShrink: 0,
    backgroundColor: '#6366f1',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    '@media (max-width: 1200px)': {
      width: '30px',
      height: '30px',
      fontSize: '0.8rem',
    },
    '@media (max-width: 960px)': {
      width: '28px',
      height: '28px',
      fontSize: '0.75rem',
    },
    '@media (max-width: 600px)': {
      width: '26px',
      height: '26px',
      fontSize: '0.7rem',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
      fontSize: '0.65rem',
    },
    '@media (max-width: 375px)': {
      width: '22px',
      height: '22px',
      fontSize: '0.6rem',
    },
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
    fontSize: '0.75rem',
    opacity: 0.7,
  },
  voiceControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '4px',
  },
  speakerButton: {
    padding: '4px',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  speakerButtonUser: {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.playing': {
      color: '#ffeb3b',
      backgroundColor: 'rgba(255, 235, 59, 0.1)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  speakerButtonAssistant: {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.playing': {
      color: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
});

const Message = ({ message, character, className }) => {
  const classes = useStyles();
  // const [isPlaying, setIsPlaying] = useState(false);

  // Determine if this is a user message
  const isUser = message.role === 'user';

  // Check for voice data
  // const hasVoiceData = message.audio_base64 && message.has_voice;
  const hasUserInput = message.user_input && message.user_input !== message.content;

  // Get user's first letter for avatar
  const getUserInitial = () => {
    // You can get this from auth context or user info
    return 'U'; // Default to 'U' for User
  };

  // // Voice functionality placeholder
  // const handleToggleVoice = () => {
  //   if (hasVoiceData) {
  //     // Toggle voice playback
  //     setIsPlaying(!isPlaying);
  //     // Add your voice service logic here
  //   }
  // };

  // useEffect(() => {
  //   // Clean up audio when component unmounts
  //   return () => {
  //     setIsPlaying(false);
  //   };
  // }, []);

  // For assistant messages, show avatar and message content
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
              <Box className={classes.messageHeader}>
                <Box component="span" sx={{ fontStyle: 'italic' }}>
                  User said: "{message.user_input}"
                </Box>
              </Box>
            )}
            
            {/* Main message content */}
            <Box>
              {message.content}
            </Box>

            {/* Grounding information for assistant messages */}
            {/* {message.grounding_info && (
              <GroundingInfo groundingInfo={message.grounding_info} />
            )} */}

            {/* Voice controls for assistant messages */}
            {/* {hasVoiceData && (
              <Box className={classes.voiceControls}>
                <IconButton 
                  className={`${classes.speakerButton} ${classes.speakerButtonAssistant} ${isPlaying ? 'playing' : ''}`}
                  onClick={handleToggleVoice}
                  title={isPlaying ? "Stop audio" : "Play voice"}
                  size="small"
                >
                  {isPlaying ? <Stop /> : <VolumeUp />}
                </IconButton>
                
                <Box component="span" sx={{ fontSize: '0.7rem', opacity: 0.6 }}>
                  {isPlaying ? 'Playing...' : 'Voice available'}
                </Box>
              </Box>
            )} */}
          </Paper>
        </Box>
      </Box>
    );
  }

  // For user messages, show message content and user avatar
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
          <Box>
            {message.content}
          </Box>

          {/* Voice controls for user messages with voice data */}
          {/* {hasVoiceData && (
            <Box className={classes.voiceControls}>
              <IconButton 
                className={`${classes.speakerButton} ${classes.speakerButtonUser} ${isPlaying ? 'playing' : ''}`}
                onClick={handleToggleVoice}
                title={isPlaying ? "Stop audio" : "Play voice"}
                size="small"
              >
                {isPlaying ? <Stop /> : <VolumeUp />}
              </IconButton>
              
              <Box component="span" sx={{ fontSize: '0.7rem', opacity: 0.6 }}>
                {isPlaying ? 'Playing...' : 'Voice available'}
              </Box>
            </Box>
          )} */}
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;