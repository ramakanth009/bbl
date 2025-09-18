import React from 'react';
import { Box, Container } from '@mui/material';
import UpgradePlans from '../../components/extra/UpgradePlans';

const Upgrade = () => {
  return (
    <Box sx={{ width: '100%', color: '#e5e7eb' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
        <UpgradePlans onSelectPlan={(plan) => console.log('Selected plan:', plan)} />
      </Container>
    </Box>
  );
};

export default Upgrade;
