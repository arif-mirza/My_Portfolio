import apiClient from "./apiClient";

export const loginAdmin = (credentials) =>
  apiClient.post("/auth/login", credentials).then((r) => r.data.data);

export const registerAdmin = (data) =>
  apiClient.post("/auth/register", data).then((r) => r.data.data);

export const getMe = () =>
  apiClient.get("/auth/me").then((r) => r.data.data);
