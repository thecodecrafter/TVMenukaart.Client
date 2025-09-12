import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { AccountService } from "../service/AccountService";
import api from "../service/api";

// import { UserDomainModel } from "../domain/UserDomainModel";

interface AuthContextProps {
  // user: UserDomainModel | null;
  token: string | null;
  login: (username, password) => Promise<void>;
  logout: () => void;
  // loading: boolean;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const accountService = new AccountService(import.meta.env.VITE_baseApiUrl);
  // const [user, setUser] = useState<UserDomainModel | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setToken(localStorage.getItem("token"));

        console.log("APP REFRESH??");
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(config => {
      console.log("[Interceptor request] Request triggered:", config.url);

      const originalRequest = config as typeof config & {
        _retry?: boolean;
      };

      console.log("RETRY: ", originalRequest._retry);

      console.log(token);
      if (!originalRequest._retry && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      response => response,
      async error => {
        console.log("[Interceptor response] Response:", error.url);
        const originalRequest = error.config as typeof error.config & {
          _retry?: boolean;
        };

        if (
          error.config.url?.includes("/account/refreshToken") ||
          originalRequest._retry
        ) {
          console.log("NOT GOING TO RETRY");
          return Promise.reject(error);
        }

        if (error.response.status === 401) {
          try {
            const response = await accountService.refreshToken();

            console.log("NEW TOKEN AFTER REFRESH IS SET");
            setToken(response.token);
            localStorage.setItem("token", response.token);

            originalRequest.headers.Authorization = `Bearer ${response.token}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  });

  // useEffect(() => {
  //   tokenRef.current = token;
  // }, [token]);

  // const setTokenAndRef = (newToken: string | null) => {
  //   console.log("Setting token and ref: ", newToken);
  //   tokenRef.current = newToken;
  //   setToken(newToken);
  // };

  const login = async (username, password) => {
    try {
      const response = await accountService.login(username, password);

      setToken(response.token);

      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.log("ERROR: ", error);
      setToken(null);
      throw error; // Re-throw the error so the calling code can handle it
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (storedToken && storedUser) {
  //     setToken(storedToken);
  //     setUser(JSON.parse(storedUser));
  //   }

  //   setupInterceptors({
  //     getToken: () => tokenRef.current,
  //     setToken: setTokenAndRef,
  //     setUser,
  //     logout,
  //   });

  //   setLoading(false);
  // }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
