import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const getRouteByRole = (role?: string): string => {
  if (role === "admin") return "/admin/dashboard/project";
  if (role === "project-approver") return "/approver/project-menu";
  return "/contents"; // default learner
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: number | undefined;

    if (isAuthenticated) {
      interval = window.setInterval(
        () => {
          refreshToken().catch(() => {
            setTokenExpired(true);
          });
        },
        14 * 60 * 1000
      ); // refresh every 14 mins
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (tokenExpired) {
      logout();
    }
  }, [tokenExpired]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.getCurrentUser(); // /me
      const userData = response.data;

      setUser(userData);
      setIsAuthenticated(true);

      if (userData.role === "user") {
        navigate(getRouteByRole(userData.role));
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    setIsLoading(true);
    try {
      await authService.googleLogin(); // trigger server-side OAuth login
      await checkAuth(); // fetch user
      navigate(getRouteByRole(user?.role));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setTokenExpired(false);
      setIsLoading(false);
      navigate("/login");
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      await authService.refreshToken(); // refresh via cookie
      return true;
    } catch (error) {
      console.error("Refresh token failed:", error);
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
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
