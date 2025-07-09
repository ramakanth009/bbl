import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Box,
  Divider,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { 
  Language, 
  Check, 
  Translate,
  Public,
  VolumeUp
} from '@mui/icons-material';
import apiService from '../../services/api';

const useStyles = makeStyles(() => ({
  languageButton: {
    color: ({ active }) => active ? '#6366f1' : '#9ca3af',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgba(30,30,30,0.98)',
      border: '1px solid #444',
      borderRadius: 12,
      minWidth: 280,
      maxHeight: 400,
    },
  },
  menuItem: {
    padding: '12px',
    borderRadius: 8,
    margin: '4px',
    backgroundColor: ({ selected }) => selected ? 'rgba(99,102,241,0.15)' : 'transparent',
    border: ({ selected }) => selected ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: ({ selected }) => selected ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.1)',
    },
    '& .MuiListItemText-primary': {
      color: ({ selected }) => selected ? '#6366f1' : '#fff',
      fontWeight: ({ selected }) => selected ? 600 : 400,
    },
    '& .MuiListItemText-secondary': {
      color: ({ selected }) => selected ? 'rgba(99,102,241,0.7)' : '#bbb',
    },
    '&.active': {
      backgroundColor: 'rgba(99,102,241,0.15)',
      borderColor: 'rgba(99,102,241,0.3)',
      '& .MuiListItemText-primary': {
        color: '#6366f1',
        fontWeight: 600,
      },
      '& .MuiListItemText-secondary': {
        color: 'rgba(99,102,241,0.7)',
      },
    },
  },
  flagEmoji: {
    fontSize: '1.2rem',
    marginRight: '8px',
  },
}));

const LanguageMenuItem = ({ selected, children, ...props }) => {
  const classes = useStyles({ selected });
  return (
    <MenuItem className={classes.menuItem} {...props}>
      {children}
    </MenuItem>
  );
};

const LanguageSelector = ({ 
  onLanguageChange, 
  currentLanguage = 'english',
  inputLanguage = 'english',
  outputLanguage = 'english',
  mode = 'both', // 'input', 'output', 'both'
  compact = false,
  disabled = false,
  ...props 
}) => {
  const classes = useStyles({ active: currentLanguage !== 'english' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const open = Boolean(anchorEl);

  // Remove defaultLanguages, only fallback if API fails

  // Add iso codes to languages (no flags)
  const addIsoCodes = (langs) => {
    return langs.map(lang => ({
      ...lang,
    }));
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch languages from backend
      const response = await apiService.getSupportedLanguages();
      // Expecting response.languages to be an array
      const loadedLanguages = addIsoCodes(response.languages || []);
      setLanguages(loadedLanguages);
      if (!response.languages || response.languages.length === 0) {
        setError('No languages found from backend');
      }
    } catch (error) {
      setLanguages([]);
      setError('Failed to load languages from backend');
      console.warn('Failed to load languages from API:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (languageCode, type = 'both') => {
    if (onLanguageChange) {
      onLanguageChange(languageCode, type);
    }
    handleClose();
  };

  const getCurrentLanguageInfo = (langCode) => {
    return languages.find(lang => lang.code === langCode) || 
           { name: 'Unknown', flag: '🌐', code: langCode };
  };

  const renderLanguageButton = () => {
    if (compact) {
      const currentLang = getCurrentLanguageInfo(currentLanguage);
      return (
        <Tooltip title={`Language: ${currentLang.name}`}>
          <IconButton 
            onClick={handleClick} 
            disabled={disabled}
            className={classes.languageButton}
            size="small"
            {...props}
          >
            {/* Show ISO code instead of flag */}
            <span style={{ fontSize: '1rem', fontWeight: 600 }}>
              {currentLang.iso_code?.toUpperCase() || currentLang.code?.toUpperCase()}
            </span>
          </IconButton>
        </Tooltip>
      );
    }

    return (
      <IconButton 
        onClick={handleClick} 
        disabled={disabled}
        className={classes.languageButton}
        {...props}
      >
        <Language />
      </IconButton>
    );
  };

  const renderModeSelector = () => {
    if (mode === 'both') {
      return (
        <Box sx={{ p: 2, borderBottom: '1px solid #444' }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Language Settings
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Chip 
              icon={<VolumeUp />}
              label={`Input: ${getCurrentLanguageInfo(inputLanguage).name}`}
              size="small"
              sx={{ backgroundColor: 'rgba(25,118,210,0.15)' }}
            />
            <Chip 
              icon={<Translate />}
              label={`Output: ${getCurrentLanguageInfo(outputLanguage).name}`}
              size="small"
              sx={{ backgroundColor: 'rgba(76,175,80,0.15)' }}
            />
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      {renderLanguageButton()}
      
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {renderModeSelector()}
        
        <Box sx={{ p: 1 }}>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          
          {!loading && languages.map((language) => {
            // Always compare with currentLanguage for selection
            const isSelected = language.code === currentLanguage;

            return (
              <LanguageMenuItem
                key={language.code}
                onClick={() => handleLanguageSelect(language.code, mode)}
                selected={isSelected}
                className={isSelected ? 'active' : ''}
              >
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                  {/* Show ISO code instead of flag */}
                  <span className={classes.flagEmoji} style={{ fontSize: '1rem', fontWeight: 400 }}>
                    {language.iso_code?.toUpperCase() || language.code?.toUpperCase()}
                  </span>
                </ListItemIcon>
                <ListItemText
                  primary={language.name}
                  secondary={language.native_name !== language.name ? language.native_name : null}
                  primaryTypographyProps={{
                    sx: { 
                      color: isSelected ? '#6366f1' : '#fff',
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: '0.9rem'
                    }
                  }}
                  secondaryTypographyProps={{
                    sx: { 
                      color: isSelected ? 'rgba(99,102,241,0.7)' : '#bbb',
                      fontSize: '0.8rem'
                    }
                  }}
                />
                {isSelected && (
                  <Check sx={{ color: '#6366f1', ml: 1 }} />
                )}
              </LanguageMenuItem>
            );
          })}
          
          {error && (
            <Box sx={{ p: 1 }}>
              <Typography variant="caption" color="warning.main">
                {error}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ borderColor: '#444' }} />
        <Box sx={{ p: 1.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Public fontSize="small" />
            {languages.length} languages supported
          </Typography>
        </Box>
      </Menu>
    </>
  );
};

export default LanguageSelector;