import React, { forwardRef } from 'react';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import Message from './Message';

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2.5),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// Helper to auto-link URLs in text (handles http(s) and bare domains)
function linkify(text) {
  if (typeof text !== 'string') return text;
  // Match http(s) links and bare domains (e.g., meeseva.telangana.gov.in)
  const urlRegex = /((https?:\/\/[^\s]+)|((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?))/g;
  return text.split(urlRegex).map((part, i) => {
    if (!part) return null;
    // If already a full URL, use as is
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#818cf8', wordBreak: 'break-all' }}
        >
          {part}
        </a>
      );
    }
    // If matches a bare domain, prepend https://
    if (/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$/.test(part)) {
      return (
        <a
          key={i}
          href={`https://${part}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#818cf8', wordBreak: 'break-all' }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

const MessageList = forwardRef(({ messages, loading }, ref) => {
  return (
    <MessagesContainer className="chat-messages" ref={ref}>
      {messages.map((message, index) => (
        <Fade in timeout={400} key={index}>
          <div>
            <Message
              message={{
                ...message,
                // Render markdown for string content
                content:
                  typeof message.content === 'string'
                    ? <ReactMarkdown
                        components={{
                          a: props => (
                            <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', wordBreak: 'break-all' }} />
                          ),
                          p: props => <span {...props} />, // Prevent extra <p> tags
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    : message.content,
              }}
            />
          </div>
        </Fade>
      ))}
      
      {loading && (
        <Message message={{
          role: 'assistant',
          content: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
              <Typography variant="body2">Thinking...</Typography>
            </Box>
          )
        }} />
      )}
    </MessagesContainer>
  );
});

export default MessageList;