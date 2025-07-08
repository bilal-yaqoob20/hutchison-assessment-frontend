import axios from "axios";
import type { IDog } from "./interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const defaultConfig = {
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
};

const apiClient = axios.create(defaultConfig);
const authClient = axios.create(defaultConfig);

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export const getDogs = async (limit: number, offset: number) =>
  (
    await apiClient.get("/dogs", {
      params: { limit, offset },
    })
  ).data;

export const createDog = async (dog: IDog) =>
  (await apiClient.post("/dogs", dog)).data;

export const deleteDog = async (id: string) =>
  (await apiClient.delete(`/dogs/${id}`)).data;

export const updateDog = async (id: string, subBreeds: string[]) =>
  (await apiClient.put(`/dogs/${id}`, { subBreeds })).data;

export const registerUser = async (email: string, password: string) =>
  (await authClient.post("/auth/register", { email, password })).data;

export const loginUser = async (email: string, password: string) =>
  (await authClient.post("/auth/login", { email, password })).data;
