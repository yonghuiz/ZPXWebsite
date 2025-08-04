// API Configuration for different environments
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Backend API URL configuration
export const API_CONFIG = {
  // Development (local)
  development: {
    baseURL: 'http://localhost:3001',
    emailEndpoint: '/api/send-contact-email',
    registrationEndpoint: '/api/send-email'
  },
  
  // Production (deployed backend)
  production: {
    baseURL: 'https://your-backend-url.railway.app', // Replace with your actual backend URL
    emailEndpoint: '/api/send-contact-email',
    registrationEndpoint: '/api/send-email'
  }
};

// Get current environment configuration
const getCurrentConfig = () => {
  return isDevelopment ? API_CONFIG.development : API_CONFIG.production;
};

export const API_BASE_URL = getCurrentConfig().baseURL;
export const EMAIL_ENDPOINT = getCurrentConfig().emailEndpoint;
export const REGISTRATION_ENDPOINT = getCurrentConfig().registrationEndpoint;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default {
  API_BASE_URL,
  EMAIL_ENDPOINT,
  REGISTRATION_ENDPOINT,
  buildApiUrl
};
