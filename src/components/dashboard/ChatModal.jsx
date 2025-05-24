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
  Alert,
  Chip,
  Menu,
  MenuItem,
  Slider,
} from '@mui/material';
import { 
  Close, 
  Send, 
  Refresh, 
  Tune,
  History as HistoryIcon 
} from '@mui/icons-material';
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

const ChatHeaderRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
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
  wordBreak: 'break-word',
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

const SettingsMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    padding: theme.spacing(2),
    minWidth: 280,
  },
}));

const ChatModal = ({ open, character, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showSessions, setShowSessions] = useState(false);
  
  // Creativity settings
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [topK, setTopK] = useState(40);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && character) {
      initializeChat();
      loadUserSessions();
    }
  }, [open, character]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = () => {
    setMessages([
      {
        role: character.name,
        content: `Hello! I'm ${character.name}. What would you like to talk about?`,
      },
    ]);
    setError(null);
    setSessionId(null);
  };

  const loadUserSessions = async () => {
    try {
      const userSessions = await apiService.getSessions();
      const characterSessions = userSessions.filter(s => s.character === character.name);
      setSessions(characterSessions);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  };

  const loadSession = async (sessionIdToLoad) => {
    try {
      setLoading(true);
      const sessionData = await apiService.getSessionMessages(sessionIdToLoad);
      
      const formattedMessages = sessionData.chat_history.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }));
      
      setMessages(formattedMessages);
      setSessionId(sessionIdToLoad);
      setShowSessions(false);
      setError(null);
    } catch (error) {
      console.error('Failed to load session:', error);
      setError('Failed to load conversation history');
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = () => {
    initializeChat();
    setShowSessions(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading || !character) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);
    setError(null);

    // Add user message immediately
    const newUserMessage = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const creativitySettings = {
        temperature,
        top_p: topP,
        top_k: topK
      };

      const response = await apiService.sendMessage(
        character.name, 
        userMessage, 
        !sessionId, // new_session if no current session
        creativitySettings
      );
      
      // Update messages with the full chat history from backend
      if (response.chat_history) {
        const formattedMessages = response.chat_history.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        setMessages(formattedMessages);
      } else {
        // Fallback: just add the reply
        setMessages(prev => [...prev, { 
          role: character.name, 
          content: response.reply 
        }]);
      }
      
      // Update session ID if provided
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      // Refresh sessions list
      await loadUserSessions();
      
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.response?.data?.error || 'Failed to send message. Please try again.');
      
      // Remove the user message if the request failed
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setMessages([]);
    setSessionId(null);
    setError(null);
    onClose();
  };

  if (!character) return null;

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth={false}>
      <ChatHeader>
        <ChatHeaderLeft>
          <Avatar
            src={character.img}
            alt={character.name}
            sx={{ width: 40, height: 40, borderRadius: 1 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {character.name}
            </Typography>
            {sessionId && (
              <Chip 
                label={`Session ${sessionId}`} 
                size="small" 
                sx={{ fontSize: '0.7rem', height: 20 }} 
              />
            )}
          </Box>
        </ChatHeaderLeft>
        
        <ChatHeaderRight>
          <IconButton 
            onClick={() => setShowSessions(!showSessions)}
            sx={{ color: 'text.secondary' }}
            title="Session History"
          >
            <HistoryIcon />
          </IconButton>
          
          <IconButton 
            onClick={startNewSession}
            sx={{ color: 'text.secondary' }}
            title="New Conversation"
          >
            <Refresh />
          </IconButton>
          
          <IconButton 
            onClick={(e) => setSettingsAnchor(e.currentTarget)}
            sx={{ color: 'text.secondary' }}
            title="Creativity Settings"
          >
            <Tune />
          </IconButton>
          
          <IconButton onClick={handleClose} sx={{ color: 'text.secondary' }}>
            <Close />
          </IconButton>
        </ChatHeaderRight>
      </ChatHeader>

      {/* Session History Dropdown */}
      {showSessions && (
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Recent Conversations</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Chip 
              label="+ Start New Conversation" 
              onClick={startNewSession}
              variant="outlined"
              sx={{ justifyContent: 'flex-start' }}
            />
            {sessions.map((session) => (
              <Chip
                key={session.session_id}
                label={`Session ${session.session_id} - ${new Date(session.created_at).toLocaleDateString()}`}
                onClick={() => loadSession(session.session_id)}
                variant={sessionId === session.session_id ? "filled" : "outlined"}
                sx={{ justifyContent: 'flex-start' }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2">Thinking...</Typography>
              </Box>
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

      {/* Creativity Settings Menu */}
      <SettingsMenu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
      >
        <Typography variant="subtitle2" sx={{ mb: 2 }}>Creativity Settings</Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Temperature: {temperature}
          </Typography>
          <Slider
            value={temperature}
            onChange={(_, value) => setTemperature(value)}
            min={0}
            max={1}
            step={0.1}
            size="small"
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Top P: {topP}
          </Typography>
          <Slider
            value={topP}
            onChange={(_, value) => setTopP(value)}
            min={0}
            max={1}
            step={0.05}
            size="small"
          />
        </Box>
        
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Top K: {topK}
          </Typography>
          <Slider
            value={topK}
            onChange={(_, value) => setTopK(value)}
            min={1}
            max={100}
            step={1}
            size="small"
          />
        </Box>
      </SettingsMenu>
    </StyledDialog>
  );
};

export default ChatModal;