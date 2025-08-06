/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import viteLogo from "/vite.svg";

export default function NavUnSign() {
  return (
    <>
      <div className="navbar text-accent-content z-0 fixed top-0 px-6">
        <div className="flex-1 gap-6">
          <img src={viteLogo} alt="logo" className="h-11 w-auto" />
        </div>
        <div className="flex-none"></div>
      </div>
      <Outlet />
    </>
  );
}
