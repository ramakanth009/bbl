import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token expiration
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(username, password) {
    const response = await this.client.post('/register', {
      username,
      password,
    });
    return response.data;
  }

  async login(username, password) {
    const response = await this.client.post('/login', {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  // Character endpoints
  async getCharacters() {
    const response = await this.client.get('/characters');
    return response.data;
  }

  // Chat endpoints
  async sendMessage(characterName, userInput, newSession = false, creativitySettings = {}) {
    const response = await this.client.post('/chat', {
      character_name: characterName,
      user_input: userInput,
      new_session: newSession,
      ...creativitySettings,
    });
    return response.data;
  }

  // Session endpoints
  async getSessions() {
    const response = await this.client.get('/get_sessions');
    return response.data;
  }

  async getSessionMessages(sessionId) {
    const response = await this.client.get(`/get_session_messages?session_id=${sessionId}`);
    return response.data;
  }

  // Utility methods
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new ApiService();