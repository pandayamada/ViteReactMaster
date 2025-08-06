import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Nav from "../components/Nav/NavBar";
import { clearLocalStorage, getLocalStorage} from "../services/storage";

// import { getServiceAll } from "../services/gateways";
import type { UserInfo } from "../core/model/user.config";
import type { AuthGuardProps } from "../core/model/route.config";

const AuthGuard = ({
  component,
  permissionAccess = false,
  isCustomFullPage = false,
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const token = getLocalStorage("token");
  const userInfo = JSON.parse(
    getLocalStorage("user") || "null"
  ) as UserInfo | null;

  const logout = useCallback(() => {
    clearLocalStorage();
    void navigate("/auth/login", { replace: true });
  }, [navigate]);

  const fetchJobData = useCallback(async (): Promise<void> => {
    if (
      //!isLoading &&
      token &&
      userInfo &&
      permissionAccess
    ) {
      //
    }
  }, [token, userInfo, permissionAccess]);

  useEffect(() => {
    if (!token || !userInfo || !permissionAccess) {
      logout();
    } else {
      void fetchJobData();
    }
  }, [token, userInfo, permissionAccess, logout, fetchJobData]);

  if (!token || !userInfo) {
    return null;
  }

  return (
    <>
      {isCustomFullPage ? (
        component
      ) : (
        <div className="fixed min-h-screen h-full w-full flex flex-col justify-between bg-base-300">
          <div className="flex-1">
            <Nav />
            <div className="bg-base-100 fixed top-20 left-3 right-3 bottom-0 px-3 py-5 pb-0 rounded-t-3xl overflow-auto">
              {component}
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AuthGuard;
