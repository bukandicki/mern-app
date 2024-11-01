import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "./pages/Dashboard/Dashboard.component";
import LoginPage from "./pages/Login/Login.component";
import Root from "./pages/Root.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
