import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthGuard from "./layout/AuthenGard";
import UnAuthen from "./layout/UnAuthGuard";
import { getLocalStorage} from "./services/storage.js";
import { permissionAction } from "./core/model/permissions.config";

import Login from "./views/auth/Login";
import Home from "./views/module/Home";
import Contract from "./views/module/Contract.js";

const routes = createBrowserRouter([
  {
    path: "*",
    element: getLocalStorage("token") ? (
      <Navigate to="/home" />
    ) : (
      <Navigate to="/auth/login" />
    ),
  },
  {
    path: "/auth/login",
    element: <UnAuthen component={<Login />} />,
  },
  {
    path: "/home",
    element: (
      <AuthGuard
        permissionAccess={permissionAction.Home}
        component={<Home />}
      />
    ),
  },
  {
    path: "/contract",
    element: (
      <AuthGuard
        permissionAccess={permissionAction.Contract}
        component={<Contract />}
      />
    ),
  },
]);

export default routes;
