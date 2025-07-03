import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { Message, Favorite } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

// Styles using makeStyles (no theme.spacing)
const useStyles = makeStyles({
  styledCard: {
    backgroundColor: '#232526',
    border: '1px solid #333',
    borderRadius: 12,
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: 220,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      borderColor: '#fff',
      transform: 'translateY(-2px)',
    },
  },
  characterHeader: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 72,
  },
  characterAvatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  characterInfo: {
    flex: 1,
    minWidth: 0,
  },
  characterDescription: {
    fontSize: '0.875rem',
    color: '#bbb',
    lineHeight: 1.4,
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flexGrow: 1,
  },
  characterStats: {
    display: 'flex',
    gap: '16px',
    fontSize: '0.8125rem',
    color: '#666',
    alignItems: 'center',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
});

const CharacterCard = ({ character, onStartChat }) => {
  const classes = useStyles();

  const handleStartChat = (e) => {
    e.stopPropagation();
    if (onStartChat) {
      onStartChat(character);
    }
  };

  return (
    <Card className={classes.styledCard}>
      <Box className={classes.characterHeader}>
        <Box display="flex" gap={1.5}>
          <Avatar src={character.img} alt={character.name} className={classes.characterAvatar} />
          <Box className={classes.characterInfo}>
            <Typography variant="h6" fontWeight="bold" noWrap>
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              by @{character.creator || 'LegendsAI'}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {character.type || 'Historical Figure'}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.characterStats}>
          <Box className={classes.stat}>
            <Message fontSize="small" />
            <span>{character.messages || '0'}</span>
          </Box>
          <Box className={classes.stat}>
            <Favorite fontSize="small" />
            <span>{character.likes || '0'}</span>
          </Box>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography className={classes.characterDescription}>
          {character.description}
        </Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleStartChat}
        >
          Start Chat
        </Button>
      </Box>
    </Card>
  );
};

export default CharacterCard;