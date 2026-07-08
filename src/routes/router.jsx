import { createBrowserRouter } from "react-router";
import Home from "../layouts/Home/Home";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AvailableFoods from "../layouts/AvailableFoods/AvailableFoods";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/availableFoods", element: <AvailableFoods /> },
    ],
  },
]);

export default router;
