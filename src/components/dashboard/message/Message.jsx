// import React, { useState, useEffect } from 'react';
// import { Box, Paper, IconButton } from '@mui/material';
// import { VolumeUp, Stop } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import voiceService from './Voice'; // Import the singleton instance, not the class

// const MessageWrapper = styled(Box)(({ theme, isUser }) => ({
//   display: 'flex',
//   justifyContent: isUser ? 'flex-end' : 'flex-start',
//   marginBottom: theme.spacing(2),
//   '@media (max-width: 1200px)': {
//     marginBottom: theme.spacing(1.8),
//   },
//   '@media (max-width: 960px)': {
//     marginBottom: theme.spacing(1.6),
//   },
//   '@media (max-width: 600px)': {
//     marginBottom: theme.spacing(1.4),
//   },
//   '@media (max-width: 480px)': {
//     marginBottom: theme.spacing(1.2),
//   },
//   '@media (max-width: 375px)': {
//     marginBottom: theme.spacing(1),
//   },
// }));

// const MessageContent = styled(Paper)(({ theme, isUser }) => ({
//   maxWidth: '70%',
//   padding: theme.spacing(1.5, 2),
//   borderRadius: 12,
//   fontSize: '0.875rem',
//   lineHeight: 1.4,
//   backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
//   color: isUser ? 'white' : theme.palette.text.primary,
//   border: isUser ? 'none' : `1px solid ${theme.palette.divider}`,
//   wordBreak: 'break-word',
//   position: 'relative',
//   '@media (max-width: 1200px)': {
//     maxWidth: '75%',
//     padding: theme.spacing(1.4, 1.8),
//     borderRadius: 10,
//     fontSize: '0.85rem',
//   },
//   '@media (max-width: 960px)': {
//     maxWidth: '80%',
//     padding: theme.spacing(1.3, 1.6),
//     borderRadius: 8,
//     fontSize: '0.825rem',
//   },
//   '@media (max-width: 600px)': {
//     maxWidth: '85%',
//     padding: theme.spacing(1.2, 1.4),
//     borderRadius: 6,
//     fontSize: '0.8rem',
//     lineHeight: 1.3,
//   },
//   '@media (max-width: 480px)': {
//     maxWidth: '90%',
//     padding: theme.spacing(1.1, 1.2),
//     borderRadius: 4,
//     fontSize: '0.775rem',
//   },
//   '@media (max-width: 375px)': {
//     maxWidth: '95%',
//     padding: theme.spacing(1, 1),
//     fontSize: '0.75rem',
//     lineHeight: 1.2,
//   },
// }));

// const MessageHeader = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: theme.spacing(0.5),
//   fontSize: '0.75rem',
//   opacity: 0.7,
// }));

// const VoiceControls = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: theme.spacing(0.5),
//   marginTop: theme.spacing(0.5),
// }));

// const SpeakerButton = styled(IconButton)(({ theme, isUser, isPlaying }) => ({
//   padding: theme.spacing(0.5),
//   color: isPlaying 
//     ? (isUser ? '#ffeb3b' : theme.palette.secondary.main) // Highlighted when playing
//     : (isUser ? 'rgba(255, 255, 255, 0.7)' : theme.palette.text.secondary),
//   backgroundColor: isPlaying 
//     ? (isUser ? 'rgba(255, 235, 59, 0.1)' : 'rgba(156, 39, 176, 0.1)') 
//     : 'transparent',
//   '&:hover': {
//     color: isUser ? 'white' : theme.palette.primary.main,
//     backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
//   },
//   '& .MuiSvgIcon-root': {
//     fontSize: '1rem',
//   },
//   // Add slight animation when playing
//   animation: isPlaying ? 'pulse 2s infinite' : 'none',
//   '@keyframes pulse': {
//     '0%': {
//       boxShadow: '0 0 0 0 rgba(156, 39, 176, 0.4)',
//     },
//     '70%': {
//       boxShadow: '0 0 0 10px rgba(156, 39, 176, 0)',
//     },
//     '100%': {
//       boxShadow: '0 0 0 0 rgba(156, 39, 176, 0)',
//     },
//   },
// }));

// const Message = ({ message }) => {
//   const isUser = message.role === 'user';
//   const [isPlaying, setIsPlaying] = useState(false);
  
//   // Check for voice data using the correct property names from the backend
//   const hasVoiceData = message.audio_base64 || message.voice_data || message.audio_url;
//   const hasUserInput = message.user_input && message.user_input !== message.content;

