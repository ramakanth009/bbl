// Category-based questions for different character types
// Each category has 5 pre-loaded questions that appear as chips above the chat input

export const CATEGORY_QUESTIONS = {
  entertainment_arts: [
    "What inspired you to pursue your artistic career?",
    "Tell me about your most challenging creative project",
    "How do you handle creative blocks and find inspiration?",
    "What advice would you give to aspiring artists?",
    "Which of your works are you most proud of and why?"
  ],
  
  leaders_historical: [
    "What was the most difficult decision you had to make as a leader?",
    "How did you handle criticism and opposition during your time?",
    "What principles guided your leadership philosophy?",
    "Tell me about a moment that changed your perspective on leadership",
    "What legacy do you hope to leave behind?"
  ],
  
  sports_champions: [
    "What drives you to push beyond your limits in competition?",
    "Tell me about your most memorable victory or defeat",
    "How do you maintain mental strength during tough times?",
    "What's your training routine and preparation strategy?",
    "Who were your biggest inspirations in sports?"
  ],
  
  innovators_visionaries: [
    "What problem are you most passionate about solving?",
    "How do you approach innovation and creative thinking?",
    "Tell me about a failure that led to your biggest breakthrough",
    "What emerging technology excites you the most?",
    "How do you balance vision with practical implementation?"
  ],
  
  spiritual_social: [
    "What spiritual practices have shaped your worldview?",
    "How do you find inner peace in challenging times?",
    "What role does service to others play in your life?",
    "Tell me about a transformative spiritual experience",
    "How do you balance personal growth with helping others?"
  ],
  
  fictional_anime: [
    "What special abilities or powers define who you are?",
    "Tell me about your greatest adventure or quest",
    "Who are your closest allies and what bonds you together?",
    "What challenges have you faced in your world?",
    "What motivates you to keep fighting for what's right?"
  ],
  
  // Default questions for characters without specific categories
  default: [
    "Tell me about yourself and what makes you unique",
    "What are you most passionate about in life?",
    "What's the most important lesson you've learned?",
    "How do you handle difficult situations?",
    "What advice would you give to someone facing challenges?"
  ]
};

// Helper function to get questions for a specific category
export const getQuestionsForCategory = (category) => {
  if (!category) return CATEGORY_QUESTIONS.default;
  
  // Normalize category key (handle different formats)
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  // Return questions for the category or default if not found
  return CATEGORY_QUESTIONS[normalizedCategory] || CATEGORY_QUESTIONS.default;
};

// Helper function to get a random subset of questions
export const getRandomQuestions = (category, count = 5) => {
  const questions = getQuestionsForCategory(category);
  
  if (questions.length <= count) {
    return questions;
  }
  
  // Shuffle and return random subset
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to determine category from character data
export const getCategoryFromCharacter = (character) => {
  if (!character) return 'default';
  
  // Check if character has explicit category
  if (character.category) {
    return character.category;
  }
  
  // Try to infer from character name or description
  const name = character.name?.toLowerCase() || '';
  const description = character.description?.toLowerCase() || '';
  const combined = `${name} ${description}`;
  
  // Simple keyword-based category detection
  if (combined.includes('actor') || combined.includes('artist') || combined.includes('musician') || combined.includes('singer')) {
    return 'entertainment_arts';
  }
  
  if (combined.includes('leader') || combined.includes('president') || combined.includes('king') || combined.includes('emperor')) {
    return 'leaders_historical';
  }
  
  if (combined.includes('athlete') || combined.includes('champion') || combined.includes('sport') || combined.includes('player')) {
    return 'sports_champions';
  }
  
  if (combined.includes('inventor') || combined.includes('scientist') || combined.includes('entrepreneur') || combined.includes('innovator')) {
    return 'innovators_visionaries';
  }
  
  if (combined.includes('spiritual') || combined.includes('monk') || combined.includes('guru') || combined.includes('saint')) {
    return 'spiritual_social';
  }
  
  if (combined.includes('anime') || combined.includes('fictional') || combined.includes('character') || combined.includes('hero')) {
    return 'fictional_anime';
  }
  
  return 'default';
};
