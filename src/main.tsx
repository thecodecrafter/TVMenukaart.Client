import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ApiEndpointContextProvider } from "./context/useApiEndpointContext";
import { CurrentUserContextProvider } from "./context/useCurrentUserContext";
import { Provider as AuthProvider } from "./context/authContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiEndpointContextProvider value={import.meta.env.VITE_baseApiUrl}>
      <CurrentUserContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CurrentUserContextProvider>
    </ApiEndpointContextProvider>
  </StrictMode>
);
