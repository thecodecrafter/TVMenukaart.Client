import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ApiEndpointContextProvider } from "./context/useApiEndpointContext";
import { router } from "./Routes";

const AppContent = () => {
  // const { loading } = useAuth();

  // if (loading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
};

export const App = () => {
  return (
    <ApiEndpointContextProvider value={import.meta.env.VITE_baseApiUrl}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ApiEndpointContextProvider>
  );
};
