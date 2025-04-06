const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function for API requests
export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: any,
  token?: string
) => {
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
    credentials: 'include' // Include cookies in requests if needed
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
        data
      };
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth services
export const authService = {
  // Google Login
  googleLogin: (token: string) => {
    return apiRequest('/api/auth/google', 'POST', { token });
  },

  // Refresh token
  refreshToken: (refreshToken: string) => {
    return apiRequest('/api/auth/refresh', 'POST', { refresh_token: refreshToken });
  },

  // Verify token
  verifyToken: (accessToken: string) => {
    return apiRequest('/api/auth/verify', 'POST', { access_token: accessToken });
  },

  // Get current user
  getCurrentUser: (accessToken: string) => {
    return apiRequest('/api/auth/me', 'GET', undefined, accessToken);
  },

  // Logout
  logout: (accessToken: string) => {
    return apiRequest('/api/auth/logout', 'POST', undefined, accessToken);
  }
};