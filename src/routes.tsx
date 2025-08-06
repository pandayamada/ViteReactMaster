import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthGuard from "./layout/AuthenGard";
import UnAuthen from "./layout/UnAuthGuard";
import { getSessionsStorage } from "./services/storage.js";
// import { permissionAction } from "../core/model/permissions.config";

import Login from "./views/auth/Login";
// import ResetPassword from "../views/auth/ResetPassword";

const routes = createBrowserRouter([
  {
    path: "*",
    element: getSessionsStorage("token") ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/auth/login" />
    ),
  },
  {
    path: "/auth/login",
    element: <UnAuthen component={<Login />} />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard
      // permissionAccess={permissionAction.dashboardView}
      // component={<DashboardPage />}
      />
    ),
  },
]);

export default routes;
