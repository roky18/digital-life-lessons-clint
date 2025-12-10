import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Upgrade from "../Pages/Upgrade";
import Error from "../Pages/Share/Error";
import PrivateRoute from "./PrivateRoute";
import AddLesson from "../Pages/AddLesson";
import MyLessons from "../Pages/MyLessons";
import PublicLessons from "../Pages/PublicLessons";
import DashboardLayout from "../Layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "public-lessons",
        Component: PublicLessons,
      },
      {
        path: "upgrade",
        element: (
          <PrivateRoute>
            <Upgrade></Upgrade>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-lessons",
        Component: MyLessons,
      },
      {
        path: "add-lessons",
        Component: AddLesson,
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
]);
