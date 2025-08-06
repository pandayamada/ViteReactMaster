/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, Link, useLocation } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useState } from "react";
import { permissionAction } from "../../core/model/permissions.config";
import type { FC } from "react";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import type { UserInfo } from "../../core/model/user.config";
import { Logout } from "../../core/utils/auth";
import { getSessionsStorage } from "../../services/storage";

interface NavItemProps {
  to: string;
  label: string;
  index: number;
  activeButton: string;
  handleNavClick: (path: string) => void;
}

const NavItem: FC<NavItemProps> = ({
  to,
  label,
  activeButton,
  handleNavClick,
}) => (
  <li>
    <Link
      to={to}
      onClick={() => handleNavClick(to)}
      className={`rounded-3xl ${
        activeButton === to ? "active custom-nav !text-primary-content" : ""
      }`}
    >
      {label}
    </Link>
  </li>
);

export default function Nav() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<string>("");

  const userInfo = JSON.parse(
    getSessionsStorage("user") || "null"
  ) as UserInfo | null;

  const handleNavClick = (path: string) => {
    setActiveButton((prev) => (path === prev ? prev : path));
    const elem = document.activeElement as HTMLElement | null;
    if (elem) elem.blur();
  };

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div
        id="navBar"
        className="navbar bg-base-300 text-accent-content z-10 fixed top-0 px-6 justify-between lg:justify-normal"
      >
        {/* Device: Mobile & Tablet */}
        <div className="dropdown lg:hidden max-w-[160px] flex-1">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {permissionAction.Home && (
              <NavItem
                to="/home"
                label="Home"
                index={0}
                activeButton={activeButton}
                handleNavClick={handleNavClick}
              />
            )}
            {permissionAction.Contract && (
              <NavItem
                to="/contract"
                label="Contract"
                index={1}
                activeButton={activeButton}
                handleNavClick={handleNavClick}
              />
            )}
          </ul>
        </div>

        {/* Device: Desktop */}
        <div className="lg:flex-1">
          {/* <AiOutlineSetting className="h-auto w-9 mx-4" /> */}
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            {permissionAction.Home && (
              <NavItem
                to="/home"
                label="Home"
                index={0}
                activeButton={activeButton}
                handleNavClick={handleNavClick}
              />
            )}
            {permissionAction.Contract && (
              <NavItem
                to="/contract"
                label="Contract"
                index={1}
                activeButton={activeButton}
                handleNavClick={handleNavClick}
              />
            )}
          </ul>
        </div>

        <div className="flex-none">
          <ul className="flex items-center px-2 py-0 gap-3 menu flex-row">
            <li
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="dropdown z-0 h-max w-max rounded-3xl p-0 a ">
                <div tabIndex={0} role="button">
                  <AiOutlineSetting className="inline-block p-2 h-10 w-10 z-0 rounded-3xl" />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-10 menu p-2 shadow cursor-auto bg-neutral rounded-box w-52 right-0 top-12"
                >
                  <div className="flex flex-col items-center text-primary">
                    <FaUserCircle className="h-7 w-[auto]" />
                    <h3>{`${userInfo?.first_name || "first_name"} ${
                      userInfo?.last_name || "last_name"
                    }`}</h3>
                  </div>
                  <hr />
                  <ul className="remove-before pl-0 ml-0 flex flex-col gap-1">
                    <li>
                      <a
                        className="border-error text-error grid grid-cols-[20px,auto] btnLogout"
                        onClick={Logout}
                      >
                        <MdLogout /> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
