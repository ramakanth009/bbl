import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  container: {
    // padding: '16px 20px',
    // borderTop: '1px solid rgba(99, 102, 241, 0.2)',
    // background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.8) 100%)',
    backdropFilter: 'blur(10px)',
    // '@media (max-width: 1200px)': {
    //   padding: '14px 18px',
    // },
    // '@media (max-width: 960px)': {
    //   padding: '12px 16px',
    // },
    // '@media (max-width: 600px)': {
    //   padding: '10px 14px',
    // },
    // '@media (max-width: 480px)': {
    //   padding: '8px 12px',
    // },
    // '@media (max-width: 375px)': {
    //   padding: '6px 10px',
    // },
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
        borderRadius: "20px !important",
        minHeight: 44, // Increased for better mobile touch target
        paddingRight: '40px',
        backgroundColor: 'rgba(42, 42, 42, 0.95)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        '& textarea': {
          fontSize: '16px', // Prevent zoom on iOS
          lineHeight: '1.4',
          padding: '12px 16px',
        },
        '&.Mui-focused': {
          borderColor: '#6366f1',
          backgroundColor: 'rgba(42, 42, 42, 1)',
        },
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: "18px !important",
        minHeight: 42,
        paddingRight: '38px',
        '& textarea': {
          fontSize: '16px', // Prevent zoom on iOS
          padding: '10px 14px',
        },
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: "16px !important",
        minHeight: 40,
        paddingRight: '36px',
        '& textarea': {
          fontSize: '16px', // Prevent zoom on iOS
          padding: '8px 12px',
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
      right: '6px',
      width: '32px',
      height: '32px',
      minWidth: '32px',
      '& .MuiSvgIcon-root': {
        fontSize: '18px',
      },
    },
    '@media (max-width: 480px)': {
      right: '5px',
      width: '30px',
      height: '30px',
      minWidth: '30px',
      '& .MuiSvgIcon-root': {
        fontSize: '16px',
      },
    },
    '@media (max-width: 375px)': {
      right: '4px',
      width: '28px',
      height: '28px',
      minWidth: '28px',
      '& .MuiSvgIcon-root': {
        fontSize: '14px',
      },
    },
  },
}));

const ChatInput = ({ value, onChange, onSend, loading, disabled = false, placeholder = "Message...", onFocus, onBlur }) => {
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
      // Only send if there's content, not loading, and not disabled
      if (value.trim() && !loading && !disabled && onSend) {
        onSend();
      }
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
          disabled={loading || disabled}
          inputRef={inputRef}
          onFocus={(e) => {
            // notify parent and ensure caret is visible
            onFocus && onFocus(e);
            // slight delay to wait for keyboard animation then scroll
            setTimeout(() => {
              try { inputRef.current?.scrollIntoView({ block: 'nearest' }); } catch {}
            }, 50);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
          }}
        />
        <IconButton
          className={`${classes.sendButton} ${value.trim() ? 'visible' : ''}`}
          onClick={() => {
            if (value.trim() && !loading && !disabled && onSend) {
              onSend();
            }
          }}
          disabled={!value.trim() || loading || disabled}
        >
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;