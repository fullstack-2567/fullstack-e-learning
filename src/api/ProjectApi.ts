import { Project, SubmitProjectDto } from "@/utils/backend-openapi";
import { client } from "@/utils/api-client";

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

export const getProject = async (id: string) => {
  try {
    const response = await client.get<Project>(`projects/${id}`);

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

export const updateProjectStatus = async (
  projectId: string,
  action: "approve" | "reject"
) => {
  try {
    const response = await client.patch<Project>(
      `/projects/${projectId}/status`,
      {
        action: action,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};
