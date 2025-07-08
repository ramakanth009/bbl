import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Chip,
  Box,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, Clear, TrendingUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import apiService from '../../services/api';

const SearchPaper = styled(Paper)(({ theme, focused }) => ({
  padding: '2px 4px', // reduced padding for better icon placement
  display: 'flex',
  alignItems: 'center',
  width: focused ? 300 : 220,
  boxShadow: 'none',
  backgroundColor: 'rgba(30,30,30,0.96)',
  border: `1.5px solid ${focused ? '#555' : '#333'}`,
  borderRadius: 16,
  transition: 'all 0.2s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(40,40,40,1)',
    border: '1.5px solid #555',
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: 8,
  flex: 1,
  color: '#fff',
  fontSize: '0.98rem',
  '&::placeholder': {
    color: '#bbb',
    opacity: 1,
  },
}));

const SearchResults = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: 4,
  maxHeight: 400,
  overflow: 'auto',
  zIndex: 1000,
  backgroundColor: 'rgba(30,30,30,0.98)',
  border: '1px solid #444',
  borderRadius: 12,
}));

const SearchComponent = ({ 
  onSearchResults, 
  onSearchStateChange,
  placeholder = "Search characters",
  showSuggestions = true,
  className,
  ...props 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isExecutingSearch, setIsExecutingSearch] = useState(false);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to load recent searches');
      }
    }
  }, []);
  
  // Only clear suggestions and notify parent when input is cleared
  useEffect(() => {
    if (!searchValue) {
      setSuggestions([]);
      if (onSearchResults) {
        onSearchResults({ characters: [], query: '', totalCount: 0 });
      }
    }
    // Do not auto-search on input change
    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    if (onSearchStateChange) {
      onSearchStateChange({
        isSearching: !!searchValue,
        query: searchValue,
        focused
      });
    }
  }, [searchValue, focused, onSearchStateChange]);

  // Modify the search handler
  const handleSearch = async () => {
    if (!searchValue.trim() || isExecutingSearch) return;

    try {
      setIsExecutingSearch(true);
      setLoading(true);
      
      const response = await apiService.searchCharacters(searchValue.trim());
      
      setSuggestions(response.characters || []);
      if (onSearchResults) {
        onSearchResults({
          characters: response.characters || [],
          query: searchValue,
          totalCount: response.total_count || response.characters?.length || 0
        });
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
      setIsExecutingSearch(false);
      setShowResults(false);
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    
    // Only notify of search state change for empty value
    if (!newValue) {
      if (onSearchStateChange) {
        onSearchStateChange({
          isSearching: false,
          query: '',
          focused
        });
      }
      if (onSearchResults) {
        onSearchResults({
          characters: [],
          query: '',
          totalCount: 0
        });
      }
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setShowResults(true);
  };

  const handleClear = () => {
    setSearchValue('');
    setFocused(false);
    setShowResults(false);
    if (onSearchResults) {
      onSearchResults({ characters: [], query: '', totalCount: 0 });
    }
  };

  const handleClickAway = () => {
    setFocused(false);
    setShowResults(false);
  };

  const handleSuggestionClick = (character) => {
    setSearchValue(character.name);
    setShowResults(false);
    
    // Save to recent searches
    const newRecent = [character.name, ...recentSearches.filter(s => s !== character.name)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    // Trigger search for this character with correct count
    if (onSearchResults) {
      onSearchResults({
        characters: [character],
        query: character.name,
        totalCount: 1
      });
    }
  };

  const handleRecentSearchClick = (searchTerm) => {
    setSearchValue(searchTerm);
    setShowResults(false);
  };

  // Add handleKeyPress event handler
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const displaySuggestions = showSuggestions && showResults && (suggestions.length > 0 || recentSearches.length > 0);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="relative" className={className} {...props}>
        <SearchPaper focused={focused}>
          <SearchInput
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            inputProps={{ 'aria-label': 'search characters' }}
          />
          {loading && (
            <CircularProgress size={16} sx={{ color: '#bbb', mr: 1 }} />
          )}
          {searchValue && !loading && (
            <IconButton 
              size="small" 
              onClick={handleClear}
              sx={{ color: '#bbb', p: 0.5, mr: 0.5 }}
            >
              <Clear fontSize="small" />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={handleSearch}
            sx={{ 
              color: '#bbb',
              p: 0.5,
              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
        </SearchPaper>

        {displaySuggestions && (
          <Popper
            open={true}
            anchorEl={null}
            placement="bottom-start"
            style={{ 
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000
            }}
          >
            <SearchResults>
              <List dense>
                {suggestions.length > 0 && (
                  <>
                    <ListItem>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Characters ({suggestions.length})
                      </Typography>
                    </ListItem>
                    {suggestions.map((character) => (
                      <ListItem
                        key={character.id}
                        button
                        onClick={() => handleSuggestionClick(character)}
                        sx={{ 
                          py: 1,
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                        }}
                      >
                        <ListItemText
                          primary={character.name}
                          secondary={character.description?.slice(0, 60) + '...'}
                          primaryTypographyProps={{ 
                            sx: { color: '#fff', fontSize: '0.9rem' }
                          }}
                          secondaryTypographyProps={{ 
                            sx: { color: '#bbb', fontSize: '0.8rem' }
                          }}
                        />
                      </ListItem>
                    ))}
                  </>
                )}

                {recentSearches.length > 0 && searchValue === '' && (
                  <>
                    <ListItem>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUp fontSize="small" />
                        Recent Searches
                      </Typography>
                    </ListItem>
                    {recentSearches.map((term, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleRecentSearchClick(term)}
                        sx={{ 
                          py: 0.5,
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                        }}
                      >
                        <Chip
                          label={term}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: '#bbb',
                            fontSize: '0.75rem'
                          }}
                        />
                      </ListItem>
                    ))}
                  </>
                )}

                {searchValue && suggestions.length === 0 && !loading && (
                  <ListItem>
                    <ListItemText
                      primary="No characters found"
                      secondary="Try a different search term"
                      primaryTypographyProps={{ 
                        sx: { color: '#bbb', fontSize: '0.9rem' }
                      }}
                      secondaryTypographyProps={{ 
                        sx: { color: '#888', fontSize: '0.8rem' }
                      }}
                    />
                  </ListItem>
                )}
              </List>
            </SearchResults>
          </Popper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchComponent;