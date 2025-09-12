import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

  // <StrictMode>
  //   <ApiEndpointContextProvider value={import.meta.env.VITE_baseApiUrl}>
  //     <CurrentUserContextProvider>
  //       <AuthProvider>
  //         <App ref={(navigator) => setNavigator(navigator)} />
  //       </AuthProvider>
  //     </CurrentUserContextProvider>
  //   </ApiEndpointContextProvider>
  // </StrictMode>
);
