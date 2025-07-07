// src/components/dashboard/search/SearchComponent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  InputAdornment,
  IconButton,
  Pagination,
  Stack
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { debounce } from 'lodash';
import apiService from '../../../services/api';
import CharacterCard from '../character/CharacterCard';

const useStyles = makeStyles({
  searchContainer: {
    padding: '16px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    marginBottom: '24px',
  },
  searchField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.8)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
    },
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px',
    color: '#666',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px',
  },
});

const SearchComponent = ({ onCharacterClick }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(
    debounce(async (term, page = 1) => {
      if (!term.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setTotalPages(0);
        setTotalCount(0);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.searchCharacters(term.trim(), page, 20);
        
        setSearchResults(response.results || []);
        setTotalPages(response.total_pages || 0);
        setTotalCount(response.total_count || 0);
        setHasSearched(true);
      } catch (err) {
        console.error('Search failed:', err);
        setError(err.message || 'Search failed. Please try again.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    performSearch(searchTerm, currentPage);
  }, [searchTerm, currentPage, performSearch]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHasSearched(false);
    setCurrentPage(1);
    setTotalPages(0);
    setTotalCount(0);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      {/* Search Input */}
      <Paper className={classes.searchContainer} elevation={6}>
        <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 600 }}>
          Search Characters
        </Typography>
        <TextField
          fullWidth
          label="Search by name or description..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className={classes.searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={clearSearch}
                  sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      )}

      {/* Search Results */}
      {!loading && hasSearched && (
        <>
          {/* Results Header */}
          {searchResults.length > 0 && (
            <Box className={classes.resultsHeader}>
              <Typography variant="h6">
                Search Results
                <Chip 
                  label={`${totalCount} found`} 
                  size="small" 
                  sx={{ ml: 1 }} 
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Showing page {currentPage} of {totalPages}
              </Typography>
            </Box>
          )}

          {/* Results Grid */}
          {searchResults.length > 0 ? (
            <>
              <Box className={classes.resultsGrid}>
                {searchResults.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={() => onCharacterClick(character)}
                  />
                ))}
              </Box>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box className={classes.paginationContainer}>
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </Box>
              )}
            </>
          ) : (
            /* Empty State */
            <Box className={classes.emptyState}>
              <Typography variant="h6" gutterBottom>
                No characters found
              </Typography>
              <Typography variant="body2">
                Try searching with different keywords or check your spelling.
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* Initial State */}
      {!hasSearched && !loading && (
        <Box className={classes.emptyState}>
          <Typography variant="h6" gutterBottom>
            Search for Characters
          </Typography>
          <Typography variant="body2">
            Enter a name or description to find characters to chat with.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchComponent;