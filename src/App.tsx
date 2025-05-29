import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkAuthLoader } from "./utils/auth";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/admin/ProfilePage";
import { AdminPage } from "./pages/admin/AdminPage";
import { MenusPage } from "./pages/admin/Menu/MenusPage";
import { EditMenuPage } from "./pages/admin/Menu/EditMenuPage";
import { RestaurantsPage } from "./pages/admin/Restaurant/RestaurantsPage";
import { EditRestaurantPage } from "./pages/admin/Restaurant/EditRestaurantPage";
import { VerifyPage } from "./pages/VerifyPage";
import { AddRestaurantPage } from "./pages/admin/Restaurant/AddRestaurantPage";
import { AddMenuPage } from "./pages/admin/Menu/AddMenuPage";
import MenuPage from "./pages/MenuPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ApiEndpointContextProvider } from "./context/useApiEndpointContext";
import { CurrentUserContextProvider } from "./context/useCurrentUserContext";
// import { Provider as AuthProvider } from "./context/authContext2";
import { AuthProvider } from "./context/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/admin/",
        element: <AdminPage />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "restaurants",
            element: <RestaurantsPage />,
          },
          {
            path: "restaurants/add",
            element: <AddRestaurantPage />,
          },
          {
            path: "restaurants/:restaurantId/edit",
            element: <EditRestaurantPage />,
          },
          {
            path: "restaurants/:restaurantId",
            element: <MenusPage />,
          },
          {
            path: "restaurants/:restaurantId/menus/add",
            element: <AddMenuPage />,
          },
          {
            path: "menus/:menuId/edit",
            element: <EditMenuPage />,
          },
          {
            path: "menus/:menuId",
            element: <MenuPage />,
          },
        ],
      },
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        loader: checkAuthLoader,
        path: "verify",
        // Component: () => <VerifyPage />
        element: <VerifyPage />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <>
      <ApiEndpointContextProvider value={import.meta.env.VITE_baseApiUrl}>
        <CurrentUserContextProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </CurrentUserContextProvider>
      </ApiEndpointContextProvider>
      {/* <ApiEndpointContextProvider value={import.meta.env.VITE_baseApiUrl}>
       <CurrentUserContextProvider>
         <AuthProvider>
           <App ref={(navigator) => setNavigator(navigator)} />
        </AuthProvider>
      </CurrentUserContextProvider>
    </ApiEndpointContextProvider> */}
    </>
  );

  //<RouterProvider router={router} />;
};
