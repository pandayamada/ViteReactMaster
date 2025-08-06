import axios from "axios";
import { getSessionsStorage, setSessionsStorage } from "./storage";
import { Logout } from "../core/util/logout";
import { HideLoading, ShowLoading } from "../core/LoadingScreen";
import authVerify from "./authverify";

// 👇 type-only imports
import type { AxiosRequestConfig, Method } from "axios";

const apiBaseURL = import.meta.env.VITE_APP_API_URL;
const apiJobAndAsset = import.meta.env.VITE_APP_API_BASE_URL_JOBASSET;

const instance = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

instance.interceptors.request.use(authVerify, (error) => Promise.reject(error));
instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

let refreshInterval: number | null = null;

async function unAuth(): Promise<void> {
  if (refreshInterval !== null) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    Logout();
  }
}

export const resetToken = async (token?: string): Promise<string | void> => {
  const _token = token || getSessionsStorage("token");
  if (!_token) {
    console.error("No token available");
    return unAuth();
  }
  try {
    const response = await instance.put("retoken", "", {
      headers: { Authorization: _token },
    });
    setSessionsStorage("token", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return unAuth();
  }
};

const requestService = async (
  method: Method,
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {},
  isReToken = false
): Promise<any> => {
  try {
    ShowLoading();

    let base = "";
    if (url.includes("api/v2")) {
      base = instance.defaults.baseURL!;
      url = url.replace("api/v2/", "");
    } else if (url.includes("api/mamis")) {
      base = apiJobAndAsset;
      url = url.replace("api/mamis/", "");
    } else {
      base = url.includes("job") || url.includes("asset")
        ? apiJobAndAsset
        : instance.defaults.baseURL!;
    }

    return await instance
      .request({
        baseURL: base,
        method,
        url,
        data,
        ...config,
      })
      .then((res) => res.data);
  } catch (error: any) {
    const responseErr = error?.response;
    if (responseErr?.status === 401 && !isReToken) {
      const newToken = await resetToken();
      if (newToken) {
        return requestService(method, url, data, config, true);
      }
    }
    throw responseErr?.data || error;
  } finally {
    HideLoading();
  }
};

export const getService = (url: string, params: Record<string, any> = {}) =>
  requestService("get", url, { params });

export const postService = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
  requestService("post", url, data, config);

export const putService = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
  requestService("put", url, data, config);

export const deleteService = (url: string, config: AxiosRequestConfig = {}) =>
  requestService("delete", url, {}, config);

export async function startTokenRefreshInterval(): Promise<void> {
  const token = getSessionsStorage("token");
  if (refreshInterval !== null) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
  if (token) {
    refreshInterval = setInterval(async () => {
      try {
        const response = await instance.put("retoken", "", {
          headers: {
            Authorization: token,
          },
        });
        setSessionsStorage("token", response.data.token);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        await unAuth();
      }
    }, 15 * 60 * 1000); // 15 minutes
  }
}

export const getServiceAll = async (queryString = "", outField = ""): Promise<any[]> => {
  const result: any[] = [];
  let offset = 0;
  const limit = 100;
  let isLoop = true;

  try {
    while (isLoop) {
      const paginatedQuery = `${queryString}&offset=${offset}&limit=${limit}`;
      const responsesJob = await getService(paginatedQuery);

      if (responsesJob?.[outField] && responsesJob[outField].length > 0) {
        result.push(...responsesJob[outField]);

        if (responsesJob[outField].length < limit) {
          isLoop = false;
        } else {
          offset += limit;
        }
      } else {
        isLoop = false;
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return result;
};
