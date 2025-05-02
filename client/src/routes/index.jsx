import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/Register";
import CheckEmailPage from "../pages/CheckEmail";
import CheckPasswordPage from "../pages/CheckPassword";
import HomePage from "../pages/Home";
import MessagePage from "../pages/Message";
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