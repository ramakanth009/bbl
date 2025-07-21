import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/dashboard/main/Header';
import CharacterCard from '../../components/dashboard/character/CharacterCard';
import CreateCharacterButton from '../../components/dashboard/character/CreateCharacterButton';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import apiService from '../../services/api';

const useStyles = makeStyles({
  categoryContainer: {
    display: 'flex',
    flex: 1,
    minHeight: '100vh',
  },
  contentArea: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
    transition: 'all 0.3s ease',
    display: 'block',
    '@media (max-width: 1200px)': {
      padding: '20px',
    },
    '@media (max-width: 960px)': {
      padding: '18px',
    },
    '@media (max-width: 900px)': {
      padding: '16px',
    },
    '@media (max-width: 600px)': {
      padding: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '8px',
    },
    '@media (max-width: 375px)': {
      padding: '6px',
    },
  },
  contentAreaHidden: {
    display: 'none',
  },
  section: {
    marginBottom: '48px',
    '@media (max-width: 1200px)': {
      marginBottom: '40px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '36px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '32px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '28px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '24px',
    },
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    '@media (max-width: 1200px)': {
      marginBottom: '20px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '18px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '16px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '14px',
      gap: '10px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '12px',
      gap: '8px',
    },
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem',
      gap: '10px',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
      gap: '8px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
      gap: '6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
      gap: '4px',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
    },
  },
  sectionSubtitle: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    marginTop: '4px',
    '@media (max-width: 960px)': {
      fontSize: '0.825rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
      marginTop: '2px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.775rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.75rem',
    },
  },
  characterCount: {
    color: '#ffffff !important',
    fontWeight: 600,
    '& .MuiChip-label': {
      color: '#ffffff !important',
    },
    '@media (max-width: 600px)': {
      '& .MuiChip-label': {
        fontSize: '0.75rem',
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiChip-label': {
        fontSize: '0.7rem',
      },
    },
  },
  characterBoxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '18px',
      marginBottom: '36px',
    },
    '@media (max-width: 960px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '16px',
      marginBottom: '32px',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '14px',
      marginBottom: '28px',
    },
    '@media (max-width: 480px)': {
      gap: '12px',
      marginBottom: '24px',
    },
    '@media (max-width: 375px)': {
      gap: '10px',
      marginBottom: '20px',
    },
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#9ca3af',
    background: 'rgba(26, 26, 26, 0.3)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99, 102, 241, 0.1)',
    '@media (max-width: 1200px)': {
      padding: '70px 18px',
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      padding: '60px 16px',
      borderRadius: '12px',
    },
    '@media (max-width: 600px)': {
      padding: '50px 14px',
      borderRadius: '10px',
    },
    '@media (max-width: 480px)': {
      padding: '40px 12px',
      borderRadius: '8px',
    },
    '@media (max-width: 375px)': {
      padding: '30px 10px',
    },
  },
  emptyStateTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#ffffff',
    '@media (max-width: 960px)': {
      fontSize: '1.15rem',
      marginBottom: '6px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
      marginBottom: '4px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.05rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 20px',
    '@media (max-width: 1200px)': {
      padding: '70px 18px',
    },
    '@media (max-width: 960px)': {
      padding: '60px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '50px 14px',
    },
    '@media (max-width: 480px)': {
      padding: '40px 12px',
    },
    '@media (max-width: 375px)': {
      padding: '30px 10px',
    },
  },
});

const CategoryPage = () => {
  const classes = useStyles();
  const { categoryKey, characterId } = useParams();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [existingSession, setExistingSession] = useState(null);

  useEffect(() => {
    loadCategoryCharacters();
  }, [categoryKey]);

  // Handle URL-based chat opening
  useEffect(() => {
    if (characterId && characters.length > 0 && !isChatOpen) {
      const character = characters.find(c => c.id === characterId || c.id === parseInt(characterId));
      if (character) {
        setSelectedCharacter(character);
        setIsChatOpen(true);
      }
    }
  }, [characterId, characters, isChatOpen]);

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

  const handleStartChat = async (character, session = null) => {
    console.log('🚀 Starting chat with character:', character.name);
    
    try {
      setSelectedCharacter(character);
      setExistingSession(session);
      setIsChatOpen(true);
      
      // Update URL to reflect chat state
      navigate(`/dashboard/categories/${categoryKey}/chat/${character.id}`);
      
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

  if (loading) {
    return (
      <Box className={classes.categoryContainer}>
        <Box className={classes.contentArea}>
          <Header />
          <Box className={classes.loadingContainer}>
            <CircularProgress sx={{ color: '#6366f1' }} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.categoryContainer}>
        <Box className={classes.contentArea}>
          <Header />
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.categoryContainer}>
      <Box className={`${classes.contentArea} ${isChatOpen ? classes.contentAreaHidden : ''}`}>
        <Header />
        
        <Box className={classes.section}>
          <Box className={classes.sectionHeader}>
            <Box>
              <Typography className={classes.sectionTitle}>
                {categoryName || 'Category Characters'}
                <Chip 
                  label={`${characters.length} characters`} 
                  size="small"
                  className={classes.characterCount}
                />
              </Typography>
              <Typography className={classes.sectionSubtitle}>
                Explore characters from the {categoryName?.toLowerCase()} category
              </Typography>
            </Box>
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
          // Add any additional props that ChatPanel might need
          autoStart={true}
        />
      )}
    </Box>
  );
};

export default CategoryPage;