import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  container: {
    padding: '16px 20px',
    // borderTop: '1px solid rgba(99, 102, 241, 0.2)',
    // background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.8) 100%)',
    backdropFilter: 'blur(10px)',
    '@media (max-width: 1200px)': {
      padding: '14px 18px',
    },
    '@media (max-width: 960px)': {
      padding: '12px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '10px 14px',
    },
    '@media (max-width: 480px)': {
      padding: '8px 12px',
    },
    '@media (max-width: 375px)': {
      padding: '6px 10px',
    },
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
      paddingRight: '48px',
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
    '@media (max-width: 1200px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        minHeight: 44,
        paddingRight: '44px',
      },
    },
    '@media (max-width: 960px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: 8,
        minHeight: 40,
        paddingRight: '40px',
      },
    },
    '@media (max-width: 600px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius:"20px !important",
        minHeight: 36,
        paddingRight: '36px',
        '& textarea': {
          fontSize: '0.9rem',
        },
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: 4,
        minHeight: 32,
        paddingRight: '32px',
        '& textarea': {
          fontSize: '0.85rem',
        },
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        minHeight: 28,
        paddingRight: '28px',
        '& textarea': {
          fontSize: '0.8rem',
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
    '@media (max-width: 1200px)': {
      right: '7px',
      width: '30px',
      height: '30px',
      minWidth: '30px',
      '& .MuiSvgIcon-root': {
        fontSize: '17px',
      },
    },
    '@media (max-width: 960px)': {
      right: '6px',
      width: '28px',
      height: '28px',
      minWidth: '28px',
      '& .MuiSvgIcon-root': {
        fontSize: '16px',
      },
    },
    '@media (max-width: 600px)': {
      right: '5px',
      width: '26px',
      height: '26px',
      minWidth: '26px',
      '& .MuiSvgIcon-root': {
        fontSize: '15px',
      },
    },
    '@media (max-width: 480px)': {
      right: '4px',
      width: '24px',
      height: '24px',
      minWidth: '24px',
      '& .MuiSvgIcon-root': {
        fontSize: '14px',
      },
    },
    '@media (max-width: 375px)': {
      right: '3px',
      width: '22px',
      height: '22px',
      minWidth: '22px',
      '& .MuiSvgIcon-root': {
        fontSize: '13px',
      },
    },
  },
}));

const ChatInput = ({ value, onChange, onSend, loading, placeholder = "Message..." }) => {
  const classes = useStyles();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

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
          inputRef={inputRef}
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