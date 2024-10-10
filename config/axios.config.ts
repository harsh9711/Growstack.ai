import { API_URL } from "@/lib/api";
import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 600000,
});
// just to deploy
instance.interceptors.request.use(
  (config) => {
    var token = getCookie("token");
    config.headers["platform"] = "web";
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    // console.log(res);
    return res
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);


export default instance;
