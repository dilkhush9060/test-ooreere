// import {AuthStore} from "@/store/auth";
import axios from "axios";
export const Api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

Api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    // const logout = AuthStore((state) => state.logout);
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          {withCredentials: true}
        );
        return Api.request(originalRequest);
      } catch {
        await localStorage.clear();
        window.location.href = "/signin";

        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signout`,
          {},
          {
            withCredentials: true,
          }
        );
      }
    }
    throw error;
  }
);
