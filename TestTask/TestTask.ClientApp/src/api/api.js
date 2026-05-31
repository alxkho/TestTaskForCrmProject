import axios from "axios";

export const api = axios.create({
    baseURL: `http://${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
);
