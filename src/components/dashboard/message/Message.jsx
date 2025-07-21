import React from 'react';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const MessageWrapper = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2),
  '@media (max-width: 1200px)': {
    marginBottom: theme.spacing(1.8),
  },
  '@media (max-width: 960px)': {
    marginBottom: theme.spacing(1.6),
  },
  '@media (max-width: 600px)': {
    marginBottom: theme.spacing(1.4),
  },
  '@media (max-width: 480px)': {
    marginBottom: theme.spacing(1.2),
  },
  '@media (max-width: 375px)': {
    marginBottom: theme.spacing(1),
  },
}));

const MessageContent = styled(Paper)(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  fontSize: '0.875rem',
  lineHeight: 1.4,
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isUser ? 'white' : theme.palette.text.primary,
  border: isUser ? 'none' : `1px solid ${theme.palette.divider}`,
  wordBreak: 'break-word',
  '@media (max-width: 1200px)': {
    maxWidth: '75%',
    padding: theme.spacing(1.4, 1.8),
    borderRadius: 10,
    fontSize: '0.85rem',
  },
  '@media (max-width: 960px)': {
    maxWidth: '80%',
    padding: theme.spacing(1.3, 1.6),
    borderRadius: 8,
    fontSize: '0.825rem',
  },
  '@media (max-width: 600px)': {
    maxWidth: '85%',
    padding: theme.spacing(1.2, 1.4),
    borderRadius: 6,
    fontSize: '0.8rem',
    lineHeight: 1.3,
  },
  '@media (max-width: 480px)': {
    maxWidth: '90%',
    padding: theme.spacing(1.1, 1.2),
    borderRadius: 4,
    fontSize: '0.775rem',
  },
  '@media (max-width: 375px)': {
    maxWidth: '95%',
    padding: theme.spacing(1, 1),
    fontSize: '0.75rem',
    lineHeight: 1.2,
  },
}));

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <MessageWrapper isUser={isUser}>
      <MessageContent isUser={isUser}>
        {/* Render content as React node (already parsed by MessageList) */}
        {message.content}
      </MessageContent>
    </MessageWrapper>
  );
};

export default Message;