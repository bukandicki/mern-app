import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "./pages/Dashboard/Dashboard.component";
import LoginPage from "./pages/Login/Login.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
