import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { flushSync } from 'react-dom';
import Header from '../../components/dashboard/main/Header';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import { useNavigate, useParams, useOutletContext, useLocation } from 'react-router-dom';
import apiService from '../../services/api';
import { createCharacterPath, parseCharacterFromUrl, validateSlugMatch, createCharacterNavigationState } from '../../utils/slugUtils';

const useStyles = makeStyles({
  discoverContainer: {
    display: 'flex',
    flex: 1,
  },
  contentArea: {
    flex: 1,
    padding: '14px',
    overflow: 'auto',
    // Limit transitions to opacity only to avoid layout thrash on section changes
    transition: 'opacity 0.2s ease',
    display: 'block',
    '@media (max-width: 1200px)': {
      padding: '12px',
    },
    '@media (max-width: 960px)': {
      padding: '10px',
    },
    '@media (max-width: 900px)': {
      padding: '16px',
    },
    '@media (max-width: 600px)': {
      padding: '8px',
    },
    '@media (max-width: 480px)': {
      padding: '6px',
    },
    '@media (max-width: 375px)': {
      padding: '4px',
    },
  },
  contentAreaHidden: {
    display: 'none',
  },
  desktopHeader: {
    display: 'block',
    '@media (max-width: 900px)': {
      display: 'none !important',
    },
  },
});

const Discover = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
  const navigate = useNavigate();
  const location = useLocation();
  const { characterId: chatCharacterId, characterName: chatCharacterName } = useParams();
  const refreshIntervalRef = useRef(null);
  
  // Get sidebar state from Dashboard context
  const context = useOutletContext();
  const sidebarState = context?.sidebarState || { 
    isOpen: true, 
    isMobile: false, 
    sidebarWidth: 280, 
    isCollapsed: false 
  };

  useEffect(() => {
    const loadDiscoverData = async () => {
      setStatus('loading');
      try {
        // Step 1: Fetch all characters for the grid
        const chars = await apiService.getCharacters();
        const charArray = Array.isArray(chars)
          ? chars
          : Array.isArray(chars.characters)
            ? chars.characters
            : [];
        setCharacters(charArray);

        // Step 2: If a character ID is in the URL, handle it
        if (chatCharacterId) {
          let character = charArray.find(c => String(c.id) === String(chatCharacterId));

          // If the character isn't in the main list, fetch it directly
          if (!character) {
            console.log(`Character ${chatCharacterId} not in main list, fetching directly...`);
            character = await apiService.getCharacterById(chatCharacterId);
          }

          if (character) {
            setSelectedCharacter(character);
            setIsChatOpen(true);
          } else {
            console.error(`Character with ID ${chatCharacterId} could not be found.`);
            // Redirect to discover base page if character is not found
            navigate('/dashboard/discover', { replace: true });
          }
        } else {
          // If no character ID in URL, ensure chat is closed
          setIsChatOpen(false);
          setSelectedCharacter(null);
        }

        setStatus('succeeded');
      } catch (error) {
        console.error('Failed to load data for Discover page:', error);
        setStatus('failed');
      }
    };

    loadDiscoverData();
  }, [chatCharacterId, navigate]);

  // FIXED: When chat is started, pass character through navigation state
  const handleCharacterClick = (character) => {
    console.log('🚀 Starting chat with character from Discover:', character.name);
    
    try {
      // Use flushSync to ensure all state updates happen synchronously
      flushSync(() => {
        setSelectedCharacter(character);
        setIsChatOpen(true);
      });
      
      // Navigate with character data in state for immediate access using new URL structure
      const characterPath = createCharacterPath('/dashboard/discover', character.id, character.name);
      // Preserve current query params (e.g., discover_page) while navigating to chat
      const query = location.search || '';
      navigate(`${characterPath}${query}`, { 
        replace: false,
        state: createCharacterNavigationState(character) // This ensures instant access to character data
      });
      
      console.log('✨ Chat opened successfully for:', character.name);
      
    } catch (error) {
      console.error('Failed to start chat:', error);
      // Reset states on error
      setSelectedCharacter(null);
      setIsChatOpen(false);
    }
  };

  // When chat is closed, return to /dashboard/discover
  const handleChatClose = () => {
    console.log('❌ Closing chat panel in Discover');
    setIsChatOpen(false);
    setTimeout(() => setSelectedCharacter(null), 300);
    // Preserve current query params (e.g., discover_page) when returning to list
    const query = location.search || '';
    navigate(`/dashboard/discover${query}`);
  };

  // Add debugging effect to monitor state changes
  useEffect(() => {
    console.log('📊 Discover State Update:', {
      selectedCharacter: selectedCharacter?.name || 'None',
      isChatOpen,
      chatCharacterId,
      charactersLength: characters.length,
      hasNavigationState: !!location.state?.character
    });
  }, [selectedCharacter, isChatOpen, chatCharacterId, characters.length, location.state]);

  if (status === 'loading' || status === 'idle') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Failed to load characters. Please try refreshing the page.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className={classes.discoverContainer}>
        <Box
          className={
            isChatOpen
              ? `${classes.contentArea} ${classes.contentAreaHidden}`
              : classes.contentArea
          }
        >
          {/* Desktop Header - Hidden on mobile */}
          <Box className={classes.desktopHeader}>
            <Header />
          </Box>
          
          <CharacterGrid 
            onCharacterClick={handleCharacterClick}
            activeSection="Discover"
            characters={characters}
          />
        </Box>
        
        <ChatPanel
          open={isChatOpen}
          character={selectedCharacter}
          onClose={handleChatClose}
          onBack={handleChatClose}
          sidebarState={sidebarState}
        />
      </Box>
    </>
  );
};

export default Discover;