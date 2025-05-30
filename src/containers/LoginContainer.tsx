import { useNavigate } from "react-router-dom";

import { AuthForm } from "../components/forms/AuthForm";
import { useAuth } from "../context/AuthContext";

export const LoginContainer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    await login(username, password);
    navigate("/admin/restaurants");
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center h-full">
      <h1>TV Menukaart</h1>
      <AuthForm login={handleLogin} />
    </div>
  );
};
