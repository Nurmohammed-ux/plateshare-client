import { createBrowserRouter } from "react-router";
import Home from "../layouts/Home/Home";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AvailableFoods from "../layouts/AvailableFoods/AvailableFoods";
import AddFood from "../components/AddFood/AddFood";
import PrivateRoute from "./PrivateRoute";
import ManageMyFoods from "../components/ManageMyFoods/ManageMyFoods";
import UpdateFood from "../components/UpdateFood/UpdateFood";
import Error from "../components/Error/Error";
import FoodDetails from "../components/FoodDetails/FoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/availableFoods", element: <AvailableFoods /> },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manageMyFoods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
