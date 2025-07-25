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
import SearchComponent from '../search/SearchComponent';
import apiService from '../../../services/api';

const useStyles = makeStyles({
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
    alignItems: 'center !important',
    marginBottom: '24px !important',
    '@media (max-width: 1200px)': {
      marginBottom: '20px !important',
    },
    '@media (max-width: 960px)': {
      marginBottom: '18px !important',
      alignItems: 'flex-start !important',
      gap: '16px !important',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column !important',
      alignItems: 'flex-start !important',
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
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem !important',
      gap: '10px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem !important',
      gap: '8px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.25rem !important',
      flexDirection: 'column !important',
      alignItems: 'flex-start !important',
      gap: '6px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2rem !important',
      gap: '5px !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.1rem !important',
      gap: '4px !important',
    },
  },
  sectionSubtitle: {
    color: '#9ca3af !important',
    fontSize: '0.875rem !important',
    marginTop: '4px !important',
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem !important',
      marginTop: '3px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem !important',
      marginTop: '2px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem !important',
    },
  },
  characterCount: {
    color: '#ffffff !important',
    fontWeight: '600 !important',
    '& .MuiChip-label': {
      color: '#ffffff !important',
    },
    '@media (max-width: 1200px)': {
      fontSize: '0.75rem !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.7rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.65rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.6rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.55rem !important',
    },
  },
  viewAllLink: {
    color: '#9ca3af !important',
    textDecoration: 'none !important',
    fontWeight: '500 !important',
    fontSize: '0.875rem !important',
    cursor: 'pointer !important',
    transition: 'color 0.3s ease !important',
    '&:hover': {
      color: '#6366f1 !important',
    },
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem !important',
    },
  },
  searchContainer: {
    display: 'flex !important',
    justifyContent: 'flex-end !important',
    alignItems: 'center !important',
    '@media (max-width: 1200px)': {
      minWidth: '280px !important',
    },
    '@media (max-width: 960px)': {
      minWidth: '250px !important',
    },
    '@media (max-width: 600px)': {
      justifyContent: 'flex-start !important',
      width: '100% !important',
      minWidth: 'unset !important',
    },
    '@media (max-width: 480px)': {
      '& > *': {
        width: '100% !important',
      },
    },
    '@media (max-width: 375px)': {
      '& > *': {
        fontSize: '0.8rem !important',
      },
    },
  },
  // CRITICAL FIX: Force grid layout immediately
  characterBoxContainer: {
    display: 'grid !important',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr)) !important',
    gap: '20px !important',
    marginBottom: '40px !important',
    minHeight: '200px !important',
    willChange: 'transform !important',
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
      gap: '14px !important',
      marginBottom: '28px !important',
    },
    '@media (max-width: 480px)': {
      gap: '12px !important',
      marginBottom: '24px !important',
    },
    '@media (max-width: 375px)': {
      gap: '10px !important',
      marginBottom: '20px !important',
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
  paginationContainer: {
    display: 'flex !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important',
    marginTop: '40px !important',
    padding: '24px !important',
    background: 'rgba(26, 26, 26, 0.8) !important',
    borderRadius: '16px !important',
    backdropFilter: 'blur(10px) !important',
    border: '1px solid rgba(99, 102, 241, 0.1) !important',
    '@media (max-width: 1200px)': {
      marginTop: '36px !important',
      padding: '22px !important',
      borderRadius: '14px !important',
    },
    '@media (max-width: 960px)': {
      marginTop: '32px !important',
      padding: '20px !important',
      borderRadius: '12px !important',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column !important',
      gap: '16px !important',
      marginTop: '28px !important',
      padding: '18px !important',
      borderRadius: '10px !important',
    },
    '@media (max-width: 480px)': {
      gap: '14px !important',
      marginTop: '24px !important',
      padding: '16px !important',
      borderRadius: '8px !important',
    },
    '@media (max-width: 375px)': {
      gap: '12px !important',
      marginTop: '20px !important',
      padding: '14px !important',
      borderRadius: '6px !important',
    },
  },
  paginationInfo: {
    display: 'flex !important',
    alignItems: 'center !important',
    gap: '16px !important',
    color: '#d1d5db !important',
    '@media (max-width: 1200px)': {
      gap: '14px !important',
    },
    '@media (max-width: 960px)': {
      gap: '12px !important',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column !important',
      gap: '8px !important',
      textAlign: 'center !important',
    },
    '@media (max-width: 480px)': {
      gap: '6px !important',
      fontSize: '0.85rem !important',
    },
    '@media (max-width: 375px)': {
      gap: '4px !important',
      fontSize: '0.8rem !important',
    },
  },
  pageSizeSelect: {
    minWidth: '120px !important',
    '& .MuiOutlinedInput-root': {
      background: 'rgba(42, 42, 42, 0.8) !important',
      border: '1px solid rgba(99, 102, 241, 0.2) !important',
      borderRadius: '8px !important',
      color: '#ffffff !important',
      '&:hover': {
        borderColor: 'rgba(99, 102, 241, 0.5) !important',
      },
      '&.Mui-focused': {
        borderColor: '#6366f1 !important',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#9ca3af !important',
    },
    '& .MuiSelect-icon': {
      color: '#9ca3af !important',
    },
    '@media (max-width: 1200px)': {
      minWidth: '110px !important',
    },
    '@media (max-width: 960px)': {
      minWidth: '100px !important',
    },
    '@media (max-width: 600px)': {
      minWidth: '90px !important',
    },
    '@media (max-width: 480px)': {
      minWidth: '80px !important',
      '& .MuiOutlinedInput-root': {
        fontSize: '0.85rem !important',
      },
      '& .MuiInputLabel-root': {
        fontSize: '0.85rem !important',
      },
    },
    '@media (max-width: 375px)': {
      minWidth: '70px !important',
      '& .MuiOutlinedInput-root': {
        fontSize: '0.8rem !important',
      },
      '& .MuiInputLabel-root': {
        fontSize: '0.8rem !important',
      },
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
  enhancedPagination: {
    '& .MuiPagination-ul': {
      gap: '8px !important',
    },
    '& .MuiPaginationItem-root': {
      background: 'rgba(26, 26, 26, 0.8) !important',
      border: '1px solid rgba(99, 102, 241, 0.2) !important',
      color: '#9ca3af !important',
      borderRadius: '12px !important',
      backdropFilter: 'blur(10px) !important',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
      minWidth: '44px !important',
      height: '44px !important',
      '&:hover': {
        background: 'rgba(42, 42, 42, 0.9) !important',
        borderColor: 'rgba(99, 102, 241, 0.5) !important',
        color: '#ffffff !important',
        transform: 'translateY(-2px) !important',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3) !important',
      },
      '&.Mui-selected': {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
        borderColor: 'rgba(99, 102, 241, 0.8) !important',
        color: 'white !important',
        boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4), 0 0 20px rgba(99, 102, 241, 0.2) !important',
        transform: 'translateY(-2px) !important',
        '&:hover': {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
        },
      },
    },
    '@media (max-width: 1200px)': {
      '& .MuiPagination-ul': {
        gap: '6px !important',
      },
      '& .MuiPaginationItem-root': {
        minWidth: '40px !important',
        height: '40px !important',
        borderRadius: '10px !important',
      },
    },
    '@media (max-width: 960px)': {
      '& .MuiPagination-ul': {
        gap: '4px !important',
      },
      '& .MuiPaginationItem-root': {
        minWidth: '36px !important',
        height: '36px !important',
        borderRadius: '8px !important',
        fontSize: '0.85rem !important',
      },
    },
    '@media (max-width: 600px)': {
      '& .MuiPaginationItem-root': {
        minWidth: '32px !important',
        height: '32px !important',
        borderRadius: '6px !important',
        fontSize: '0.8rem !important',
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiPagination-ul': {
        gap: '2px !important',
      },
      '& .MuiPaginationItem-root': {
        minWidth: '28px !important',
        height: '28px !important',
        borderRadius: '4px !important',
        fontSize: '0.75rem !important',
        '&:hover': {
          transform: 'translateY(-1px) !important',
        },
        '&.Mui-selected': {
          transform: 'translateY(-1px) !important',
        },
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiPaginationItem-root': {
        minWidth: '24px !important',
        height: '24px !important',
        fontSize: '0.7rem !important',
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

  // CRITICAL FIX: Add style readiness state
  const [stylesReady, setStylesReady] = useState(false);

  // CRITICAL FIX: Ensure styles are ready before rendering
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setStylesReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

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

  const handleSearchResults = (searchResults) => {
    const { characters: searchCharacters, query, totalCount: searchTotal } = searchResults;
    
    if (query && searchCharacters.length >= 0) {
      setCharacters(searchCharacters);
      setTotalCount(searchTotal);
      setIsSearching(true);
      setSearchQuery(query);
    } else if (!query) {
      setCharacters(originalCharacters);
      setTotalCount(originalTotalCount);
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  const handleSearchStateChange = (searchState) => {
    const { isSearching: searching, query } = searchState;
    
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
            category: 'general',
            messages: '0k',
            likes: '0k',
          };
          onCharacterClick(tempCharacter, sessionWithMessages);
        }
      }
    }
  };

  // CRITICAL FIX: Show skeleton loader while styles are loading
  if (!stylesReady) {
    return (
      <Box sx={{ 
        display: 'grid !important',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr)) !important',
        gap: '20px !important',
        minHeight: '400px !important',
        '@media (max-width: 1200px)': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr)) !important',
          gap: '18px !important',
        },
        '@media (max-width: 960px)': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr)) !important',
          gap: '16px !important',
        },
        '@media (max-width: 600px)': {
          gridTemplateColumns: '1fr !important',
          gap: '14px !important',
        },
      }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              height: '280px',
              background: 'rgba(26, 26, 26, 0.3)',
              borderRadius: '16px',
              border: '1px solid rgba(99, 102, 241, 0.1)',
              animation: 'pulse 1.5s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.4 },
                '50%': { opacity: 0.6 },
              },
            }}
          />
        ))}
      </Box>
    );
  }

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
            <Typography variant="h2" className={classes.sectionTitle}>
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
            <Typography variant="h2" className={classes.sectionTitle}>
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
          <Typography variant="h2" className={classes.sectionTitle}>
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