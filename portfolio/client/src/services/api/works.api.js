import apiClient from "./apiClient";

export const getWorks = () =>
  apiClient.get("/works").then((r) => r.data.data);

export const getWorkById = (id) =>
  apiClient.get(`/works/${id}`).then((r) => r.data.data);

export const createWork = (data) =>
  apiClient.post("/works", data).then((r) => r.data.data);

export const updateWork = (id, data) =>
  apiClient.put(`/works/${id}`, data).then((r) => r.data.data);

export const deleteWork = (id) =>
  apiClient.delete(`/works/${id}`).then((r) => r.data);
