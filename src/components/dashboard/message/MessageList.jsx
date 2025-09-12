import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Box, Fade, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Message from './Message';
import CategoryLoadingAnimation from '../chat/CategoryLoadingAnimation';

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
    transition: 'none', // FIXED: Remove transitions to prevent layout shifts
    minHeight: 'auto', // FIXED: Prevent height jumping
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
  // Responsive animation sizes
  loadingAnimationStyle: {
    '@media (max-width: 600px)': {
      '& img': {
        width: '20px !important',
        height: '20px !important',
      },
    },
    '@media (max-width: 480px)': {
      '& img': {
        width: '18px !important',
        height: '18px !important',
      },
    },
    '@media (max-width: 375px)': {
      '& img': {
        width: '16px !important',
        height: '16px !important',
      },
    },
  },
});

// Step 1: Process asterisk formatting (*text* becomes italic/bold)
function processAsteriskFormatting(text) {
  if (typeof text !== 'string') return text;
  
  // Split by asterisks, but keep the asterisks in the result for processing
  const parts = text.split(/(\*[^*]+\*)/g);
  
  return parts.map((part, index) => {
    // If the part is wrapped in asterisks, make it italic
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      const content = part.slice(1, -1); // Remove the asterisks
      return (
        <em key={index} style={{ fontStyle: 'italic', fontWeight: '500' }}>
          {content}
        </em>
      );
    }
    return part;
  });
}

// Step 2: Process newlines
function processNewlines(content) {
  if (typeof content === 'string') {
    return content.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {processAsteriskFormatting(line)}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  }
  
  // If content is already JSX (from asterisk processing), we need to handle it differently
  if (Array.isArray(content)) {
    const result = [];
    let currentLineContent = [];
    
    content.forEach((item, index) => {
      if (typeof item === 'string') {
        const lines = item.split('\n');
        lines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            // New line detected, push current line and start new one
            result.push(
              <React.Fragment key={`line-${result.length}`}>
                {currentLineContent}
                <br />
              </React.Fragment>
            );
            currentLineContent = [];
          }
          if (line) {
            currentLineContent.push(line);
          }
        });
      } else {
        // JSX element from asterisk processing
        currentLineContent.push(React.cloneElement(item, { key: `elem-${index}` }));
      }
    });
    
    // Push remaining content
    if (currentLineContent.length > 0) {
      result.push(
        <React.Fragment key={`line-${result.length}`}>
          {currentLineContent}
        </React.Fragment>
      );
    }
    
    return result;
  }
  
  return content;
}

// Combined processing pipeline
function processMessageContent(text) {
  // Step 1: Process asterisks first
  const withAsterisks = processAsteriskFormatting(text);
  
  // Step 2: Process newlines
  return processNewlines(withAsterisks);
}

const MessageList = forwardRef(({ messages, character, loading }, ref) => {
  const classes = useStyles();
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Get responsive animation size based on screen size
  const getAnimationSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 375) return 16;
      if (width <= 480) return 18;
      if (width <= 600) return 20;
      return 50;
    }
    return 50;
  };

  // Handle animation change for debugging/logging
  const handleAnimationChange = (animation, index) => {
    console.log(`🎬 Animation changed: ${animation.id} (${index + 1}/${animation.category})`);
  };

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      if (containerRef.current) {
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
      
      {/* CRITICAL FIX: Loading animation without Fade wrapper for immediate show/hide */}
      {loading && character && (
        <Box className={classes.loadingWrapper}>
          <Box className={classes.loadingWithAvatar}>
            <Avatar
              src={character.img}
              alt={character.name}
              className={classes.characterAvatar}
            />
            <Box className={classes.loadingContainer}>
              <CategoryLoadingAnimation
                category={character.category}
                loading={loading}
                className={classes.loadingAnimationStyle}
                size={getAnimationSize()}
                autoPlay={true}
                cycleInterval={3000} // 3 seconds per animation
                onAnimationChange={handleAnimationChange}
              />
            </Box>
          </Box>
        </Box>
      )}
      
      {/* Invisible element to mark the end of messages for scrolling */}
      <div ref={messagesEndRef} style={{ height: '1px', width: '100%' }} />
    </Box>
  );
});

export default MessageList;