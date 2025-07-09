import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  CircularProgress, 
  Alert, 
  Chip, 
  Pagination,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CharacterCard from './CharacterCard';
import CreateCharacterButton from './CreateCharacterButton';
import ChatHistoryGrid from '../chat/history/ChatHistoryGrid';
import apiService from '../../../services/api';

const useStyles = makeStyles({
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
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff !important',
    fontWeight: 600,
    '& .MuiChip-label': {
      color: 'white',
    },
  },
  viewAllLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#6366f1',
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
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '40px',
    padding: '24px',
    background: 'rgba(26, 26, 26, 0.8)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99, 102, 241, 0.1)',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '16px',
    },
  },
  paginationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: '#d1d5db',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '8px',
      textAlign: 'center',
    },
  },
  pageSizeSelect: {
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
      background: 'rgba(42, 42, 42, 0.8)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '8px',
      color: '#ffffff',
      '&:hover': {
        borderColor: 'rgba(99, 102, 241, 0.5)',
      },
      '&.Mui-focused': {
        borderColor: '#6366f1',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#9ca3af',
    },
    '& .MuiSelect-icon': {
      color: '#9ca3af',
    },
  },
  loadingOverlay: {
    position: 'relative',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(26, 26, 26, 0.3)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99, 102, 241, 0.1)',
  },
  enhancedPagination: {
    '& .MuiPagination-ul': {
      gap: '8px',
    },
    '& .MuiPaginationItem-root': {
      background: 'rgba(26, 26, 26, 0.8)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      color: '#9ca3af',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      minWidth: '44px',
      height: '44px',
      '&:hover': {
        background: 'rgba(42, 42, 42, 0.9)',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        color: '#ffffff',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
      },
      '&.Mui-selected': {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        color: 'white',
        boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4), 0 0 20px rgba(99, 102, 241, 0.2)',
        transform: 'translateY(-2px)',
        '&:hover': {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        },
      },
    },
  },
});

