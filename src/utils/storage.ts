// Constants
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

// Storage utilities
export const storage = {
  // Get items
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  
  getUserData: () => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  
  // Set items
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  
  setUserData: (userData: any): void => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  },
  
  // Clear items
  clearToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  clearRefreshToken: (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  
  clearUserData: (): void => {
    localStorage.removeItem(USER_DATA_KEY);
  },
  
  // Clear all auth data
  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }
};