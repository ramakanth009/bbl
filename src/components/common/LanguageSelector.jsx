import React, { useState, useEffect } from 'react';
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
import { styled } from '@mui/material/styles';
import apiService from '../../services/api';

const LanguageButton = styled(IconButton)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
}));

const LanguageMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(30,30,30,0.98)',
    border: '1px solid #444',
    borderRadius: 12,
    minWidth: 280,
    maxHeight: 400,
  },
}));

const LanguageMenuItem = styled(MenuItem)(({ theme, selected }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 8,
  margin: theme.spacing(0.5),
  backgroundColor: selected ? 'rgba(25,118,210,0.15)' : 'transparent',
  border: selected ? '1px solid rgba(25,118,210,0.3)' : '1px solid transparent',
  '&:hover': {
    backgroundColor: selected ? 'rgba(25,118,210,0.25)' : 'rgba(255,255,255,0.1)',
  },
}));

const FlagEmoji = styled('span')({
  fontSize: '1.2rem',
  marginRight: 8,
});

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const open = Boolean(anchorEl);

  // Default languages fallback if API fails
  const defaultLanguages = [
    { code: 'english', name: 'English', native_name: 'English', iso_code: 'en', flag: '🇺🇸' },
    { code: 'hindi', name: 'Hindi', native_name: 'Hindi (Roman)', iso_code: 'hi', flag: '🇮🇳' },
    { code: 'spanish', name: 'Spanish', native_name: 'Español', iso_code: 'es', flag: '🇪🇸' },
    { code: 'french', name: 'French', native_name: 'Français', iso_code: 'fr', flag: '🇫🇷' },
    { code: 'tamil', name: 'Tamil', native_name: 'Tamil (Roman)', iso_code: 'ta', flag: '🇮🇳' },
    { code: 'telugu', name: 'Telugu', native_name: 'Telugu (Roman)', iso_code: 'te', flag: '🇮🇳' },
    { code: 'bengali', name: 'Bengali', native_name: 'Bengali (Roman)', iso_code: 'bn', flag: '🇧🇩' },
    { code: 'gujarati', name: 'Gujarati', native_name: 'Gujarati (Roman)', iso_code: 'gu', flag: '🇮🇳' },
    { code: 'marathi', name: 'Marathi', native_name: 'Marathi (Roman)', iso_code: 'mr', flag: '🇮🇳' },
    { code: 'punjabi', name: 'Punjabi', native_name: 'Punjabi (Roman)', iso_code: 'pa', flag: '🇮🇳' },
    { code: 'kannada', name: 'Kannada', native_name: 'Kannada (Roman)', iso_code: 'kn', flag: '🇮🇳' },
    { code: 'malayalam', name: 'Malayalam', native_name: 'Malayalam (Roman)', iso_code: 'ml', flag: '🇮🇳' },
  ];

  // Add flags to languages
  const addFlags = (langs) => {
    const flagMap = {
      'en': '🇺🇸', 'hi': '🇮🇳', 'es': '🇪🇸', 'fr': '🇫🇷',
      'ta': '🇮🇳', 'te': '🇮🇳', 'bn': '🇧🇩', 'gu': '🇮🇳',
      'mr': '🇮🇳', 'pa': '🇮🇳', 'kn': '🇮🇳', 'ml': '🇮🇳'
    };
    
    return langs.map(lang => ({
      ...lang,
      flag: flagMap[lang.iso_code] || '🌐'
    }));
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getSupportedLanguages();
      const loadedLanguages = addFlags(response.languages || []);
      setLanguages(loadedLanguages);
    } catch (error) {
      console.warn('Failed to load languages from API, using defaults:', error);
      setLanguages(defaultLanguages);
      setError('Using default languages');
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
          <LanguageButton 
            onClick={handleClick} 
            disabled={disabled}
            active={currentLanguage !== 'english'}
            size="small"
            {...props}
          >
            <span style={{ fontSize: '1rem' }}>{currentLang.flag}</span>
          </LanguageButton>
        </Tooltip>
      );
    }

    return (
      <LanguageButton 
        onClick={handleClick} 
        disabled={disabled}
        active={currentLanguage !== 'english'}
        {...props}
      >
        <Language />
      </LanguageButton>
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
      
      <LanguageMenu
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
            const isSelected = mode === 'both' 
              ? language.code === currentLanguage
              : mode === 'input' 
                ? language.code === inputLanguage
                : language.code === outputLanguage;

            return (
              <LanguageMenuItem
                key={language.code}
                onClick={() => handleLanguageSelect(language.code, mode)}
                selected={isSelected}
              >
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                  <FlagEmoji>{language.flag}</FlagEmoji>
                </ListItemIcon>
                <ListItemText
                  primary={language.name}
                  secondary={language.native_name !== language.name ? language.native_name : null}
                  primaryTypographyProps={{
                    sx: { color: '#fff', fontSize: '0.9rem' }
                  }}
                  secondaryTypographyProps={{
                    sx: { color: '#bbb', fontSize: '0.8rem' }
                  }}
                />
                {isSelected && (
                  <Check sx={{ color: 'primary.main', ml: 1 }} />
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
      </LanguageMenu>
    </>
  );
};

export default LanguageSelector;