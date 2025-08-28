import React from 'react';
import { Card, Typography, Box, Chip } from '@mui/material';
import { Add, Construction } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  createCard: {
    background: 'transparent !important',
    border: '2px dashed rgba(99, 102, 241, 0.2)',
    borderRadius: '16px',
    padding: '32px 24px',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    opacity: 0.7,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)',
      opacity: 1,
      borderRadius: '16px',
      pointerEvents: 'none',
    },
    '@media (max-width: 1200px)': {
      padding: '28px 20px',
      minHeight: 260,
      borderRadius: '14px',
      '&::before': {
        borderRadius: '14px',
      },
    },
    '@media (max-width: 960px)': {
      padding: '24px 16px',
      minHeight: 240,
      borderRadius: '12px',
      '&::before': {
        borderRadius: '12px',
      },
    },
    // MOBILE LAYOUT - List Style
    '@media (max-width: 600px)': {
      padding: '16px !important',
      minHeight: 'auto !important',
      borderRadius: '12px !important',
      flexDirection: 'row !important',
      alignItems: 'center !important',
      gap: '12px !important',
      border: 'none !important',
      background: 'rgba(26, 26, 26, 0.4) !important',
      marginBottom: '8px !important',
      textAlign: 'left !important',
      opacity: 0.6,
      '&::before': {
        display: 'none !important',
      },
    },
  },

  // Mobile-specific list item layout
  mobileListItem: {
    '@media (max-width: 600px)': {
      display: 'flex !important',
      alignItems: 'center !important',
      gap: '12px !important',
      width: '100% !important',
      padding: '0 !important',
    },
  },

  // Mobile icon container
  mobileIconContainer: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'flex !important',
      width: '48px !important',
      height: '48px !important',
      borderRadius: '50% !important',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%) !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
      flexShrink: 0,
      border: '2px solid rgba(99, 102, 241, 0.3) !important',
    },
  },

  // Mobile content area
  mobileContent: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'flex !important',
      flexDirection: 'column !important',
      flex: 1,
      minWidth: 0,
      gap: '2px !important',
    },
  },

  // Mobile title
  mobileTitle: {
    '@media (max-width: 600px)': {
      fontSize: '16px !important',
      fontWeight: '600 !important',
      color: '#9ca3af !important',
      lineHeight: '1.2 !important',
      margin: '0 !important',
    },
  },

  // Mobile description
  mobileDescription: {
    '@media (max-width: 600px)': {
      fontSize: '14px !important',
      color: '#6b7280 !important',
      lineHeight: '1.3 !important',
      margin: '0 !important',
    },
  },

  createIcon: {
    fontSize: '64px',
    color: '#6b7280',
    marginBottom: '16px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '60px',
      marginBottom: '14px',
    },
    '@media (max-width: 960px)': {
      fontSize: '56px',
      marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '24px !important',
      margin: '0 !important',
      color: '#6b7280 !important',
    },
  },
  createTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#9ca3af',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '18px',
      marginBottom: '7px',
    },
    '@media (max-width: 960px)': {
      fontSize: '16px',
      marginBottom: '6px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  createDescription: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '20px',
    lineHeight: 1.5,
    maxWidth: '250px',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '13px',
      marginBottom: '18px',
      maxWidth: '230px',
    },
    '@media (max-width: 960px)': {
      fontSize: '12px',
      marginBottom: '16px',
      maxWidth: '210px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  comingSoonChip: {
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)',
    border: '1px solid rgba(245, 158, 11, 0.4)',
    color: '#f59e0b',
    fontSize: '12px',
    fontWeight: 600,
    padding: '8px 16px',
    borderRadius: '20px',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    '@media (max-width: 1200px)': {
      fontSize: '11px',
      padding: '7px 14px',
    },
    '@media (max-width: 960px)': {
      fontSize: '10px',
      padding: '6px 12px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    transition: 'all 0.4s ease',
    position: 'relative',
    zIndex: 1,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
    border: '2px solid rgba(99, 102, 241, 0.2)',
    '@media (max-width: 1200px)': {
      width: '75px',
      height: '75px',
      marginBottom: '18px',
    },
    '@media (max-width: 960px)': {
      width: '70px',
      height: '70px',
      marginBottom: '16px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
});

const CreateCharacterButton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.createCard} elevation={0}>
      {/* Desktop/Tablet Layout */}
      <Box className={classes.iconWrapper}>
        <Construction className={classes.createIcon} />
      </Box>
      <Typography className={classes.createTitle}>
        Create Character
      </Typography>
      <Typography className={classes.createDescription}>
        Design your own AI character with custom personality and traits
      </Typography>
      <Chip
        className={classes.comingSoonChip}
        icon={<Construction style={{ fontSize: '16px' }} />}
        label="Coming Soon"
      />

      {/* Mobile List Layout */}
      <Box className={classes.mobileListItem}>
        <Box className={classes.mobileIconContainer}>
          <Construction className={classes.createIcon} />
        </Box>
        
        <Box className={classes.mobileContent}>
          <Typography className={classes.mobileTitle}>
            Create Character
          </Typography>
          <Typography className={classes.mobileDescription}>
            Coming Soon
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CreateCharacterButton;