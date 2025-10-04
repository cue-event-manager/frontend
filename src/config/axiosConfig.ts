import axios, { type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/utils/token";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: API_URL ?? 'http://localhost:8080',
    withCredentials: true,
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};

    config.headers["Content-Type"] = "application/json";
    config.headers["Timezone-Val"] =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

    const token = getAccessToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.withCredentials = true;
    }

    return config;
};

axiosInstance.interceptors.request.use(authRequestInterceptor);

export default axiosInstance;
