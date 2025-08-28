import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://characters-2-0.onrender.com';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://fastapi-characters.onrender.com';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://fastapi-characters-dikf.onrender.com';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://characters-zwwb.onrender.com';
// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://matrix.gigalabs.in';
const BASE_URL = process.env.REACT_APP_API_URL || 'https://clone-7040.onrender.com';

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
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Enhanced response interceptor with better error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle authentication errors
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // Only redirect if not already on auth pages
                    const currentPath = window.location.pathname;
                    if (
                        !currentPath.includes('/login') &&
                        !currentPath.includes('/register') &&
                        !currentPath.includes('/auth/callback')
                    ) {
                        // Use replace to avoid back button issues
                        window.location.replace('/login');
                    }
                }
                // Handle other common errors
                if (error.response?.status === 403) {
                    console.warn('Access forbidden - insufficient permissions');
                }
                if (error.response?.status >= 500) {
                    console.error('Server error - please try again later');
                }
                // Log errors for debugging (remove in production)
                console.error('API Error:', {
                    url: error.config?.url,
                    method: error.config?.method,
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
                return Promise.reject(error);
            }
        );
    }

    // ===============================
    // GOOGLE OAUTH METHODS
    // ===============================

    // Initiate Google OAuth login
    initiateGoogleLogin() {
        window.location.href = `${BASE_URL}/auth/google/login`;
    }

    // // Check OAuth status
    // async checkOAuthStatus() {
    //     try {
    //         const response = await this.client.get('/auth/oauth/status');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error, 'Failed to check OAuth status');
    //     }
    // }

    // Process OAuth callback parameters
    processOAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');
        const message = urlParams.get('message');
        if (error) {
            return {
                success: false,
                error: error,
                message: message || 'OAuth authentication failed',
            };
        }
        if (token) {
            // Store OAuth user data - UPDATED to handle new fields
            const userData = {
                id: urlParams.get('user_id'),
                username: urlParams.get('username'),
                email: urlParams.get('email'),
                name: urlParams.get('name'),
                oauth_provider: urlParams.get('oauth_provider'),
                is_oauth_user: urlParams.get('is_oauth_user') === 'true',
                // NEW: Handle mobile collection flag
                needs_mobile: urlParams.get('needs_mobile') === 'true',
                is_new_user: urlParams.get('is_new_user') === 'true',
                login_method: urlParams.get('login_method'),
                mobile_number: urlParams.get('mobile_number'), // Will be null if not provided
            };
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            return {
                success: true,
                token: token,
                user: userData,
            };
        }
        return {
            success: false,
            error: 'no_token',
            message: 'No authentication token received',
        };
    }

    // Auth endpoints
    // UPDATED: Register method now accepts email and mobile_number
    async register(username, email, mobile_number, password) {
        try {
            const response = await this.client.post('/register', {
                username,
                email,
                mobile_number,
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
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
            }
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Login failed');
        }
    }

    // ===============================
    // NEW USER PROFILE ENDPOINTS
    // ===============================

    // Get user profile status
    async getUserProfileStatus() {
        try {
            console.log('🔄 Loading user profile status...');
            const response = await this.client.get('/user/profile/status');
            console.log('✅ User profile status loaded:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Failed to load user profile status:', {
                status: error.response?.status,
                message: error.response?.data?.detail || error.message,
            });
            throw this.handleError(error, 'Failed to load user profile status');
        }
    }

    // Update user mobile number
    async updateUserMobile(mobile_number) {
        try {
            console.log('🔄 Updating user mobile number...');
            const response = await this.client.post('/user/update-mobile', {
                mobile_number,
            });
            console.log('✅ Mobile number updated successfully');
            return response.data;
        } catch (error) {
            console.error('❌ Failed to update mobile number:', {
                status: error.response?.status,
                message: error.response?.data?.detail || error.message,
            });
            throw this.handleError(error, 'Failed to update mobile number');
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
                    currentPage: response.page,
                });
                // If no characters returned, break the loop
                if (!response.characters || response.characters.length === 0) {
                    console.log('No more characters found, breaking loop');
                    break;
                }
                // allCharacters.push(...response.characters);
                // Multiple conditions to stop the loop
                hasMore =
                    response.has_next === true &&
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
                },
            });
            console.log('✅ Categories loaded:', {
                count: Object.keys(response.data.categories || {}).length,
                status: response.data.status,
            });
            return response.data;
        } catch (error) {
            console.error('❌ Failed to load categories:', {
                status: error.response?.status,
                message: error.response?.data?.error || error.message,
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
                },
            });
            console.log('✅ Category characters loaded:', {
                category: response.data.category_name,
                count: response.data.count,
                charactersLength: response.data.characters?.length || 0,
            });
            return response.data;
        } catch (error) {
            console.error(`❌ Failed to load characters for category ${categoryKey}:`, {
                status: error.response?.status,
                message: error.response?.data?.error || error.message,
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
                    total_count: 0,
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
                total_count: characters.length, // Always use actual length of results
            };
        } catch (error) {
            console.error('Search error:', error);
            return {
                characters: [],
                query: query.trim(),
                total_count: 0,
            };
        }
    }

    async sendMessage(characterName, userInput, newSession = false, languageSettings = {}) {
        try {
            console.log('🚀 Sending message with language settings:', {
                characterName,
                userInput,
                newSession,
                languageSettings,
            });
            // Extract the target response language from settings
            const targetLanguage =
                languageSettings.output_language ||
                languageSettings.language ||
                languageSettings.response_language ||
                'english';
            const requestData = {
                character_name: characterName,
                user_input: userInput,
                new_session: newSession,
                language: targetLanguage, // API expects single 'language' parameter
            };
            console.log('📤 Request payload:', requestData);
            // Add language headers for better API communication
            const config = {
                headers: {
                    'Accept-Language': targetLanguage,
                    'Content-Language': languageSettings.input_language || 'english',
                },
            };
            const response = await this.client.post('/chat', requestData, config);
            console.log('📥 Chat response received:', {
                reply: response.data.reply?.substring(0, 100) + '...',
                input_language: response.data.input_language,
                response_language: response.data.response_language,
                session_id: response.data.session_id,
            });
            // Ensure chat_history is always an array and sorted
            if (response.data.chat_history && Array.isArray(response.data.chat_history)) {
                response.data.chat_history = this.sortMessagesByTimestamp(response.data.chat_history);
            }
            return response.data;
        } catch (error) {
            console.error('❌ Chat error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
            throw this.handleError(error, 'Failed to send message');
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
                },
            });
            console.log('✅ Languages loaded:', {
                count: response.data.languages?.length || 0,
                status: response.data.status,
            });
            return response.data;
        } catch (error) {
            console.error('❌ Failed to load languages:', {
                status: error.response?.status,
                message: error.response?.data?.error || error.message,
            });
            throw this.handleError(error, 'Failed to load supported languages');
        }
    }

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
                .filter((session) => session && session.character && session.session_id)
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
                .filter((session) => session && session.character && session.session_id)
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

    // NEW: Get statistics endpoint
    async getStats() {
        try {
            const response = await this.client.get('/stats');
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Failed to load statistics');
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
                    return new Error(data.error || data.detail || 'Invalid request');
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
                    return new Error(data.error || data.detail || defaultMessage);
            }
        } else if (error.request) {
            // Network error
            return new Error('Network error. Please check your connection.');
        } else {
            // Other error
            return new Error(error.message || defaultMessage);
        }
    }

    async logout() {
        try {
            // Check if user is authenticated before making logout call
            const token = localStorage.getItem('token');
            if (token) {
                // Make API call to logout endpoint to blacklist the JWT token
                await this.client.post('/logout');
            }
        } catch (error) {
            // Log the error but don't prevent logout from completing
            console.error('Logout API call failed:', error.message);
            // Even if API call fails, we should still proceed with local logout
        } finally {
            // Always clean up local storage and redirect regardless of API call result
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('language_preferences');
            // window.location.href = '#/login';
        }
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

    // Get user info from token or localStorage
    getUserInfo() {
        // Try to get user from localStorage first (OAuth users)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (e) {
                console.error('Failed to parse stored user data:', e);
            }
        }
        // Fallback to JWT token parsing (regular users)
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                userId: payload.user_id,
                exp: payload.exp,
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
            const promises = characterIds.map((id) => this.getSingleCharacter(id));
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
