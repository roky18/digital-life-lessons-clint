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
import Payment from "../Pages/Payment";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel";
import LessonDetails from "../Pages/LessonDetails";
import UpdateLessons from "../Pages/UpdateLessons";
import Profile from "../Pages/Profile";
import AuthorInfo from "../Pages/AuthorInfo";
import DHome from "../Dashboard/DHome";

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
        path: "lesson-details/:id",
        element: (
          <PrivateRoute>
            <LessonDetails></LessonDetails>
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
        index: true,
        Component: DHome,
      },
      {
        path: "my-lessons",
        Component: MyLessons,
      },
      {
        path: "profile/:email",
        Component: Profile,
      },
      {
        path: "author/:email",
        Component: AuthorInfo,
      },
      {
        path: "add-lessons",
        Component: AddLesson,
      },
      {
        path: "my-lessons/update-lesson/:id",
        Component: UpdateLessons,
      },
      {
        path: "payment",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-canceled",
        Component: PaymentCancel,
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
]);
