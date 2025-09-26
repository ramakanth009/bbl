import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'; // ✅ Add useOutletContext
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import apiService from '../../services/api';

const useStyles = makeStyles({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '16px',
    '@media (max-width: 1200px)': {
      gap: '14px',
      minHeight: '55vh',
    },
    '@media (max-width: 960px)': {
      gap: '12px',
      minHeight: '50vh',
    },
    '@media (max-width: 600px)': {
      gap: '10px',
      minHeight: '45vh',
      padding: '0 16px',
    },
    '@media (max-width: 480px)': {
      gap: '8px',
      minHeight: '40vh',
      padding: '0 12px',
    },
    '@media (max-width: 375px)': {
      gap: '6px',
      minHeight: '35vh',
      padding: '0 8px',
    },
  },
  errorContainer: {
    padding: '40px 20px',
    textAlign: 'center',
    '@media (max-width: 1200px)': {
      padding: '36px 18px',
    },
    '@media (max-width: 960px)': {
      padding: '32px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '28px 14px',
    },
    '@media (max-width: 480px)': {
      padding: '24px 12px',
    },
    '@media (max-width: 375px)': {
      padding: '20px 8px',
    },
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#fca5a5',
    borderRadius: '12px',
    '@media (max-width: 1200px)': {
      borderRadius: '10px',
    },
    '@media (max-width: 960px)': {
      borderRadius: '8px',
    },
    '@media (max-width: 600px)': {
      borderRadius: '6px',
    },
    '@media (max-width: 480px)': {
      borderRadius: '4px',
    },
    '@media (max-width: 375px)': {
      borderRadius: '2px',
    },
  },
  loadingText: {
    '@media (max-width: 960px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
  },
  backText: {
    '@media (max-width: 960px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
  },
});

