import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import Sidebar from '../components/dashboard/main/Sidebar';
import ChatPanel from '../components/dashboard/chat/ChatPanel';
import StarField from '../components/common/StarField';
import apiService from '../services/api';

// Section components
import Discover from './sections/Discover';
import Featured from './sections/Featured';
import Trending from './sections/Trending';
import ForYou from './sections/ForYou';
import Recent from './sections/Recent';

const useStyles = makeStyles({
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    background: '#181a1b',
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
  const location = useLocation();
  const { characterId: chatCharacterId } = useParams();
  const refreshIntervalRef = useRef(null);

  // Update active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/discover')) {
      setActiveSection('Discover');
    } else if (path.includes('/featured')) {
      setActiveSection('Featured');
    } else if (path.includes('/trending')) {
      setActiveSection('Trending');
    } else if (path.includes('/for-you')) {
      setActiveSection('For You');
    } else if (path.includes('/recent')) {
      setActiveSection('Recent');
    }
  }, [location.pathname]);

  // Load characters data
  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      try {
        const chars = await apiService.getCharacters();
        if (isMounted && JSON.stringify(chars) !== JSON.stringify(characters)) {
          setCharacters(chars);
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

  // Open chat panel if chatCharacterId is present in the route
  useEffect(() => {
    if (characters.length === 0) return;

    if (chatCharacterId) {
      const found = characters.find(c => String(c.id) === String(chatCharacterId));
      if (found) {
        setSelectedCharacter(found);
        setIsChatOpen(true);
      }
    } else {
      setIsChatOpen(false);
      setSelectedCharacter(null);
    }
  }, [chatCharacterId, characters]);

  // Handle section change from sidebar
  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
    
    // Navigate to corresponding route
    const routes = {
      'Discover': '/dashboard/discover',
      'Featured': '/dashboard/featured',
      'Trending': '/dashboard/trending',
      'For You': '/dashboard/for-you',
      'Recent': '/dashboard/recent',
    };
    
    const path = routes[sectionName];
    if (path && location.pathname !== path) {
      navigate(path);
    }
  };

  // Handle character click (open chat)
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
    navigate(`/chat/${encodeURIComponent(character.name)}`);
  };

  // Handle chat close
  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedCharacter(null);
    // Navigate back to current section
    const currentPath = location.pathname;
    if (currentPath.startsWith('/chat/')) {
      navigate(`/dashboard/${activeSection.toLowerCase().replace(' ', '-')}`);
    }
  };

  // Handle character creation callback
  const handleCharacterCreated = (newCharacter) => {
    setCharacters(prev => [newCharacter, ...prev]);
    // Stay on Discover section after character creation
    if (activeSection !== 'Discover') {
      handleSectionChange('Discover');
    }
  };

  return (
    <>
      <React.Suspense fallback={<div />}>
        <StarField />
      </React.Suspense>
      
      <Box className={classes.dashboardContainer}>
        {/* Sidebar - Always visible */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onCharacterCreated={handleCharacterCreated}
        />

        {/* Main Content Area */}
        <Box className={classes.mainContent}>
          <Box className={isChatOpen ? classes.contentAreaHidden : classes.contentArea}>
            <Routes>
              <Route
                path="discover"
                element={
                  <Discover
                    onCharacterClick={handleCharacterClick}
                    characters={characters}
                    onCharacterCreated={handleCharacterCreated}
                  />
                }
              />
              <Route
                path="featured"
                element={
                  <Featured
                    onCharacterClick={handleCharacterClick}
                    characters={characters}
                  />
                }
              />
              <Route
                path="trending"
                element={
                  <Trending
                    onCharacterClick={handleCharacterClick}
                    characters={characters}
                  />
                }
              />
              <Route
                path="for-you"
                element={
                  <ForYou
                    onCharacterClick={handleCharacterClick}
                    characters={characters}
                  />
                }
              />
              <Route
                path="recent"
                element={
                  <Recent
                    onCharacterClick={handleCharacterClick}
                    characters={characters}
                  />
                }
              />
              {/* Default redirect to discover */}
              <Route path="" element={<Navigate to="discover" replace />} />
              <Route path="*" element={<Navigate to="discover" replace />} />
            </Routes>
          </Box>

          {/* Chat Panel - shown when chat is open */}
          {isChatOpen && selectedCharacter && (
            <ChatPanel
              character={selectedCharacter}
              onClose={handleChatClose}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;