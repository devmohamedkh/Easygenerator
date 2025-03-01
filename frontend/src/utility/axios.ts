import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { AuthURLs } from "./apiUrls";
import { Cookies } from "react-cookie"; 

const cookies = new Cookies();

const axiosInstance: AxiosInstance = axios.create({
    baseURL: String(import.meta.env.VITE_API_BASE_URL), 
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, 
  async (error: any) => {

    if (error.response ) {
      const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== AuthURLs.refreshToken) {
        originalRequest._retry = true;

        try {
         await axiosInstance.post(AuthURLs.refreshToken, {});

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          originalRequest._retry = false; 
          cookies.remove('ud')
          const navigate = useNavigate();
          navigate("/signin");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
