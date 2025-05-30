import { RouterProvider } from "react-router-dom";
import { ApiEndpointContextProvider } from "./context/useApiEndpointContext";
import { CurrentUserContextProvider } from "./context/useCurrentUserContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { router } from "./Routes";

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
};

export const App = () => {
  return (
    <ApiEndpointContextProvider value={import.meta.env.VITE_baseApiUrl}>
      <CurrentUserContextProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </CurrentUserContextProvider>
    </ApiEndpointContextProvider>
  );
};
