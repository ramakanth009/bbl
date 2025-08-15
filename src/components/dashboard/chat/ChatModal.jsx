import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Avatar,
  Alert,
  Chip,
} from '@mui/material';
import { 
  Close, 
  Refresh, 
  Tune,
  History as HistoryIcon 
} from '@mui/icons-material';
import apiService from '../../../services/api';
import MessageList from '../message/MessageList';
import ChatInput from './ChatInput';
import CreativitySettingsMenu from '../CreativitySettingsMenu';
import SessionHistory from '../sessions/SessionHistory';
import StarField from '../../common/StarField';

const useStyles = makeStyles(() => ({
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: '#1a1a1a',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 12,
      width: '100%',
      maxWidth: 900,
      height: '80vh',
      margin: 24,
      '@media (max-width: 1200px)': {
        maxWidth: 800,
        height: '75vh',
        margin: 20,
        borderRadius: 10,
      },
      '@media (max-width: 960px)': {
        maxWidth: 700,
        height: '70vh',
        margin: 16,
        borderRadius: 8,
      },
      '@media (max-width: 600px)': {
        maxWidth: '95vw',
        height: '85vh',
        margin: 8,
        borderRadius: 6,
      },
      '@media (max-width: 480px)': {
        maxWidth: '98vw',
        height: '90vh',
        margin: 4,
        borderRadius: 4,
      },
      '@media (max-width: 375px)': {
        maxWidth: '100vw',
        height: '95vh',
        margin: 2,
        borderRadius: 2,
      },
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    '@media (max-width: 1200px)': {
      padding: '14px 18px',
    },
    '@media (max-width: 960px)': {
      padding: '12px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '10px 14px',
    },
    '@media (max-width: 480px)': {
      padding: '8px 12px',
    },
    '@media (max-width: 375px)': {
      padding: '6px 10px',
    },
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    '@media (max-width: 1200px)': {
      gap: 10,
    },
    '@media (max-width: 960px)': {
      gap: 8,
    },
    '@media (max-width: 600px)': {
      gap: 6,
    },
    '@media (max-width: 480px)': {
      gap: 4,
    },
    '@media (max-width: 375px)': {
      gap: 2,
    },
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    '@media (max-width: 1200px)': {
      gap: 7,
    },
    '@media (max-width: 960px)': {
      gap: 6,
    },
    '@media (max-width: 600px)': {
      gap: 5,
    },
    '@media (max-width: 480px)': {
      gap: 4,
    },
    '@media (max-width: 375px)': {
      gap: 3,
    },
  },
  avatarSize: {
    width: 40,
    height: 40,
    borderRadius: 1,
    '@media (max-width: 1200px)': {
      width: 38,
      height: 38,
    },
    '@media (max-width: 960px)': {
      width: 36,
      height: 36,
    },
    '@media (max-width: 600px)': {
      width: 34,
      height: 34,
    },
    '@media (max-width: 480px)': {
      width: 32,
      height: 32,
    },
    '@media (max-width: 375px)': {
      width: 30,
      height: 30,
    },
  },
  characterName: {
    '@media (max-width: 1200px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
    },
  },
  sessionChip: {
    fontSize: '0.7rem',
    height: 20,
    '@media (max-width: 1200px)': {
      fontSize: '0.65rem',
      height: 18,
    },
    '@media (max-width: 960px)': {
      fontSize: '0.6rem',
      height: 16,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.55rem',
      height: 14,
    },
    '@media (max-width: 480px)': {
      fontSize: '0.5rem',
      height: 12,
    },
    '@media (max-width: 375px)': {
      fontSize: '0.45rem',
      height: 10,
    },
  },
  iconButton: {
    color: 'text.secondary',
    '@media (max-width: 600px)': {
      padding: '6px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.2rem',
      },
    },
    '@media (max-width: 480px)': {
      padding: '4px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.1rem',
      },
    },
    '@media (max-width: 375px)': {
      padding: '2px',
      '& .MuiSvgIcon-root': {
        fontSize: '1rem',
      },
    },
  },
  errorAlert: {
    '@media (max-width: 600px)': {
      '& .MuiAlert-message': {
        fontSize: '0.875rem',
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiAlert-message': {
        fontSize: '0.825rem',
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiAlert-message': {
        fontSize: '0.8rem',
      },
    },
  },
  alertContainer: {
    padding: '16px',
    '@media (max-width: 1200px)': {
      padding: '14px',
    },
    '@media (max-width: 960px)': {
      padding: '12px',
    },
    '@media (max-width: 600px)': {
      padding: '10px',
    },
    '@media (max-width: 480px)': {
      padding: '8px',
    },
    '@media (max-width: 375px)': {
      padding: '6px',
    },
  },
}));

const ChatModal = ({ open, character, onClose }) => {
  const classes = useStyles();
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

  const handleClose = () => {
    setMessages([]);
    setSessionId(null);
    setError(null);
    onClose();
  };

  if (!character) return null;

  return (
    <>
      <StarField />
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth={false}
        className={classes.dialog}
      >
        <Box className={classes.header}>
          <Box className={classes.headerLeft}>
            <Avatar
              src={character.img}
              alt={character.name}
              className={classes.avatarSize}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold" className={classes.characterName}>
                {character.name}
              </Typography>
              {sessionId && (
                <Chip 
                  label={`Session ${sessionId}`} 
                  size="small" 
                  className={classes.sessionChip}
                />
              )}
            </Box>
          </Box>
          
          <Box className={classes.headerRight}>
            <IconButton 
              onClick={() => setShowSessions(!showSessions)}
              className={classes.iconButton}
              title="Session History"
            >
              <HistoryIcon />
            </IconButton>
            
            <IconButton 
              onClick={startNewSession}
              className={classes.iconButton}
              title="New Conversation"
            >
              <Refresh />
            </IconButton>
            
            <IconButton 
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              className={classes.iconButton}
              title="Creativity Settings"
            >
              <Tune />
            </IconButton>
            
            <IconButton onClick={handleClose} className={classes.iconButton}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <SessionHistory
          showSessions={showSessions}
          sessions={sessions}
          sessionId={sessionId}
          onNewSession={startNewSession}
          onLoadSession={loadSession}
        />

        {error && (
          <Box className={classes.alertContainer}>
            <Alert severity="error" onClose={() => setError(null)} className={classes.errorAlert}>
              {error}
            </Alert>
          </Box>
        )}

        <MessageList 
          messages={messages} 
          loading={loading} 
          character={character}
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
      </Dialog>
    </>
  );
};

export default ChatModal;