
import { Project, SubmitProjectDto } from "@/utils/backend-openapi";
import axios from "axios";

export const createProject = async (projectData: SubmitProjectDto) => {
    try {
        const response = await axios.post<Project>(`${import.meta.env.VITE_END_POINT}/projects/submit`, projectData);
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
}

export const getAllProject = async () => {
    try {
        const response = await axios.get<Project[]>(`${import.meta.env.VITE_END_POINT}/projects`);
        console.log("Fetched projects:", response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}

export const updateProjectStatus = async (projectId: number)=> {
    try {
        const response = await axios.post<Project>(`${import.meta.env.VITE_END_POINT}/projects/${projectId}/update-status`, {});
        return response.data;
    } catch (error) {
        console.error("Error updating project status:", error);
        throw error;
    }
}