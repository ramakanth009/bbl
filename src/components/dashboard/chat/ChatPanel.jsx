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
  History as HistoryIcon,
  ArrowBack,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
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
    height: '100vh',
    zIndex: 2,
    width: '100%', // Fill parent container
    position: 'relative', // Allow stacking if needed
  },
  chatContainerOpen: {
    width: '100%', // Always fill parent
  },
  chatContainerClosed: {
    width: 0,
  },
  chatHeader: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '12px',
    borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
    background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.7), rgba(18, 18, 18, 0.6))',
    backdropFilter: 'blur(8px)',
    position: 'relative',
    minHeight: 'auto', // Allow header to grow
    maxHeight: 'none', // Remove height restrictions
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.15), transparent)',
    },
  },
  chatHeaderTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '56px', // Ensure minimum height for controls
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
    '& .MuiTypography-h6': {
      background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontSize: '1.25rem',
      marginBottom: '4px',
    },
  },
  characterDescription: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: '#d1d5db',
    whiteSpace: 'pre-wrap', // Preserve line breaks
    wordWrap: 'break-word', // Break long words
    overflowWrap: 'break-word', // Modern alternative
    width: '100%',
    maxWidth: '100%',
    overflow: 'visible', // Ensure no hidden text
    display: 'block', // Full block display
    marginTop: '8px',
    padding: '8px 0',
    '@media (max-width: 960px)': {
      fontSize: '0.8rem',
      lineHeight: 1.5,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  chatHeaderRight: {
    display: 'flex',
    alignItems: 'flex-start', // Align to top to prevent stretching
    gap: '8px',
    flexShrink: 0, // Prevent shrinking
    '& .MuiIconButton-root': {
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(42, 42, 42, 0.8))',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      '&:hover': {
        background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))',
        borderColor: 'rgba(99, 102, 241, 0.6)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      },
      '& .MuiSvgIcon-root': {
        fontSize: '20px',
        transition: 'all 0.3s ease',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    },
  },
  backButton: {
    width: '40px !important',
    height: '40px !important',
    borderRadius: '12px !important',
    background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(42, 42, 42, 0.8)) !important',
    border: '1px solid rgba(99, 102, 241, 0.2) !important',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
    '&:hover': {
      background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1)) !important',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  messagesWrapper: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 12px',
  },
  messagesContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  messagesEnd: {
    height: '1px',
    width: '100%',
  },
  enhancedChip: {
    fontSize: '0.7rem',
    height: 20,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(99, 102, 241, 0.6)',
      transform: 'translateY(-1px)',
    },
  },
  nativeChip: {
    fontSize: '0.7rem',
    height: 20,
    backgroundColor: 'rgba(76,175,80,0.15)',
    border: '1px solid rgba(76,175,80,0.3)',
    '& .MuiChip-label': {
      color: '#81c784',
    },
  },
  languageStatus: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
    flexWrap: 'wrap', // Allow wrapping on small screens
    '& .MuiChip-root': {
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      '&:hover': {
        transform: 'translateY(-1px)',
      },
    },
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '12px',
    marginBottom: '16px',
    '& .MuiAlert-message': {
      color: '#fecaca',
    },
    '& .MuiAlert-icon': {
      color: '#ef4444',
    },
  },
}));

const ChatPanel = ({ character, onClose, onBack }) => {
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
  const messagesWrapperRef = useRef(null);
  const { category } = useParams(); // For category-based routes, if needed

  useEffect(() => {
    if (character) {
      initializeChat();
      loadUserSessions();
      loadLanguagePreferences();
      
      // Set default language based on character's native language
      if (character.native_language) {
        console.log('🔧 Setting language to character native:', character.native_language);
        setLanguage(character.native_language);
      }
    }
  }, [character]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Improved scroll to bottom function
  const scrollToBottom = () => {
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      } else if (messagesWrapperRef.current) {
        // Fallback: scroll the wrapper to bottom
        messagesWrapperRef.current.scrollTop = messagesWrapperRef.current.scrollHeight;
      }
    });
  };

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

  const initializeChat = () => {
    setMessages([]);
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

  if (!character) {
    return null;
  }

  return (
    <Box 
      className={`${classes.chatContainer} ${classes.chatContainerOpen}`}
      sx={{ 
        borderLeft: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <Box className={classes.chatHeader}>
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
                    className={classes.enhancedChip}
                  />
                )}
                {character.native_language && character.native_language !== 'english' && (
                  <Chip 
                    label={`Native: ${character.native_language}`} 
                    size="small" 
                    className={classes.nativeChip}
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
        
        {/* Enhanced description display with full visibility */}
        {character.description && (
          <Box sx={{ width: '100%', mt: 1 }}>
            <Typography className={classes.characterDescription}>
              {character.description}
            </Typography>
          </Box>
        )}
        
        {/* Enhanced language status display */}
        {language !== 'english' && (
          <Box className={classes.languageStatus}>
            <Chip 
              label={`Language: ${language}`}
              size="small"
              className={classes.enhancedChip}
            />
            {character.native_language && language === character.native_language && (
              <Chip 
                label="Native Mode"
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,193,7,0.15)',
                  borderColor: 'rgba(255,193,7,0.3)',
                  '& .MuiChip-label': {
                    color: '#ffd54f',
                  }
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
            className={classes.errorAlert}
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

      <Box className={classes.messagesWrapper} ref={messagesWrapperRef}>
        <Box className={classes.messagesContent}>
          <MessageList 
            messages={messages} 
            loading={loading}
            showLanguageLabels={language !== 'english'}
          />
          <div ref={messagesEndRef} className={classes.messagesEnd} />
        </Box>
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