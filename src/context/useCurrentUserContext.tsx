import { createContext, useContext, useEffect, useState } from "react";
import { UserDomainModel } from "../domain/UserDomainModel";

interface ICurrentUserContext {
  children: React.ReactNode;
}

type CurrentUserContextType = {
  user: UserDomainModel | null;
  token: string | null;
  // logout: () => void;
  // login: (username: string, password: string) => void;
  // isLoggedIn: () => boolean;
};

const CurrentUserContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

export const useCurrentUserContext = () => useContext(CurrentUserContext);

export const CurrentUserContextProvider = (props: ICurrentUserContext) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDomainModel | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    console.log("usercontext");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }

    setIsReady(true);
  }, []);

  // const isLoggedIn = () => {
  //   return !!user;
  // };

  // const login = async (username: string, password: string) => {
  //   await accountService
  //     .login(username, password)
  //     .then((data) => {
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("user", JSON.stringify(data));
  //       setToken(data.token);
  //       setUser(data);
  //       window.location.href = "/admin/restaurants";
  //     })
  //     // .catch((error) => {
  //     //   console.log("ERRRR: ", error.response.title);
  //     //   throw new Error(error.data);
  //     //   // Promise.reject(error);
  //     // });
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   setToken("");
  // };

  return (
    <CurrentUserContext.Provider value={{ user, token }}>
      {isReady ? props.children : null}
    </CurrentUserContext.Provider>
  );
};
