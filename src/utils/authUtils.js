// Authentication utility functions for account components

export const checkAuthToken = () => {
    return localStorage.getItem('accessToken') !== null;
};

export const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isProfileCompleted');
    localStorage.removeItem('isEmailVerified');
    localStorage.removeItem('memberInfo');
    localStorage.removeItem('memberProfile');
};

export const isAuthError = (error) => {
    const errorStr = error.toString().toLowerCase();
    return errorStr.includes('401') || 
           errorStr.includes('unauthorized') || 
           errorStr.includes('token') ||
           errorStr.includes('authentication') ||
           errorStr.includes('expired');
};

export const handleAuthError = (component) => {
    console.warn('Authentication error detected, redirecting to login');
    clearAuthData();
    if (component && component.setState) {
        component.setState({ redirectToLogin: true });
    }
};
