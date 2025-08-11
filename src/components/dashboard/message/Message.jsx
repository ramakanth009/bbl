import React from 'react';
import { Box, Paper, IconButton } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import VoiceService from './Voice';

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

const MessageContent = styled(Paper)(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  fontSize: '0.875rem',
  lineHeight: 1.4,
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isUser ? 'white' : theme.palette.text.primary,
  border: isUser ? 'none' : `1px solid ${theme.palette.divider}`,
  wordBreak: 'break-word',
  position: 'relative',
  '@media (max-width: 1200px)': {
    maxWidth: '75%',
    padding: theme.spacing(1.4, 1.8),
    borderRadius: 10,
    fontSize: '0.85rem',
  },
  '@media (max-width: 960px)': {
    maxWidth: '80%',
    padding: theme.spacing(1.3, 1.6),
    borderRadius: 8,
    fontSize: '0.825rem',
  },
  '@media (max-width: 600px)': {
    maxWidth: '85%',
    padding: theme.spacing(1.2, 1.4),
    borderRadius: 6,
    fontSize: '0.8rem',
    lineHeight: 1.3,
  },
  '@media (max-width: 480px)': {
    maxWidth: '90%',
    padding: theme.spacing(1.1, 1.2),
    borderRadius: 4,
    fontSize: '0.775rem',
  },
  '@media (max-width: 375px)': {
    maxWidth: '95%',
    padding: theme.spacing(1, 1),
    fontSize: '0.75rem',
    lineHeight: 1.2,
  },
}));

const MessageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(0.5),
  fontSize: '0.75rem',
  opacity: 0.7,
}));

const VoiceControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
}));

const SpeakerButton = styled(IconButton)(({ theme, isUser }) => ({
  padding: theme.spacing(0.5),
  color: isUser ? 'rgba(255, 255, 255, 0.7)' : theme.palette.text.secondary,
  '&:hover': {
    color: isUser ? 'white' : theme.palette.primary.main,
    backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
  },
}));

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Check for voice data using the correct property names from the backend
  const hasVoiceData = message.audio_base64 || message.voice_data || message.audio_url;
  const hasUserInput = message.user_input && message.user_input !== message.content;

  const handlePlayVoice = async () => {
    try {
      console.log('🎵 Playing voice for message:', message);
      
      // Try different voice data sources in order of preference
      if (message.audio_base64) {
        console.log('🔊 Playing from audio_base64');
        await VoiceService.playVoiceData(message.audio_base64);
      } else if (message.voice_data) {
        console.log('🔊 Playing from voice_data');
        await VoiceService.playVoiceData(message.voice_data);
      } else if (message.audio_url) {
        console.log('🔊 Playing from audio_url');
        await VoiceService.playAudioFromUrl(message.audio_url);
      } else {
        // Fallback: use text-to-speech for the message content
        console.log('🔊 Fallback: Using text-to-speech');
        await VoiceService.speakText(message.content);
      }
    } catch (error) {
      console.error('❌ Error playing voice:', error);
      // Show user-friendly error
      alert('Could not play audio. Please try again.');
    }
  };

  return (
    <MessageWrapper isUser={isUser}>
      <MessageContent isUser={isUser}>
        {/* Show original user input if different from processed content */}
        {hasUserInput && !isUser && (
          <MessageHeader>
            <Box component="span" sx={{ fontStyle: 'italic' }}>
              User said: "{message.user_input}"
            </Box>
          </MessageHeader>
        )}
        
        {/* Main message content */}
        <Box>
          {message.content}
        </Box>

        {/* Voice controls for assistant messages or messages with voice data */}
        {(hasVoiceData || !isUser) && (
          <VoiceControls>
            <SpeakerButton 
              isUser={isUser}
              onClick={handlePlayVoice}
              title="Play voice"
              size="small"
            >
              <VolumeUp />
            </SpeakerButton>
            {hasVoiceData && (
              <Box component="span" sx={{ fontSize: '0.7rem', opacity: 0.6 }}>
                Voice available
              </Box>
            )}
          </VoiceControls>
        )}
      </MessageContent>
    </MessageWrapper>
  );
};

export default Message;