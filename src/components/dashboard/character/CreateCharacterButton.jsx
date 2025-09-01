import React from 'react';
import { Card, Typography, Box, Chip } from '@mui/material';
import { Add, Construction } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  createCard: {
    background: 'transparent !important',
    border: '2px dashed rgba(99, 102, 241, 0.2)',
    borderRadius: '16px',
    padding: '16px 12px !important', // REDUCED from '32px 24px'
    minHeight: 220, // REDUCED to match CharacterCard height
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
      padding: '14px 10px !important', // REDUCED from '28px 20px'
      minHeight: 200, // REDUCED to match CharacterCard
      borderRadius: '14px',
      '&::before': {
        borderRadius: '14px',
      },
    },
    '@media (max-width: 960px)': {
      padding: '12px 8px !important', // REDUCED from '24px 16px'
      minHeight: 180, // REDUCED to match CharacterCard
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
    fontSize: '32px !important', // REDUCED from 64px
    color: '#6b7280',
    marginBottom: '8px !important', // REDUCED from 16px
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '30px !important', // REDUCED from 60px
      marginBottom: '6px !important', // REDUCED from 14px
    },
    '@media (max-width: 960px)': {
      fontSize: '28px !important', // REDUCED from 56px
      marginBottom: '4px !important', // REDUCED from 12px
    },
    '@media (max-width: 600px)': {
      fontSize: '24px !important',
      margin: '0 !important',
      color: '#6b7280 !important',
    },
  },
  createTitle: {
    fontSize: '14px !important', // REDUCED from 20px
    fontWeight: 700,
    marginBottom: '4px !important', // REDUCED from 8px
    color: '#9ca3af',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '13px !important', // REDUCED from 18px
      marginBottom: '3px !important', // REDUCED from 7px
    },
    '@media (max-width: 960px)': {
      fontSize: '12px !important', // REDUCED from 16px
      marginBottom: '2px !important', // REDUCED from 6px
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  createDescription: {
    fontSize: '10px !important', // REDUCED from 14px
    color: '#6b7280',
    marginBottom: '8px !important', // REDUCED from 20px
    lineHeight: 1.3, // REDUCED from 1.5
    maxWidth: '180px !important', // REDUCED from 250px
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '9px !important', // REDUCED from 13px
      marginBottom: '6px !important', // REDUCED from 18px
      maxWidth: '160px !important', // REDUCED from 230px
    },
    '@media (max-width: 960px)': {
      fontSize: '8px !important', // REDUCED from 12px
      marginBottom: '4px !important', // REDUCED from 16px
      maxWidth: '140px !important', // REDUCED from 210px
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  comingSoonChip: {
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)',
    border: '1px solid rgba(245, 158, 11, 0.4)',
    color: '#f59e0b',
    fontSize: '8px !important', // REDUCED from 12px
    fontWeight: 600,
    padding: '4px 8px !important', // REDUCED from '8px 16px'
    borderRadius: '12px !important', // REDUCED from 20px
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '3px !important', // REDUCED from 6px
    height: '20px !important', // ADDED explicit height
    '& .MuiChip-label': {
      padding: '0 !important', // REMOVE default padding
    },
    '@media (max-width: 1200px)': {
      fontSize: '7px !important', // REDUCED from 11px
      padding: '3px 6px !important', // REDUCED from '7px 14px'
      height: '18px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '6px !important', // REDUCED from 10px
      padding: '2px 5px !important', // REDUCED from '6px 12px'
      height: '16px !important',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  iconWrapper: {
    width: '50px !important', // REDUCED from 80px
    height: '50px !important', // REDUCED from 80px
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px !important', // REDUCED from 20px
    transition: 'all 0.4s ease',
    position: 'relative',
    zIndex: 1,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
    border: '2px solid rgba(99, 102, 241, 0.2)',
    '@media (max-width: 1200px)': {
      width: '45px !important', // REDUCED from 75px
      height: '45px !important', // REDUCED from 75px
      marginBottom: '6px !important', // REDUCED from 18px
    },
    '@media (max-width: 960px)': {
      width: '40px !important', // REDUCED from 70px
      height: '40px !important', // REDUCED from 70px
      marginBottom: '4px !important', // REDUCED from 16px
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
        icon={<Construction style={{ fontSize: '10px' }} />}
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