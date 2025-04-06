import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

interface User {
  user_id: string;
  name: string;
  email: string;
  role?: string;
}

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
      localStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user data:', error);
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
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard/project');
      } else if (userData.role === 'approver') {
        navigate('/approver/project-menu');
      } else {
        // Default role is learner
        navigate('/contents');
      }
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
      localStorage.removeItem('user_data');
      
      setUser(null);
      setIsAuthenticated(false);
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
      localStorage.removeItem('user_data');
      
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