const SessionChat = () => {
  const classes = useStyles();
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ GET SIDEBAR STATE FROM DASHBOARD CONTEXT - This was missing!
  const context = useOutletContext();
  const sidebarState = context?.sidebarState || { 
    isOpen: true, 
    isMobile: false, 
    sidebarWidth: 280, 
    isCollapsed: false 
  };

  useEffect(() => {
    if (sessionId) {
      loadSessionData();
    }
  }, [sessionId]);

  const loadSessionData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load session messages
      const sessionResponse = await apiService.getSessionMessages(sessionId);
      
      if (!sessionResponse.chat_history) {
        throw new Error('Session data is invalid');
      }

      // Extract character name from the session
      const characterName = sessionResponse.character || 
        (sessionResponse.chat_history.length > 0 && sessionResponse.chat_history[0].character);
      
      if (!characterName) {
        throw new Error('Could not determine character from session');
      }

      // Load character data
      const characters = await apiService.getCharacters();
      const charArray = Array.isArray(characters) ? characters : 
                       Array.isArray(characters.characters) ? characters.characters : [];
      
      // Create a more flexible character name matcher
      const normalizeName = (name) => {
        if (!name) return '';
        // Remove parenthetical nicknames, special characters and extra spaces, convert to lowercase
        const withoutParens = name.replace(/\([^)]*\)/g, ' ');
        return withoutParens.toLowerCase()
          .replace(/[^\w\s]/g, '')  // Remove special characters
          .replace(/\s+/g, ' ')      // Replace multiple spaces with single space
          .trim();
      };

      const normalizedSearchName = normalizeName(characterName);
      
      // Try exact match first
      let selectedCharacter = charArray.find(char => 
        (char.name && normalizeName(char.name) === normalizedSearchName) ||
        (char.title && normalizeName(char.title) === normalizedSearchName) ||
        (char.character && normalizeName(char.character) === normalizedSearchName)
      );

      // If exact match not found, try partial/contains match
      if (!selectedCharacter) {
        selectedCharacter = charArray.find(char => {
          const candidates = [char.name, char.title, char.character].filter(Boolean).map(normalizeName);
          return candidates.some(c => c.includes(normalizedSearchName) || normalizedSearchName.includes(c));
        });
      }

      // If still not found, try search API
      if (!selectedCharacter) {
        try {
          const searchResult = await apiService.searchCharacters(characterName);
          const candidates = Array.isArray(searchResult?.characters) ? searchResult.characters : [];
          selectedCharacter = candidates.find(char => {
            const names = [char.name, char.title, char.character].filter(Boolean).map(normalizeName);
            return names.some(n => n === normalizedSearchName);
          }) || candidates.find(char => {
            const names = [char.name, char.title, char.character].filter(Boolean).map(normalizeName);
            return names.some(n => n.includes(normalizedSearchName) || normalizedSearchName.includes(n));
          });
        } catch (e) {
          console.warn('Search API failed while resolving character:', e?.message);
        }
      }

      // Final fallback: load across pages (limited) using getAllCharacters
      if (!selectedCharacter) {
        try {
          const allCharacters = await apiService.getAllCharacters();
          selectedCharacter = allCharacters.find(char => {
            const names = [char.name, char.title, char.character].filter(Boolean).map(normalizeName);
            return names.some(n => n === normalizedSearchName);
          }) || allCharacters.find(char => {
            const names = [char.name, char.title, char.character].filter(Boolean).map(normalizeName);
            return names.some(n => n.includes(normalizedSearchName) || normalizedSearchName.includes(n));
          });
        } catch (e) {
          console.warn('Failed to load all characters for matching:', e?.message);
        }
      }

      if (!selectedCharacter) {
        console.warn('Character not found after all strategies. Available sample names:', 
          (charArray || []).slice(0, 10).map(c => c?.name || c?.title || c?.character).filter(Boolean));
        throw new Error(`Character "${characterName}" not found`);
      }

      // Format messages
      const formattedMessages = sessionResponse.chat_history.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        language: msg.language
      }));

      setCharacter(selectedCharacter);
      setSessionData({
        sessionId: sessionId,
        messages: formattedMessages,
        character: selectedCharacter
      });

    } catch (error) {
      console.error('Failed to load session:', error);
      setError(error.message || 'Failed to load session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseChat = () => {
    // Navigate back to history page
    navigate('/dashboard/history');
  };

  const handleBackToHistory = () => {
    // Navigate back to history page
    navigate('/dashboard/history');
  };

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress sx={{ color: '#6366f1' }} size={40} />
        <Typography variant="body2" sx={{ color: '#9ca3af' }} className={classes.loadingText}>
          Loading session...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.errorContainer}>
        <Alert 
          severity="error" 
          className={classes.errorAlert}
          sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}
        >
          {error}
        </Alert>
        <Typography 
          variant="body2" 
          className={classes.backText}
          sx={{ 
            color: '#9ca3af', 
            cursor: 'pointer',
            '&:hover': { color: '#6366f1' }
          }}
          onClick={handleBackToHistory}
        >
          ← Back to History
        </Typography>
      </Box>
    );
  }

  if (!character || !sessionData) {
    return (
      <Box className={classes.errorContainer}>
        <Alert 
          severity="warning" 
          className={classes.errorAlert}
          sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}
        >
          Session data not found
        </Alert>
        <Typography 
          variant="body2" 
          className={classes.backText}
          sx={{ 
            color: '#9ca3af', 
            cursor: 'pointer',
            '&:hover': { color: '#6366f1' }
          }}
          onClick={handleBackToHistory}
        >
          ← Back to History
        </Typography>
      </Box>
    );
  }

  return (
    <ChatPanel
      open={true}
      character={character}
      onClose={handleCloseChat}
      onBack={handleBackToHistory}
      initialMessages={sessionData.messages}
      initialSessionId={sessionData.sessionId}
      sidebarState={sidebarState} // ✅ PASS SIDEBAR STATE - This was missing!
    />
  );
};

export default SessionChat;