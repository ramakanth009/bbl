import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import apiService from '../../services/api';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.secondary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 12,
    width: '100%',
    maxWidth: 900,
    height: '80vh',
    margin: theme.spacing(3),
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatHeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2.5),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const Message = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2),
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
}));

const ChatInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ChatInputWrapper = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'flex-end',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    minHeight: 44,
    maxHeight: 120,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: 44,
  width: 44,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.action.disabled,
  },
}));

const ChatModal = ({ open, character, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && character) {
      setMessages([
        {
          role: 'assistant',
          content: `Hello! I'm ${character.name}. What would you like to talk about?`,
        },
      ]);
    }
  }, [open, character]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading || !character) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await apiService.sendMessage(character.name, userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback response
      const fallbackResponses = [
        "That's an interesting perspective. Let me share my thoughts...",
        "In my experience, I've found that...",
        "This reminds me of something important...",
        "I believe the key insight here is...",
        "From my journey, I can tell you that..."
      ];
      const response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!character) return null;

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={false}>
      <ChatHeader>
        <ChatHeaderLeft>
          <Avatar
            src={character.img}
            alt={character.name}
            sx={{ width: 40, height: 40, borderRadius: 1 }}
          />
          <Typography variant="h6" fontWeight="bold">
            {character.name}
          </Typography>
        </ChatHeaderLeft>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </ChatHeader>

      <ChatMessages>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.role === 'user'}>
            <MessageContent isUser={message.role === 'user'}>
              {message.content}
            </MessageContent>
          </Message>
        ))}
        {loading && (
          <Message isUser={false}>
            <MessageContent isUser={false}>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Typing...
            </MessageContent>
          </Message>
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <ChatInputContainer>
        <ChatInputWrapper>
          <StyledTextField
            multiline
            maxRows={4}
            placeholder="Message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <SendButton
            onClick={handleSend}
            disabled={!inputValue.trim() || loading}
          >
            <Send />
          </SendButton>
        </ChatInputWrapper>
      </ChatInputContainer>
    </StyledDialog>
  );
};

export default ChatModal;