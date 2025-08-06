import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";
import authVerify from "./authverify";

const apiBaseURL = import.meta.env.VITE_APP_API_URL as string;
const apiJobAndAsset = import.meta.env
  .VITE_APP_API_BASE_URL_JOBASSET as string;

const instance: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    const newConfig = await authVerify(config);
    return newConfig as typeof config;
  },
  (error) => Promise.reject(error instanceof Error ? error : new Error(String(error)))
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error instanceof Error ? error : new Error(String(error)))
);


const requestService = async <T = unknown>(
  method: Method,
  url: string,
  data: unknown = {},
  config: AxiosRequestConfig = {},
  isReToken = false
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      method,
      url,
      data: data as T,
      ...config,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;

    if (err?.response?.status === 401 && !isReToken) {
      // const newToken = await resetToken();
      // if (newToken) {
      //   return requestService(method, url, data, config, true);
      // }
    }
    throw err.response?.data
      ? new Error(typeof err.response.data === "string" ? err.response.data : JSON.stringify(err.response.data))
      : err;
  }
};

// Generic typed wrappers
export const getService = <T = unknown>(
  url: string,
  params: Record<string, any> = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return requestService<T>("get", url, { params }, config);
};

export const postService = <T = unknown>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return requestService<T>("post", url, data, config);
};

export const putService = <T = unknown>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return requestService<T>("put", url, data, config);
};

export const deleteService = <T = unknown>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return requestService<T>("delete", url, {}, config);
};
