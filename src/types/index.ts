// User types
export interface User {
    user_id: string;
    name: string;
    email: string;
    sex?: 'male' | 'female' | 'other';
    birthdate?: string;
    created_at?: string;
    role?: string;
  }
  
  // API response types
  export interface ApiResponse<T = any> {
    status: string;
    data: T;
  }
  
  export interface ErrorResponse {
    status: string;
    error: {
      code: string;
      message: string;
    };
  }
  
  // Auth response types
  export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }
  
  export interface GoogleAuthResponse extends TokenResponse {
    user_id: string;
    name: string;
    email: string;
    sex?: 'male' | 'female' | 'other';
    birthdate?: string;
    created_at: string;
    role?: string;
  }
  
  export interface VerifyTokenResponse {
    valid: boolean;
    user_id?: string;
    expires_in?: number;
  }