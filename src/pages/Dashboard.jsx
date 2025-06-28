import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import CharacterGrid from '../components/dashboard/CharacterGrid';
import ChatPanel from '../components/dashboard/ChatPanel';
import StarField from '../components/common/StarField';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  // Remove or comment out the background color!
  // background: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 280,
  flex: 1,
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const ContentArea = styled(Box)(({ theme, chatOpen }) => ({
  flex: 1,
  padding: theme.spacing(3),
  overflow: 'auto',
  transition: 'all 0.3s ease',
  display: chatOpen ? 'none' : 'block', // Always hide when chat is open
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const Dashboard = ({ chatCharacterId }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Discover');
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const refreshIntervalRef = useRef(null);

  // Load all characters once for lookup, and refresh in background
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

    // Background refresh every 60 seconds, but do not clear UI
    refreshIntervalRef.current = setInterval(fetchCharacters, 60000);

    return () => {
      isMounted = false;
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Open chat panel if chatCharacterId is present in the route
  useEffect(() => {
    if (chatCharacterId && characters.length > 0) {
      const found = characters.find(c => String(c.id) === String(chatCharacterId));
      if (found) {
        setSelectedCharacter(found);
        setIsChatOpen(true);
      } else {
        setSelectedCharacter(null);
        setIsChatOpen(false);
      }
    } else if (!chatCharacterId) {
      setIsChatOpen(false);
    }
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
      <DashboardContainer>
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <MainContent>
          <ContentArea chatOpen={isChatOpen}>
            <Header />
            <CharacterGrid 
              onCharacterClick={handleCharacterClick}
              activeSection={activeSection}
            />
          </ContentArea>
          <ChatPanel
            open={isChatOpen}
            character={selectedCharacter}
            onClose={handleChatClose}
            onBack={handleChatClose}
          />
        </MainContent>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;