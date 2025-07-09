import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  container: {
    padding: '16px 20px',
    borderTop: '1px solid rgba(99, 102, 241, 0.2)',
    background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.8) 100%)',
    backdropFilter: 'blur(10px)',
  },
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  textField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 12,
      backgroundColor: 'rgba(26, 26, 26, 0.95)',
      minHeight: 48,
      maxHeight: 120,
      paddingRight: '48px', // Make room for the send button
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      '& fieldset': {
        border: 'none',
      },
      '&:hover': {
        backgroundColor: 'rgba(42, 42, 42, 0.95)',
        borderColor: 'rgba(99, 102, 241, 0.5)',
      },
      '&.Mui-focused': {
        borderColor: '#6366f1',
        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)',
      },
      '& textarea': {
        color: '#e2e8f0',
        '&::placeholder': {
          color: '#9ca3af',
          opacity: 0.8,
        },
      },
    },
  },
  sendButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '32px',
    height: '32px',
    minWidth: '32px',
    padding: 0,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    borderRadius: '50%',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.2s ease',
    '&.visible': {
      opacity: 1,
      visibility: 'visible',
    },
    '&:hover': {
      background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
      transform: 'translateY(-50%) scale(1.05)',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '18px',
    },
  },
}));

const ChatInput = ({ value, onChange, onSend, loading, placeholder = "Message..." }) => {
  const classes = useStyles();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <TextField
          className={classes.textField}
          multiline
          maxRows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <IconButton
          className={`${classes.sendButton} ${value.trim() ? 'visible' : ''}`}
          onClick={onSend}
          disabled={!value.trim() || loading}
        >
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;