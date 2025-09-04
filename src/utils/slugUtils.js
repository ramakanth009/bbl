/**
 * Utility functions for converting character names to URL-friendly slugs
 * and handling URL routing with both character ID and name
 */

/**
 * Convert a character name to a URL-friendly slug
 * @param {string} name - The character name to convert
 * @returns {string} - URL-friendly slug
 */
export const createSlug = (name) => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name
    .toLowerCase()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters except hyphens and alphanumeric
    .replace(/[^\w\-]+/g, '')
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Handle unicode characters by normalizing and removing diacritics
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Ensure it's not empty
    || 'character';
};

/**
 * Convert a slug back to a readable name (best effort)
 * @param {string} slug - The slug to convert back
 * @returns {string} - Readable name
 */
export const slugToName = (slug) => {
  if (!slug || typeof slug !== 'string') {
    return '';
  }

  return slug
    // Replace hyphens with spaces
    .replace(/-/g, ' ')
    // Capitalize first letter of each word
    .replace(/\b\w/g, letter => letter.toUpperCase())
    .trim();
};

/**
 * Create a complete URL path with both character ID and name slug
 * @param {string} basePath - The base path (e.g., '/dashboard/discover/chat')
 * @param {string|number} characterId - The character ID
 * @param {string} characterName - The character name
 * @returns {string} - Complete URL path
 */
export const createCharacterPath = (basePath, characterId, characterName) => {
  if (!basePath || !characterId) {
    return basePath || '/';
  }

  const slug = createSlug(characterName);
  return `${basePath}/${characterId}/${slug}`;
};

/**
 * Parse character info from URL parameters
 * @param {string} characterId - The character ID from URL params
 * @param {string} characterSlug - The character slug from URL params
 * @returns {object} - Object with id and name
 */
export const parseCharacterFromUrl = (characterId, characterSlug) => {
  return {
    id: characterId,
    name: characterSlug ? slugToName(characterSlug) : null,
    slug: characterSlug
  };
};

/**
 * Validate if a character name matches its slug
 * @param {string} characterName - The actual character name
 * @param {string} slug - The slug from URL
 * @returns {boolean} - Whether they match
 */
export const validateSlugMatch = (characterName, slug) => {
  if (!characterName || !slug) {
    return false;
  }

  const expectedSlug = createSlug(characterName);
  return expectedSlug === slug;
};

/**
 * Generate navigation state for character routing
 * @param {object} character - The character object
 * @returns {object} - Navigation state object
 */
export const createCharacterNavigationState = (character) => {
  return {
    character,
    slug: createSlug(character.name),
    timestamp: Date.now()
  };
};

/**
 * Handle special characters and edge cases in character names
 * @param {string} name - Character name
 * @returns {string} - Processed name safe for URLs
 */
export const sanitizeCharacterName = (name) => {
  if (!name) return '';
  
  // Handle common special cases
  const specialCases = {
    '&': 'and',
    '@': 'at',
    '#': 'hash',
    '%': 'percent',
    '+': 'plus',
    '=': 'equals',
    '?': 'question',
    '/': 'slash',
    '\\': 'backslash',
    '|': 'pipe',
    '<': 'less',
    '>': 'greater',
    '"': 'quote',
    "'": 'apostrophe',
    '`': 'backtick',
    '~': 'tilde',
    '!': 'exclamation',
    '*': 'star',
    '^': 'caret',
    '(': 'open-paren',
    ')': 'close-paren',
    '[': 'open-bracket',
    ']': 'close-bracket',
    '{': 'open-brace',
    '}': 'close-brace'
  };

  let processed = name;
  
  // Replace special characters with words
  Object.entries(specialCases).forEach(([char, word]) => {
    processed = processed.replace(new RegExp(`\\${char}`, 'g'), ` ${word} `);
  });

  return processed.trim();
};

/**
 * Create a robust slug that handles all edge cases
 * @param {string} name - Character name
 * @returns {string} - Robust URL slug
 */
export const createRobustSlug = (name) => {
  if (!name || typeof name !== 'string') {
    return 'character';
  }

  // First sanitize special characters
  const sanitized = sanitizeCharacterName(name);
  
  // Then create the slug
  return createSlug(sanitized);
};
