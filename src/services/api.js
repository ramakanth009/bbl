import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://characters-2-0.onrender.com';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout for AI responses
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

  // Updated paginated characters method with proper response parsing
  async getCharactersPaginated(page = 1, perPage = 20, section = null) {
    try {
      const params = {
        page,
        per_page: perPage,
      };

      // Add section-specific parameters if needed
      if (section) {
        params.section = section;
      }

      const response = await this.client.get('/characters', { params });
      
      // Handle both old and new response formats
      let characters, pagination;
      
      if (response.data.pagination) {
        // New format with nested pagination object
        characters = response.data.characters || [];
        pagination = response.data.pagination;
      } else {
        // Old format with pagination at root level
        characters = response.data.characters || response.data || [];
        pagination = {
          page: response.data.page || 1,
          per_page: perPage,
          total_count: response.data.total_count || characters.length,
          total_pages: response.data.total_pages || Math.ceil((response.data.total_count || characters.length) / perPage),
          has_next: response.data.next_url !== null,
          has_prev: response.data.prev_url !== null,
          next_url: response.data.next_url,
          prev_url: response.data.prev_url,
        };
      }
      
      return {
        characters,
        page: pagination.page || 1,
        per_page: pagination.per_page || perPage,
        total_pages: pagination.total_pages || 1,
        total_count: pagination.total_count || 0,
        has_next: pagination.has_next || false,
        has_prev: pagination.has_prev || false,
        next_url: pagination.next_url || null,
        prev_url: pagination.prev_url || null,
      };
    } catch (error) {
      throw this.handleError(error, 'Failed to load characters');
    }
  }

  // Get all characters for client-side filtering (for sections)
  async getAllCharacters() {
    try {
      const allCharacters = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await this.getCharactersPaginated(page, 100); // Use larger page size for efficiency
        allCharacters.push(...response.characters);
        
        hasMore = response.has_next && response.characters.length > 0;
        page++;
        
        // Safety check to prevent infinite loops
        if (page > 20) {
          console.warn('Reached maximum page limit when fetching all characters');
          break;
        }
      }

      return allCharacters;
    } catch (error) {
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

  // Search characters with pagination
  async searchCharacters(query) {
    try {
      const response = await this.client.get('/search', {
        params: {
          q: query,
        },
      });

      // Support both 'results' and 'characters' keys
      let characters = [];
      if (Array.isArray(response.data.characters)) {
        characters = response.data.characters;
      } else if (Array.isArray(response.data.results)) {
        characters = response.data.results;
      }

      return {
        characters,
        query: query,
      };
    } catch (error) {
      throw this.handleError(error, 'Failed to search characters');
    }
  }

  // Chat endpoints with enhanced error handling
  async sendMessage(characterName, userInput, newSession = false, creativitySettings = {}) {
    try {
      const requestData = {
        character_name: characterName,
        user_input: userInput,
        new_session: newSession,
        ...creativitySettings,
      };

      const response = await this.client.post('/chat', requestData);
      // Ensure chat_history is always an array and sorted
      if (response.data.chat_history && Array.isArray(response.data.chat_history)) {
        response.data.chat_history = this.sortMessagesByTimestamp(response.data.chat_history);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to send message');
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