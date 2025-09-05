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
import { createRobustSlug } from '../../../utils/slugUtils';

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
  // Desktop/Tablet Card Layout - OPTIMIZED FOR SIDEBAR
  styledCard: {
    background: 'transparent !important',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '16px',
    padding: '16px !important', // REDUCED from 24px
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    minHeight: 220, // REDUCED from 280
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
      padding: '14px !important', // REDUCED from 20px
      minHeight: 200, // REDUCED from 260
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      padding: '12px !important', // REDUCED from 18px
      minHeight: 180, // REDUCED from 240
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
    flexDirection: 'column', // CHANGED: Stack items vertically
    gap: '8px !important', // REDUCED gap for better spacing
    marginBottom: '8px !important', // REDUCED from 10px
    alignItems: 'flex-start',
    minHeight: 85, // INCREASED to accommodate new layout
    position: 'relative',
    zIndex: 1,
    width: '100% !important', // ENSURE FULL WIDTH
    '@media (max-width: 1200px)': {
      gap: '7px !important',
      marginBottom: '6px !important', // REDUCED from 8px
      minHeight: 80, // ADJUSTED for layout
    },
    '@media (max-width: 960px)': {
      gap: '6px !important',
      marginBottom: '4px !important', // REDUCED from 6px
      minHeight: 75, // ADJUSTED for layout
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },

  // New layout for avatar and text info
  avatarTextRow: {
    display: 'flex',
    gap: '10px !important',
    alignItems: 'flex-start',
    width: '100%',
    '@media (max-width: 1200px)': {
      gap: '8px !important',
    },
    '@media (max-width: 960px)': {
      gap: '6px !important',
    },
  },

  // Category row - new line below avatar
  categoryRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: '0 !important', // Align to left corner
    '@media (max-width: 1200px)': {
      paddingLeft: '0 !important',
    },
    '@media (max-width: 960px)': {
      paddingLeft: '0 !important',
    },
    '@media (max-width: 600px)': {
      paddingLeft: '0 !important',
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
    width: 64, // REDUCED from 72
    height: 64, // REDUCED from 72
    borderRadius: '20%',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    transition: 'all 0.3s ease',
    flexShrink: 0, // Prevent avatar from shrinking
    '& img': {
      objectFit: 'cover',
      objectPosition: 'center 20%',
    },
    '@media (max-width: 1200px)': {
      width: 58, // REDUCED from 66
      height: 58, // REDUCED from 66
    },
    '@media (max-width: 960px)': {
      width: 52, // REDUCED from 60
      height: 52, // REDUCED from 60
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
    overflow: 'hidden !important', // PREVENT OVERFLOW
    width: '100% !important', // ENSURE FULL WIDTH
    minHeight: '50px !important', // REDUCED since category moved out
  },
  characterName: {
    fontSize: '16px !important', // REDUCED from 18px for better fit
    fontWeight: "bold",
    marginBottom: '3px !important', // SLIGHTLY INCREASED for spacing
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.1, // TIGHT line height for wrapped text
    whiteSpace: 'normal !important', // ALLOW WRAPPING
    overflow: 'visible !important', // SHOW ALL TEXT
    textOverflow: 'initial !important', // REMOVE ELLIPSIS
    maxWidth: '100% !important', // ENSURE CONTAINER RESPECT
    display: 'flex !important', // ENSURE PROPER DISPLAY
    alignItems: 'center !important', // Center vertically
    minHeight: '20px !important', // Added minimum height
    '@media (max-width: 1200px)': {
      fontSize: '15px !important', // REDUCED from 17px
      lineHeight: 1.0, // EVEN TIGHTER for smaller screens
    },
    '@media (max-width: 960px)': {
      fontSize: '14px !important', // REDUCED from 16px
      lineHeight: 1.0,
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  characterAuthor: {
    fontSize: '11px !important', // REDUCED from 12px
    color: '#ffffff',
    marginBottom: '0px !important', // REMOVED margin since category moved out
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    '@media (max-width: 1200px)': {
      fontSize: '10px !important', // REDUCED from 11px
    },
    '@media (max-width: 960px)': {
      fontSize: '9px !important', // REDUCED from 10px
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  categoryContainer: {
    display: 'flex',
    gap: '6px !important', // REDUCED from 8px
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: '20px !important', // Added minimum height for chips container
    '@media (max-width: 1200px)': {
      gap: '5px !important', // REDUCED from 7px
    },
    '@media (max-width: 960px)': {
      gap: '4px !important', // REDUCED from 6px
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  categoryChip: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#ffffff',
    fontSize: '8px !important', // FURTHER REDUCED from 9px
    height: '18px !important', // FURTHER REDUCED from 20px
    borderRadius: '9px !important', // ADJUSTED for new height
    display: 'flex',
    alignItems: 'center',
    gap: '2px !important', // REDUCED from 3px
    '& .MuiChip-label': {
      padding: '0 4px 0 2px !important', // FURTHER REDUCED from '0 6px 0 3px'
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '2px !important', // REDUCED from 3px
    },
    '& .MuiChip-icon': {
      color: '#ffffff',
      marginLeft: '2px !important', // REDUCED from 3px
      marginRight: '0px',
    },
    '@media (max-width: 1200px)': {
      fontSize: '7px !important', // FURTHER REDUCED from 8px
      height: '16px !important', // FURTHER REDUCED from 18px
      borderRadius: '8px !important', // ADJUSTED for new height
      '& .MuiChip-label': {
        padding: '0 3px 0 2px !important', // FURTHER REDUCED
        gap: '2px !important',
      },
      '& .MuiChip-icon': {
        marginLeft: '2px !important',
      },
    },
    '@media (max-width: 960px)': {
      fontSize: '6px !important', // FURTHER REDUCED from 7px
      height: '14px !important', // FURTHER REDUCED from 16px
      borderRadius: '7px !important', // ADJUSTED for new height
      '& .MuiChip-label': {
        padding: '0 3px 0 1px !important', // FURTHER REDUCED
        gap: '1px !important',
      },
    },
  },
  characterDescription: {
    fontSize: '11px !important', // FURTHER REDUCED from 12px
    color: '#ffffff',
    fontWeight: "400 !important",
    lineHeight: 1.3, // ADJUSTED for better readability
    marginBottom: '10px !important', // REDUCED from 12px
    height: 'auto !important', // Changed from fixed height
    maxHeight: '52px !important', // Maximum height limit
    minHeight: '52px !important', // Ensure consistent height
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4, // INCREASED from 3 for more text
    WebkitBoxOrient: 'vertical',
    flexGrow: 1,
    position: 'relative',
    zIndex: 1,
    wordBreak: 'break-word !important', // ENSURE PROPER WORD BREAKING
    '@media (max-width: 1200px)': {
      fontSize: '10px !important', // FURTHER REDUCED from 11px
      marginBottom: '8px !important', // REDUCED from 10px
      height: '48px !important', // FURTHER REDUCED from 54px
      maxHeight: '48px !important',
      minHeight: '48px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '9px !important', // FURTHER REDUCED from 10px
      marginBottom: '6px !important', // REDUCED from 8px
      height: '44px !important', // FURTHER REDUCED from 48px
      maxHeight: '44px !important',
      minHeight: '44px !important',
      lineHeight: 1.25, // ADJUSTED
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  characterStats: {
    display: 'flex',
    gap: '6px !important', // REDUCED from 8px
    alignItems: 'center',
    '@media (max-width: 1200px)': {
      gap: '5px !important', // REDUCED from 7px
    },
    '@media (max-width: 960px)': {
      gap: '4px !important', // REDUCED from 6px
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
    padding: '10px !important', // REDUCED from 14px
    borderRadius: '8px !important', // REDUCED from 12px
    fontSize: '12px !important', // REDUCED from 14px
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
      padding: '9px !important', // REDUCED from 13px
      borderRadius: '7px !important', // REDUCED from 11px
      fontSize: '11px !important', // REDUCED from 13px
    },
    '@media (max-width: 960px)': {
      padding: '8px !important', // REDUCED from 12px
      borderRadius: '6px !important', // REDUCED from 10px
      fontSize: '10px !important', // REDUCED from 12px
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
    gap: '3px !important', // REDUCED from 4px
    fontSize: '10px !important', // REDUCED from 12px
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '9px !important', // REDUCED from 11px
      gap: '2px !important', // REDUCED from 3px
    },
    '@media (max-width: 960px)': {
      fontSize: '8px !important', // REDUCED from 10px
      gap: '2px !important',
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
      // Create character object with slug for navigation
      const characterWithSlug = {
        ...character,
        slug: createRobustSlug(character.name)
      };
      onStartChat(characterWithSlug);
    }
  };

  const handleMobileListClick = (e) => {
    // Only open chat if clicking outside the arrow area
    if (!e.target.closest('[data-accordion-arrow]')) {
      if (onStartChat) {
        // Create character object with slug for navigation
        const characterWithSlug = {
          ...character,
          slug: createRobustSlug(character.name)
        };
        onStartChat(characterWithSlug);
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
      // Create character object with slug for navigation
      const characterWithSlug = {
        ...character,
        slug: createRobustSlug(character.name)
      };
      onStartChat(characterWithSlug);
    }
  };

  // Get category display name and icon from context data
  const getCategoryInfo = (categoryKey) => {
    if (!categoryKey || loading) return null;
    
    const displayName = categories[categoryKey] || categoryKey;
    const icon = iconMap[categoryKey] || <Category sx={{ fontSize: 12 }} />; // REDUCED from 14
    
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
        {/* Avatar and Text Row */}
        <Box className={classes.avatarTextRow}>
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
              by @{character.creator || 'GigaSpace'}
            </Typography>
          </Box>
        </Box>
        
        {/* Category Row - New line below avatar */}
        <Box className={classes.categoryRow}>
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