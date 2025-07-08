import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Alert,
  Chip,
} from '@mui/material';
import { 
  Close, 
  Add,
  Tune,
  History as HistoryIcon,
  ArrowBack,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import apiService from '../../../services/api';
import MessageList from '../message/MessageList';
import ChatInput from './ChatInput';
import LanguageSelector from '../../common/LanguageSelector';
// import CreativitySettingsMenu from './CreativitySettingsMenu';
import ChatHistoryPanel from './history/ChatHistoryPanel';

const ChatContainer = styled(Box)(({ theme, open }) => ({
  width: open ? 'calc(100vw - 280px)' : 0,
  // Remove backgroundColor here!
  borderLeft: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100vh',
  zIndex: 2, // ensure above overlay
  [theme.breakpoints.down('md')]: {
    width: open ? '100vw' : 0,
    left: 0,
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

const BackButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const MessagesWrapper = styled(Box)({
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

const ChatPanel = ({ open, character, onClose, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Language state management
  const [inputLanguage, setInputLanguage] = useState('english');
  const [outputLanguage, setOutputLanguage] = useState('english');
  
  // Creativity settings
  // const [settingsAnchor, setSettingsAnchor] = useState(null);
  // const [temperature, setTemperature] = useState(0.7);
  // const [topP, setTopP] = useState(0.95);
  // const [topK, setTopK] = useState(40);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && character) {
      initializeChat();
      loadUserSessions();
      // Set default language based on character's native language
      if (character.native_language) {
        setOutputLanguage(character.native_language);
      }
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
        timestamp: msg.timestamp,
        language: msg.language
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

  const handleLanguageChange = (languageCode, type) => {
    if (type === 'input') {
      setInputLanguage(languageCode);
    } else if (type === 'output') {
      setOutputLanguage(languageCode);
    } else {
      // 'both' - set both languages
      setInputLanguage(languageCode);
      setOutputLanguage(languageCode);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading || !character) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);
    setError(null);

    const newUserMessage = { 
      role: 'user', 
      content: userMessage,
      language: inputLanguage 
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Include language settings in the message
      const messageData = {
        character_name: character.name,
        user_input: userMessage,
        new_session: !sessionId,
        input_language: inputLanguage,
        output_language: outputLanguage,
      };

      const response = await apiService.sendMessage(
        character.name, 
        userMessage, 
        !sessionId,
        { 
          input_language: inputLanguage,
          output_language: outputLanguage 
        }
      );
      
      if (response.chat_history) {
        const formattedMessages = response.chat_history.map(msg => ({
          role: msg.role,
          content: msg.content,
          language: msg.language || (msg.role === 'user' ? inputLanguage : outputLanguage),
          timestamp: msg.timestamp
        }));
        setMessages(formattedMessages);
      } else {
        setMessages(prev => [...prev, { 
          role: character.name, 
          content: response.reply,
          language: outputLanguage
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

  const handleBackClick = () => {
    // Always call onClose to ensure routing is updated
    onClose();
  };

  const handleHistoryClose = () => {
    setShowHistory(false);
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
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexWrap: 'wrap' }}>
                {sessionId && (
                  <Chip 
                    label={`Session ${sessionId}`} 
                    size="small" 
                    sx={{ fontSize: '0.7rem', height: 20 }} 
                  />
                )}
                {character.native_language && character.native_language !== 'english' && (
                  <Chip 
                    label={`Native: ${character.native_language}`} 
                    size="small" 
                    sx={{ 
                      fontSize: '0.7rem', 
                      height: 20,
                      backgroundColor: 'rgba(76,175,80,0.15)',
                      color: 'text.secondary'
                    }} 
                  />
                )}
              </Box>
            </CharacterInfo>
          </ChatHeaderLeft>
          
          <ChatHeaderRight>
            <IconButton 
              onClick={() => setShowHistory(true)}
              sx={{ color: 'text.secondary' }}
              title="Chat History"
            >
              <HistoryIcon />
            </IconButton>
            
            <LanguageSelector
              currentLanguage={outputLanguage}
              inputLanguage={inputLanguage} 
              outputLanguage={outputLanguage}
              mode="both"
              compact={true}
              onLanguageChange={handleLanguageChange}
              title="Language Settings"
            />
            
            <IconButton 
              onClick={startNewSession}
              sx={{ color: 'text.secondary' }}
              title="New Conversation"
            >
              <Add />
            </IconButton>
            
            {/* <IconButton 
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              sx={{ color: 'text.secondary' }}
              title="Creativity Settings"
            >
              <Tune />
            </IconButton> */}
            
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
        
        {(inputLanguage !== 'english' || outputLanguage !== 'english') && (
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip 
              label={`Input: ${inputLanguage}`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(25,118,210,0.15)',
                fontSize: '0.75rem'
              }}
            />
            <Chip 
              label={`Output: ${outputLanguage}`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(76,175,80,0.15)',
                fontSize: '0.75rem'
              }}
            />
          </Box>
        )}
      </ChatHeader>

      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

      <MessagesWrapper>
        <MessageList 
          messages={messages} 
          loading={loading} 
          ref={messagesEndRef}
          showLanguageLabels={inputLanguage !== outputLanguage || outputLanguage !== 'english'}
        />
      </MessagesWrapper>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        loading={loading}
        placeholder={`Type in ${inputLanguage}...`}
      />

      {/* <CreativitySettingsMenu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
        temperature={temperature}
        setTemperature={setTemperature}
        topP={topP}
        setTopP={setTopP}
        topK={topK}
        setTopK={setTopK}
      /> */}
      <ChatHistoryPanel
        open={showHistory}
        onClose={handleHistoryClose}
        sessions={sessions}
        currentSessionId={sessionId}
        onSessionSelect={loadSession}
        onNewSession={startNewSession}
        characterName={character.name}
      />
    </ChatContainer>
  );
};

export default ChatPanel;