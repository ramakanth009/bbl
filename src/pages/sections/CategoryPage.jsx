import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Chip, useTheme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Header from '../../components/dashboard/main/Header';
import CharacterCard from '../../components/dashboard/character/CharacterCard';
import CreateCharacterButton from '../../components/dashboard/character/creation/CreateCharacterButton';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import TopBar from '../../components/dashboard/main/TopBar';
import apiService from '../../services/api';

const useStyles = makeStyles({
  categoryContainer: {
    display: 'flex',
    flex: 1,
    position: 'relative',
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
  section: {
    marginBottom: '48px !important',
    '@media (max-width: 1200px)': {
      marginBottom: '40px !important',
    },
    '@media (max-width: 960px)': {
      marginBottom: '32px !important',
    },
    '@media (max-width: 600px)': {
      marginBottom: '24px !important',
    },
    '@media (max-width: 480px)': {
      marginBottom: '20px !important',
    },
    '@media (max-width: 375px)': {
      marginBottom: '16px !important',
    },
  },
  sectionHeader: {
    display: 'flex !important',
    justifyContent: 'space-between !important',
    alignItems: 'flex-start !important',
    marginBottom: '24px !important',
    gap: '20px !important',
    '@media (max-width: 1200px)': {
      marginBottom: '20px !important',
      gap: '18px !important',
    },
    '@media (max-width: 960px)': {
      marginBottom: '18px !important',
      gap: '16px !important',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column !important',
      alignItems: 'stretch !important',
      marginBottom: '16px !important',
      gap: '12px !important',
    },
    '@media (max-width: 480px)': {
      marginBottom: '14px !important',
      gap: '10px !important',
    },
    '@media (max-width: 375px)': {
      marginBottom: '12px !important',
      gap: '8px !important',
    },
  },
  sectionHeaderContent: {
    flex: 1,
    minWidth: 0,
    display: 'flex !important',
    flexDirection: 'column !important',
    gap: '8px !important',
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  sectionTitle: {
    fontSize: '1.5rem !important',
    fontWeight: '700 !important',
    display: 'flex !important',
    alignItems: 'center !important',
    gap: '12px !important',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
    margin: '0 !important',
    lineHeight: '1.2 !important',
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem !important',
      gap: '10px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem !important',
      gap: '8px !important',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  sectionSubtitle: {
    color: '#9ca3af !important',
    fontSize: '0.875rem !important',
    margin: '0 !important',
    lineHeight: '1.4 !important',
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem !important',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  mobileCharacterCount: {
    display: 'none !important',
    '@media (max-width: 600px)': {
      display: 'flex !important',
      justifyContent: 'center !important',
      alignItems: 'center !important',
      width: '100% !important',
      marginBottom: '16px !important',
      '& .MuiChip-root': {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
        color: '#ffffff !important',
        fontWeight: '600 !important',
        fontSize: '0.9rem !important',
        padding: '8px 16px !important',
        borderRadius: '20px !important',
        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3) !important',
        border: '1px solid rgba(255, 255, 255, 0.1) !important',
        backdropFilter: 'blur(10px) !important',
        '& .MuiChip-label': {
          color: '#ffffff !important',
          fontWeight: '600 !important',
        },
      },
    },
    '@media (max-width: 480px)': {
      marginBottom: '14px !important',
      '& .MuiChip-root': {
        fontSize: '0.85rem !important',
        padding: '6px 14px !important',
        borderRadius: '18px !important',
      },
    },
    '@media (max-width: 375px)': {
      marginBottom: '12px !important',
      '& .MuiChip-root': {
        fontSize: '0.8rem !important',
        padding: '5px 12px !important',
        borderRadius: '16px !important',
      },
    },
  },
  characterCount: {
    color: '#ffffff !important',
    fontWeight: '600 !important',
    backgroundColor: 'rgba(99, 102, 241, 0.2) !important',
    border: '1px solid rgba(99, 102, 241, 0.3) !important',
    '& .MuiChip-label': {
      color: '#ffffff !important',
      fontSize: '0.75rem !important',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  characterBoxContainer: {
    display: 'grid !important',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr)) !important',
    gap: '20px !important',
    marginBottom: '40px !important',
    minHeight: '200px !important',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr)) !important',
      gap: '18px !important',
      marginBottom: '36px !important',
    },
    '@media (max-width: 960px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr)) !important',
      gap: '16px !important',
      marginBottom: '32px !important',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr !important',
      gap: '1px !important',
      marginBottom: '8px !important',
    },
    '@media (max-width: 480px)': {
      gap: '1px !important',
      marginBottom: '4px !important',
    },
    '@media (max-width: 375px)': {
      gap: '1px !important',
      marginBottom: '2px !important',
    },
  },
  emptyState: {
    textAlign: 'center !important',
    padding: '80px 20px !important',
    color: '#9ca3af !important',
    background: 'rgba(26, 26, 26, 0.3) !important',
    borderRadius: '16px !important',
    backdropFilter: 'blur(10px) !important',
    border: '1px solid rgba(99, 102, 241, 0.1) !important',
    '@media (max-width: 1200px)': {
      padding: '70px 18px !important',
      borderRadius: '14px !important',
    },
    '@media (max-width: 960px)': {
      padding: '60px 16px !important',
      borderRadius: '12px !important',
    },
    '@media (max-width: 600px)': {
      padding: '50px 14px !important',
      borderRadius: '10px !important',
    },
    '@media (max-width: 480px)': {
      padding: '40px 12px !important',
      borderRadius: '8px !important',
    },
    '@media (max-width: 375px)': {
      padding: '30px 10px !important',
      borderRadius: '6px !important',
    },
  },
  emptyStateTitle: {
    fontSize: '1.25rem !important',
    fontWeight: '600 !important',
    marginBottom: '8px !important',
    color: '#ffffff !important',
    '@media (max-width: 1200px)': {
      fontSize: '1.2rem !important',
      marginBottom: '7px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.15rem !important',
      marginBottom: '6px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem !important',
      marginBottom: '5px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.05rem !important',
      marginBottom: '4px !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem !important',
      marginBottom: '3px !important',
    },
  },
  loadingOverlay: {
    position: 'relative !important',
    minHeight: '400px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    borderRadius: '16px !important',
    backdropFilter: 'blur(10px) !important',
    border: '1px solid rgba(99, 102, 241, 0.1) !important',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(26, 26, 26, 0.3)',
      borderRadius: 'inherit',
      zIndex: 1,
    },
    '& > *': {
      position: 'relative',
      zIndex: 2,
    },
    '@media (max-width: 1200px)': {
      minHeight: '360px !important',
      borderRadius: '14px !important',
    },
    '@media (max-width: 960px)': {
      minHeight: '320px !important',
      borderRadius: '12px !important',
    },
    '@media (max-width: 600px)': {
      minHeight: '280px !important',
      borderRadius: '10px !important',
    },
    '@media (max-width: 480px)': {
      minHeight: '240px !important',
      borderRadius: '8px !important',
    },
    '@media (max-width: 375px)': {
      minHeight: '200px !important',
      borderRadius: '6px !important',
    },
  },
});

