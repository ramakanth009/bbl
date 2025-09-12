// Category-based questions for different character types
// Each category has 5 pre-loaded questions that appear as chips above the chat input

export const CATEGORY_QUESTIONS = {
  entertainment_arts: [
    "Biggest challenge starting out?",
    "Best advice you got early?",
    "What would surprise people about you?",
    "What’s your biggest fear?",
    "What makes you laugh most?"
  ],
  
  leaders_historical: [
    "What belief of yours do most disagree with?",
    "Is it better for a leader to be right or persuasive?",
    "When did you change your mind on an issue?",
    "Better for a leader to be loved or feared?",
    "What early life shaped your political views?"
  ],
  
  sports_champions: [
    "What drives your daily training?",
    "What’s your training routine?",
    "What advice for young athletes?",
    "Mental prep or physical training—what matters more?",
    "How do coaches and teammates help?"
  ],
  
  innovators_visionaries: [
    "How do you start your day?",
    "What fuels your passion?",
    "How do you handle overwhelm?",
    "What do you do when ideas run out?",
    "What idea did others call impossible?"
  ],
  
  spiritual_social: [
    "Difference between pleasure and joy?",
    "How do you find strength in unfair challenges?",
    "If failure was impossible, what would you attempt?",
    "Who are you when no one is watching?",
    "What does it mean to truly love?"
  ],
  
  fictional_anime: [
    "What’s your greatest secret?",
    "What’s your worst habit?",
    "WWhat belief did you stop holding?",
    "How do you handle conflict with loved ones?",
    "What keeps you up at night?"
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
