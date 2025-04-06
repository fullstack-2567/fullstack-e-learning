import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (googleToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Function to get route based on user role
export const getRouteByRole = (role?: string): string => {
  if (role === 'admin') return '/admin/dashboard/project';
  if (role === 'approver') return '/approver/project-menu';
  return '/contents'; // Default is learner
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Add a token expired state
  const [tokenExpired, setTokenExpired] = useState<boolean>(false);
  const navigate = useNavigate();

  // Set up token refresh interval
  useEffect(() => {
    let refreshInterval: number | undefined;
    
    if (isAuthenticated) {
      // Refresh token every 14 minutes (assuming 15 min expiry)
      refreshInterval = window.setInterval(() => {
        refreshToken().catch(() => {
          // If refresh fails, set token as expired
          setTokenExpired(true);
        });
      }, 14 * 60 * 1000);
    }
    
    return () => {
      if (refreshInterval) window.clearInterval(refreshInterval);
    };
  }, [isAuthenticated]);

  // Handle expired token - redirect to login
  useEffect(() => {
    if (tokenExpired) {
      logout();
    }
  }, [tokenExpired]);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Verify token
        await authService.verifyToken(accessToken);
        
        // Get user data
        await fetchUserData();
      } catch (error) {
        // Token is invalid, try refreshing
        const refreshSuccess = await refreshToken();
        if (!refreshSuccess) {
          setIsLoading(false);
          return;
        }
      }
    };

    checkAuth();
  }, []);

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return;

    try {
      const response = await authService.getCurrentUser(accessToken);
      const userData = response.data;
      
      setUser({
        user_id: userData.user_id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      });
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Clear auth if we can't get user data
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (googleToken: string) => {
    setIsLoading(true);
    
    try {
      const response = await authService.googleLogin(googleToken);
      
      // Save tokens
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      
      // Set user data
      const userData = {
        user_id: response.data.user_id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Redirect based on role
      navigate(getRouteByRole(userData.role));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        await authService.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      setUser(null);
      setIsAuthenticated(false);
      setTokenExpired(false);
      setIsLoading(false);
      
      navigate('/login');
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    const refreshTokenValue = localStorage.getItem('refresh_token');
    
    if (!refreshTokenValue) {
      return false;
    }
    
    try {
      const response = await authService.refreshToken(refreshTokenValue);
      
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      setUser(null);
      setIsAuthenticated(false);
      
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};