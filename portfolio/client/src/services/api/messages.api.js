import apiClient from "./apiClient";

export const sendMessage = (data) =>
  apiClient.post("/messages", data).then((r) => r.data);

export const getMessages = (params = {}) =>
  apiClient.get("/messages", { params }).then((r) => r.data.data);

export const getMessageById = (id) =>
  apiClient.get(`/messages/${id}`).then((r) => r.data.data);

export const markMessageAsRead = (id) =>
  apiClient.patch(`/messages/${id}/read`).then((r) => r.data.data);

export const deleteMessage = (id) =>
  apiClient.delete(`/messages/${id}`).then((r) => r.data);
