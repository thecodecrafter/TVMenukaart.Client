import { AuthForm } from "../components/forms/AuthForm";
import { useContext } from "react";
import { Context as AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const LoginContainer = () => {
  const { signin, state } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    await signin({ username, password }, navigate);
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center h-full">
      <h1>TV Menukaart</h1>
      <AuthForm login={handleLogin} />
      <h2>{state.errorMessage}</h2>
    </div>
  );
};
