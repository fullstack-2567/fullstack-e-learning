import { client } from "@/utils/api-client";

// Base response interface
interface ApiResponse<T> {
  status: string;
  data: T;
}

// Dashboard Summary interfaces
export interface LoginCountData {
  lastMonth: number;
  thisMonth: number;
}

export interface EnrollCountData {
  lastMonth: number;
  thisMonth: number;
}

export interface DashboardSummaryData {
  loginCount: LoginCountData;
  enrollCount: EnrollCountData;
}

export type DashboardSummary = ApiResponse<DashboardSummaryData>;

// Monthly Traffic interfaces
export interface DayData {
  day: number;
  loginCount: number;
  enrollmentCount: number;
}

export interface MonthlyTrafficData {
  days: DayData[];
}

export type MonthlyTraffic = ApiResponse<MonthlyTrafficData>;

// Content Categories interfaces
export interface CategoryData {
  category: string;
  contentCount: number;
}

export interface ContentCategoriesData {
  categories: CategoryData[];
}

export interface CategoryDataWithColor extends CategoryData {
  color: string;
}

export type ContentCategories = ApiResponse<ContentCategoriesData>;

// Popular Contents interfaces
export interface CourseData {
  contentId: string;
  contentName: string;
  enrollmentCount: number;
}

export interface PopularContentsData {
  courses: CourseData[];
}

export type PopularContents = ApiResponse<PopularContentsData>;

// Month option interface for dropdown
export interface MonthOption {
  value: string;
  label: string;
}

// Projects interfaces
export interface ProjectCountData {
  lastMonth: number;
  thisMonth: number;
}

export interface ProjectSummaryData {
  pending_projects: ProjectCountData;
  total_projects: ProjectCountData;
  rejected_projects: ProjectCountData;
}

export interface ProjectTypeData {
  type: string;
  count: number;
}

export interface ProjectStatusData {
  pending_first_approval: number;
  first_approved: number;
  second_approved: number;
  third_approved: number;
  rejected: number;
}

export interface SdgTypeData {
  sdg: string;
  count: number;
}

export interface ChildProjectsData {
  normal: number;
  child: number;
}

export interface ProjectsDashboardData {
  summary: ProjectSummaryData;
  popular_project_types: ProjectTypeData[];
  project_status: ProjectStatusData;
  popular_sdg_types: SdgTypeData[];
  child_projects: ChildProjectsData;
}

export type ProjectsDashboard = ApiResponse<ProjectsDashboardData>;

// API client functions
export const getDashboardSummary = async (month: string): Promise<DashboardSummary> => {
  const response = await client.get(`/dashboard/summary`, {
    params: { month }
  });
  return response.data;
};

export const getMonthlyTraffic = async (month: string): Promise<MonthlyTraffic> => {
  const response = await client.get(`/dashboard/monthly-traffic`, {
    params: { month }
  });
  return response.data;
};

export const getContentCategories = async (month: string): Promise<ContentCategories> => {
  const response = await client.get(`/dashboard/content-categories`, {
    params: { month }
  });
  return response.data;
};

export const getPopularContents = async (month: string, limit: number = 5): Promise<PopularContents> => {
  const response = await client.get(`/dashboard/popular-contents`, {
    params: { month, limit }
  });
  return response.data;
};

export const getProjectsDashboard = async (month: string): Promise<ProjectsDashboard> => {
  const response = await client.get(`/dashboard/projects`, {
    params: { month }
  });
  return response.data;
};