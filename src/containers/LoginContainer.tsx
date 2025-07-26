import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { AuthForm } from "../components/forms/AuthForm";
import { useAuth } from "../context/AuthContext";
import { ClientHelper } from "../utils/ClientHelper";

export const LoginContainer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (username: string, password: string) => {
    setError("");
    setIsLoading(true);
    
    try {
      await login(username, password);
      navigate("/admin/restaurants");
    } catch (error) {
      
      const errorMessage = ClientHelper.getErrorMessage(error);
      console.log("ERROR222: ", errorMessage);
      setError(errorMessage);
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center h-full">
      <h1>TV Menukaart</h1>
      <AuthForm login={handleLogin} />
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="mt-4 text-blue-600">
          Inloggen...
        </div>
      )}
    </div>
  );
};
