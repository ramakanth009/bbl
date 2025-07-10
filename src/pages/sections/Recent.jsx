import React from 'react';
import { Box, Typography } from '@mui/material';

const Recent = () => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="60vh">
    <Typography variant="h4" color="text.secondary" gutterBottom>
      Recent
    </Typography>
    <Typography variant="h6" color="text.disabled">
      Coming Soon
    </Typography>
  </Box>
);

export default Recent;
