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
import SearchComponent from '../search/SearchComponent';  // Added import
import apiService from '../../../services/api';

const useStyles = makeStyles({
  section: {
    marginBottom: '48px',
    '@media (max-width: 1200px)': {
      marginBottom: '40px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '32px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '24px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '20px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '16px',
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
      alignItems: 'flex-start',
      gap: '16px',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '16px',
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
      fontSize: '1.25rem',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2rem',
      gap: '5px',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.1rem',
      gap: '4px',
    },
  },
  sectionSubtitle: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    marginTop: '4px',
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem',
      marginTop: '3px',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
      marginTop: '2px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem',
    },
  },
  characterCount: {
    // background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#ffffff !important',
    fontWeight: 600,
    '& .MuiChip-label': {
      color: '#ffffff !important',
    },
    '@media (max-width: 1200px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.6rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.55rem',
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
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem',
    },
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '@media (max-width: 1200px)': {
      minWidth: '280px',
    },
    '@media (max-width: 960px)': {
      minWidth: '250px',
    },
    '@media (max-width: 600px)': {
      justifyContent: 'flex-start',
      width: '100%',
      minWidth: 'unset',
    },
    '@media (max-width: 480px)': {
      '& > *': {
        width: '100%',
      },
    },
    '@media (max-width: 375px)': {
      '& > *': {
        fontSize: '0.8rem',
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
      borderRadius: '6px',
    },
  },
  emptyStateTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '1.2rem',
      marginBottom: '7px',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.15rem',
      marginBottom: '6px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
      marginBottom: '5px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.05rem',
      marginBottom: '4px',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
      marginBottom: '3px',
    },
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
    '@media (max-width: 1200px)': {
      marginTop: '36px',
      padding: '22px',
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      marginTop: '32px',
      padding: '20px',
      borderRadius: '12px',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '16px',
      marginTop: '28px',
      padding: '18px',
      borderRadius: '10px',
    },
    '@media (max-width: 480px)': {
      gap: '14px',
      marginTop: '24px',
      padding: '16px',
      borderRadius: '8px',
    },
    '@media (max-width: 375px)': {
      gap: '12px',
      marginTop: '20px',
      padding: '14px',
      borderRadius: '6px',
    },
  },
  paginationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: '#d1d5db',
    '@media (max-width: 1200px)': {
      gap: '14px',
    },
    '@media (max-width: 960px)': {
      gap: '12px',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '8px',
      textAlign: 'center',
    },
    '@media (max-width: 480px)': {
      gap: '6px',
      fontSize: '0.85rem',
    },
    '@media (max-width: 375px)': {
      gap: '4px',
      fontSize: '0.8rem',
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
    '@media (max-width: 1200px)': {
      minWidth: 110,
    },
    '@media (max-width: 960px)': {
      minWidth: 100,
    },
    '@media (max-width: 600px)': {
      minWidth: 90,
    },
    '@media (max-width: 480px)': {
      minWidth: 80,
      '& .MuiOutlinedInput-root': {
        fontSize: '0.85rem',
      },
      '& .MuiInputLabel-root': {
        fontSize: '0.85rem',
      },
    },
    '@media (max-width: 375px)': {
      minWidth: 70,
      '& .MuiOutlinedInput-root': {
        fontSize: '0.8rem',
      },
      '& .MuiInputLabel-root': {
        fontSize: '0.8rem',
      },
    },
  },
  loadingOverlay: {
    position: 'relative',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // background: 'rgba(26, 26, 26, 0.3)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99, 102, 241, 0.1)',
    '@media (max-width: 1200px)': {
      minHeight: '360px',
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      minHeight: '320px',
      borderRadius: '12px',
    },
    '@media (max-width: 600px)': {
      minHeight: '280px',
      borderRadius: '10px',
    },
    '@media (max-width: 480px)': {
      minHeight: '240px',
      borderRadius: '8px',
    },
    '@media (max-width: 375px)': {
      minHeight: '200px',
      borderRadius: '6px',
    },
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
    '@media (max-width: 1200px)': {
      '& .MuiPagination-ul': {
        gap: '6px',
      },
      '& .MuiPaginationItem-root': {
        minWidth: '40px',
        height: '40px',
        borderRadius: '10px',
      },
    },
    '@media (max-width: 960px)': {
      '& .MuiPagination-ul': {
        gap: '4px',
      },
      '& .MuiPaginationItem-root': {
        minWidth: '36px',
        height: '36px',
        borderRadius: '8px',
        fontSize: '0.85rem',
      },
    },
    '@media (max-width: 600px)': {
      '& .MuiPaginationItem-root': {
        minWidth: '32px',
        height: '32px',
        borderRadius: '6px',
        fontSize: '0.8rem',
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiPagination-ul': {
        gap: '2px',
      },
      '& .MuiPaginationItem-root': {
        minWidth: '28px',
        height: '28px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        '&:hover': {
          transform: 'translateY(-1px)',
        },
        '&.Mui-selected': {
          transform: 'translateY(-1px)',
        },
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiPaginationItem-root': {
        minWidth: '24px',
        height: '24px',
        fontSize: '0.7rem',
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

  // Search handlers
  const handleSearchResults = (searchResults) => {
    const { characters: searchCharacters, query, totalCount: searchTotal } = searchResults;
    
    if (query && searchCharacters.length >= 0) {
      // User performed a search
      setCharacters(searchCharacters);
      setTotalCount(searchTotal);
      setIsSearching(true);
      setSearchQuery(query);
    } else if (!query) {
      // User cleared search - restore original characters
      setCharacters(originalCharacters);
      setTotalCount(originalTotalCount);
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  const handleSearchStateChange = (searchState) => {
    const { isSearching: searching, query } = searchState;
    
    // If user clears search completely, restore original state
    if (!searching && !query) {
      setCharacters(originalCharacters);
      setTotalCount(originalTotalCount);
      setIsSearching(false);
      setSearchQuery('');
    }
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
            creator: 'Gigaversity',
            // type: 'Historical Figure',
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
          
          {/* Search component positioned opposite to heading */}
          <Box className={classes.searchContainer}>
            <SearchComponent
              onSearchResults={handleSearchResults}
              onSearchStateChange={handleSearchStateChange}
              placeholder="Search characters..."
              showSuggestions={true}
            />
          </Box>
        </Box>
        
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
        
        {/* Search component positioned opposite to heading */}
        <Box className={classes.searchContainer}>
          <SearchComponent
            onSearchResults={handleSearchResults}
            onSearchStateChange={handleSearchStateChange}
            placeholder="Search characters..."
            showSuggestions={true}
          />
        </Box>
      </Box>
      
      {paginationLoading ? (
        <Box className={classes.loadingOverlay}>
          <CircularProgress sx={{ color: '#6366f1' }} />
        </Box>
      ) : (
        <>
          <Box className={classes.characterBoxContainer}>
            {activeSection === 'Discover' && !isSearching && (
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