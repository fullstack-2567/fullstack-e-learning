import client from "@/utils/api-client";

export const getUsersReport = async () => {
  const response = await client.get("/reports/users");
  return response.data;
};

export const getContentsReport = async () => {
  const response = await client.get("/reports/contents");
  return response.data;
};

export const getProjectsReport = async () => {
  const response = await client.get("/reports/projects");
  return response.data;
};
