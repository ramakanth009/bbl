// import React, { forwardRef } from 'react';
// import { Box, Typography, CircularProgress, Fade } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Message from './Message';

// const MessagesContainer = styled(Box)(({ theme }) => ({
//   flex: 1,
//   padding: theme.spacing(2.5),
//   overflowY: 'auto',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: theme.spacing(2),
//   '@media (max-width: 1200px)': {
//     padding: theme.spacing(2.2),
//     gap: theme.spacing(1.8),
//   },
//   '@media (max-width: 960px)': {
//     padding: theme.spacing(2),
//     gap: theme.spacing(1.6),
//   },
//   '@media (max-width: 600px)': {
//     padding: theme.spacing(1.8),
//     gap: theme.spacing(1.4),
//   },
//   '@media (max-width: 480px)': {
//     padding: theme.spacing(1.5),
//     gap: theme.spacing(1.2),
//   },
//   '@media (max-width: 375px)': {
//     padding: theme.spacing(1.2),
//     gap: theme.spacing(1),
//   },
// }));

// // Step 1: Process asterisk formatting (*text* becomes italic/bold)
// function processAsteriskFormatting(text) {
//   if (typeof text !== 'string') return text;
  
//   // Split by asterisks, but keep the asterisks in the result for processing
//   const parts = text.split(/(\*[^*]+\*)/g);
  
//   return parts.map((part, index) => {
//     // If the part is wrapped in asterisks (*text*), make it italic
//     if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
//       const innerText = part.slice(1, -1); // Remove the asterisks
//       return <em key={index} style={{ fontStyle: 'italic' }}>{innerText}</em>;
//     }
//     // Otherwise, return the plain text part
//     return part;
//   });
// }

// // Step 2: Auto-link URLs in text (handles http(s) and bare domains)
// function linkifyText(textOrElements) {
//   // If it's already an array of elements (from asterisk processing), 
//   // we need to process each text element individually
//   if (Array.isArray(textOrElements)) {
//     return textOrElements.map((element, index) => {
//       // If it's a string, apply URL linking
//       if (typeof element === 'string') {
//         return linkifyString(element, `linkify-${index}`);
//       }
//       // If it's already a React element (like <em>), leave it unchanged
//       return element;
//     });
//   }
  
//   // If it's just a string, process it directly
//   if (typeof textOrElements === 'string') {
//     return linkifyString(textOrElements);
//   }
  
//   return textOrElements;
// }

// // Helper function to convert URLs in a string to clickable links
// function linkifyString(text, keyPrefix = '') {
//   if (typeof text !== 'string') return text;
  
//   // Match http(s) links and bare domains (e.g., meeseva.telangana.gov.in)
//   const urlRegex = /((https?:\/\/[^\s]+)|((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?))/g;
  
//   return text.split(urlRegex).map((part, i) => {
//     if (!part) return null;
    
//     const uniqueKey = keyPrefix ? `${keyPrefix}-${i}` : i;
    
//     // If already a full URL, use as is
//     if (/^https?:\/\//.test(part)) {
//       return (
//         <a
//           key={uniqueKey}
//           href={part}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: '#818cf8', wordBreak: 'break-all' }}
//         >
//           {part}
//         </a>
//       );
//     }
    
//     // If matches a bare domain, prepend https://
//     if (/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$/.test(part)) {
//       return (
//         <a
//           key={uniqueKey}
//           href={`https://${part}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: '#818cf8', wordBreak: 'break-all' }}
//         >
//           {part}
//         </a>
//       );
//     }
    
//     return part;
//   });
// }

// // Step 3: Convert newlines to <br> elements
// function processNewlines(contentArray) {
//   if (!Array.isArray(contentArray)) {
//     contentArray = [contentArray];
//   }
  
//   const result = [];
  
//   contentArray.forEach((element, elemIndex) => {
//     if (typeof element === 'string') {
//       // Split by newlines and add <br> elements
//       const lines = element.split('\n');
//       lines.forEach((line, lineIndex) => {
//         if (lineIndex > 0) {
//           result.push(<br key={`br-${elemIndex}-${lineIndex}`} />);
//         }
//         if (line) { // Only add non-empty lines
//           result.push(line);
//         }
//       });
//     } else {
//       // If it's already a React element, add it as-is
//       result.push(element);
//     }
//   });
  
//   return result;
// }

// // Main processing function - this is our "assembly line"
// function processMessageContent(content) {
//   if (typeof content !== 'string') {
//     return content; // If it's not a string, return as-is
//   }
  
//   // Step 1: Process asterisk formatting first
//   let processed = processAsteriskFormatting(content);
  
//   // Step 2: Apply URL linking
//   processed = linkifyText(processed);
  
//   // Step 3: Handle newlines last
//   processed = processNewlines(processed);
  
//   return processed;
// }

