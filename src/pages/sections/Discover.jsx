import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from '../../components/dashboard/main/Header';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../services/api';

// Styles using makeStyles
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
});

const Discover = () => {
  const classes = useStyles();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const { characterId: chatCharacterId } = useParams();
  const refreshIntervalRef = useRef(null);

  // Load all characters once for lookup
  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      try {
        const chars = await apiService.getCharacters();
        // Ensure we always set an array
        const charArray = Array.isArray(chars)
          ? chars
          : Array.isArray(chars.characters)
            ? chars.characters
            : [];
        // Only update if data actually changed (shallow compare by JSON)
        if (
          isMounted &&
          JSON.stringify(charArray) !== JSON.stringify(characters)
        ) {
          setCharacters(charArray);
        }
      } catch (e) {
        // Optionally handle error
      }
    };

    // Initial load
    fetchCharacters();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Open chat panel if chatCharacterId is present in the route
  useEffect(() => {
    // Only run this effect if characters have loaded
    if (characters.length === 0) return;

    if (chatCharacterId) {
      const found = characters.find(c => String(c.id) === String(chatCharacterId));
      if (found) {
        setSelectedCharacter(found);
        setIsChatOpen(true);
      } else {
        setSelectedCharacter(null);
        setIsChatOpen(false);
      }
    } else {
      setIsChatOpen(false);
    }
  }, [chatCharacterId, characters]);

  // When chat is started, update the route
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
    navigate(`/dashboard/discover/chat/${character.id}`);
  };

  // When chat is closed, return to /dashboard/discover
  const handleChatClose = () => {
    setIsChatOpen(false);
    setTimeout(() => setSelectedCharacter(null), 300);
    navigate('/dashboard/discover');
  };

  const handleBackToCharacters = () => {
    setIsChatOpen(false);
    // Don't clear selectedCharacter immediately to allow for potential re-opening
  };

  return (
    <Box className={classes.discoverContainer}>
      <Box
        className={
          isChatOpen
            ? `${classes.contentArea} ${classes.contentAreaHidden}`
            : classes.contentArea
        }
      >
        <Header />
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
      />
    </Box>
  );
};

export default Discover;