const CategoryPage = ({ onSidebarToggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { categoryKey, characterId } = useParams();
  const navigate = useNavigate();
  
  const [characters, setCharacters] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [existingSession, setExistingSession] = useState(null);

  // Get sidebar state from Dashboard context
  const context = useOutletContext();
  const sidebarState = context?.sidebarState || { 
    isOpen: true, 
    isMobile: false, 
    sidebarWidth: 280, 
    isCollapsed: false 
  };

  useEffect(() => {
    loadCategoryCharacters();
  }, [categoryKey]);

  // FIXED: Handle URL-based chat opening with navigation state priority
  useEffect(() => {
    console.log('🔍 Category URL Effect - characterId:', characterId, 'characters.length:', characters.length);
    
    if (!characterId) {
      if (isChatOpen) {
        console.log('🚪 No character ID in URL, closing chat');
        setIsChatOpen(false);
        setTimeout(() => setSelectedCharacter(null), 300);
      }
      return;
    }

    // First priority: Find in loaded characters array (most common case)
    const character = characters.find(c => 
      String(c.id) === String(characterId) || c.id === parseInt(characterId)
    );
    
    if (character) {
      console.log('✅ Found character for URL:', character.name);
      // Only update if different character or chat is closed
      if (!selectedCharacter || selectedCharacter.id !== character.id || !isChatOpen) {
        console.log('🔄 Updating chat state from URL');
        setSelectedCharacter(character);
        setIsChatOpen(true);
      }
      return;
    }

    // Second priority: Try to fetch character by ID if not in current category
    const fetchCharacterById = async () => {
      try {
        console.log('🔍 Character not in category, fetching from API...');
        
        let foundCharacter = null;
        
        try {
          foundCharacter = await apiService.getCharacterById(characterId);
          console.log('✅ Found character using getCharacterById:', foundCharacter?.name);
        } catch (error) {
          console.log('⚠️ getCharacterById failed for category page');
        }
        
        if (foundCharacter) {
          console.log('✅ Successfully fetched character for category:', foundCharacter.name);
          setSelectedCharacter(foundCharacter);
          setIsChatOpen(true);
        } else {
          console.log('❌ Character not found for ID:', characterId);
        }
      } catch (error) {
        console.error('Failed to fetch character by ID:', error);
      }
    };

    // Only fetch if we have characters loaded but didn't find the one we need
    if (characters.length > 0) {
      fetchCharacterById();
    }
  }, [characterId, characters])

  const loadCategoryCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getCharactersByCategory(categoryKey);
      setCharacters(response.characters || []);
      setCategoryName(response.category_name || '');
    } catch (error) {
      console.error('Failed to load category characters:', error);
      setError('Failed to load characters for this category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Improved handleStartChat with better state management
  const handleStartChat = async (character, session = null) => {
    console.log('🚀 Starting chat with character:', character.name);
    
    try {
      // Use flushSync to ensure all state updates happen synchronously
      flushSync(() => {
        setSelectedCharacter(character);
        setExistingSession(session);
        setIsChatOpen(true);
      });
      
      // Now navigate - states are guaranteed to be set
      navigate(`/dashboard/categories/${categoryKey}/chat/${character.id}`, { 
        replace: false 
      });
      
      // If there's an existing session, load it
      if (session && session.session_id) {
        console.log('📝 Loading existing session:', session.session_id);
        // The ChatPanel will handle loading the session
      } else {
        console.log('✨ Starting new conversation with', character.name);
      }
      
    } catch (error) {
      console.error('Failed to start chat:', error);
      setError('Failed to start chat. Please try again.');
    }
  };

  const handleChatClose = () => {
    console.log('❌ Closing chat panel');
    setIsChatOpen(false);
    setSelectedCharacter(null);
    setExistingSession(null);
    navigate(`/dashboard/categories/${categoryKey}`);
  };

  const handleCharacterCreated = (newCharacter) => {
    if (newCharacter.category === categoryKey) {
      setCharacters(prev => [newCharacter, ...prev]);
    }
  };

  const handleSectionChange = (section) => {
    navigate(`/dashboard/${section}`);
  };

  const handleMenuToggle = () => {
    if (onSidebarToggle) {
      onSidebarToggle();
    }
  };

  const handleSearchToggle = () => {
    console.log('Search toggle');
  };

  // Enhanced count formatter
  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getCountLabel = (count) => {
    return count === 1 ? 'character' : 'characters';
  };

  // Add debugging effect to monitor state changes
  useEffect(() => {
    console.log('📊 State Update:', {
      selectedCharacter: selectedCharacter?.name || 'None',
      isChatOpen,
      characterId,
      charactersLength: characters.length
    });
  }, [selectedCharacter, isChatOpen, characterId, characters.length]);

  if (loading) {
    return (
      <Box className={classes.categoryContainer}>
        {/* Mobile TopBar */}
        {isMobile && (
          <TopBar
            activeSection={`categories/${categoryKey}`}
            onSectionChange={handleSectionChange}
            onMenuToggle={handleMenuToggle}
            onSearchToggle={handleSearchToggle}
          />
        )}
        
        <Box className={classes.contentArea}>
          <Box className={classes.desktopHeader}>
            <Header />
          </Box>
          <Box className={classes.loadingOverlay}>
            <CircularProgress sx={{ color: '#6366f1' }} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.categoryContainer}>
        {/* Mobile TopBar */}
        {isMobile && (
          <TopBar
            activeSection={`categories/${categoryKey}`}
            onSectionChange={handleSectionChange}
            onMenuToggle={handleMenuToggle}
            onSearchToggle={handleSearchToggle}
          />
        )}
        
        <Box className={classes.contentArea}>
          <Box className={classes.desktopHeader}>
            <Header />
          </Box>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#fecaca'
            }}
          >
            {error}
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.categoryContainer}>
      {/* Mobile TopBar */}
      {isMobile && (
        <TopBar
          activeSection={`categories/${categoryKey}`}
          onSectionChange={handleSectionChange}
          onMenuToggle={handleMenuToggle}
          onSearchToggle={handleSearchToggle}
        />
      )}

      <Box className={`${classes.contentArea} ${isChatOpen ? classes.contentAreaHidden : ''}`}>
        {/* Desktop Header */}
        <Box className={classes.desktopHeader}>
          <Header />
        </Box>
        
        <Box className={classes.section}>
          <Box className={classes.sectionHeader}>
            <Box className={classes.sectionHeaderContent}>
              <Typography className={classes.sectionTitle}>
                {categoryName || 'Category Characters'}
                <Chip 
                  label={`${formatCount(characters.length)} ${getCountLabel(characters.length)}`} 
                  size="small"
                  className={classes.characterCount}
                />
              </Typography>
              <Typography className={classes.sectionSubtitle}>
                Explore characters from the {categoryName?.toLowerCase()} category
              </Typography>
            </Box>
          </Box>
          
          {/* Mobile-only enhanced count */}
          <Box className={classes.mobileCharacterCount}>
            <Chip 
              label={`${formatCount(characters.length)} ${getCountLabel(characters.length)}`} 
              size="small"
            />
          </Box>
          
          {characters.length === 0 ? (
            <Box className={classes.emptyState}>
              <Typography className={classes.emptyStateTitle}>
                No characters found
              </Typography>
              <Typography>
                No characters are available in this category yet.
              </Typography>
            </Box>
          ) : (
            <Box className={classes.characterBoxContainer}>
              <CreateCharacterButton onCharacterCreated={handleCharacterCreated} />
              {characters.map((character) => (
                <CharacterCard 
                  key={character.id} 
                  character={character}
                  onStartChat={handleStartChat}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {isChatOpen && selectedCharacter && (
        <ChatPanel
          open={isChatOpen}
          character={selectedCharacter}
          onClose={handleChatClose}
          existingSession={existingSession}
          autoStart={true}
          sidebarState={sidebarState}
        />
      )}
    </Box>
  );
};

export default CategoryPage;