import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { Message, Favorite } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: theme.spacing(2.5),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: 220, // Increased minHeight for more space
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
  },
}));

const CharacterHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  minHeight: 72, // Ensure header has a fixed height
}));

const CharacterAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.spacing(1),
}));

const CharacterInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const CharacterDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
  marginBottom: theme.spacing(2),
  display: '-webkit-box',
  WebkitLineClamp: 3, // Allow up to 3 lines for better visibility
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  flexGrow: 1, // Make description take up available space
}));

const CharacterStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  fontSize: '0.8125rem',
  color: theme.palette.text.disabled,
  alignItems: 'center',
}));

const Stat = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const CharacterCard = ({ character, onStartChat }) => {
  const handleStartChat = (e) => {
    e.stopPropagation();
    if (onStartChat) {
      onStartChat(character);
    }
  };

  return (
    <StyledCard>
      <CharacterHeader>
        <Box display="flex" gap={1.5}>
          <CharacterAvatar src={character.img} alt={character.name} />
          <CharacterInfo>
            <Typography variant="h6" fontWeight="bold" noWrap>
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              by @{character.creator || 'LegendsAI'}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {character.type || 'Historical Figure'}
            </Typography>
          </CharacterInfo>
        </Box>
        <CharacterStats>
          <Stat>
            <Message fontSize="small" />
            <span>{character.messages || '0'}</span>
          </Stat>
          <Stat>
            <Favorite fontSize="small" />
            <span>{character.likes || '0'}</span>
          </Stat>
        </CharacterStats>
      </CharacterHeader>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CharacterDescription>
          {character.description}
        </CharacterDescription>
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
    </StyledCard>
  );
};

export default CharacterCard;