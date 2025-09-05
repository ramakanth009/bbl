import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { flushSync } from 'react-dom';
import Header from '../../components/dashboard/main/Header';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import MetaTagProvider from '../../components/common/MetaTagProvider';
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
    transition: 'all 0.3s ease',
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

  // Load all characters once for lookup
  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      try {
        const chars = await apiService.getCharacters();
        const charArray = Array.isArray(chars)
          ? chars
          : Array.isArray(chars.characters)
            ? chars.characters
            : [];
        
        if (isMounted && JSON.stringify(charArray) !== JSON.stringify(characters)) {
          setCharacters(charArray);
        }
      } catch (e) {
        console.error('Failed to fetch characters:', e);
      }
    };

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, []);

  // FIXED: Handle URL-based chat opening with navigation state priority
  useEffect(() => {
    console.log('🔍 Discover URL Effect - chatCharacterId:', chatCharacterId);
    
    if (!chatCharacterId) {
      if (isChatOpen) {
        console.log('🚪 No character ID in URL, closing chat');
        setIsChatOpen(false);
        setTimeout(() => setSelectedCharacter(null), 300);
      }
      return;
    }

    // First priority: Check if character was passed through navigation state
    const characterFromState = location.state?.character;
    
    if (characterFromState && String(characterFromState.id) === String(chatCharacterId)) {
      console.log('✅ Found character from navigation state:', characterFromState.name);
      if (!selectedCharacter || selectedCharacter.id !== characterFromState.id || !isChatOpen) {
        console.log('🔄 Updating chat state from navigation state');
        setSelectedCharacter(characterFromState);
        setIsChatOpen(true);
      }
      return;
    }

    // Second priority: Find in loaded characters array
    const foundInLoaded = characters.find(c => String(c.id) === String(chatCharacterId));
    
    if (foundInLoaded) {
      console.log('✅ Found character in loaded array:', foundInLoaded.name);
      if (!selectedCharacter || selectedCharacter.id !== foundInLoaded.id || !isChatOpen) {
        console.log('🔄 Updating chat state from loaded characters');
        setSelectedCharacter(foundInLoaded);
        setIsChatOpen(true);
      }
      return;
    }

    // Third priority: Try to fetch character by ID (for direct URL access)
    const fetchCharacterById = async () => {
      try {
        console.log('🔍 Character not found locally, fetching from API...');
        
        let foundCharacter = null;
        
        // Try to get the character directly by ID
        try {
          foundCharacter = await apiService.getCharacterById(chatCharacterId);
          console.log('✅ Found character using getCharacterById:', foundCharacter?.name);
        } catch (error) {
          console.log('⚠️ getCharacterById failed, trying alternative method...');
          
          // Try alternative endpoint
          try {
            foundCharacter = await apiService.getSingleCharacter(chatCharacterId);
            console.log('✅ Found character using getSingleCharacter:', foundCharacter?.name);
          } catch (error2) {
            console.log('⚠️ Alternative methods failed, character not found');
          }
        }
        
        if (foundCharacter) {
          console.log('✅ Successfully fetched character:', foundCharacter.name);
          if (!selectedCharacter || selectedCharacter.id !== foundCharacter.id || !isChatOpen) {
            console.log('🔄 Updating chat state from API fetch');
            setSelectedCharacter(foundCharacter);
            setIsChatOpen(true);
            
            // Add to characters array for future use
            setCharacters(prev => {
              const exists = prev.find(c => c.id === foundCharacter.id);
              return exists ? prev : [foundCharacter, ...prev];
            });
          }
        } else {
          console.log('❌ Character not found anywhere for ID:', chatCharacterId);
          setSelectedCharacter(null);
          setIsChatOpen(false);
        }
      } catch (error) {
        console.error('Failed to fetch character by ID:', error);
        setSelectedCharacter(null);
        setIsChatOpen(false);
      }
    };

    // Only fetch if we have characters loaded (to avoid running before initialization)
    if (characters.length > 0) {
      fetchCharacterById();
    }
    
  }, [chatCharacterId, characters, location.state]);

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
      const characterPath = createCharacterPath('/dashboard/discover/chat', character.id, character.name);
      navigate(characterPath, { 
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
    navigate('/dashboard/discover');
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

  return (
    <>
      {/* Meta Tag Provider for dynamic meta tags */}
      <MetaTagProvider character={selectedCharacter} section="discover" />
      
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