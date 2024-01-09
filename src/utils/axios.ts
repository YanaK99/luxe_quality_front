import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    // @ts-ignore
    const errorMessage = error.response?.data?.message || "Request failed";
    return Promise.reject(errorMessage);
  },
);

axiosInstance.interceptors.request.use((config) => {
  const params = {
    ...config.params,
  };
  config.params = params;
  return config;
});

export default axiosInstance;
