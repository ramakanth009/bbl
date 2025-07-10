import React from 'react';
import { Box, Typography } from '@mui/material';

const Featured = () => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="60vh">
    <Typography variant="h4" color="text.secondary" gutterBottom>
      Featured
    </Typography>
    <Typography variant="h6" color="text.disabled">
      Coming Soon
    </Typography>
  </Box>
);

export default Featured;
