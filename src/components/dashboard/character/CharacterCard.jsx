import React from 'react';
import { Card, CardContent, Box, Typography, Avatar, Chip } from '@mui/material';
import { Message, Favorite } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  styledCard: {
    background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.8) 100%)',
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
    backdropFilter: 'blur(10px)',
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
  },
  characterAvatar: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    transition: 'all 0.3s ease',
  },
  characterInfo: {
    flex: 1,
    minWidth: 0,
  },
  characterName: {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '4px',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2,
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  characterAuthor: {
    fontSize: '12px',
    color: '#9ca3af',
    marginBottom: '2px',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  characterType: {
    fontSize: '11px',
    color: '#6b7280',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  categoryContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  categoryChip: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#c7d2fe',
    fontSize: '10px',
    height: '20px',
    borderRadius: '10px',
    '& .MuiChip-label': {
      padding: '0 8px',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
  },
  typeChip: {
    background: 'rgba(75, 85, 99, 0.3)',
    border: '1px solid rgba(75, 85, 99, 0.4)',
    color: '#9ca3af',
    fontSize: '10px',
    height: '20px',
    borderRadius: '10px',
    '& .MuiChip-label': {
      padding: '0 8px',
      fontWeight: 500,
    },
  },
  characterDescription: {
    fontSize: '14px',
    color: '#d1d5db',
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
  },
  characterStats: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  actionBtn: {
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#9ca3af',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.2)',
      color: '#6366f1',
      transform: 'scale(1.1)',
    },
  },
  startChatBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    color: 'white',
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
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#9ca3af',
  },
});

const CharacterCard = ({ character, onStartChat }) => {
  const classes = useStyles();

  // Generate random 2-digit numbers for messages and likes
  const randomMessages = React.useMemo(() => Math.floor(Math.random() * 90) + 10, []);
  const randomLikes = React.useMemo(() => Math.floor(Math.random() * 90) + 10, []);

  const handleStartChat = (e) => {
    e.stopPropagation();
    if (onStartChat) {
      onStartChat(character);
    }
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  // Format category for display
  const formatCategory = (category) => {
    if (!category) return null;
    
    const categoryMapping = {
      "entertainment_arts": "Entertainment & Arts",
      "fictional_anime": "Fictional & Anime", 
      "innovators_visionaries": "Innovators & Visionaries",
      "leaders_historical": "Leaders & Historical",
      "spiritual_social": "Spiritual & Social",
      "sports_champions": "Sports & Champions"
    };
    
    return categoryMapping[category] || category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // // Format type for display
  // const formatType = (type) => {
  //   if (!type) return 'Historical Figure';
  //   return type;
  // };

  return (
    <Card className={classes.styledCard} elevation={0}>
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
            
            {/* Category and Type Chips */}
            <Box className={classes.categoryContainer}>
              {character.category && (
                <Chip 
                  label={formatCategory(character.category)}
                  size="small"
                  className={classes.categoryChip}
                />
              )}
              {/* <Chip 
                label={formatType(character.type)}
                size="small"
                className={classes.typeChip}
              /> */}
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography className={classes.characterDescription}>
          {character.description}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        <Box className={classes.stat}>
          <Message fontSize="small" />
          <span>{randomMessages}</span>
        </Box>
        <Box className={classes.stat}>
          <Favorite fontSize="small" />
          <span>{randomLikes}</span>
        </Box>
      </Box>
      
      <Button
        className={classes.startChatBtn}
        onClick={handleStartChat}
        disableRipple
      >
        Start Chat
      </Button>
    </Card>
  );
};

export default CharacterCard;