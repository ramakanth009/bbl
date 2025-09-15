import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Chip, useTheme, useMediaQuery, Pagination, Stack, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { useParams, useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Header from '../../components/dashboard/main/Header';
import CharacterCard from '../../components/dashboard/character/CharacterCard';
import CreateCharacterButton from '../../components/dashboard/character/creation/CreateCharacterButton';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import TopBar from '../../components/dashboard/main/TopBar';
import SearchComponent from '../../components/dashboard/search/SearchComponent';
import apiService from '../../services/api';
import { createCharacterPath, parseCharacterFromUrl, validateSlugMatch, createCharacterNavigationState } from '../../utils/slugUtils';
import { useSearchPersistence, usePaginationPersistence } from '../../hooks/usePaginationPersistence';

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
      display: 'block !important', // Show on mobile when search is active
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
      fontSize: '1.2rem !important', // Show smaller on mobile when search is active
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
      fontSize: '0.75rem !important', // Show smaller on mobile when search is active
    },
  },
  searchContainer: {
    minWidth: '300px !important',
    '@media (max-width: 900px)': {
      minWidth: '250px !important',
    },
    '@media (max-width: 600px)': {
      minWidth: 'auto !important',
      width: '100% !important',
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
    gridTemplateColumns: 'repeat(6, 1fr) !important',
    gap: '16px !important',
    marginBottom: '40px !important',
    minHeight: '200px !important',
    '@media (max-width: 1800px)': {
      gridTemplateColumns: 'repeat(5, 1fr) !important',
      gap: '18px !important',
    },
    '@media (max-width: 1400px)': {
      gridTemplateColumns: 'repeat(4, 1fr) !important',
      gap: '18px !important',
    },
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(3, 1fr) !important',
      gap: '18px !important',
      marginBottom: '36px !important',
    },
    '@media (max-width: 960px)': {
      gridTemplateColumns: 'repeat(2, 1fr) !important',
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
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      padding: '8px',
    },
  },
  paginationInfo: {
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  pageSizeSelect: {
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  mobilePagerPagination: {
    '@media (min-width: 600px)': {
      display: 'none',
    },
  },
  enhancedPagination: {
    '& .MuiPaginationItem-root': {
      color: '#6366f1',
      '&.Mui-selected': {
        color: '#ffffff',
        backgroundColor: '#6366f1',
      },
    },
  },
});

