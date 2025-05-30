// service/setupAxiosInterceptors.ts
import axios from "./api";
import { UserDomainModel } from "../domain/UserDomainModel";

// This function accepts logout, setToken, etc. from AuthContext
export const setupInterceptors = (context: {
  getToken: () => string | null;
  setToken: (token: string) => void;
  setUser: (user: UserDomainModel) => void;
  logout: () => void;
}) => {
  axios.interceptors.request.use((config) => {
    const token = context.getToken();
    console.log("Attaching token to request:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as typeof error.config & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await axios.post("/api/account/refreshToken"); // Cookie-based

          console.log("RES: ", res);
          const newToken = res.data.token;
          const user = new UserDomainModel(
            res.data.user.id,
            res.data.user.username,
            res.data.user.email,
            newToken
          );

          console.log("newToken", newToken);
          context.setToken(newToken);
          context.setUser(user);
          localStorage.setItem("token", newToken);
          localStorage.setItem("user", JSON.stringify(user));
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
