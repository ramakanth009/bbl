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
    '@media (max-width: 900px)': {
      padding: '16px',
    },
  },
  contentAreaHidden: {
    display: 'none',
  },
  section: {
    marginBottom: '48px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
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
  },
  sectionSubtitle: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    marginTop: '4px',
  },
  characterCount: {
    color: '#ffffff !important',
    fontWeight: 600,
    '& .MuiChip-label': {
      color: '#ffffff !important',
    },
  },
  characterBoxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
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
  },
  emptyStateTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#ffffff',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 20px',
  },
});

const CategoryPage = () => {
  const classes = useStyles();
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    loadCategoryCharacters();
  }, [categoryKey]);

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

  const handleStartChat = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
    navigate(`/dashboard/categories/${categoryKey}/chat/${character.id}`);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedCharacter(null);
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
          character={selectedCharacter}
          onClose={handleChatClose}
        />
      )}
    </Box>
  );
};

export default CategoryPage;