const CategoryPage = ({ onSidebarToggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { categoryKey, characterId, characterName } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  // Search functionality integration
  const { 
    searchQuery: persistedSearchQuery, 
    clearSearch: clearPersistedSearch
  } = useSearchPersistence(`category-${categoryKey}`);
  
  const [characters, setCharacters] = useState([]);
  const [originalCharacters, setOriginalCharacters] = useState([]);

  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [existingSession, setExistingSession] = useState(null);
  
  // Search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);

  // Pagination persistence keyed per-category
  const {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    resetPagination,
    isInitialized
  } = usePaginationPersistence(1, 24, `category-${categoryKey}`);

  const [searchResetTrigger, setSearchResetTrigger] = useState(0);

  // Get sidebar state from Dashboard context
  const context = useOutletContext();
  const sidebarState = context?.sidebarState || { 
    isOpen: true, 
    isMobile: false, 
    sidebarWidth: 280, 
    isCollapsed: false 
  };

  useEffect(() => {
    // When category changes, reset pagination to first page and reload
    setCharacters([]);
    setOriginalCharacters([]);
    setTotalCount(0);
    setTotalPages(1);
  }, [categoryKey]);

  // Load category page when pagination changes (and initialized)
  useEffect(() => {
    if (!isInitialized) return;
    if (isSearching) return; // Do not load when search is active
    loadCategoryCharactersPage(currentPage, pageSize);
  }, [isInitialized, currentPage, pageSize, categoryKey, isSearching]);

  // Reset search when navigating to category (similar to Discover page logic)
  useEffect(() => {
    console.log('🔄 Category changed, resetting search for:', categoryKey);
    if (categoryKey) {
      setSearchResetTrigger(prev => prev + 1);
    }
  }, [categoryKey]);

  // Reset search when navigation state includes resetSearch flag (clicking same category tab)
  useEffect(() => {
    if (location?.state?.resetSearch) {
      console.log('🔄 Reset flag detected, clearing category search');
      setSearchResetTrigger(prev => prev + 1);
    }
  }, [location?.state?.resetSearch]);

  // ADDITIONAL: Reset search when navigating within same category (URL change without categoryKey change)
  useEffect(() => {
    // Check if we're navigating to the same category without search params (category reset)
    const urlParams = new URLSearchParams(location.search);
    const hasSearchParams = urlParams.has(`category-${categoryKey}_q`);
    
    if (!hasSearchParams && (isSearching || searchQuery)) {
      console.log('🔄 URL params cleared, resetting search state');
      setSearchResetTrigger(prev => prev + 1);
    }
  }, [location.search, categoryKey, isSearching, searchQuery]);

  // Handle URL-based chat opening with navigation state priority
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
  }, [characterId, characters]);

  const loadCategoryCharactersPage = async (page = 1, limit = 24) => {
    try {
      // For first page show main loader; for others show pagination loader
      if (page === 1 && characters.length === 0) {
        setLoading(true);
      } else {
        setPaginationLoading(true);
      }
      setError(null);

      const response = await apiService.getCharactersByCategoryPaginated(categoryKey, page, limit);
      const categoryCharacters = response.characters || [];

      setCharacters(categoryCharacters);
      setOriginalCharacters(categoryCharacters);
      setCategoryName(response.category_name || '');
      setTotalCount(response.total_count || categoryCharacters.length || 0);
      setTotalPages(response.total_pages || 1);
    } catch (error) {
      console.error('Failed to load category characters:', error);
      setError('Failed to load characters for this category. Please try again.');
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  };

  // Handle search results from backend
  const handleSearchResults = ({ characters: searchCharacters, query, totalCount: searchTotalCount }) => {
    console.log('🔍 Category search results from backend:', { 
      query, 
      resultCount: searchCharacters?.length || 0,
      totalCount: searchTotalCount 
    });

    if (query) {
      // Filter backend search results by category
      const categoryFilteredCharacters = searchCharacters.filter(character =>
        character.category === categoryKey
      );
      
      setCharacters(categoryFilteredCharacters);
      setTotalCount(categoryFilteredCharacters.length);
      setIsSearching(true);
      setSearchQuery(query);
      // Reset pagination when searching
      resetPagination();
    } else {
      // Reset to original characters
      setCharacters(originalCharacters);
      setTotalCount(originalCharacters.length);
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  // Handle search state changes
  const handleSearchStateChange = ({ isSearching: searching, query, focused }) => {
    console.log('🔍 Category search state changed:', { searching, query, focused });
    
    if (!searching && !query) {
      // Reset to original characters when search is cleared
      setCharacters(originalCharacters);
      setTotalCount(originalCharacters.length);
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  // Improved handleStartChat with better state management
  const handleStartChat = async (character, session = null) => {
    console.log('🚀 Starting chat with character:', character.name);
    
    try {
      // Use flushSync to ensure all state updates happen synchronously
      flushSync(() => {
        setSelectedCharacter(character);
        setExistingSession(session);
        setIsChatOpen(true);
      });
      
      // Now navigate - states are guaranteed to be set using new URL structure
      const characterPath = createCharacterPath(`/dashboard/categories/${categoryKey}/chat`, character.id, character.name);
      // Preserve current search params
      const currentSearch = location.search || '';
      navigate(`${characterPath}${currentSearch}`, { 
        replace: false,
        state: createCharacterNavigationState(character)
      });
      
      // If there's an existing session, load it
      if (session && session.session_id) {
        console.log('📝 Loading existing session:', session.session_id);
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
    // Preserve current search params when closing chat
    const currentSearch = location.search || '';
    navigate(`/dashboard/categories/${categoryKey}${currentSearch}`);
  };

  const handleCharacterCreated = (newCharacter) => {
    if (newCharacter.category === categoryKey) {
      const updatedCharacters = [newCharacter, ...originalCharacters];
      setCharacters(updatedCharacters);
      setOriginalCharacters(updatedCharacters);
      setTotalCount(updatedCharacters.length);
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
    console.log('Search toggle - not implemented in mobile for category page');
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

  const getCountLabel = (count, searching = false) => {
    if (searching) {
      return count === 1 ? 'result' : 'results';
    }
    return count === 1 ? 'character' : 'characters';
  };

  // Add debugging effect to monitor state changes
  useEffect(() => {
    console.log('📊 State Update:', {
      selectedCharacter: selectedCharacter?.name || 'None',
      isChatOpen,
      characterId,
      charactersLength: characters.length,
      isSearching,
      searchQuery
    });
  }, [selectedCharacter, isChatOpen, characterId, characters.length, isSearching, searchQuery]);

  if (loading) {
    return (
      <Box className={classes.categoryContainer}>
        {/* Mobile TopBar - Hide when chat is open */}
        {isMobile && !isChatOpen && (
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
        {/* Mobile TopBar - Hide when chat is open */}
        {isMobile && !isChatOpen && (
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

  const displayCharacters = characters.length === 0 && !isSearching ? originalCharacters : characters;

  return (
    <>
      <Box className={classes.categoryContainer}>
        {/* Mobile TopBar - Hide when chat is open */}
        {isMobile && !isChatOpen && (
          <TopBar
            activeSection={`categories/${categoryKey}`}
            onSectionChange={handleSectionChange}
            onMenuToggle={handleMenuToggle}
            onSearchToggle={handleSearchToggle}
          />
        )}
        
        <Box
          className={
            isChatOpen
              ? `${classes.contentArea} ${classes.contentAreaHidden}`
              : classes.contentArea
          }
        >
          {/* Desktop Header - Hidden on mobile */}
          <Box className={classes.desktopHeader}>
            <Header />
          </Box>
          
          <Box className={classes.section}>
            <Box className={classes.sectionHeader}>
              <Box className={classes.sectionHeaderContent}>
                <Typography className={classes.sectionTitle}>
                  {isSearching ? `Search Results for "${searchQuery}"` : (categoryName || 'Category Characters')}
                  <Chip 
                    label={`${formatCount(totalCount)} ${getCountLabel(totalCount, isSearching)}`} 
                    size="small"
                    className={classes.characterCount}
                  />
                </Typography>
                {!isSearching && (
                  <Typography className={classes.sectionSubtitle}>
                    Explore characters from the {categoryName?.toLowerCase()} category
                  </Typography>
                )}
              </Box>

              {/* Search Component - Desktop and Mobile */}
              <Box className={classes.searchContainer}>
                <SearchComponent
                  onSearchResults={handleSearchResults}
                  onSearchStateChange={handleSearchStateChange}
                  placeholder={`Search ${categoryName?.toLowerCase() || 'category'} characters...`}
                  showSuggestions={true}
                  section={`category-${categoryKey}`}
                  resetTrigger={searchResetTrigger}
                />
              </Box>
            </Box>
          
            {/* Mobile-only enhanced count */}
            <Box className={classes.mobileCharacterCount}>
              <Chip 
                label={`${formatCount(totalCount)} ${getCountLabel(totalCount, isSearching)}`} 
                size="small"
              />
            </Box>
            
            {displayCharacters.length === 0 ? (
              <Box className={classes.emptyState}>
                <Typography className={classes.emptyStateTitle}>
                  {isSearching ? 'No search results found' : 'No characters found'}
                </Typography>
                <Typography>
                  {isSearching 
                    ? `No characters in ${categoryName?.toLowerCase()} match your search. Try different keywords.`
                    : 'No characters are available in this category yet.'
                  }
                </Typography>
              </Box>
            ) : (
              <>
                {paginationLoading ? (
                  <Box className={classes.loadingOverlay}>
                    <CircularProgress sx={{ color: '#6366f1' }} />
                  </Box>
                ) : (
                  <>
                    <Box className={classes.characterBoxContainer}>
                      {!isSearching && (
                        <CreateCharacterButton onCharacterCreated={handleCharacterCreated} />
                      )}
                      {displayCharacters.map((character) => (
                        <CharacterCard 
                          key={character.id} 
                          character={character}
                          onStartChat={handleStartChat}
                        />
                      ))}
                    </Box>

                    {!isSearching && totalPages > 1 && (
                      <CategoryPagination
                        totalPages={totalPages}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                      />)
                    }
                  </>
                )}
              </>
            )}
          </Box>
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
    </>
  );
};

export default CategoryPage;

// Local pagination component to keep JSX tidy and match CharacterGrid look-and-feel
const CategoryPagination = ({ totalPages, totalCount, currentPage, pageSize, onPageChange, onPageSizeChange }) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Box className={classes.paginationContainer}>
      {!isMobileView && (
        <Box className={classes.paginationInfo}>
          <Typography variant="body2">
            Showing {Math.min(((currentPage - 1) * pageSize) + 1, totalCount)}-{Math.min(currentPage * pageSize, totalCount)} of {totalCount} characters
          </Typography>
        </Box>
      )}

      {!isMobileView && (
        <FormControl size="small" className={classes.pageSizeSelect}>
          <InputLabel>Per page</InputLabel>
          <Select value={pageSize} onChange={onPageSizeChange} label="Per page">
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>48</MenuItem>
            <MenuItem value={72}>72</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      )}

      {isMobileView ? (
        <Stack spacing={2} className={classes.mobilePagerPagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            size="small"
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            className={classes.enhancedPagination}
          />
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            showFirstButton
            showLastButton
            size="large"
            className={classes.enhancedPagination}
          />
        </Stack>
      )}
    </Box>
  );
};