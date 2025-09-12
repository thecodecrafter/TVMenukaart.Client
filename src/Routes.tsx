import { createBrowserRouter } from "react-router-dom";

import {
  AddMenuPage,
  AdminPage,
  EditMenuPage,
  LoginPage,
  MenuPage,
  MenusPage,
  ProfilePage,
  RegisterPage,
  RestaurantsPage,
  TVPreviewPage,
  VerifyPage,
} from "./pages";
import {
  AddRestaurantPage,
  EditRestaurantPage,
} from "./pages/admin/Restaurant";

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
          {
            path: "menus/:menuId/tv-preview",
            element: <TVPreviewPage />,
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
