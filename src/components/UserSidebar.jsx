import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { MdManageAccounts } from "react-icons/md";
import Verify from "./ui/verify";
import {
  FaDashcube,
  FaTasks,
  FaTicketAlt,
  FaWindowClose,
} from "react-icons/fa";
import { SiTestinglibrary } from "react-icons/si";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { MdDeveloperMode } from "react-icons/md";
import { MdOutlineDesignServices } from "react-icons/md";
import { GiHumanPyramid } from "react-icons/gi";

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  // SidebarMenuButton,
} from "./ui/sidebar";
// import DynamicBreadCrumb from "./DynamicBreadCrumb";
// import {
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";
// import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu";
// import { Avatar } from "./ui/avatar";
// import { AvatarFallback } from "@radix-ui/react-avatar";
// import { ChevronsUpDown, Menu, X } from "lucide-react";
import { GrUserManager } from "react-icons/gr";
import Instance from "@/API/Instance";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const AdminSidebars = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [name, setName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [data, setDate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const responseName = async () => {
      try {
        const response = await Instance.get("/admin/dashboard/");
        setName(response.data.data);
        // setDate(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    responseName();
  }, []);

  return (
    <div className="flex absolute">
      {/* Sidebar */}
      <SidebarProvider
        className={`flex flex-col border border-orange-500 bg-white transition-all h-full fixed  duration-300 z-[60] ${
          isCollapsed ? "w-16" : "2xl:w-60 w-48"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <SidebarHeader className="xl:text-lg text-xs font-bold">
            {!isCollapsed && (
              <div className="2xl:text-sm text-xs">Dashboard Sidebar</div>
            )}
          </SidebarHeader>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md transition"
          >
            {isCollapsed ? (
              <Menu
                size={40}
                className="items-center -ml-[26px] rounded-md transition-all hover:bg-orange-500 p-2 "
              />
            ) : (
              <X
                size={40}
                className="items-center rounded-md transition-all hover:bg-orange-500 p-2 "
              />
            )}
          </button>
        </div>
        <SidebarContent className="flex flex-col gap-4 mt-4">
          {/* Links with centered icons */}
          <Link
            to="/dashboard"
            className={`flex items-center transition-all duration-300 ${
              isCollapsed ? "justify-center" : "px-4"
            }`}
          >
            <FaDashcube className="text-xl" />
            {!isCollapsed && (
              <span className="ml-2 2xl:text-base text-xs font-semibold ">
                Dashboard
              </span>
            )}
          </Link>
          <div>
            <button
              className={`flex items-center transition-all duration-300 ${
                isCollapsed ? "justify-center" : "px-4"
              }`}
              onClick={toggleDropdown}
            >
              <GrUserManager
                className={`text-xl ${isCollapsed ? "ml-5" : ""}`}
              />
              {!isCollapsed && (
                <span className="ml-2 2xl:text-base text-xs font-semibold">
                  Team Management
                </span>
              )}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content pl-4 flex flex-col gap-4 my-4">
                {["manager", "employee", "hr"].includes(name?.role) && (
                  <Link
                    to="/dashboard/manager"
                    className={`flex items-center transition-all duration-300 ${
                      isCollapsed ? "justify-center" : "px-4"
                    }`}
                  >
                    <MdDeveloperMode
                      className={`text-xl ${isCollapsed ? "-ml-4" : ""}`}
                    />
                    {!isCollapsed && (
                      <span className="ml-2 2xl:text-base text-xs font-semibold">
                        Development
                      </span>
                    )}
                  </Link>
                )}
                <Link
                  to="/dashboard/human-resource"
                  className={`flex items-center transition-all duration-300 ${
                    isCollapsed ? "justify-center" : "px-4"
                  }`}
                >
                  <MdOutlineDesignServices
                    className={`text-xl ${isCollapsed ? "-ml-4" : ""}`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 2xl:text-base text-xs font-semibold">
                      Design
                    </span>
                  )}
                </Link>
                <Link
                  to="/dashboard/team-leader"
                  className={`flex items-center transition-all duration-300 ${
                    isCollapsed ? "justify-center" : "px-4"
                  }`}
                >
                  <SiTestinglibrary
                    className={`text-xl ${isCollapsed ? "-ml-4" : ""}`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 2xl:text-base text-xs font-semibold">
                      Testing
                    </span>
                  )}
                </Link>
                <Link
                  to="/dashboard/employees"
                  className={`flex items-center transition-all duration-300 ${
                    isCollapsed ? "justify-center" : "px-4"
                  }`}
                >
                  <MdOutlineCrisisAlert
                    className={`text-xl ${isCollapsed ? "-ml-4" : ""}`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 2xl:text-base text-xs font-semibold">
                      Marketing
                    </span>
                  )}
                </Link>
                <Link
                  to="/dashboard/employees"
                  className={`flex items-center transition-all duration-300 ${
                    isCollapsed ? "justify-center" : "px-4"
                  }`}
                >
                  <GiHumanPyramid
                    className={`text-xl ${isCollapsed ? "-ml-4" : ""}`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 2xl:text-base text-xs font-semibold">
                      Human Resource
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/dashboard/tasks"
            className={`flex items-center transition-all duration-300 ${
              isCollapsed ? "justify-center" : "px-4"
            }`}
          >
            <FaTasks className="text-xl" />

            {!isCollapsed && (
              <span className="ml-2 2xl:text-base text-xs font-semibold ">
                Tasks Management
              </span>
            )}
          </Link>
          <Link
            to="/dashboard/ticket"
            className={`flex items-center transition-all duration-300 ${
              isCollapsed ? "justify-center" : "px-4"
            }`}
          >
            <FaTicketAlt className="text-xl" />

            {!isCollapsed && (
              <span className="ml-2 2xl:text-base text-xs font-semibold ">
                Tickets Management
              </span>
            )}
          </Link>
          <Link
            to="/dashboard/ticket"
            className={`flex items-center transition-all duration-300 ${
              isCollapsed ? "justify-center" : "px-4"
            }`}
          >
            <MdManageAccounts className="text-xl" />

            {!isCollapsed && (
              <span className="ml-2 2xl:text-base text-xs font-semibold ">
                User Management
              </span>
            )}
          </Link>
        </SidebarContent>
        <SidebarFooter>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`flex items-center px-2 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ${
              isOpen ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
            }`}
          >
            <div
              className={`${
                isCollapsed ? "h-8 bg-transparent w-8" : "h-8 w-8"
              } rounded-lg bg-gray-300 flex items-center justify-center text-sm font-semibold`}
            >
              CN
            </div>
            {!isCollapsed && (
              <div className="grid flex-1 text-left leading-tight ml-2 ">
                <span className="truncate font-semibold text-xs">
                  {name ? (
                    <div>{name.mail}</div>
                  ) : (
                    <div>Loading user information...</div>
                  )}
                </span>
                <span className="truncate text-xs">
                  {name ? (
                    <div>{name.role}</div>
                  ) : (
                    <div>Loading user Role...</div>
                  )}
                </span>
              </div>
            )}
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {/* Dropdown Content */}
          {isOpen && (
            <div
              className="absolute -mt-20 w-48 bg-white border border-gray-300 rounded-lg shadow-md"
              onBlur={() => setIsOpen(false)}
            >
              <div className="p-3">
                {/* Dropdown Label */}
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="h-8 w-8 rounded-lg bg-gray-300 flex items-center justify-center text-sm font-semibold">
                    CN
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-xs text-wrap">
                      {name.mail}
                    </span>
                    <span className="truncate text-xs">{name.role}</span>
                  </div>
                </div>

                {/* Logout Link */}
                <div className="flex items-center">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="mt-2 text-red-500 hover:underline text-sm w-full text-left"
                  >
                    Logout
                  </button>
                  <button onClick={() => setIsOpen(false)}>
                    <FaWindowClose />
                  </button>
                </div>
              </div>
            </div>
          )}
        </SidebarFooter>
      </SidebarProvider>
      <Verify
        isOpen={showLogoutModal}
        title="Confirm Logout"
        message="Are you guessing to finish your tasks?"
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
      <div
        className={clsx(
          "p-4 w-full z-50 bg-white transition-all",
          isCollapsed ? "ml-14" : "2xl:ml-60 ml-48"
        )}
      >
        <div className={`${isCollapsed ? "w-screen" : "w-full"}`}>
          {/* <DynamicBreadCrumb /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebars;
