import apiClient from "./apiClient";

export const getExperiences = async () => {
  const response = await apiClient.get("/experience");
  return response.data;
};

export const createExperience = async (data) => {
  const response = await apiClient.post("/experience", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateExperience = async (id, data) => {
  const response = await apiClient.put(`/experience/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await apiClient.delete(`/experience/${id}`);
  return response.data;
};
