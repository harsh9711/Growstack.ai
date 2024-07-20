import { API_URL } from "@/lib/api";
import axios from "axios";

const instance = axios.create({
  baseURL: API_URL,
  // withCredentials: true, // TODO: uncomment this line when cors origins are configured
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
