// src/components/dashboard/language/LanguageSelector.jsx
import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  Avatar
} from '@mui/material';
import { Language } from '@mui/icons-material';
import apiService from '../../services/api';

const LanguageSelector = ({ 
  value = 'english', 
  onChange, 
  label = 'Language',
  showNativeName = true,
  size = 'medium',
  variant = 'outlined'
}) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      const response = await apiService.getSupportedLanguages();
      setLanguages(response.languages || []);
    } catch (error) {
      console.error('Failed to load languages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageFlag = (isoCode) => {
    const flagMap = {
      'en': '🇺🇸',
      'hi': '🇮🇳',
      'ta': '🇮🇳',
      'te': '🇮🇳',
      'bn': '🇮🇳',
      'gu': '🇮🇳',
      'mr': '🇮🇳',
      'pa': '🇮🇳',
      'kn': '🇮🇳',
      'ml': '🇮🇳',
      'es': '🇪🇸',
      'fr': '🇫🇷'
    };
    return flagMap[isoCode] || '🌐';
  };

  if (loading) {
    return (
      <FormControl variant={variant} size={size} disabled>
        <InputLabel>{label}</InputLabel>
        <Select value="">
          <MenuItem value="">Loading...</MenuItem>
        </Select>
      </FormControl>
    );
  }

  return (
    <FormControl variant={variant} size={size} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
        renderValue={(selected) => {
          const selectedLang = languages.find(lang => lang.code === selected);
          if (!selectedLang) return selected;
          
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: '1.2em' }}>
                {getLanguageFlag(selectedLang.iso_code)}
              </span>
              <Typography>
                {showNativeName ? selectedLang.native_name : selectedLang.name}
              </Typography>
            </Box>
          );
        }}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Avatar
                sx={{ 
                  width: 24, 
                  height: 24, 
                  fontSize: '0.8rem',
                  background: 'transparent'
                }}
              >
                {getLanguageFlag(language.iso_code)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1">
                  {language.name}
                </Typography>
                {showNativeName && language.native_name !== language.name && (
                  <Typography variant="caption" color="text.secondary">
                    {language.native_name}
                  </Typography>
                )}
              </Box>
              <Chip
                label={language.iso_code.toUpperCase()}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;