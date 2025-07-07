import React, { useState } from 'react';
import { Card, Box, Typography, Button } from '@mui/material';
import { Add, Person } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import CharacterCreationForm from './creation/CharacterCreationForm';

const useStyles = makeStyles({
  createCard: {
    backgroundColor: '#2a2a2a',
    border: '2px dashed #555',
    borderRadius: 12,
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: 220,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    '&:hover': {
      borderColor: '#fff',
      backgroundColor: '#333',
      transform: 'translateY(-2px)',
    },
  },
  createIcon: {
    fontSize: '48px',
    color: '#666',
    marginBottom: '12px',
  },
  createTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#fff',
  },
  createDescription: {
    fontSize: '0.875rem',
    color: '#999',
    marginBottom: '16px',
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
      <Card className={classes.createCard} onClick={handleCreateClick}>
        <Add className={classes.createIcon} />
        <Typography className={classes.createTitle}>
          Create Character
        </Typography>
        <Typography className={classes.createDescription}>
          Design your own AI character with custom personality and traits
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Person />}
          size="small"
          sx={{ mt: 1 }}
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