//   // Listen for global audio state changes
//   useEffect(() => {
//     const checkAudioState = () => {
//       // If global audio stops, update local state
//       if (!voiceService.isPlaying && isPlaying) {
//         setIsPlaying(false);
//       }
//     };

//     const interval = setInterval(checkAudioState, 100);
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   const handleToggleVoice = async () => {
//     try {
//       if (isPlaying) {
//         // Stop audio
//         console.log('🛑 Stopping audio playback');
//         voiceService.stopAudio();
//         voiceService.stopSpeaking();
//         setIsPlaying(false);
//       } else {
//         // Start audio
//         console.log('🎵 Starting voice playback for message:', message);
//         setIsPlaying(true);
        
//         try {
//           // Try different voice data sources in order of preference
//           if (message.audio_base64) {
//             console.log('🔊 Playing from audio_base64');
//             await voiceService.playVoiceData(message.audio_base64);
//           } else if (message.voice_data) {
//             console.log('🔊 Playing from voice_data');
//             await voiceService.playVoiceData(message.voice_data);
//           } else if (message.audio_url) {
//             console.log('🔊 Playing from audio_url');
//             await voiceService.playAudioFromUrl(message.audio_url);
//           } else {
//             // Fallback: use text-to-speech for the message content
//             console.log('🔊 Fallback: Using text-to-speech');
//             await voiceService.speakText(message.content);
//           }
          
//           // Audio finished playing naturally
//           setIsPlaying(false);
//         } catch (playError) {
//           console.error('❌ Error during playback:', playError);
//           setIsPlaying(false);
//           throw playError;
//         }
//       }
//     } catch (error) {
//       console.error('❌ Error toggling voice:', error);
//       setIsPlaying(false);
      
//       // Show user-friendly error
//       const errorMessage = error.message.includes('Audio format not supported') 
//         ? 'Audio format not supported by your browser.' 
//         : 'Could not play audio. Please try again.';
      
//       alert(errorMessage);
//     }
//   };

//   return (
//     <MessageWrapper isUser={isUser}>
//       <MessageContent isUser={isUser}>
//         {/* Show original user input if different from processed content */}
//         {hasUserInput && !isUser && (
//           <MessageHeader>
//             <Box component="span" sx={{ fontStyle: 'italic' }}>
//               User said: "{message.user_input}"
//             </Box>
//           </MessageHeader>
//         )}
        
//         {/* Main message content */}
//         <Box>
//           {message.content}
//         </Box>

//         {/* Voice controls for assistant messages or messages with voice data */}
//         {(hasVoiceData || !isUser) && (
//           <VoiceControls>
//             <SpeakerButton 
//               isUser={isUser}
//               isPlaying={isPlaying}
//               onClick={handleToggleVoice}
//               title={isPlaying ? "Stop audio" : "Play voice"}
//               size="small"
//             >
//               {isPlaying ? <Stop /> : <VolumeUp />}
//             </SpeakerButton>
            
//             <Box component="span" sx={{ fontSize: '0.7rem', opacity: 0.6 }}>
//               {isPlaying ? 'Playing...' : (hasVoiceData ? 'Voice available' : 'Text-to-speech')}
//             </Box>
//           </VoiceControls>
//         )}
//       </MessageContent>
//     </MessageWrapper>
//   );
// };

// export default Message;
import React, { useState, useEffect } from 'react';
import { Box, Paper, IconButton, Avatar } from '@mui/material';
import { VolumeUp, Stop } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import voiceService from './Voice'; // Import the singleton instance, not the class

const useStyles = makeStyles({
  messageWrapper: {
    display: 'flex',
    marginBottom: '16px',
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
    justifyContent: 'flex-end',
  },
  messageWrapperAssistant: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    lineHeight: 1.4,
    wordBreak: 'break-word',
    position: 'relative',
    '@media (max-width: 1200px)': {
      maxWidth: '75%',
      padding: '11.2px 14.4px',
      borderRadius: '10px',
      fontSize: '0.85rem',
    },
    '@media (max-width: 960px)': {
      maxWidth: '80%',
      padding: '10.4px 12.8px',
      borderRadius: '8px',
      fontSize: '0.825rem',
    },
    '@media (max-width: 600px)': {
      maxWidth: '85%',
      padding: '9.6px 11.2px',
      borderRadius: '6px',
      fontSize: '0.8rem',
      lineHeight: 1.3,
    },
    '@media (max-width: 480px)': {
      maxWidth: '90%',
      padding: '8.8px 9.6px',
      borderRadius: '4px',
      fontSize: '0.775rem',
    },
    '@media (max-width: 375px)': {
      maxWidth: '95%',
      padding: '8px 8px',
      fontSize: '0.75rem',
      lineHeight: 1.2,
    },
  },
  messageContentUser: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
  },
  messageContentAssistant: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
  messageWithAvatar: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
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
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
    },
  },
  speakerButtonUser: {
    '&.playing': {
      color: '#ffeb3b',
      backgroundColor: 'rgba(255, 235, 59, 0.1)',
      animation: '$pulse 2s infinite',
    },
    '&:not(.playing)': {
      color: 'rgba(255, 255, 255, 0.7)',
      backgroundColor: 'transparent',
    },
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  speakerButtonAssistant: {
    '&.playing': {
      color: '#9c27b0',
      backgroundColor: 'rgba(156, 39, 176, 0.1)',
      animation: '$pulse 2s infinite',
    },
    '&:not(.playing)': {
      color: 'rgba(255, 255, 255, 0.6)',
      backgroundColor: 'transparent',
    },
    '&:hover': {
      color: '#6366f1',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(156, 39, 176, 0.4)',
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(156, 39, 176, 0)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(156, 39, 176, 0)',
    },
  },
});

