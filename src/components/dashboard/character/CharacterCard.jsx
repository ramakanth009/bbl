import React, { useMemo, useState } from 'react';
import { Card, CardContent, Box, Typography, Avatar, Chip, IconButton, Collapse } from '@mui/material';
import { 
  Message, 
  Favorite,
  Palette, 
  Science, 
  Movie, 
  EmojiEvents, 
  Psychology, 
  Lightbulb,
  Groups,
  Category,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useCategories } from '../../../context/CategoriesContext';

// Same icon mapping as sidebar
const iconMap = {
  "entertainment_arts": <Movie sx={{ fontSize: 14 }} />,
  "fictional_anime": <Psychology sx={{ fontSize: 14 }} />,
  "innovators_visionaries": <Lightbulb sx={{ fontSize: 14 }} />,
  "leaders_historical": <Groups sx={{ fontSize: 14 }} />,
  "spiritual_social": <Palette sx={{ fontSize: 14 }} />,
  "sports_champions": <EmojiEvents sx={{ fontSize: 14 }} />,
  "art_culture": <Palette sx={{ fontSize: 14 }} />,
  "science": <Science sx={{ fontSize: 14 }} />,
  "entertainment": <Movie sx={{ fontSize: 14 }} />,
};

const useStyles = makeStyles({
  // Desktop/Tablet Card Layout
  styledCard: {
    background: 'transparent !important',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      borderRadius: '16px',
      pointerEvents: 'none',
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      '&::before': {
        opacity: 1,
      },
      '& $characterAvatar': {
        borderColor: 'rgba(99, 102, 241, 0.8)',
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
      },
    },
    '@media (max-width: 1200px)': {
      padding: '20px',
      minHeight: 260,
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      padding: '18px',
      minHeight: 240,
      borderRadius: '12px',
      '&:hover': {
        transform: 'translateY(-6px) scale(1.015)',
      },
    },
    // MOBILE LAYOUT - List Style
    '@media (max-width: 600px)': {
      padding: '12px !important',
      minHeight: 'auto !important',
      borderRadius: '12px !important',
      flexDirection: 'column !important',
      alignItems: 'stretch !important',
      gap: '0 !important',
      border: 'none !important',
      background: 'rgba(26, 26, 26, 0.6) !important',
      marginBottom: '2px !important',
      cursor: 'default !important',
      '&:hover': {
        transform: 'none !important',
        background: 'rgba(42, 42, 42, 0.8) !important',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3) !important',
      },
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
      cursor: 'pointer !important',
    },
  },

  characterHeader: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 80,
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      gap: '14px',
      marginBottom: '14px',
      minHeight: 75,
    },
    '@media (max-width: 960px)': {
      gap: '12px',
      marginBottom: '12px',
      minHeight: 70,
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },

  // Mobile avatar container
  mobileAvatarContainer: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'flex !important',
      position: 'relative !important',
      flexShrink: 0,
    },
  },

  characterAvatar: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    transition: 'all 0.3s ease',
    '& img': {
      objectFit: 'cover',
      objectPosition: 'center 20%',
    },
    '@media (max-width: 1200px)': {
      width: 66,
      height: 66,
    },
    '@media (max-width: 960px)': {
      width: 60,
      height: 60,
    },
    '@media (max-width: 600px)': {
      width: '48px !important',
      height: '48px !important',
      border: '2px solid rgba(99, 102, 241, 0.4) !important',
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

  // Mobile character name
  mobileCharacterName: {
    '@media (max-width: 600px)': {
      fontSize: '16px !important',
      fontWeight: '600 !important',
      color: '#ffffff !important',
      lineHeight: '1.2 !important',
      margin: '0 !important',
      whiteSpace: 'nowrap !important',
      overflow: 'hidden !important',
      textOverflow: 'ellipsis !important',
    },
  },

  // Mobile description/message
  mobileDescription: {
    '@media (max-width: 600px)': {
      fontSize: '14px !important',
      color: '#9ca3af !important',
      lineHeight: '1.3 !important',
      margin: '0 !important',
      overflow: 'hidden !important',
      display: '-webkit-box !important',
      WebkitLineClamp: '1 !important',
      WebkitBoxOrient: 'vertical !important',
    },
  },

  // Mobile accordion arrow
  mobileAccordionArrow: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'flex !important',
      padding: '4px !important',
      color: '#9ca3af !important',
      transition: 'all 0.2s ease !important',
      transform: 'none !important',
      '&:hover': {
        color: '#ffffff !important',
        background: 'rgba(99, 102, 241, 0.2) !important',
        borderRadius: '4px !important',
      },
    },
  },

  // Mobile accordion content
  mobileAccordionContent: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'block !important',
      width: '100% !important',
      paddingTop: '12px !important',
      borderTop: '1px solid rgba(99, 102, 241, 0.2) !important',
      marginTop: '12px !important',
    },
  },

  // Mobile accordion description
  mobileAccordionDescription: {
    '@media (max-width: 600px)': {
      fontSize: '14px !important',
      color: '#d1d5db !important',
      lineHeight: '1.5 !important',
      marginBottom: '12px !important',
    },
  },

  // Mobile accordion stats
  mobileAccordionStats: {
    '@media (max-width: 600px)': {
      display: 'flex !important',
      gap: '16px !important',
      alignItems: 'center !important',
      marginBottom: '12px !important',
    },
  },

  // Mobile accordion category
  mobileAccordionCategory: {
    '@media (max-width: 600px)': {
      marginBottom: '12px !important',
      display: 'flex !important',
      flexWrap: 'wrap !important',
      gap: '8px !important',
    },
  },

  // Mobile accordion button
  mobileAccordionButton: {
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },

  characterInfo: {
    flex: 1,
    minWidth: 0,
  },
  characterName: {
    fontSize: '18px',
    fontWeight: "bold",
    marginBottom: '4px',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2,
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    '@media (max-width: 1200px)': {
      fontSize: '17px',
    },
    '@media (max-width: 960px)': {
      fontSize: '16px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  characterAuthor: {
    fontSize: '12px',
    color: '#ffffff',
    marginBottom: '2px',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    '@media (max-width: 1200px)': {
      fontSize: '11px',
    },
    '@media (max-width: 960px)': {
      fontSize: '10px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  categoryContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    '@media (max-width: 1200px)': {
      gap: '7px',
      marginBottom: '11px',
    },
    '@media (max-width: 960px)': {
      gap: '6px',
      marginBottom: '10px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  categoryChip: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#ffffff',
    fontSize: '10px',
    height: '22px',
    borderRadius: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '& .MuiChip-label': {
      padding: '0 8px 0 4px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    '& .MuiChip-icon': {
      color: '#ffffff',
      marginLeft: '4px',
      marginRight: '0px',
    },
    '@media (max-width: 1200px)': {
      fontSize: '9px',
      height: '20px',
      borderRadius: '10px',
      '& .MuiChip-label': {
        padding: '0 7px 0 3px',
        gap: '3px',
      },
      '& .MuiChip-icon': {
        marginLeft: '3px',
      },
    },
    '@media (max-width: 960px)': {
      fontSize: '8px',
      height: '18px',
      borderRadius: '9px',
      '& .MuiChip-label': {
        padding: '0 6px 0 3px',
        gap: '2px',
      },
    },
  },
  characterDescription: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: "400 !important",
    lineHeight: 1.6,
    marginBottom: '20px',
    height: '72px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    flexGrow: 1,
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '13px',
      marginBottom: '18px',
      height: '66px',
    },
    '@media (max-width: 960px)': {
      fontSize: '12px',
      marginBottom: '16px',
      height: '60px',
      lineHeight: 1.5,
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  characterStats: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    '@media (max-width: 1200px)': {
      gap: '7px',
    },
    '@media (max-width: 960px)': {
      gap: '6px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  startChatBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    color: '#ffffff !important',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    textTransform: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)',
      '&::before': {
        left: '100%',
      },
    },
    '@media (max-width: 1200px)': {
      padding: '13px',
      borderRadius: '11px',
      fontSize: '13px',
    },
    '@media (max-width: 960px)': {
      padding: '12px',
      borderRadius: '10px',
      fontSize: '12px',
      '&:hover': {
        transform: 'translateY(-1.5px)',
      },
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '11px',
      gap: '3px',
    },
    '@media (max-width: 960px)': {
      fontSize: '10px',
      gap: '3px',
    },
  },
});

