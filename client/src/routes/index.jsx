import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/Register";
import CheckEmailPage from "../pages/CheckEmail";
import CheckPasswordPage from "../pages/CheckPassword";
import HomePage from "../pages/Home";
import MessagePage from "../pages/Message";
import AuthLayout from "../layout/AuthLayout";
import { ForgotPasswordPage } from "../pages/ForgotPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
      {
        path: "/register",
        element: <AuthLayout><RegisterPage /></AuthLayout>,
      },
      {
        path: "/email",
        element: <AuthLayout><CheckEmailPage /></AuthLayout>,
      },
      {
        path: "/password",
        element: <AuthLayout><CheckPasswordPage /></AuthLayout>,
      },
      {
        path: "/forgot-password",
        element: <AuthLayout><ForgotPasswordPage /></AuthLayout>,
      },
    ],
  },
]);

export default router;