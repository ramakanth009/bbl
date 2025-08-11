import React, { useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  Slider, 
  Typography, 
  FormControlLabel, 
  Checkbox,
  Box,
  CircularProgress 
} from '@mui/material';
import { 
  PlayArrow, 
  Stop, 
  Settings,
  VolumeUp 
} from '@mui/icons-material';

const VoiceControls = ({ 
  text, 
  characterName = null,
  voiceId = null,
  size = 'small',
  showSettings = true,
  disabled = false,
  useTTS // Pass the useTTS hook as a prop
}) => {
  const { speak, stopAudio, isPlaying, isLoading, error } = useTTS();
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [voiceSettings, setVoiceSettings] = useState({
    speed_factor: 1.0,
    temperature: 0.7,
    exaggeration: 1.0,
    autoPlay: false
  });

  const handlePlay = async () => {
    if (!text?.trim()) return;
    
    const options = {
      voiceId: voiceId || 'default_sample.wav',
      ttsSettings: {
        speed_factor: voiceSettings.speed_factor,
        temperature: voiceSettings.temperature,
        exaggeration: voiceSettings.exaggeration
      }
    };

    await speak(text, options);
  };

  const handleStop = () => {
    stopAudio();
  };

  const updateSetting = (key, value) => {
    setVoiceSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSettingsOpen = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  if (!text?.trim() || disabled) {
    return (
      <IconButton disabled size={size} title="No text to speak">
        <VolumeUp sx={{ opacity: 0.3 }} />
      </IconButton>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {/* Play/Stop Button */}
      {isLoading ? (
        <IconButton disabled size={size}>
          <CircularProgress size={20} color="primary" />
        </IconButton>
      ) : isPlaying ? (
        <IconButton 
          onClick={handleStop} 
          size={size}
          sx={{ color: '#f44336' }}
          title="Stop speaking"
        >
          <Stop />
        </IconButton>
      ) : (
        <IconButton 
          onClick={handlePlay} 
          size={size}
          sx={{ color: '#1976d2' }}
          title={`Speak ${characterName ? `as ${characterName}` : 'message'}`}
        >
          <PlayArrow />
        </IconButton>
      )}

      {/* Settings Button */}
      {showSettings && (
        <>
          <IconButton 
            onClick={handleSettingsOpen}
            size={size}
            sx={{ color: '#757575' }}
            title="Voice settings"
          >
            <Settings />
          </IconButton>

          <Menu
            anchorEl={settingsAnchor}
            open={Boolean(settingsAnchor)}
            onClose={handleSettingsClose}
            PaperProps={{
              sx: {
                backgroundColor: 'rgba(30, 30, 30, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                minWidth: 280,
                p: 2
              }
            }}
          >
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                Voice Settings
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#aaa' }}>
                  Speed: {voiceSettings.speed_factor.toFixed(1)}x
                </Typography>
                <Slider
                  value={voiceSettings.speed_factor}
                  onChange={(_, value) => updateSetting('speed_factor', value)}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  size="small"
                  sx={{
                    color: '#1976d2',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#1976d2',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#1976d2',
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#aaa' }}>
                  Expression: {voiceSettings.exaggeration.toFixed(1)}
                </Typography>
                <Slider
                  value={voiceSettings.exaggeration}
                  onChange={(_, value) => updateSetting('exaggeration', value)}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  size="small"
                  sx={{
                    color: '#1976d2',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#1976d2',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#1976d2',
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#aaa' }}>
                  Variation: {voiceSettings.temperature.toFixed(1)}
                </Typography>
                <Slider
                  value={voiceSettings.temperature}
                  onChange={(_, value) => updateSetting('temperature', value)}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  size="small"
                  sx={{
                    color: '#1976d2',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#1976d2',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#1976d2',
                    },
                  }}
                />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={voiceSettings.autoPlay}
                    onChange={(e) => updateSetting('autoPlay', e.target.checked)}
                    size="small"
                    sx={{ color: '#1976d2' }}
                  />
                }
                label={
                  <Typography variant="caption" sx={{ color: '#ffffff' }}>
                    Auto-play messages
                  </Typography>
                }
              />
            </Box>
          </Menu>
        </>
      )}

      {/* Error indicator */}
      {error && (
        <IconButton 
          size={size}
          sx={{ color: '#f44336' }}
          title={`Voice error: ${error}`}
        >
          ❌
        </IconButton>
      )}
    </Box>
  );
};

export default VoiceControls;