const CharacterCard = ({ character, onStartChat }) => {
  const classes = useStyles();
  const { categories, loading } = useCategories();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Generate random 2-digit numbers for messages and likes
  const randomMessages = useMemo(() => Math.floor(Math.random() * 90) + 10, []);
  const randomLikes = useMemo(() => Math.floor(Math.random() * 90) + 10, []);

  const handleStartChat = (e) => {
    e.stopPropagation();
    if (onStartChat) {
      onStartChat(character);
    }
  };

  const handleMobileListClick = (e) => {
    // Only open chat if clicking outside the arrow area
    if (!e.target.closest('[data-accordion-arrow]')) {
      if (onStartChat) {
        onStartChat(character);
      }
    }
  };

  const handleAccordionToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileExpanded(prev => !prev);
  };

  const handleAccordionButtonClick = (e) => {
    e.stopPropagation();
    if (onStartChat) {
      onStartChat(character);
    }
  };

  // Get category display name and icon from context data
  const getCategoryInfo = (categoryKey) => {
    if (!categoryKey || loading) return null;
    
    const displayName = categories[categoryKey] || categoryKey;
    const icon = iconMap[categoryKey] || <Category sx={{ fontSize: 14 }} />;
    
    return { displayName, icon };
  };

  const categoryInfo = getCategoryInfo(character.category);

  // Truncate description for mobile
  const getTruncatedDescription = (description, maxLength = 60) => {
    if (!description) return '';
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...'
      : description;
  };

  return (
    <Card className={classes.styledCard} elevation={0} onClick={handleStartChat}>
      {/* Desktop/Tablet Layout */}
      <Box className={classes.characterHeader}>
        <Box display="flex" gap={1.5}>
          <Avatar 
            src={character.img} 
            alt={character.name} 
            className={classes.characterAvatar} 
          />
          <Box className={classes.characterInfo}>
            <Typography className={classes.characterName}>
              {character.name}
            </Typography>
            <Typography className={classes.characterAuthor}>
              by @{character.creator || 'LegendsAI'}
            </Typography>
            
            <Box className={classes.categoryContainer}>
              {categoryInfo && !loading && (
                <Chip 
                  icon={categoryInfo.icon}
                  label={categoryInfo.displayName}
                  size="small"
                  className={classes.categoryChip}
                />
              )}
              {loading && character.category && (
                <Chip 
                  label="Loading..."
                  size="small"
                  className={classes.categoryChip}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography className={classes.characterDescription}>
          {character.description}
        </Typography>
      </Box>
      
      {/* Commented out comment and love icons for desktop/tablet layout
      <Box className={classes.characterStats} sx={{ gap: '16px', marginBottom: '16px' }}>
        <Box className={classes.stat}>
          <Message fontSize="small" />
          <span>{randomMessages}</span>
        </Box>
        <Box className={classes.stat}>
          <Favorite fontSize="small" />
          <span>{randomLikes}</span>
        </Box>
      </Box>
      */}
      
      <Button
        className={classes.startChatBtn}
        onClick={handleStartChat}
        disableRipple
      >
        Start Chat
      </Button>

      {/* Mobile List Layout */}
      <Box className={classes.mobileListItem} onClick={handleMobileListClick}>
        <Box className={classes.mobileAvatarContainer}>
          <Avatar 
            src={character.img} 
            alt={character.name} 
            className={classes.characterAvatar}
          />
        </Box>
        
        <Box className={classes.mobileContent}>
          <Typography className={classes.mobileCharacterName}>
            {character.name}
          </Typography>
          <Typography className={classes.mobileDescription}>
            {getTruncatedDescription(character.description)}
          </Typography>
        </Box>

        <IconButton 
          className={classes.mobileAccordionArrow}
          onClick={handleAccordionToggle}
          size="small"
          data-accordion-arrow="true"
        >
          {mobileExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {/* Mobile Accordion Content */}
      <Collapse in={mobileExpanded} timeout="auto" unmountOnExit>
        <Box className={classes.mobileAccordionContent}>
          {/* Full Description */}
          <Typography className={classes.mobileAccordionDescription}>
            {character.description}
          </Typography>

          {/* Category */}
          <Box className={classes.mobileAccordionCategory}>
            {categoryInfo && !loading && (
              <Chip 
                icon={categoryInfo.icon}
                label={categoryInfo.displayName}
                size="small"
                className={classes.categoryChip}
              />
            )}
            {loading && character.category && (
              <Chip 
                label="Loading..."
                size="small"
                className={classes.categoryChip}
              />
            )}
          </Box>

          {/* Stats - Commented out comment and love icons for mobile layout
          <Box className={classes.mobileAccordionStats}>
            <Box className={classes.stat}>
              <Message fontSize="small" />
              <span>{randomMessages}</span>
            </Box>
            <Box className={classes.stat}>
              <Favorite fontSize="small" />
              <span>{randomLikes}</span>
            </Box>
          </Box>
          */}

          {/* Start Chat Button */}
          <Button
            className={classes.mobileAccordionButton}
            onClick={handleAccordionButtonClick}
            disableRipple
            fullWidth
          >
            Start Chat
          </Button>
        </Box>
      </Collapse>
    </Card>
  );
};

export default CharacterCard;