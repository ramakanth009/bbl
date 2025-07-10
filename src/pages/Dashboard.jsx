import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Sidebar from '../components/dashboard/main/Sidebar';
import Header from '../components/dashboard/main/Header';
import CharacterGrid from '../components/dashboard/character/CharacterGrid';
import ChatPanel from '../components/dashboard/chat/ChatPanel';
import StarField from '../components/common/StarField';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api';

// Styles using makeStyles
const useStyles = makeStyles({
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    // background: '#181a1b', // optional: set your background here
  },
  mainContent: {
    marginLeft: 280,
    flex: 1,
    display: 'flex',
    '@media (max-width: 900px)': {
      marginLeft: 0,
    },
  },
  contentArea: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
    transition: 'all 0.3s ease',
    display: 'block',
    '@media (max-width: 900px)': {
      padding: '16px',
    },
  },
  contentAreaHidden: {
    display: 'none',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Discover');
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
        // Only update if data actually changed (shallow compare by JSON)
        if (
          isMounted &&
          JSON.stringify(chars) !== JSON.stringify(characters)
        ) {
          setCharacters(chars);
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
      } 
      // else {
      //   setSelectedCharacter(null);
      //   setIsChatOpen(false);
      // }
    } 
    // else {
    //   setIsChatOpen(false);
    // }
  }, [chatCharacterId, characters]);

  // When chat is started, update the route
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
    navigate(`/dashboard/chat/${character.id}`);
  };

  // When chat is closed, return to /dashboard
  const handleChatClose = () => {
    setIsChatOpen(false);
    setTimeout(() => setSelectedCharacter(null), 300);
    navigate('/dashboard');
  };

  const handleBackToCharacters = () => {
    setIsChatOpen(false);
    // Don't clear selectedCharacter immediately to allow for potential re-opening
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {/* StarField as the global background */}
      <StarField />
      <Box className={classes.dashboardContainer}>
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <Box className={classes.mainContent}>
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
              activeSection={activeSection}
            />
          </Box>
          <ChatPanel
            open={isChatOpen}
            character={selectedCharacter}
            onClose={handleChatClose}
            onBack={handleChatClose}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;