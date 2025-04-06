import { ApiResponse, ErrorResponse, TokenResponse, GoogleAuthResponse, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generic API request with improved type safety
export const apiRequest = async <T>(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  token?: string
): Promise<ApiResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  // Add authorization token if provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include' // For HttpOnly cookies if used
  };

  // Add request body if provided
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        data: data as ErrorResponse
      };
    }

    return data as ApiResponse<T>;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw {
        status: 0,
        data: {
          status: 'error',
          error: {
            code: 'NETWORK_ERROR',
            message: 'Unable to connect to the server'
          }
        } as ErrorResponse
      };
    }
    throw error;
  }
};

// Auth services with better type definitions
export const authService = {
  // Google Login
  googleLogin: (token: string): Promise<ApiResponse<GoogleAuthResponse>> => {
    return apiRequest<GoogleAuthResponse>('/api/auth/google', 'POST', { token });
  },

  // Refresh token
  refreshToken: (refreshToken: string): Promise<ApiResponse<TokenResponse>> => {
    return apiRequest<TokenResponse>('/api/auth/refresh', 'POST', { refresh_token: refreshToken });
  },

  // Verify token
  verifyToken: (accessToken: string): Promise<ApiResponse<{ valid: boolean }>> => {
    return apiRequest<{ valid: boolean }>('/api/auth/verify', 'POST', { access_token: accessToken });
  },

  // Get current user
  getCurrentUser: (accessToken: string): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/api/auth/me', 'GET', undefined, accessToken);
  },

  // Logout
  logout: (accessToken: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiRequest<{ success: boolean }>('/api/auth/logout', 'POST', undefined, accessToken);
  }
};