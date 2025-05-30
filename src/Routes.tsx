import { createBrowserRouter } from "react-router-dom";

import { EditRestaurantPage } from "./pages/admin/Restaurant/EditRestaurantPage";
import { AddRestaurantPage } from "./pages/admin/Restaurant/AddRestaurantPage";
import { RestaurantsPage } from "./pages/admin/Restaurant/RestaurantsPage";
import { EditMenuPage } from "./pages/admin/Menu/EditMenuPage";
import { AddMenuPage } from "./pages/admin/Menu/AddMenuPage";
import { ProfilePage } from "./pages/admin/ProfilePage";
import { AdminPage } from "./pages/admin/AdminPage";
import { RegisterPage } from "./pages/RegisterPage";
import { VerifyPage } from "./pages/VerifyPage";
import { MenusPage } from "./pages/MenusPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/admin/",
        element: <AdminPage />,
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
        path: "verify",
        element: <VerifyPage />,
      },
    ],
  },
]);
