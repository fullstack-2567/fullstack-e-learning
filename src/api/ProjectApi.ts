import { Project, SubmitProjectDto } from "@/utils/backend-openapi";
import axios from "axios";
import client from "@/utils/api-client";

export const createProject = async (projectData: SubmitProjectDto) => {
  try {
    const response = await client.post<Project>(`projects/submit`, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getAllProject = async () => {
  try {
    const response = await client.get<Project[]>(`projects`);
    console.log("Fetched projects:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getUserProjects = async () => {
  try {
    const response = await client.get<Project[]>(`projects/user-projects`);
    console.log("Fetched projects:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const updateProjectStatus = async (projectId: number) => {
  try {
    const response = await client.post<Project>(
      `/projects/${projectId}/update-status`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};
