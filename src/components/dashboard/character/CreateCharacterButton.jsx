import React, { useState } from 'react';
import { Card, Typography, Button, Box } from '@mui/material';
import { Add, Person } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import CharacterCreationForm from './creation/CharacterCreationForm';

const useStyles = makeStyles({
  createCard: {
    background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.8) 100%)',
    border: '2px dashed rgba(99, 102, 241, 0.3)',
    borderRadius: '16px',
    padding: '32px 24px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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
      borderColor: 'rgba(99, 102, 241, 0.8)',
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      '&::before': {
        opacity: 1,
      },
      '& $createIcon': {
        transform: 'scale(1.1) rotate(90deg)',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
    },
  },
  createIcon: {
    fontSize: '64px',
    color: '#9ca3af',
    marginBottom: '16px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    zIndex: 1,
  },
  createTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    zIndex: 1,
  },
  createDescription: {
    fontSize: '14px',
    color: '#9ca3af',
    marginBottom: '20px',
    lineHeight: 1.5,
    maxWidth: '250px',
    position: 'relative',
    zIndex: 1,
  },
  startButton: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#e2e8f0',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      color: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)',
    },
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    // background: 'rgba(99, 102, 241, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    transition: 'all 0.4s ease',
    position: 'relative',
    zIndex: 1,
    '$createCard:hover &': {
      transform: 'scale(1.1)',
    },
  },
});

const CreateCharacterButton = ({ onCharacterCreated }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCharacterCreated = (newCharacter) => {
    setShowForm(false);
    if (onCharacterCreated) {
      onCharacterCreated(newCharacter);
    }
  };

  return (
    <>
      <Card className={classes.createCard} onClick={handleCreateClick} elevation={0}>
        <Box className={classes.iconWrapper}>
          <Add className={classes.createIcon} />
        </Box>
        <Typography className={classes.createTitle}>
          Create Character
        </Typography>
        <Typography className={classes.createDescription}>
          Design your own AI character with custom personality and traits
        </Typography>
        <Button
          className={classes.startButton}
          startIcon={<Person />}
          size="small"
          disableRipple
        >
          Start Creating
        </Button>
      </Card>

      <CharacterCreationForm
        open={showForm}
        onClose={handleFormClose}
        onCharacterCreated={handleCharacterCreated}
      />
    </>
  );
};

export default CreateCharacterButton;