const Message = ({ message, character, className }) => {
  const classes = useStyles();
  const isUser = message.role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Check for voice data using the correct property names from the backend
  const hasVoiceData = message.audio_base64 || message.voice_data || message.audio_url;
  const hasUserInput = message.user_input && message.user_input !== message.content;

  // Listen for global audio state changes
  useEffect(() => {
    const checkAudioState = () => {
      // If global audio stops, update local state
      if (!voiceService.isPlaying && isPlaying) {
        setIsPlaying(false);
      }
    };

    const interval = setInterval(checkAudioState, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleToggleVoice = async () => {
    try {
      if (isPlaying) {
        // Stop audio
        console.log('🛑 Stopping audio playback');
        voiceService.stopAudio();
        voiceService.stopSpeaking();
        setIsPlaying(false);
      } else {
        // Start audio
        console.log('🎵 Starting voice playback for message:', message);
        setIsPlaying(true);
        
        try {
          // Try different voice data sources in order of preference
          if (message.audio_base64) {
            console.log('🔊 Playing from audio_base64');
            await voiceService.playVoiceData(message.audio_base64);
          } else if (message.voice_data) {
            console.log('🔊 Playing from voice_data');
            await voiceService.playVoiceData(message.voice_data);
          } else if (message.audio_url) {
            console.log('🔊 Playing from audio_url');
            await voiceService.playAudioFromUrl(message.audio_url);
          } else {
            // Fallback: use text-to-speech for the message content
            console.log('🔊 Fallback: Using text-to-speech');
            await voiceService.speakText(message.content);
          }
          
          // Audio finished playing naturally
          setIsPlaying(false);
        } catch (playError) {
          console.error('❌ Error during playback:', playError);
          setIsPlaying(false);
          throw playError;
        }
      }
    } catch (error) {
      console.error('❌ Error toggling voice:', error);
      setIsPlaying(false);
      
      // Show user-friendly error
      const errorMessage = error.message.includes('Audio format not supported') 
        ? 'Audio format not supported by your browser.' 
        : 'Could not play audio. Please try again.';
      
      alert(errorMessage);
    }
  };

  // For assistant messages, show avatar and message content
  if (!isUser && character) {
    return (
      <Box className={`${classes.messageWrapper} ${classes.messageWrapperAssistant}`}>
        <Box className={classes.messageWithAvatar}>
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

            {/* Voice controls for assistant messages or messages with voice data */}
            {(hasVoiceData || !isUser) && (
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
                  {isPlaying ? 'Playing...' : (hasVoiceData ? 'Voice available' : 'voice')}
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    );
  }

  // For user messages, show avatar and message content
  return (
    <Box className={`${classes.messageWrapper} ${classes.messageWrapperUser}`}>
      <Box className={classes.messageWithAvatar}>
        <Paper 
          className={`${classes.messageContent} ${classes.messageContentUser} ${className || ''}`}
          elevation={0}
        >
          {/* Main message content */}
          <Box>
            {message.content}
          </Box>

          {/* Voice controls for user messages with voice data */}
          {hasVoiceData && (
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
                {isPlaying ? 'Playing...' : (hasVoiceData ? 'Voice available' : 'voice')}
              </Box>
            </Box>
          )}
        </Paper>
        <Box className={classes.userAvatar}>
          U
        </Box>
      </Box>
    </Box>
  );
};

export default Message;