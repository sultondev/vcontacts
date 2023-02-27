import axios, { AxiosRequestConfig, AxiosError } from "axios";

const _BASE_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const authProtectedApi = axios.create({
  ..._BASE_CONFIG,
  headers: {
    ..._BASE_CONFIG.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const publicApi = axios.create({ ..._BASE_CONFIG });

authProtectedApi.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error: any) {
    if (error?.response.status === 403 || error?.response.status === 401) {
      localStorage.removeItem("token");
      location.reload();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // console.log("interceptor request error");
    return Promise.reject(error);
  }
);
export { publicApi, authProtectedApi };
