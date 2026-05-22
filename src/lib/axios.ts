import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

export const customInstace = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// --- interceptor para peticiones -----
customInstace.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("access");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
//------ interceptor para refresh de session-----
customInstace.interceptors.response.use(
  (res) => res, // si la respuesta esta correcta el flujo continua
  async (error) => {
    const originalRequest = error.config;
    // si el servidor da una respuesta 401 && no se ha reintentado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          throw new Error(
            "no hay token de refresh necesario iniciar sesion otra vez",
          );
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );
        const newAccessToken = response.data.access;
        localStorage.setItem('access',newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return customInstace(originalRequest)
      } catch (error) {
        console.error(error, "tokens expirados");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
  },
);

export const customAxios = async <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  try {
    const res = await customInstace(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("error en el Axios customizado");
  }
};
