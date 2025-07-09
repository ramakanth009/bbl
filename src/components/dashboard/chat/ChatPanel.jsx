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
import { makeStyles } from '@mui/styles';
import apiService from '../../../services/api';
import MessageList from '../message/MessageList';
import ChatInput from './ChatInput';
import LanguageSelector from '../../common/LanguageSelector';
import ChatHistoryPanel from './history/ChatHistoryPanel';

const useStyles = makeStyles(() => ({
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100vh',
    zIndex: 2,
  },
  chatContainerOpen: {
    width: 'calc(100vw - 280px)',
    '@media (max-width: 960px)': {
      width: '100vw',
      left: 0,
    },
  },
  chatContainerClosed: {
    width: 0,
  },
  chatHeader: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '12px',
  },
  chatHeaderTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  characterInfo: {
    flex: 1,
    minWidth: 0,
  },
  characterDescription: {
    fontSize: '0.875rem',
    lineHeight: 1.4,
  },
  chatHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  backButton: {},
  messagesWrapper: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ChatPanel = ({ open, character, onClose, onBack }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Simplified language state
  const [language, setLanguage] = useState('english');
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && character) {
      initializeChat();
      loadUserSessions();
      loadLanguagePreferences();
      
      // Set default language based on character's native language
      if (character.native_language) {
        console.log('🔧 Setting language to character native:', character.native_language);
        setLanguage(character.native_language);
      }
    }
  }, [open, character]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simplified language preferences loading
  const loadLanguagePreferences = async () => {
    try {
      const preferences = await apiService.getUserLanguagePreferences();
      if (preferences.language && !character.native_language) {
        setLanguage(preferences.language);
      }
      console.log('📋 Loaded language preferences:', preferences);
    } catch (error) {
      console.warn('⚠️ Could not load language preferences:', error.message);
    }
  };

  // Simplified language preferences saving
  const saveLanguagePreferences = async (newLanguage) => {
    try {
      await apiService.setUserLanguagePreferences({
        language: newLanguage,
        autoDetect: false
      });
      console.log('💾 Language preferences saved');
    } catch (error) {
      console.warn('⚠️ Could not save language preferences:', error.message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = () => {
    setMessages([
      {
        role: character.name,
        content: `Hello! I'm ${character.name}. What would you like to talk about?`,
        language: character.native_language || 'english'
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

  // Simplified language change handler
  const handleLanguageChange = async (languageCode) => {
    console.log('🔄 Language change requested:', languageCode);
    setLanguage(languageCode);
    await saveLanguagePreferences(languageCode);
    console.log('✅ Language updated:', languageCode);
  };

  // Update message sending to use single language
  const handleSend = async () => {
    if (!inputValue.trim() || loading || !character) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);
    setError(null);

    const newUserMessage = { 
      role: 'user', 
      content: userMessage,
      language: language 
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      console.log('💬 Sending message with settings:', {
        character: character.name,
        language,
        sessionExists: !!sessionId
      });

      const response = await apiService.sendMessage(
        character.name, 
        userMessage, 
        !sessionId,
        { language }
      );
      
      console.log('📨 Message sent successfully:', {
        sessionId: response.session_id,
        responseLanguage: response.response_language,
        inputLanguage: response.input_language
      });
      
      if (response.chat_history) {
        const formattedMessages = response.chat_history.map(msg => ({
          role: msg.role,
          content: msg.content,
          language: msg.language || (msg.role === 'user' ? language : language),
          timestamp: msg.timestamp
        }));
        setMessages(formattedMessages);
      } else {
        setMessages(prev => [...prev, { 
          role: character.name, 
          content: response.reply,
          language: response.response_language || language
        }]);
      }
      
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      await loadUserSessions();
      
    } catch (error) {
      console.error('💥 Chat error:', error);
      
      // Enhanced error handling for language issues
      let errorMessage = 'Failed to send message. Please try again.';
      if (error.message.includes('language')) {
        errorMessage = `Language error: ${error.message}. Try changing the language settings.`;
      } else if (error.message.includes('Character not found')) {
        errorMessage = 'Character not found. Please select a different character.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      setError(errorMessage);
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    onClose();
  };

  const handleHistoryClose = () => {
    setShowHistory(false);
  };

  if (!open || !character) {
    return <Box className={`${classes.chatContainer} ${classes.chatContainerClosed}`} />;
  }

  return (
    <Box 
      className={`${classes.chatContainer} ${classes.chatContainerOpen}`}
      sx={{ 
        borderLeft: '1px solid rgba(255,255,255,0.12)',
        '@media (max-width: 960px)': {
          left: 0,
        },
      }}
    >
      <Box 
        className={classes.chatHeader}
        sx={{ 
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <Box className={classes.chatHeaderTop}>
          <Box className={classes.chatHeaderLeft}>
            <IconButton 
              className={classes.backButton}
              onClick={handleBackClick}
              title="Back to Characters"
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <ArrowBack />
            </IconButton>
            <Avatar
              src={character.img}
              alt={character.name}
              sx={{ width: 40, height: 40, borderRadius: 1 }}
            />
            <Box className={classes.characterInfo}>
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
            </Box>
          </Box>
          
          <Box className={classes.chatHeaderRight}>
            <IconButton 
              onClick={() => setShowHistory(true)}
              sx={{ color: 'text.secondary' }}
              title="Chat History"
            >
              <HistoryIcon />
            </IconButton>
            
            {/* Update language selector to use single language */}
            <LanguageSelector
              currentLanguage={language}
              mode="single"
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
            
            <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        
        {character.description && (
          <Typography 
            className={classes.characterDescription}
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {character.description}
          </Typography>
        )}
        
        {/* Enhanced language status display */}
        {language !== 'english' && (
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip 
              label={`Language: ${language}`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(76,175,80,0.15)',
                fontSize: '0.75rem'
              }}
            />
            {character.native_language && language === character.native_language && (
              <Chip 
                label="Native Mode"
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,193,7,0.15)',
                  fontSize: '0.75rem',
                  color: 'warning.main'
                }}
              />
            )}
          </Box>
        )}
      </Box>

      {/* Enhanced error display with language-specific messages */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Alert 
            severity={error.includes('Language') ? 'warning' : 'error'} 
            onClose={() => setError(null)}
          >
            {error}
            {error.includes('Language') && (
              <Box sx={{ mt: 1, fontSize: '0.875rem' }}>
                Current setting: Language={language}
              </Box>
            )}
          </Alert>
        </Box>
      )}

      <Box className={classes.messagesWrapper}>
        <MessageList 
          messages={messages} 
          loading={loading} 
          ref={messagesEndRef}
          showLanguageLabels={language !== 'english'}
        />
      </Box>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        loading={loading}
        placeholder={`Type in ${language}...`}
      />

      <ChatHistoryPanel
        open={showHistory}
        onClose={handleHistoryClose}
        sessions={sessions}
        currentSessionId={sessionId}
        onSessionSelect={loadSession}
        onNewSession={startNewSession}
        characterName={character.name}
      />
    </Box>
  );
};

export default ChatPanel;