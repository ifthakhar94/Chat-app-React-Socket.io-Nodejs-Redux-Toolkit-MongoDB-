import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/Register";
import CheckEmailPage from "../pages/CheckEmail";
import CheckPasswordPage from "../pages/CheckPassword";
import HomePage from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/email",
        element: <CheckEmailPage />,
      },
      {
        path: "/password",
        element: <CheckPasswordPage />,
      },
    ],
  },
]);

export default router;