import React, { forwardRef } from 'react';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Message from './Message';

const useStyles = makeStyles({
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media (max-width: 1200px)': {
      padding: '17.6px',
      gap: '14.4px',
    },
    '@media (max-width: 960px)': {
      padding: '16px',
      gap: '12.8px',
    },
    '@media (max-width: 600px)': {
      padding: '14.4px',
      gap: '11.2px',
    },
    '@media (max-width: 480px)': {
      padding: '12px',
      gap: '9.6px',
    },
    '@media (max-width: 375px)': {
      padding: '9.6px',
      gap: '8px',
    },
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '@media (max-width: 600px)': {
      gap: '6.4px',
    },
    '@media (max-width: 480px)': {
      gap: '4.8px',
    },
    '@media (max-width: 375px)': {
      gap: '3.2px',
    },
  },
  loadingText: {
    '@media (max-width: 600px)': {
      fontSize: '0.8rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem !important',
    },
  },
});

// Step 1: Process asterisk formatting (*text* becomes italic/bold)
function processAsteriskFormatting(text) {
  if (typeof text !== 'string') return text;
  
  // Split by asterisks, but keep the asterisks in the result for processing
  const parts = text.split(/(\*[^*]+\*)/g);
  
  return parts.map((part, index) => {
    // If the part is wrapped in asterisks (*text*), make it italic
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      const innerText = part.slice(1, -1); // Remove the asterisks
      return <em key={index} style={{ fontStyle: 'italic' }}>{innerText}</em>;
    }
    // Otherwise, return the plain text part
    return part;
  });
}

// Step 2: Auto-link URLs in text (handles http(s) and bare domains)
function linkifyText(textOrElements) {
  // If it's already an array of elements (from asterisk processing), 
  // we need to process each text element individually
  if (Array.isArray(textOrElements)) {
    return textOrElements.map((element, index) => {
      // If it's a string, apply URL linking
      if (typeof element === 'string') {
        return linkifyString(element, `linkify-${index}`);
      }
      // If it's already a React element (like <em>), leave it unchanged
      return element;
    });
  }
  
  // If it's just a string, process it directly
  if (typeof textOrElements === 'string') {
    return linkifyString(textOrElements);
  }
  
  return textOrElements;
}

// Helper function to convert URLs in a string to clickable links
function linkifyString(text, keyPrefix = '') {
  if (typeof text !== 'string') return text;
  
  // Match http(s) links and bare domains (e.g., meeseva.telangana.gov.in)
  const urlRegex = /((https?:\/\/[^\s]+)|((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?))/g;
  
  return text.split(urlRegex).map((part, i) => {
    if (!part) return null;
    
    const uniqueKey = keyPrefix ? `${keyPrefix}-${i}` : i;
    
    // If already a full URL, use as is
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={uniqueKey}
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
          key={uniqueKey}
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

// Step 3: Convert newlines to <br> elements
function processNewlines(contentArray) {
  if (!Array.isArray(contentArray)) {
    contentArray = [contentArray];
  }
  
  const result = [];
  
  contentArray.forEach((element, elemIndex) => {
    if (typeof element === 'string') {
      // Split by newlines and add <br> elements
      const lines = element.split('\n');
      lines.forEach((line, lineIndex) => {
        if (lineIndex > 0) {
          result.push(<br key={`br-${elemIndex}-${lineIndex}`} />);
        }
        if (line) { // Only add non-empty lines
          result.push(line);
        }
      });
    } else {
      // If it's already a React element, add it as-is
      result.push(element);
    }
  });
  
  return result;
}

// Main processing function - this is our "assembly line"
function processMessageContent(content) {
  if (typeof content !== 'string') {
    return content; // If it's not a string, return as-is
  }
  
  // Step 1: Process asterisk formatting first
  let processed = processAsteriskFormatting(content);
  
  // Step 2: Apply URL linking
  processed = linkifyText(processed);
  
  // Step 3: Handle newlines last
  processed = processNewlines(processed);
  
  return processed;
}

const MessageList = forwardRef(({ messages, loading }, ref) => {
  const classes = useStyles();
  
  return (
    <Box className={`${classes.messagesContainer} chat-messages`} ref={ref}>
      {messages.map((message, index) => (
        <Fade in timeout={400} key={index}>
          <div>
            <Message
              message={{
                ...message,
                // Apply our complete processing pipeline
                content: typeof message.content === 'string'
                  ? <span style={{ whiteSpace: 'pre-wrap' }}>
                      {processMessageContent(message.content)}
                    </span>
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
            <Box className={classes.loadingContainer}>
              <CircularProgress size={16} sx={{
                '@media (max-width: 600px)': {
                  width: 14,
                  height: 14,
                },
                '@media (max-width: 480px)': {
                  width: 12,
                  height: 12,
                },
                '@media (max-width: 375px)': {
                  width: 10,
                  height: 10,
                },
              }} />
              <Typography variant="body2" className={classes.loadingText}>
                Thinking...
              </Typography>
            </Box>
          )
        }} />
      )}
    </Box>
  );
});

export default MessageList;