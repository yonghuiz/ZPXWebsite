// Development configuration for handling SSL certificate issues
export const isDevelopment = import.meta.env.DEV;

// For development, we can create a custom fetch function that handles SSL issues
export const createFetchWithSSLBypass = () => {
  if (isDevelopment) {
    // In development, we might need to handle SSL certificate issues
    const originalFetch = window.fetch;
    return (url, options = {}) => {
      // Add referrer policy to help with CORS and SSL issues
      const enhancedOptions = {
        ...options,
        referrerPolicy: 'no-referrer-when-downgrade'
      };
      
      return originalFetch(url, enhancedOptions).catch(error => {
        // If it's an SSL error, provide a helpful message
        if (error.message && error.message.includes('ERR_CERT_DATE_INVALID')) {
          console.warn('SSL Certificate Error detected. Consider using a proxy or updating the certificate.');
          throw new Error('SSL certificate error: The server certificate is invalid. Please contact the administrator.');
        }
        throw error;
      });
    };
  }
  return window.fetch;
};

// Alternative development API URL if needed
export const getApiUrl = () => {
  if (isDevelopment) {
    // You can uncomment this line to use HTTP in development
    // return 'http://apis.zipcodexpress.com/opr';
  }
  return 'https://apis.zipcodexpress.com/opr';
};
