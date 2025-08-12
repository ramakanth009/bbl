import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Menu, 
  Slider, 
  Chip, 
  Tooltip, 
  IconButton,
  Divider,
  Button,
  Collapse
} from '@mui/material';
import { 
  Info, 
  Tune, 
  Psychology, 
  Speed, 
  AutoAwesome,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  settingsMenu: {
    '& .MuiPaper-root': {
      backgroundColor: '#1e1e1e',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '12px',
      padding: '24px',
      minWidth: '380px',
      maxWidth: '420px',
    },
  },
  settingBox: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#252525',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
  settingHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  settingTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  presetChip: {
    margin: '2px',
    fontSize: '0.75rem',
    height: '24px',
  },
});

const CreativitySettingsMenu = ({ 
  anchorEl, 
  open, 
  onClose, 
  temperature, 
  setTemperature,
  topP, 
  setTopP,
  topK, 
  setTopK 
}) => {
  const classes = useStyles();
  const [showExplanations, setShowExplanations] = useState(false);

  const presets = {
    conservative: { temperature: 0.2, topP: 0.8, topK: 20 },
    balanced: { temperature: 0.7, topP: 0.95, topK: 40 },
    creative: { temperature: 0.9, topP: 0.98, topK: 80 }
  };

  const applyPreset = (preset) => {
    setTemperature(preset.temperature);
    setTopP(preset.topP);
    setTopK(preset.topK);
  };

  const getTemperatureLabel = (value) => {
    if (value <= 0.3) return 'Predictable';
    if (value <= 0.7) return 'Balanced';
    return 'Creative';
  };

  const getTopPLabel = (value) => {
    if (value <= 0.7) return 'Focused';
    if (value <= 0.9) return 'Balanced';
    return 'Diverse';
  };

  const getTopKLabel = (value) => {
    if (value <= 30) return 'Conservative';
    if (value <= 60) return 'Moderate';
    return 'Adventurous';
  };

  return (
    <Menu
      className={classes.settingsMenu}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Creativity Settings
        </Typography>
        <Button
          size="small"
          startIcon={showExplanations ? <ExpandLess /> : <ExpandMore />}
          onClick={() => setShowExplanations(!showExplanations)}
          sx={{ fontSize: '0.75rem' }}
        >
          {showExplanations ? 'Hide' : 'Show'} Details
        </Button>
      </Box>

      {/* Quick Presets */}
      <Box className={classes.settingBox}>
        <Box className={classes.settingHeader}>
          <Box className={classes.settingTitle}>
            <AutoAwesome fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">
              Quick Presets
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip
            className={classes.presetChip}
            label="Conservative"
            variant="outlined"
            onClick={() => applyPreset(presets.conservative)}
            color={temperature === 0.2 ? 'primary' : 'default'}
          />
          <Chip
            className={classes.presetChip}
            label="Balanced"
            variant="outlined"
            onClick={() => applyPreset(presets.balanced)}
            color={temperature === 0.7 ? 'primary' : 'default'}
          />
          <Chip
            className={classes.presetChip}
            label="Creative"
            variant="outlined"
            onClick={() => applyPreset(presets.creative)}
            color={temperature === 0.9 ? 'primary' : 'default'}
          />
        </Box>
      </Box>

      {/* Temperature */}
      <Box className={classes.settingBox}>
        <Box className={classes.settingHeader}>
          <Box className={classes.settingTitle}>
            <Psychology fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">
              Temperature: {getTemperatureLabel(temperature)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({temperature})
            </Typography>
          </Box>
          <Tooltip title="Controls randomness in responses">
            <IconButton size="small">
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Slider
          value={temperature}
          onChange={(_, value) => setTemperature(value)}
          min={0}
          max={1}
          step={0.1}
          marks={[
            { value: 0, label: '0' },
            { value: 0.5, label: '0.5' },
            { value: 1, label: '1' }
          ]}
          size="small"
        />
        
        <Collapse in={showExplanations}>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Lower values make responses more focused and deterministic. Higher values increase creativity and randomness.
          </Typography>
        </Collapse>
      </Box>

      {/* Top P */}
      <Box className={classes.settingBox}>
        <Box className={classes.settingHeader}>
          <Box className={classes.settingTitle}>
            <Tune fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">
              Top P: {getTopPLabel(topP)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({topP})
            </Typography>
          </Box>
          <Tooltip title="Controls diversity via nucleus sampling">
            <IconButton size="small">
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Slider
          value={topP}
          onChange={(_, value) => setTopP(value)}
          min={0.1}
          max={1}
          step={0.01}
          marks={[
            { value: 0.1, label: '0.1' },
            { value: 0.5, label: '0.5' },
            { value: 1, label: '1' }
          ]}
          size="small"
        />
        
        <Collapse in={showExplanations}>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Considers only the most probable tokens that add up to P probability mass. Lower values focus on likely tokens.
          </Typography>
        </Collapse>
      </Box>

      {/* Top K */}
      <Box className={classes.settingBox}>
        <Box className={classes.settingHeader}>
          <Box className={classes.settingTitle}>
            <Speed fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">
              Top K: {getTopKLabel(topK)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({topK})
            </Typography>
          </Box>
          <Tooltip title="Limits token choices to top K options">
            <IconButton size="small">
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Slider
          value={topK}
          onChange={(_, value) => setTopK(value)}
          min={1}
          max={100}
          step={1}
          marks={[
            { value: 1, label: '1' },
            { value: 50, label: '50' },
            { value: 100, label: '100' }
          ]}
          size="small"
        />
        
        <Collapse in={showExplanations}>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Considers only the K most likely next tokens. Lower values are more conservative, higher values more adventurous.
          </Typography>
        </Collapse>
      </Box>

      <Divider sx={{ my: 2 }} />
      
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color="text.secondary">
          Advanced AI Parameters
        </Typography>
        <Button size="small" onClick={onClose} variant="outlined">
          Done
        </Button>
      </Box>
    </Menu>
  );
};

export default CreativitySettingsMenu;