// const MessageList = forwardRef(({ messages, loading }, ref) => {
//   return (
//     <MessagesContainer className="chat-messages" ref={ref}>
//       {messages.map((message, index) => (
//         <Fade in timeout={400} key={index}>
//           <div>
//             <Message
//               message={{
//                 ...message,
//                 // Apply our complete processing pipeline
//                 content: typeof message.content === 'string'
//                   ? <span style={{ whiteSpace: 'pre-wrap' }}>
//                       {processMessageContent(message.content)}
//                     </span>
//                   : message.content,
//               }}
//             />
//           </div>
//         </Fade>
//       ))}
      
//       {loading && (
//         <Message message={{
//           role: 'assistant',
//           content: (
//             <Box sx={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 1,
//               '@media (max-width: 600px)': {
//                 gap: 0.8,
//               },
//               '@media (max-width: 480px)': {
//                 gap: 0.6,
//               },
//               '@media (max-width: 375px)': {
//                 gap: 0.4,
//               },
//             }}>
//               <CircularProgress size={16} sx={{
//                 '@media (max-width: 600px)': {
//                   width: 14,
//                   height: 14,
//                 },
//                 '@media (max-width: 480px)': {
//                   width: 12,
//                   height: 12,
//                 },
//                 '@media (max-width: 375px)': {
//                   width: 10,
//                   height: 10,
//                 },
//               }} />
//               <Typography variant="body2" sx={{
//                 '@media (max-width: 600px)': {
//                   fontSize: '0.8rem',
//                 },
//                 '@media (max-width: 480px)': {
//                   fontSize: '0.75rem',
//                 },
//                 '@media (max-width: 375px)': {
//                   fontSize: '0.7rem',
//                 },
//               }}>Thinking...</Typography>
//             </Box>
//           )
//         }} />
//       )}
//     </MessagesContainer>
//   );
// });

// export default MessageList;
import React, { forwardRef } from 'react';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import Message from './Message';

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2.5),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  '@media (max-width: 1200px)': {
    padding: theme.spacing(2.2),
    gap: theme.spacing(1.8),
  },
  '@media (max-width: 960px)': {
    padding: theme.spacing(2),
    gap: theme.spacing(1.6),
  },
  '@media (max-width: 600px)': {
    padding: theme.spacing(1.8),
    gap: theme.spacing(1.4),
  },
  '@media (max-width: 480px)': {
    padding: theme.spacing(1.5),
    gap: theme.spacing(1.2),
  },
  '@media (max-width: 375px)': {
    padding: theme.spacing(1.2),
    gap: theme.spacing(1),
  },
}));

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

// Helper function to process messages with audio data
function processMessageWithAudio(message) {
  // Create processed message with text content
  const processedMessage = {
    ...message,
    // Apply our complete processing pipeline to text content
    content: typeof message.content === 'string'
      ? <span style={{ whiteSpace: 'pre-wrap' }}>
          {processMessageContent(message.content)}
        </span>
      : message.content,
  };

  // Add audio data if present (multiple possible field names from API)
  if (message.audio_url || message.audioUrl || message.audio_data) {
    processedMessage.audio_url = message.audio_url || message.audioUrl;
    processedMessage.audioUrl = message.audio_url || message.audioUrl; // Backward compatibility
    
    // If audio_data is base64, it should already be converted to audio_url by API service
    if (message.audio_data && !processedMessage.audio_url) {
      console.warn('Audio data present but no audio_url - may need conversion');
    }
    
    // Add audio metadata if available
    if (message.voice_used) {
      processedMessage.voice_used = message.voice_used;
    }
    
    if (message.audio_duration) {
      processedMessage.audio_duration = message.audio_duration;
    }
  }

  return processedMessage;
}

const MessageList = forwardRef(({ messages, loading }, ref) => {
  return (
    <MessagesContainer className="chat-messages" ref={ref}>
      {messages.map((message, index) => (
        <Fade in timeout={400} key={index}>
          <div>
            <Message
              message={processMessageWithAudio(message)}
            />
          </div>
        </Fade>
      ))}
      
      {loading && (
        <Message message={{
          role: 'assistant',
          content: (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              '@media (max-width: 600px)': {
                gap: 0.8,
              },
              '@media (max-width: 480px)': {
                gap: 0.6,
              },
              '@media (max-width: 375px)': {
                gap: 0.4,
              },
            }}>
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
              <Typography variant="body2" sx={{
                '@media (max-width: 600px)': {
                  fontSize: '0.8rem',
                },
                '@media (max-width: 480px)': {
                  fontSize: '0.75rem',
                },
                '@media (max-width: 375px)': {
                  fontSize: '0.7rem',
                },
              }}>Thinking...</Typography>
            </Box>
          )
        }} />
      )}
    </MessagesContainer>
  );
});

export default MessageList;