// src/services/contentService.ts
import axios from 'axios';

// Types ตามโครงสร้าง API
export interface Content {
  id: string;
  contentTitle: string;
  contentDescription: string;
  contentCategory: string;
  contentVideo: string; // base64 encoded video
  contentThumbnail: string; // base64 encoded thumbnail
  createdDT: string;
}

export interface CreateContentDto {
  contentTitle: string;
  contentDescription: string;
  contentCategory: string;
  contentVideo: string;
  contentThumbnail: string;
}

// API base URL - ควรดึงจาก environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// สร้าง Axios instance พร้อมกับ config พื้นฐาน
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor สำหรับเพิ่ม token ในทุก request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Content Service API
export const contentService = {
  // ดึงรายการคอร์สทั้งหมด
  getAllContents: async (): Promise<Content[]> => {
    try {
      const response = await apiClient.get('/contents');
      return response.data;
    } catch (error) {
      console.error('Error fetching contents:', error);
      throw error;
    }
  },

  // ดึงคอร์สตาม ID
  getContentById: async (id: string): Promise<Content> => {
    try {
      const response = await apiClient.get(`/contents/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching content with id ${id}:`, error);
      throw error;
    }
  },

  // สร้างคอร์สใหม่
  createContent: async (content: CreateContentDto): Promise<Content> => {
    try {
      const response = await apiClient.post('/contents', content);
      return response.data;
    } catch (error) {
      console.error('Error creating content:', error);
      throw error;
    }
  },

  // อัพเดทคอร์ส
  updateContent: async (id: string, content: Partial<Content>): Promise<Content> => {
    try {
      const response = await apiClient.put(`/contents/${id}`, content);
      return response.data;
    } catch (error) {
      console.error(`Error updating content with id ${id}:`, error);
      throw error;
    }
  },

  // ลบคอร์ส
  deleteContent: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/contents/${id}`);
    } catch (error) {
      console.error(`Error deleting content with id ${id}:`, error);
      throw error;
    }
  },

  // ค้นหาคอร์ส
  searchContents: async (query: string): Promise<Content[]> => {
    try {
      const response = await apiClient.get(`/contents/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching contents with query ${query}:`, error);
      throw error;
    }
  },

  // ดึงคอร์สตามหมวดหมู่
  getContentsByCategory: async (category: string): Promise<Content[]> => {
    try {
      const response = await apiClient.get(`/contents/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contents with category ${category}:`, error);
      throw error;
    }
  },
};

export default contentService;