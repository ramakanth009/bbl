import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Box, Fade, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Message from './Message';
import loadingGif from '../../../assets/Reactor.gif';

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
  // New loading wrapper that mimics the message structure
  loadingWrapper: {
    display: 'flex',
    marginBottom: '16px',
    width: '100%',
    justifyContent: 'flex-start',
    '@media (max-width: 1200px)': {
      marginBottom: '14.4px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '12.8px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '8px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '6px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '4px',
    },
  },
  loadingWithAvatar: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    maxWidth: '100%',
    '@media (max-width: 600px)': {
      gap: '4px',
    },
  },
  characterAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    '@media (max-width: 600px)': {
      width: '28px',
      height: '28px',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
    },
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  loadingGif: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
    '@media (max-width: 600px)': {
      width: '20px',
      height: '20px',
    },
    '@media (max-width: 480px)': {
      width: '18px',
      height: '18px',
    },
    '@media (max-width: 375px)': {
      width: '16px',
      height: '16px',
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
          style={{ color: '#818cf8', wordBreak: 'break-word' }} // Changed from break-all to break-word
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
          style={{ color: '#818cf8', wordBreak: 'break-word' }} // Changed from break-all to break-word
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

const MessageList = forwardRef(({ messages, loading, character }, ref) => {
  const classes = useStyles();
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Expose scroll methods to parent component
  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    },
    scrollToTop: () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }), []);

  // Auto-scroll when messages or loading state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100); // Small delay to ensure DOM is updated

    return () => clearTimeout(timer);
  }, [messages, loading]);
  
  return (
    <Box className={`${classes.messagesContainer} chat-messages`} ref={containerRef}>
      {messages.map((message, index) => (
        <Fade in timeout={400} key={index}>
          <div>
            <Message
              message={{
                ...message,
                // Apply our complete processing pipeline
                content: typeof message.content === 'string'
                  ? <span style={{ 
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word', // Changed from normal to break-word for better text wrapping
                      overflowWrap: 'break-word' // Added for better long word handling
                    }}>
                      {processMessageContent(message.content)}
                    </span>
                  : message.content,
              }}
              character={character}
            />
          </div>
        </Fade>
      ))}
      
      {/* NEW: Loading animation outside the bubble, next to avatar */}
      {loading && character && (
        <Fade in timeout={400}>
          <Box className={classes.loadingWrapper}>
            <Box className={classes.loadingWithAvatar}>
              <Avatar
                src={character.img}
                alt={character.name}
                className={classes.characterAvatar}
              />
              <Box className={classes.loadingContainer}>
                <img 
                  src={loadingGif} 
                  alt="Loading..." 
                  className={classes.loadingGif}
                />
              </Box>
            </Box>
          </Box>
        </Fade>
      )}
      
      {/* Invisible element to mark the end of messages for scrolling */}
      <div ref={messagesEndRef} style={{ height: '1px', width: '100%' }} />
    </Box>
  );
});

export default MessageList;