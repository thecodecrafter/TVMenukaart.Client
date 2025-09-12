import { UserDomainModel } from "../domain/UserDomainModel";
import api from "./api";

let isInterceptorSet = false;

export const setupInterceptors = (context: {
  getToken: () => string | null;
  setToken: (token: string) => void;
  setUser: (user: UserDomainModel) => void;
  logout: () => void;
}) => {
  if (isInterceptorSet) return;
  isInterceptorSet = true;

  api.interceptors.request.use(config => {
    console.log("[Interceptor request] Request triggered:", config.url);
    const token = context.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    response => {
      console.log("[Interceptor] Request triggered:", response);
      return response;
    },
    async error => {
      console.log("[Interceptor response] Error in response occurred");
      const originalRequest = error.config as typeof error.config & {
        _retry?: boolean;
      };

      if (
        error.config.url?.includes("/account/refreshToken") ||
        originalRequest._retry
      ) {
        console.log("Not retrying...");
        return Promise.reject(error); // Don't retry
      }

      if (error.response?.status === 401) {
        console.log(
          "[Interceptor response] Error response status is ",
          error.response.status
        );
        originalRequest._retry = true;

        try {
          const res = await api.post("/api/account/refreshToken", null, {
            withCredentials: true,
          }); // Cookie-based

          console.log("[Interceptor response] Response of refreshToken: ", res);
          const newToken = res.data.token;

          console.log("New token from refresh: ", newToken);

          console.log("Just before setting token in context...");
          context.setToken(newToken);
          console.log("After setting token in context...");

          context.setUser(
            new UserDomainModel(
              res.data.user.id,
              res.data.user.username,
              res.data.user.email,
              newToken
            )
          );

          localStorage.setItem("token", newToken);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          console.log("TOKEN IN RETRY:", context.getToken());
          if (!originalRequest.headers) {
            console.log("Clearing headers...");
            originalRequest.headers = {};
          }
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return api(originalRequest);
        } catch {
          // context.logout();
          context.setToken("");
        }
      }

      return Promise.reject(error);
    }
  );
};