const CharacterGrid = ({ onCharacterClick, activeSection, onSessionOpen }) => {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [originalCharacters, setOriginalCharacters] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [originalTotalCount, setOriginalTotalCount] = useState(0);
  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    loadData();
  }, [activeSection]);

  useEffect(() => {
    if (activeSection !== 'History' && !isSearching) {
      loadCharactersPage(1, pageSize);
    }
  }, [pageSize]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeSection === 'History') {
        await loadChatHistory();
      } else {
        await loadCharactersPage(1, pageSize);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadCharactersPage = async (page = 1, limit = pageSize) => {
    try {
      if (page !== 1) {
        setPaginationLoading(true);
      }
      
      const response = await apiService.getCharactersPaginated(page, limit);
      const apiTotalCount = response.total_count;
      const filteredCharacters = filterCharactersBySection(response.characters);
      
      setCharacters(filteredCharacters);
      setOriginalCharacters(filteredCharacters);
      setAllCharacters(response.characters);
      setCurrentPage(response.page || 1);
      setTotalPages(response.total_pages || 1);
      setTotalCount(apiTotalCount);
      setOriginalTotalCount(apiTotalCount);
      
    } catch (error) {
      console.error('Failed to load characters:', error);
      throw error;
    } finally {
      setPaginationLoading(false);
    }
  };

  const loadChatHistory = async () => {
    const userSessions = await apiService.getSessions();
    setSessions(userSessions);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    loadCharactersPage(newPage, pageSize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = event.target.value;
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleCharacterCreated = (newCharacter) => {
    setCharacters(prev => [newCharacter, ...prev]);
    setTotalCount(prev => prev + 1);
  };

  const filterCharactersBySection = (characters) => {
    switch (activeSection) {
      case 'Discover':
        return characters;
      case 'Featured':
        return characters.filter(char => char.isIndian);
      case 'Trending':
        return characters.filter(char => char.isTrending);
      case 'For You':
        return characters.filter(char => char.isRecommended);
      case 'Recent':
        return characters.filter(char => char.isRecent);
      case 'Art & Culture':
        return characters.filter(char => char.category === 'art_culture');
      case 'Science':
        return characters.filter(char => char.category === 'science');
      case 'Entertainment':
        return characters.filter(char => char.category === 'entertainment');
      default:
        return characters;
    }
  };

  const getSectionDescription = () => {
    const descriptions = {
      'Discover': 'Explore all available legendary figures',
      'Featured': 'Celebrating Indian legends and their contributions',
      'Trending': 'Most popular characters worldwide',
      'For You': 'Recommended based on your interests',
      'Recent': 'Characters you recently interacted with',
      'History': 'Your complete conversation history',
      'Art & Culture': 'Artists, writers, and cultural icons',
      'Science': 'Scientists, inventors, and innovators',
      'Entertainment': 'Actors, musicians, and entertainers',
    };
    return descriptions[activeSection] || '';
  };

  const handleStartChat = (character) => {
    if (onCharacterClick) {
      onCharacterClick(character);
    }
  };

  const handleSessionOpen = (sessionWithMessages) => {
    if (onSessionOpen) {
      onSessionOpen(sessionWithMessages);
    } else {
      if (onCharacterClick) {
        const character = characters.find(c => c.name === sessionWithMessages.character);
        if (character) {
          onCharacterClick(character, sessionWithMessages);
        } else {
          const tempCharacter = {
            name: sessionWithMessages.character,
            id: `temp_${sessionWithMessages.character}`,
            creator: 'LegendsAI',
            type: 'Historical Figure',
            category: 'general',
            messages: '0k',
            likes: '0k',
          };
          onCharacterClick(tempCharacter, sessionWithMessages);
        }
      }
    }
  };

  if (loading) {
    return (
      <Box className={classes.loadingOverlay}>
        <CircularProgress sx={{ color: '#6366f1' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={4}>
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
    );
  }

  if (activeSection === 'History') {
    return (
      <Box className={classes.section}>
        <Box className={classes.sectionHeader}>
          <Box>
            <Typography className={classes.sectionTitle}>
              Chat History
              <Chip 
                label={`${sessions.length} conversations`} 
                size="small"
                className={classes.characterCount}
              />
            </Typography>
          </Box>
        </Box>
        <ChatHistoryGrid sessions={sessions} onSessionOpen={handleSessionOpen} />
      </Box>
    );
  }

  if (characters.length === 0 && !paginationLoading) {
    return (
      <Box className={classes.emptyState}>
        <Typography className={classes.emptyStateTitle}>
          {isSearching ? 'No search results found' : 'No characters found'}
        </Typography>
        <Typography variant="body2">
          {isSearching 
            ? `No characters found for "${searchQuery}". Try a different search term.`
            : activeSection === 'Recent' 
              ? 'Start chatting with characters to see them here!'
              : 'Please check back later or try a different section.'
          }
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.section}>
      <Box className={classes.sectionHeader}>
        <Box>
          <Typography className={classes.sectionTitle}>
            {isSearching ? `Search Results for "${searchQuery}"` : activeSection}
            <Chip 
              label={`${totalCount} ${isSearching ? 'results' : 'total characters'}`} 
              size="small"
              className={classes.characterCount}
            />
          </Typography>
          {getSectionDescription() && !isSearching && (
            <Typography className={classes.sectionSubtitle}>
              {getSectionDescription()}
            </Typography>
          )}
        </Box>
      </Box>
      
      {paginationLoading ? (
        <Box className={classes.loadingOverlay}>
          <CircularProgress sx={{ color: '#6366f1' }} />
        </Box>
      ) : (
        <>
          <Box className={classes.characterBoxContainer}>
            {activeSection === 'Discover' && (
              <CreateCharacterButton onCharacterCreated={handleCharacterCreated} />
            )}
            {characters.map((character) => (
              <CharacterCard 
                key={character.id} 
                character={character}
                onStartChat={handleStartChat}
              />
            ))}
          </Box>

          {!isSearching && totalPages > 1 && (
            <Box className={classes.paginationContainer}>
              <Box className={classes.paginationInfo}>
                <Typography variant="body2">
                  Showing {Math.min(((currentPage - 1) * pageSize) + 1, totalCount)}-{Math.min(currentPage * pageSize, totalCount)} of {totalCount} characters
                </Typography>
                
                <FormControl size="small" className={classes.pageSizeSelect}>
                  <InputLabel>Per page</InputLabel>
                  <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    label="Per page"
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  size="large"
                  className={classes.enhancedPagination}
                />
              </Stack>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CharacterGrid;