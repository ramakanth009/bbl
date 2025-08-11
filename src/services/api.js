import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_URL || 'https://characters-2-0.onrender.com';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://fastapi-characters.onrender.com';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://fastapi-characters-dikf.onrender.com';
const BASE_URL = process.env.REACT_APP_API_URL || 'https://characters-zwwb.onrender.com/';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      // timeout: 50000, // 50 second timeout for AI responses
    });

    // Add auth token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Enhanced response interceptor with better error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          // Only redirect if not already on login page
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        
        // Log errors for debugging (remove in production)
        console.error('API Error:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(username, password) {
    try {
      const response = await this.client.post('/register', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Registration failed');
    }
  }

  async login(username, password) {
    try {
      const response = await this.client.post('/login', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Login failed');
    }
  }

  // Character endpoints
  async getCharacters() {
    try {
      const response = await this.client.get('/characters');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to load characters');
    }
  }

  // Updated paginated characters method - only use API total_count
  async getCharactersPaginated(page = 1, perPage = 20, section = null) {
    try {
      const params = {
        page,
        per_page: perPage,
      };

      if (section) {
        params.section = section;
      }

      const response = await this.client.get('/characters', { params });
      
      let characters, pagination;
      
      if (response.data.pagination) {
        characters = response.data.characters || [];
        pagination = response.data.pagination;
      } else {
        characters = response.data.characters || response.data || [];
        pagination = {
          page: response.data.page || 1,
          per_page: perPage,
          total_count: response.data.total_count || 0,
          total_pages: response.data.total_pages || 1,
          has_next: response.data.next_url !== null,
          has_prev: response.data.prev_url !== null,
        };
      }
      
      // Only use total_count from API response
      const total_count = pagination.total_count || response.data.total_count || 0;
      
      return {
        characters,
        page: pagination.page || 1,
        per_page: pagination.per_page || perPage,
        total_pages: pagination.total_pages || 1,
        total_count: total_count,
        has_next: pagination.has_next || false,
        has_prev: pagination.has_prev || false,
        next_url: pagination.next_url || null,
        prev_url: pagination.prev_url || null,
      };
    } catch (error) {
      throw this.handleError(error, 'Failed to load characters');
    }
  }

// Fixed getAllCharacters method to prevent infinite loops
async getAllCharacters() {
  try {
    const allCharacters = [];
    let page = 1;
    let hasMore = true;
    const maxPages = 5; // Increased safety limit

    while (hasMore && page <= maxPages) {
      console.log(`Fetching page ${page}...`);
      
      const response = await this.getCharactersPaginated(page, 100);
      
      // Log the response for debugging
      console.log(`Page ${page} response:`, {
        charactersCount: response.characters.length,
        hasNext: response.has_next,
        totalPages: response.total_pages,
        currentPage: response.page
      });
      
      // If no characters returned, break the loop
      if (!response.characters || response.characters.length === 0) {
        console.log('No more characters found, breaking loop');
        break;
      }
      
      // allCharacters.push(...response.characters);
      
      // Multiple conditions to stop the loop
      hasMore = response.has_next === true && 
                response.characters.length > 0 && 
                page < (response.total_pages || Infinity);
      
      // Additional safety: if we've reached total_pages, stop
      if (response.total_pages && page >= response.total_pages) {
        console.log('Reached total pages, breaking loop');
        break;
      }
      
      page++;
    }

    if (page > maxPages) {
      console.warn(`Reached maximum page limit (${maxPages}), stopping fetch`);
    }

    console.log(`Total characters fetched: ${allCharacters.length}`);
    return allCharacters;
  } catch (error) {
    console.error('Error in getAllCharacters:', error);
    throw this.handleError(error, 'Failed to load all characters');
  }
}

  // Add this method if you want to fetch a single character by ID
  async getCharacterById(characterId) {
    try {
      const response = await this.client.get(`/characters/${characterId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to load character');
    }
  }

  // Get single character by ID (alternative endpoint)
  async getSingleCharacter(characterId) {
    try {
      const response = await this.client.get(`/character/${characterId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to load character');
    }
  }

  // ===============================
  // NEW CATEGORIES ENDPOINTS
  // ===============================

  // Get all available categories
  async getCategories() {
    try {
      console.log('🔄 Loading categories...');
      
      const response = await this.client.get('/categories', {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('✅ Categories loaded:', {
        count: Object.keys(response.data.categories || {}).length,
        status: response.data.status
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Failed to load categories:', {
        status: error.response?.status,
        message: error.response?.data?.error || error.message
      });
      throw this.handleError(error, 'Failed to load categories');
    }
  }

  // Get characters from specific category
  async getCharactersByCategory(categoryKey) {
    try {
      console.log(`🔄 Loading characters for category: ${categoryKey}`);
      
      const response = await this.client.get(`/characters/category/${categoryKey}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('✅ Category characters loaded:', {
        category: response.data.category_name,
        count: response.data.count,
        charactersLength: response.data.characters?.length || 0
      });
      
      return response.data;
    } catch (error) {
      console.error(`❌ Failed to load characters for category ${categoryKey}:`, {
        status: error.response?.status,
        message: error.response?.data?.error || error.message
      });
      throw this.handleError(error, `Failed to load characters for category: ${categoryKey}`);
    }
  }

  // Search characters with pagination
  async searchCharacters(query) {
    try {
      const normalizedQuery = query.trim();
      
      if (!normalizedQuery) {
        return {
          characters: [],
          query: '',
          total_count: 0
        };
      }

      const response = await this.client.get('/search', {
        params: {
          q: normalizedQuery,
        },
      });

      const characters = Array.isArray(response.data.characters) 
        ? response.data.characters 
        : Array.isArray(response.data.results)
          ? response.data.results 
          : [];

      return {
        characters,
        query: normalizedQuery,
        total_count: characters.length // Always use actual length of results
      };
    } catch (error) {
      console.error('Search error:', error);
      return {
        characters: [],
        query: query.trim(),
        total_count: 0
      };
    }
  }

  // ===============================
  // ENHANCED CHAT ENDPOINTS WITH VOICE
  // ===============================
  
  // ENHANCED: Chat endpoint using chat_with_voice for all messages
  async sendMessage(characterName, userInput, newSession = false, languageSettings = {}, voiceOptions = {}) {
    try {
      console.log('🚀 Sending message with settings:', {
        characterName,
        userInput,
        newSession,
        languageSettings,
        voiceOptions
      });

      // Extract the target response language from settings
      const targetLanguage = languageSettings.output_language || 
                           languageSettings.language || 
                           languageSettings.response_language || 
                           'english';

      // Build URL with voice parameters - always use voice endpoint
      const token = localStorage.getItem('token');
      const url = new URL(`${BASE_URL}/chat_with_voice`);
      
      // Always set generate_voice=true for voice capability
      url.searchParams.append('generate_voice', 'true');
      
      // Add voice parameters if voice is enabled
      if (voiceOptions.voiceEnabled) {
        if (voiceOptions.voiceEmotion !== undefined) {
          url.searchParams.append('voice_emotion', voiceOptions.voiceEmotion.toString());
        }
        if (voiceOptions.maxVoiceLength !== undefined) {
          url.searchParams.append('max_voice_length', voiceOptions.maxVoiceLength.toString());
        }
      }

      const requestData = {
        character_name: characterName,
        user_input: userInput,
        new_session: newSession,
        language: voiceOptions.language || targetLanguage,
        temperature: voiceOptions.temperature,
        top_p: voiceOptions.top_p,
        top_k: voiceOptions.top_k
      };

      console.log('📤 Request payload:', requestData);

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept-Language': targetLanguage,
          'Content-Language': languageSettings.input_language || 'english',
        },
        body: JSON.stringify(requestData)
      };

      const response = await fetch(url.toString(), config);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      
      console.log('📥 Chat response received:', {
        reply: data.reply?.substring(0, 100) + '...',
        hasVoice: data.has_voice,
        audioLength: data.audio_base64?.length || 0,
        input_language: data.input_language,
        response_language: data.response_language,
        session_id: data.session_id
      });

      // Ensure chat_history is always an array and sorted
      if (data.chat_history && Array.isArray(data.chat_history)) {
        data.chat_history = this.sortMessagesByTimestamp(data.chat_history);
      }

      return data;
    } catch (error) {
      console.error('❌ Chat error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw this.handleError(error, 'Failed to send message');
    }
  }

  // ===============================
  // VOICE-SPECIFIC ENDPOINTS
  // ===============================

  // NEW: Get available voices
  async getAvailableVoices() {
    try {
      console.log('🎤 Fetching available voices...');
      const response = await this.client.get('/voice/available');
      console.log('✅ Voices loaded:', response.data.voices?.length || 0);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to load voices:', error);
      return { voices: [] }; // Return empty array if voices endpoint fails
    }
  }

  // NEW: Upload voice reference
  async uploadVoiceReference(characterName, audioFile) {
    try {
      console.log('📤 Uploading voice reference for:', characterName);
      
      const formData = new FormData();
      formData.append('character_name', characterName);
      formData.append('audio_file', audioFile);

      const response = await fetch(`${BASE_URL}/voice/upload_reference`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      console.log('✅ Voice reference uploaded successfully');
      return data;
    } catch (error) {
      console.error('❌ Voice upload failed:', error);
      throw new Error('Failed to upload voice reference: ' + error.message);
    }
  }

  // NEW: Audio utility methods
  createAudioFromBase64(base64Data, mimeType = 'audio/wav') {
    try {
      const audioBlob = new Blob(
        [Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))],
        { type: mimeType }
      );
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Clean up URL when audio is done
      audio.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
      });
      
      return audio;
    } catch (error) {
      console.error('❌ Failed to create audio from base64:', error);
      throw new Error('Failed to create audio: ' + error.message);
    }
  }

  // NEW: Download audio file from base64
  downloadAudio(base64Data, filename = 'voice_response.wav') {
    try {
      const audioBlob = new Blob(
        [Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))],
        { type: 'audio/wav' }
      );
      
      const url = URL.createObjectURL(audioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('❌ Failed to download audio:', error);
      throw new Error('Failed to download audio: ' + error.message);
    }
  }

  // ===============================
  // LANGUAGE ENDPOINTS - FIXED
  // ===============================
  
  // FIXED: Get supported languages with proper authentication
  async getSupportedLanguages() {
    try {
      console.log('🔄 Loading supported languages...');
      
      const response = await this.client.get('/languages', {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('✅ Languages loaded:', {
        count: response.data.languages?.length || 0,
        status: response.data.status
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Failed to load languages:', {
        status: error.response?.status,
        message: error.response?.data?.error || error.message
      });
      throw this.handleError(error, 'Failed to load supported languages');
    }
  }

  // // NEW: Set user language preferences (if backend supports it)
  // async setUserLanguagePreferences(preferences) {
  //   try {
  //     console.log('🔧 Setting user language preferences:', preferences);
      
  //     const response = await this.client.post('/user/language-preferences', {
  //       input_language: preferences.inputLanguage || 'english',
  //       output_language: preferences.outputLanguage || 'english',
  //       auto_detect: preferences.autoDetect || false,
  //     });
      
  //     console.log('✅ Language preferences updated');
  //     return response.data;
  //   } catch (error) {
  //     console.warn('⚠️ Language preferences endpoint not available, storing locally');
  //     // Fallback: store preferences locally
  //     localStorage.setItem('language_preferences', JSON.stringify(preferences));
  //     return { status: 'stored_locally', preferences };
  //   }
  // }

  // // NEW: Get user language preferences
  // async getUserLanguagePreferences() {
  //   try {
  //     const response = await this.client.get('/user/language-preferences');
  //     return response.data;
  //   } catch (error) {
  //     console.warn('⚠️ Language preferences endpoint not available, using local storage');
  //     // Fallback: get from local storage
  //     const stored = localStorage.getItem('language_preferences');
  //     return stored ? JSON.parse(stored) : {
  //       inputLanguage: 'english',
  //       outputLanguage: 'english',
  //       autoDetect: false
  //     };
  //   }
  // }

  // NEW: Translate text (if backend supports it)
  async translateText(text, fromLanguage, toLanguage) {
    try {
      console.log('🔄 Translating text:', { fromLanguage, toLanguage, textLength: text.length });
      
      const response = await this.client.post('/translate', {
        text,
        from_language: fromLanguage,
        to_language: toLanguage,
      });
      
      console.log('✅ Translation completed');
      return response.data;
    } catch (error) {
      console.error('❌ Translation failed:', error.response?.data || error.message);
      throw this.handleError(error, 'Failed to translate text');
    }
  }

  // Session management endpoints
  async getSessions() {
    try {
      const response = await this.client.get('/get_sessions');
      // Filter and clean the sessions data
      const sessions = response.data.sessions || response.data || [];
      return sessions
        .filter(session => session && session.character && session.session_id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
      console.error('Failed to load sessions:', error);
      throw this.handleError(error, 'Failed to load sessions');
    }
  }

  async getSessionsPaginated(page = 1, perPage = 20) {
    try {
      const response = await this.client.get('/get_sessions', {
        params: {
          page,
          per_page: perPage,
        },
      });
      
      const sessions = response.data.sessions || response.data || [];
      const validSessions = sessions
        .filter(session => session && session.character && session.session_id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      return {
        sessions: validSessions,
        page: response.data.page || 1,
        total_pages: response.data.total_pages || Math.ceil(validSessions.length / perPage),
        total_count: response.data.total_count || validSessions.length,
      };
    } catch (error) {
      throw this.handleError(error, 'Failed to load sessions');
    }
  }

  async getSessionMessages(sessionId) {
    try {
      const response = await this.client.get(`/get_session_messages?session_id=${sessionId}`);
      // Ensure chat_history is always an array and sorted
      if (response.data.chat_history && Array.isArray(response.data.chat_history)) {
        response.data.chat_history = this.sortMessagesByTimestamp(response.data.chat_history);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to load session messages');
    }
  }

  // Character management - CREATE CHARACTER
  async createCharacter(characterData) {
    try {
      const response = await this.client.post('/create_character', characterData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create character');
    }
  }

  // NEW: Get character form options
  async getCharacterFormOptions() {
    try {
      const response = await this.client.get('/character_form_options');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to load character form options');
    }
  }

  async updateCharacter(characterId, characterData) {
    try {
      const response = await this.client.put(`/characters/${characterId}`, characterData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to update character');
    }
  }

  async deleteCharacter(characterId) {
    try {
      const response = await this.client.delete(`/characters/${characterId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to delete character');
    }
  }

  // Utility method to sort messages by timestamp
  sortMessagesByTimestamp(messages) {
    return messages.sort((a, b) => {
      const timeA = new Date(a.timestamp || a.created_at || 0);
      const timeB = new Date(b.timestamp || b.created_at || 0);
      return timeA - timeB;
    });
  }

  // Enhanced error handling
  handleError(error, defaultMessage) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return new Error(data.error || 'Invalid request');
        case 401:
          return new Error('Authentication required');
        case 403:
          return new Error('Access forbidden');
        case 404:
          return new Error('Resource not found');
        case 429:
          return new Error('Too many requests. Please try again later.');
        case 500:
          return new Error('Server error. Please try again later.');
        default:
          return new Error(data.error || defaultMessage);
      }
    } else if (error.request) {
      // Network error
      return new Error('Network error. Please check your connection.');
    } else {
      // Other error
      return new Error(error.message || defaultMessage);
    }
  }

  // Utility methods
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('language_preferences');
    window.location.href = '/login';
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Basic JWT token validation (check if it's expired)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  // Get user info from token
  getUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.user_id,
        exp: payload.exp
      };
    } catch {
      return null;
    }
  }

  // Health check endpoint
  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Health check failed');
    }
  }

  // Helper method to check if backend is available
  async isBackendAvailable() {
    try {
      await this.healthCheck();
      return true;
    } catch {
      return false;
    }
  }

  // Batch operations for better performance
  async getMultipleCharacters(characterIds) {
    try {
      const promises = characterIds.map(id => this.getSingleCharacter(id));
      const results = await Promise.allSettled(promises);
      
      return results.map((result, index) => ({
        id: characterIds[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null,
      }));
    } catch (error) {
      throw this.handleError(error, 'Failed to load multiple characters');
    }
  }
}

export default new ApiService();