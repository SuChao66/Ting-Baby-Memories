// 导入 axios
import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

/** 统一响应数据结构 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** 创建 axios 实例 */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/** 请求拦截器：添加 token */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/** 响应拦截器：统一处理错误 */
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;
    // 业务逻辑错误
    if (res.code !== 0 && res.code !== 200) {
      console.error(`[API Error] ${res.message}`);
      // token 过期或未授权
      if (res.code === 401) {
        localStorage.removeItem("token");
        window.location.hash = "#/login";
      }
      return Promise.reject(new Error(res.message || "请求失败"));
    }
    return response;
  },
  (error) => {
    // HTTP 错误
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.hash = "#/login";
    } else if (status === 500) {
      console.error("[API Error] 服务器内部错误");
    } else if (error.code === "ECONNABORTED") {
      console.error("[API Error] 请求超时");
    }
    return Promise.reject(error);
  },
);

/** GET 请求 */
export function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return instance.get(url, { params, ...config }).then((res) => res.data);
}

/** POST 请求 */
export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return instance.post(url, data, config).then((res) => res.data);
}

/** PUT 请求 */
export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return instance.put(url, data, config).then((res) => res.data);
}

/** DELETE 请求 */
export function del<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return instance.delete(url, { params, ...config }).then((res) => res.data);
}

export default instance;
