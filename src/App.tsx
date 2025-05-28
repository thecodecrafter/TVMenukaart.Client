import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RootPage } from "./pages/RootPage";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "menus/:uuId?",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/admin/",
    element: <AdminPage />,
    loader: checkAuthLoader,
    children: [
      {
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
    element: <VerifyPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
