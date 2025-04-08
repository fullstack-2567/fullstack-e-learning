import { Content } from "@/components/admin/ContentManagement";
import { ApiResponse, ErrorResponse, TokenResponse, User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generic API request with improved type safety
export const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string
): Promise<ApiResponse<T>> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization token if provided
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: "include",
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
        data: data as ErrorResponse,
      };
    }

    return data as ApiResponse<T>;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw {
        status: 0,
        data: {
          status: "error",
          error: {
            code: "NETWORK_ERROR",
            message: "Unable to connect to the server",
          },
        } as ErrorResponse,
      };
    }
    throw error;
  }
};

// Auth services with better type definitions
export const authService = {
  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return apiRequest<User>("/auth/me", "GET");
  },

  logout: (): Promise<ApiResponse<{ success: boolean }>> => {
    return apiRequest<{ success: boolean }>("/auth/logout", "POST");
  },

  refreshToken: (): Promise<ApiResponse<TokenResponse>> => {
    return apiRequest<TokenResponse>("/auth/refresh", "POST");
  },

  googleLogin: (): Promise<ApiResponse<any>> => {
    return apiRequest("/auth/google/login", "GET"); // หรือเปลี่ยนชื่อ method ได้ตาม backend
  },
};

export const contentService = {
  createNewContent: (content: Content): Promise<ApiResponse> => {
    return apiRequest("/content/create", "POST", content);
  },
  getAllContents: (): Promise<any> => {
    return apiRequest("/content", "GET");
  },
  updateContent: (content: Content): Promise<ApiResponse> => {
    return apiRequest(`/content/${content.contentId}`, "PUT", content);
  },
  deleteContent: (id: string): Promise<ApiResponse> => {
    return apiRequest(`/content/${id}`, "DELETE");
  },
  getContentById: (id: string): Promise<any> => {
    return apiRequest<any>(`/content/${id}`, "GET");
  },
};
