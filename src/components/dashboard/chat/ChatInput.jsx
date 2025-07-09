import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  container: {
    padding: '16px 20px',
    borderTop: '1px solid rgba(255,255,255,0.12)',
  },
  wrapper: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-end',
  },
  textField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      backgroundColor: '#1e1e1e',
      minHeight: 44,
      maxHeight: 120,
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.12)',
      },
      '&:hover fieldset': {
        borderColor: '#6366f1',
      },
    },
  },
  sendButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    height: 44,
    width: 44,
    '&:hover': {
      backgroundColor: '#4f46e5',
    },
    '&:disabled': {
      backgroundColor: 'rgba(255,255,255,0.12)',
      color: 'rgba(255,255,255,0.3)',
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
          className={classes.sendButton}
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