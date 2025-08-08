// import React from 'react';
// import { Box, Paper } from '@mui/material';
// import { styled } from '@mui/material/styles';

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

// const Message = ({ message }) => {
//   const isUser = message.role === 'user';
  
//   return (
//     <MessageWrapper isUser={isUser}>
//       <MessageContent isUser={isUser}>
//         {/* Render content as React node (already parsed by MessageList) */}
//         {message.content}
//       </MessageContent>
//     </MessageWrapper>
//   );
// };

// export default Message;
import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const MessageWrapper = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2),
  '@media (max-width: 1200px)': {
    marginBottom: theme.spacing(1.8),
  },
  '@media (max-width: 960px)': {
    marginBottom: theme.spacing(1.6),
  },
  '@media (max-width: 600px)': {
    marginBottom: theme.spacing(1.4),
  },
  '@media (max-width: 480px)': {
    marginBottom: theme.spacing(1.2),
  },
  '@media (max-width: 375px)': {
    marginBottom: theme.spacing(1),
  },
}));

const MessageContainer = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  flexDirection: isUser ? 'row-reverse' : 'row',
  maxWidth: '70%',
  '@media (max-width: 1200px)': {
    maxWidth: '75%',
  },
  '@media (max-width: 960px)': {
    maxWidth: '80%',
  },
  '@media (max-width: 600px)': {
    maxWidth: '85%',
  },
  '@media (max-width: 480px)': {
    maxWidth: '90%',
  },
  '@media (max-width: 375px)': {
    maxWidth: '95%',
  },
}));

const MessageContent = styled(Paper)(({ theme, isUser }) => ({
  flex: 1,
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  fontSize: '0.875rem',
  lineHeight: 1.4,
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isUser ? 'white' : theme.palette.text.primary,
  border: isUser ? 'none' : `1px solid ${theme.palette.divider}`,
  wordBreak: 'break-word',
  '@media (max-width: 1200px)': {
    padding: theme.spacing(1.4, 1.8),
    borderRadius: 10,
    fontSize: '0.85rem',
  },
  '@media (max-width: 960px)': {
    padding: theme.spacing(1.3, 1.6),
    borderRadius: 8,
    fontSize: '0.825rem',
  },
  '@media (max-width: 600px)': {
    padding: theme.spacing(1.2, 1.4),
    borderRadius: 6,
    fontSize: '0.8rem',
    lineHeight: 1.3,
  },
  '@media (max-width: 480px)': {
    padding: theme.spacing(1.1, 1.2),
    borderRadius: 4,
    fontSize: '0.775rem',
  },
  '@media (max-width: 375px)': {
    padding: theme.spacing(1, 1),
    fontSize: '0.75rem',
    lineHeight: 1.2,
  },
}));

const AudioButton = styled(IconButton)(({ theme, isUser }) => ({
  width: 32,
  height: 32,
  backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : theme.palette.action.hover,
  color: isUser ? 'white' : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: isUser ? 'rgba(255, 255, 255, 0.2)' : theme.palette.action.selected,
  },
  '&.playing': {
    backgroundColor: isUser ? 'rgba(255, 255, 255, 0.3)' : theme.palette.primary.light,
    color: isUser ? 'white' : theme.palette.primary.dark,
  },
  '@media (max-width: 600px)': {
    width: 28,
    height: 28,
  },
  '@media (max-width: 480px)': {
    width: 24,
    height: 24,
  },
}));

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);
  
  // Check if message has audio
  const hasAudio = message.audio_url || message.audioUrl;
  
  // Only show speaker button for assistant messages with audio
  const showSpeakerButton = !isUser && hasAudio;

  useEffect(() => {
    // Cleanup audio URL when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Cleanup blob URLs to prevent memory leaks
      if (hasAudio && (message.audio_url || message.audioUrl)) {
        const audioUrl = message.audio_url || message.audioUrl;
        if (audioUrl.startsWith('blob:')) {
          URL.revokeObjectURL(audioUrl);
        }
      }
    };
  }, [hasAudio, message.audio_url, message.audioUrl]);

  const handlePlayAudio = async () => {
    if (!hasAudio) return;

    const audioUrl = message.audio_url || message.audioUrl;
    
    try {
      setIsLoading(true);
      setAudioError(null);

      // Stop current audio if playing
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setIsLoading(false);
        return;
      }

      // Create new audio element if needed
      if (!audioRef.current) {
        audioRef.current = new Audio();
        
        // Audio event listeners
        audioRef.current.addEventListener('loadstart', () => {
          console.log('🎵 Audio loading started');
        });
        
        audioRef.current.addEventListener('canplay', () => {
          console.log('🎵 Audio can start playing');
          setIsLoading(false);
        });
        
        audioRef.current.addEventListener('play', () => {
          console.log('🎵 Audio playback started');
          setIsPlaying(true);
        });
        
        audioRef.current.addEventListener('pause', () => {
          console.log('🎵 Audio playback paused');
          setIsPlaying(false);
        });
        
        audioRef.current.addEventListener('ended', () => {
          console.log('🎵 Audio playback ended');
          setIsPlaying(false);
        });
        
        audioRef.current.addEventListener('error', (e) => {
          console.error('🔴 Audio playback error:', e.target.error);
          setAudioError('Failed to play audio');
          setIsPlaying(false);
          setIsLoading(false);
        });
      }

      // Set audio source and play
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
      
    } catch (error) {
      console.error('🔴 Audio play error:', error);
      setAudioError('Failed to play audio: ' + error.message);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const getAudioButtonIcon = () => {
    if (isLoading) {
      return <CircularProgress size={16} color="inherit" />;
    }
    
    if (isPlaying) {
      return <VolumeOffIcon sx={{ fontSize: 18 }} />;
    }
    
    return <VolumeUpIcon sx={{ fontSize: 18 }} />;
  };

  const getAudioButtonTooltip = () => {
    if (isLoading) return 'Loading audio...';
    if (isPlaying) return 'Stop audio';
    if (audioError) return `Audio error: ${audioError}`;
    return 'Play audio';
  };

  return (
    <MessageWrapper isUser={isUser}>
      <MessageContainer isUser={isUser}>
        <MessageContent isUser={isUser}>
          {/* Render content as React node (already parsed by MessageList) */}
          {message.content}
        </MessageContent>
        
        {/* Audio speaker button for assistant messages with audio */}
        {showSpeakerButton && (
          <Tooltip title={getAudioButtonTooltip()} placement={isUser ? "left" : "right"}>
            <AudioButton
              isUser={isUser}
              onClick={handlePlayAudio}
              disabled={isLoading}
              className={isPlaying ? 'playing' : ''}
              size="small"
            >
              {getAudioButtonIcon()}
            </AudioButton>
          </Tooltip>
        )}
      </MessageContainer>
    </MessageWrapper>
  );
};

export default Message;