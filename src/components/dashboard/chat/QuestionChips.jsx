import React, { useState, useEffect, useCallback } from 'react';
import { Box, Chip, Fade, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getQuestionsForCategory, getCategoryFromCharacter } from '../../../data/categoryQuestions';

const useStyles = makeStyles((theme) => ({
  quickActionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
    padding: '0 4px',
    '@media (max-width: 600px)': {
      marginBottom: '8px',
      padding: '0 2px',
    },
  },
  quickActionsWrapper: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
    scrollSnapType: 'x mandatory',
    paddingBottom: '4px',
    marginBottom: '4px',
    '&::-webkit-scrollbar': {
      height: '2px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '1px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(99, 102, 241, 0.3)',
      borderRadius: '1px',
      '&:hover': {
        background: 'rgba(99, 102, 241, 0.5)',
      },
    },
    '@media (max-width: 600px)': {
      gap: '6px',
      paddingBottom: '2px',
    },
  },
  quickAction: {
    padding: '10px 14px',
    borderRadius: '14px',
    background: 'rgba(99, 102, 241, 0.12)',
    border: '1px solid rgba(99, 102, 241, 0.25)',
    color: '#e5e7eb',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    scrollSnapAlign: 'start',
    boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.06)',
    minWidth: 'fit-content',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.22)',
      borderColor: 'rgba(99, 102, 241, 0.45)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15), inset 0 -1px 0 rgba(255,255,255,0.1)',
    },
    '&:active': {
      transform: 'translateY(0)',
      background: 'rgba(99, 102, 241, 0.3)',
    },
    '@media (max-width: 600px)': {
      padding: '8px 12px',
      fontSize: '0.7rem',
      borderRadius: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '6px 10px',
      fontSize: '0.65rem',
      borderRadius: '10px',
    },
  },
  loadingSkeleton: {
    background: 'rgba(99, 102, 241, 0.08)',
    borderRadius: '14px',
    height: '32px',
    minWidth: '120px',
    '@media (max-width: 600px)': {
      height: '28px',
      minWidth: '100px',
      borderRadius: '12px',
    },
  },
  fadeContainer: {
    width: '100%',
  },
}));

const QuestionChips = ({ 
  character, 
  onQuestionSelect, 
  onQuestionSend, // New prop for direct sending
  loading = false,
  disabled = false,
  maxQuestions = 5,
  showCategoryLabel = true,
  animationDelay = 100
}) => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [sentQuestions, setSentQuestions] = useState(new Set()); // Track sent questions locally

  // Load questions based on character category
  const loadQuestions = useCallback(async () => {
    if (!character) {
      setQuestions([]);
      setCategory('default');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setFadeIn(false);

    try {
      // Determine character category
      let characterCategory = 'default';
      
      // First try to get category from character data
      if (character.category) {
        characterCategory = character.category;
      } else {
        // Fallback to category inference
        characterCategory = getCategoryFromCharacter(character);
      }

      // Get questions for the category
      const categoryQuestions = getQuestionsForCategory(characterCategory);
      
      // Take only the specified number of questions
      const selectedQuestions = categoryQuestions.slice(0, maxQuestions);
      
      setCategory(characterCategory);
      setQuestions(selectedQuestions);
      
      // Add a small delay for smooth animation
      setTimeout(() => {
        setFadeIn(true);
        setIsLoading(false);
      }, animationDelay);

      console.log(`📝 Loaded ${selectedQuestions.length} questions for category: ${characterCategory}`);
      
    } catch (error) {
      console.error('Failed to load questions:', error);
      setQuestions([]);
      setCategory('default');
      setIsLoading(false);
    }
  }, [character, maxQuestions, animationDelay]);

  // Load questions when character changes
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // Reset sent questions when character changes
  useEffect(() => {
    setSentQuestions(new Set());
  }, [character?.id, character?.name]);

  // Handle question selection - now sends directly
  const handleQuestionClick = useCallback((question) => {
    if (disabled || loading) return;
    
    console.log(`🎯 Question selected for direct sending: ${question}`);
    
    // Mark question as sent locally
    setSentQuestions(prev => new Set([...prev, question]));
    
    // Send the question directly if onQuestionSend is provided
    if (onQuestionSend) {
      onQuestionSend(question);
    } else if (onQuestionSelect) {
      // Fallback to old behavior if onQuestionSend is not provided
      onQuestionSelect(question);
    }
  }, [onQuestionSend, onQuestionSelect, disabled, loading]);

  // Format category name for display
  const formatCategoryName = (categoryKey) => {
    return categoryKey
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');
  };

  // Filter out sent questions
  const availableQuestions = questions.filter(question => !sentQuestions.has(question));

  // Don't render if no character or no available questions
  if (!character || (!isLoading && availableQuestions.length === 0)) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <Box className={classes.quickActionsContainer}>
        <Box className={classes.quickActionsWrapper}>
          {[...Array(maxQuestions)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              className={classes.loadingSkeleton}
              sx={{
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Fade in={fadeIn} timeout={300}>
      <Box className={classes.fadeContainer}>
        <Box className={classes.quickActionsContainer}>
          <Box className={classes.quickActionsWrapper}>
            {availableQuestions.map((question, index) => (
              <Fade
                key={`${category}-${question}-${index}`}
                in={fadeIn}
                timeout={300}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <Box
                  className={classes.quickAction}
                  onClick={() => handleQuestionClick(question)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleQuestionClick(question);
                    }
                  }}
                  aria-label={`Ask: ${question}`}
                  style={{
                    opacity: disabled || loading ? 0.6 : 1,
                    cursor: disabled || loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {question}
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default QuestionChips;
