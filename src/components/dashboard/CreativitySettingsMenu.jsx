import React from 'react';
import { Box, Typography, Menu, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

const SettingsMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    padding: theme.spacing(2),
    minWidth: 280,
  },
}));

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
  return (
    <SettingsMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Creativity Settings
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Temperature: {temperature}
        </Typography>
        <Slider
          value={temperature}
          onChange={(_, value) => setTemperature(value)}
          min={0}
          max={1}
          step={0.1}
          size="small"
        />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Top P: {topP}
        </Typography>
        <Slider
          value={topP}
          onChange={(_, value) => setTopP(value)}
          min={0}
          max={1}
          step={0.05}
          size="small"
        />
      </Box>
      
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Top K: {topK}
        </Typography>
        <Slider
          value={topK}
          onChange={(_, value) => setTopK(value)}
          min={1}
          max={100}
          step={1}
          size="small"
        />
      </Box>
    </SettingsMenu>
  );
};

export default CreativitySettingsMenu;