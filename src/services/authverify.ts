import { jwtDecode } from "jwt-decode";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

import { getSessionsStorage, setSessionsStorage } from "./storage";
import { Logout } from "../core/util/logout";

const apiBaseURL: string = import.meta.env.VITE_APP_API_URL;

const authVerify = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const token = getSessionsStorage("token");
  if (token) {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - currentTime;

    if (timeLeft <= 900) {
      try {
        const { data }: { data: { token: string } } = await axios.put(`${apiBaseURL}retoken`, "", {
          headers: { Authorization: token },
        });
        setSessionsStorage("token", data.token);
        config.headers = { ...config.headers, Authorization: data.token };
      } catch (error) {
        console.error("Token refresh failed", error);
        Logout();
        return Promise.reject(error);
      }
    } else {
      config.headers = { ...config.headers, Authorization: token };
    }
  }

  return config;
};

export default authVerify;