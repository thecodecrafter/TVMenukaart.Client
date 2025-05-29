import { createContext, useContext, useState } from "react";
import { AccountService } from "../service/AccountService";
import { UserDomainModel } from "../domain/UserDomainModel";

interface AuthContextProps {
  user: UserDomainModel;
  token: string | null;
  login: (username, password) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }) => {
  const accountService = new AccountService(import.meta.env.VITE_baseApiUrl);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") ?? "{}")
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = async (username, password) => {
    const response = await accountService.login(username, password);

    console.log(response);
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

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
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
