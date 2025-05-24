import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Alert,
  Chip,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import { 
  Close, 
  Add, // Changed from Refresh to Add
  Tune,
  History as HistoryIcon,
  Chat,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowBack, // Added for back button
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import apiService from '../../services/api';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import CreativitySettingsMenu from './CreativitySettingsMenu';

const ChatContainer = styled(Box)(({ theme, open }) => ({
  width: open ? 'calc(100vw - 280px)' : 0, // Full width minus sidebar
  backgroundColor: theme.palette.background.secondary,
  borderLeft: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100vh',
  zIndex: 1000,
  [theme.breakpoints.down('md')]: {
    width: open ? '100vw' : 0, // Full width on mobile
    left: 0, // Start from left edge on mobile
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1.5),
}));

const ChatHeaderTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ChatHeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flex: 1,
  minWidth: 0,
}));

const CharacterInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const CharacterDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
}));

const ChatHeaderRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const HistorySection = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  maxHeight: 200,
  overflow: 'auto',
}));

const SessionItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: 'pointer',
}));

const NewSessionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 2),
  justifyContent: 'flex-start',
  textTransform: 'none',
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  // Always visible since chat is now always a separate page
}));

const ChatPanel = ({ open, character, onClose, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      setShowHistory(false);
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
    setShowHistory(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading || !character) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);
    setError(null);

    const newUserMessage = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const creativitySettings = { temperature, top_p: topP, top_k: topK };
      const response = await apiService.sendMessage(
        character.name, 
        userMessage, 
        !sessionId,
        creativitySettings
      );
      
      if (response.chat_history) {
        const formattedMessages = response.chat_history.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        setMessages(formattedMessages);
      } else {
        setMessages(prev => [...prev, { 
          role: character.name, 
          content: response.reply 
        }]);
      }
      
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      await loadUserSessions();
      
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.response?.data?.error || 'Failed to send message. Please try again.');
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const formatSessionDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      onClose();
    }
  };

  if (!open || !character) {
    return <ChatContainer open={false} />;
  }

  return (
    <ChatContainer open={open}>
      <ChatHeader>
        <ChatHeaderTop>
          <ChatHeaderLeft>
            <BackButton 
              onClick={handleBackClick}
              title="Back to Characters"
            >
              <ArrowBack />
            </BackButton>
            <Avatar
              src={character.img}
              alt={character.name}
              sx={{ width: 40, height: 40, borderRadius: 1 }}
            />
            <CharacterInfo>
              <Typography variant="h6" fontWeight="bold" noWrap>
                {character.name}
              </Typography>
              {sessionId && (
                <Chip 
                  label={`Session ${sessionId}`} 
                  size="small" 
                  sx={{ fontSize: '0.7rem', height: 20 }} 
                />
              )}
            </CharacterInfo>
          </ChatHeaderLeft>
          
          <ChatHeaderRight>
            <IconButton 
              onClick={() => setShowHistory(!showHistory)}
              sx={{ color: 'text.secondary' }}
              title="Chat History"
            >
              <HistoryIcon />
            </IconButton>
            
            <IconButton 
              onClick={startNewSession}
              sx={{ color: 'text.secondary' }}
              title="New Conversation"
            >
              <Add />
            </IconButton>
            
            <IconButton 
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              sx={{ color: 'text.secondary' }}
              title="Creativity Settings"
            >
              <Tune />
            </IconButton>
            
            <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
              <Close />
            </IconButton>
          </ChatHeaderRight>
        </ChatHeaderTop>
        
        {character.description && (
          <CharacterDescription>
            {character.description}
          </CharacterDescription>
        )}
      </ChatHeader>

      <Collapse in={showHistory}>
        <HistorySection>
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Conversation History
              </Typography>
              <IconButton 
                size="small"
                onClick={() => setShowHistory(false)}
              >
                {showHistory ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </Box>
            
            <NewSessionButton 
              variant="outlined" 
              startIcon={<Add />}
              onClick={startNewSession}
              fullWidth
            >
              Start New Conversation
            </NewSessionButton>
            
            <List dense>
              {sessions.map((session) => (
                <SessionItem
                  key={session.session_id}
                  onClick={() => loadSession(session.session_id)}
                  selected={sessionId === session.session_id}
                >
                  <ListItemIcon>
                    <Chat fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Session ${session.session_id}`}
                    secondary={formatSessionDate(session.created_at)}
                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                    secondaryTypographyProps={{ fontSize: '0.75rem' }}
                  />
                </SessionItem>
              ))}
            </List>
          </Box>
        </HistorySection>
      </Collapse>

      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

      <MessageList 
        messages={messages} 
        loading={loading} 
        ref={messagesEndRef} 
      />

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        loading={loading}
      />

      <CreativitySettingsMenu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
        temperature={temperature}
        setTemperature={setTemperature}
        topP={topP}
        setTopP={setTopP}
        topK={topK}
        setTopK={setTopK}
      />
    </ChatContainer>
  );
};

export default ChatPanel;