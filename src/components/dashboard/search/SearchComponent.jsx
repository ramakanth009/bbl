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
import { makeStyles } from '@mui/styles';
import apiService from '../../../services/api';

const useStyles = makeStyles({
  searchPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 220,
    boxShadow: 'none',
    backgroundColor: 'rgba(30,30,30,0.96)',
    border: '1.5px solid #333',
    borderRadius: 16,
    transition: 'all 0.2s ease',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(40,40,40,1)',
      border: '1.5px solid #555',
    },
    '&.focused': {
      width: 300,
      border: '1.5px solid #555',
    },
    '@media (max-width: 1200px)': {
      width: 200,
      borderRadius: 14,
      '&.focused': {
        width: 280,
      },
    },
    '@media (max-width: 960px)': {
      width: 180,
      borderRadius: 12,
      '&.focused': {
        width: 260,
      },
    },
    '@media (max-width: 600px)': {
      width: '100%',
      maxWidth: 300,
      borderRadius: 10,
      '&.focused': {
        width: '100%',
        maxWidth: 320,
      },
    },
    '@media (max-width: 480px)': {
      borderRadius: 8,
      '&.focused': {
        maxWidth: 280,
      },
    },
    '@media (max-width: 375px)': {
      borderRadius: 6,
      '&.focused': {
        maxWidth: 240,
      },
    },
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: '#fff',
    fontSize: '0.98rem',
    '& input': {
      '&::placeholder': {
        color: '#bbb',
        opacity: 1,
      },
    },
    '@media (max-width: 1200px)': {
      fontSize: '0.94rem',
      marginLeft: 7,
    },
    '@media (max-width: 960px)': {
      fontSize: '0.9rem',
      marginLeft: 6,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.88rem',
      marginLeft: 5,
    },
    '@media (max-width: 480px)': {
      fontSize: '0.86rem',
      marginLeft: 4,
    },
    '@media (max-width: 375px)': {
      fontSize: '0.84rem',
      marginLeft: 3,
    },
  },
  searchResults: {
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
    '@media (max-width: 1200px)': {
      maxHeight: 350,
      borderRadius: 10,
    },
    '@media (max-width: 960px)': {
      maxHeight: 300,
      borderRadius: 8,
    },
    '@media (max-width: 600px)': {
      maxHeight: 250,
      borderRadius: 6,
      marginTop: 2,
    },
    '@media (max-width: 480px)': {
      maxHeight: 200,
      borderRadius: 4,
    },
    '@media (max-width: 375px)': {
      maxHeight: 180,
    },
  },
  searchButton: {
    color: '#bbb',
    padding: 4,
    '&:hover': {
      color: '#fff',
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    '@media (max-width: 600px)': {
      padding: 3,
    },
    '@media (max-width: 480px)': {
      padding: 2,
    },
  },
  clearButton: {
    color: '#bbb',
    padding: 4,
    marginRight: 4,
    '@media (max-width: 600px)': {
      padding: 3,
      marginRight: 3,
    },
    '@media (max-width: 480px)': {
      padding: 2,
      marginRight: 2,
    },
  },
  loadingIcon: {
    color: '#bbb',
    marginRight: 8,
    '@media (max-width: 600px)': {
      marginRight: 6,
    },
    '@media (max-width: 480px)': {
      marginRight: 4,
    },
    '@media (max-width: 375px)': {
      marginRight: 2,
    },
  },
  listItem: {
    paddingTop: 8,
    paddingBottom: 8,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    '@media (max-width: 1200px)': {
      paddingTop: 7,
      paddingBottom: 7,
    },
    '@media (max-width: 960px)': {
      paddingTop: 6,
      paddingBottom: 6,
    },
    '@media (max-width: 600px)': {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 12,
      paddingRight: 12,
    },
    '@media (max-width: 480px)': {
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 10,
      paddingRight: 10,
    },
    '@media (max-width: 375px)': {
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  recentItem: {
    paddingTop: 4,
    paddingBottom: 4,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    '@media (max-width: 600px)': {
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 12,
      paddingRight: 12,
    },
    '@media (max-width: 480px)': {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 10,
      paddingRight: 10,
    },
    '@media (max-width: 375px)': {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  primaryText: {
    color: '#fff',
    fontSize: '0.9rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.88rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.86rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.84rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.82rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
    },
  },
  secondaryText: {
    color: '#bbb',
    fontSize: '0.8rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.78rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.76rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.74rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.72rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
  },
  sectionHeader: {
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    '@media (max-width: 600px)': {
      gap: 6,
    },
    '@media (max-width: 480px)': {
      gap: 4,
    },
    '@media (max-width: 375px)': {
      gap: 2,
    },
  },
  recentChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#bbb',
    fontSize: '0.75rem',
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.68rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.66rem',
    },
  },
  noResultsText: {
    color: '#bbb',
    fontSize: '0.9rem',
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.75rem',
    },
  },
  noResultsSubtext: {
    color: '#888',
    fontSize: '0.8rem',
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
});

