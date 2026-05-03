import apiClient from "./apiClient";

export const getProjects = (params = {}) =>
  apiClient.get("/projects", { params }).then((r) => r.data.data);

export const getProjectById = (id) =>
  apiClient.get(`/projects/${id}`).then((r) => r.data.data);

export const createProject = (formData) =>
  apiClient
    .post("/projects", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((r) => r.data.data);

export const updateProject = (id, formData) =>
  apiClient
    .put(`/projects/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((r) => r.data.data);

export const deleteProject = (id) =>
  apiClient.delete(`/projects/${id}`).then((r) => r.data);
