import { createContext, useContext, useEffect, useState } from "react";
import { AccountService } from "../service/AccountService";
import { UserDomainModel } from "../domain/UserDomainModel";
import { setupInterceptors } from "../service/setupAxiosInterceptors";

interface AuthContextProps {
  user: UserDomainModel | null;
  token: string | null;
  login: (username, password) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }) => {
  const accountService = new AccountService(import.meta.env.VITE_baseApiUrl);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDomainModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setupInterceptors({
      getToken: () => localStorage.getItem("token"),
      setToken,
      setUser,
      logout,
    });
  }, []);

  const login = async (username, password) => {
    const response = await accountService.login(username, password);

    setUser(response);
    setToken(response.token);

    localStorage.setItem("user", JSON.stringify(response));
    localStorage.setItem("token", response.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