const SearchComponent = ({ 
  onSearchResults, 
  onSearchStateChange,
  placeholder = "Search characters",
  showSuggestions = true,
  className,
  ...props 
}) => {
  const classes = useStyles();
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

  useEffect(() => {
    if (onSearchStateChange) {
      onSearchStateChange({
        isSearching: !!searchValue,
        query: searchValue,
        focused
      });
    }
  }, [searchValue, focused, onSearchStateChange]);

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
    
    if (!newValue) {
      setSuggestions([]);
      if (onSearchStateChange) {
        onSearchStateChange({
          isSearching: false,
          query: '',
          focused
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
    setSuggestions([]);
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
    
    const newRecent = [character.name, ...recentSearches.filter(s => s !== character.name)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const displaySuggestions = showSuggestions && showResults && (suggestions.length > 0 || recentSearches.length > 0);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="relative" className={className} {...props}>
        <Paper className={`${classes.searchPaper} ${focused ? 'focused' : ''}`}>
          <InputBase
            className={classes.searchInput}
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            inputProps={{ 'aria-label': 'search characters' }}
          />
          {loading && (
            <CircularProgress size={16} className={classes.loadingIcon} />
          )}
          {searchValue && !loading && (
            <IconButton 
              size="small" 
              onClick={handleClear}
              className={classes.clearButton}
            >
              <Clear fontSize="small" />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={handleSearch}
            className={classes.searchButton}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
        </Paper>

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
            <Paper className={classes.searchResults}>
              <List dense>
                {suggestions.length > 0 && (
                  <>
                    <ListItem>
                      <Typography variant="caption" color="text.secondary" className={classes.sectionHeader}>
                        Characters ({suggestions.length})
                      </Typography>
                    </ListItem>
                    {suggestions.map((character) => (
                      <ListItem
                        key={character.id}
                        button
                        onClick={() => handleSuggestionClick(character)}
                        className={classes.listItem}
                      >
                        <ListItemText
                          primary={character.name}
                          secondary={character.description?.slice(0, 60) + '...'}
                          primaryTypographyProps={{ 
                            className: classes.primaryText
                          }}
                          secondaryTypographyProps={{ 
                            className: classes.secondaryText
                          }}
                        />
                      </ListItem>
                    ))}
                  </>
                )}

                {recentSearches.length > 0 && searchValue === '' && (
                  <>
                    <ListItem>
                      <Typography variant="caption" color="text.secondary" className={classes.sectionHeader}>
                        <TrendingUp fontSize="small" />
                        Recent Searches
                      </Typography>
                    </ListItem>
                    {recentSearches.map((term, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleRecentSearchClick(term)}
                        className={classes.recentItem}
                      >
                        <Chip
                          label={term}
                          size="small"
                          className={classes.recentChip}
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
                        className: classes.noResultsText
                      }}
                      secondaryTypographyProps={{ 
                        className: classes.noResultsSubtext
                      }}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Popper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchComponent;