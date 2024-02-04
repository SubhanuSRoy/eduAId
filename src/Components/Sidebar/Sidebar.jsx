import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../eduAId_logo.png";
import SidebarLinkGroup from "./SidebarLinkGroup";

import { FiUsers } from "react-icons/fi";
import { TbTargetArrow } from "react-icons/tb";
import { FaChalkboardTeacher, FaImage, FaVideo } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

import { AiOutlineFileImage } from "react-icons/ai";
import {  BsRobot } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gradient-to-tl from-prim to-secondary duration-300 ease-linear text-white lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="" />
          {/* <h1 className="text-2xl font-semibold text-white">KaRmA</h1> */}
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Dashboard and Analysis */}
              <li>
                <NavLink
                  to="/chat/converse"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-gray-50 duration-300 ease-in-out hover:bg-primHover dark:hover:bg-meta-4 ${
                    pathname.includes("/chat/converse") &&
                    "bg-primHover dark:bg-meta-4"
                  }`}
                >
                  <BsRobot  className="w-5 h-5" />
                  Converse
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/chat/analyse"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-gray-50 duration-300 ease-in-out hover:bg-primHover dark:hover:bg-meta-4 ${
                    pathname.includes("/chat/analyse") &&
                    "bg-primHover dark:bg-meta-4"
                  }`}
                >
                  <FaImage   className="w-5 h-5" />
                  Analyse Images
                </NavLink>
              </li>

              {/* Teacher Profile */}
              <SidebarLinkGroup activeCondition={pathname.includes("/teacher")}>
                {(handleClick, open) => (
                  <React.Fragment>
                    <NavLink
                      to="/teacher"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-gray-200 duration-300 ease-in-out hover:bg-primHover dark:hover:bg-meta-4 ${
                        pathname.includes("/teacher") &&
                        "bg-primHover dark:bg-meta-4"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <FaChalkboardTeacher  className="w-5 h-5" />
                      Teacher
                      <svg
                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                          open && "rotate-180"
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* ... (unchanged) */}
                      </svg>
                    </NavLink>
                    {/* Dropdown Menu Start */}
                    <div
                      className={`translate transform overflow-hidden ${
                        !open && "hidden"
                      }`}
                    >
                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        <li>
                          <NavLink
                            to="/teacher/profile"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-semibold text-gray-200 duration-300 ease-in-out hover:text-white " +
                              (isActive && "!text-blue-800")
                            }
                          >
                            Profile
                          </NavLink>
                        </li>
                        {/* Add other teacher-related menu items here */}
                      </ul>
                    </div>
                    {/* Dropdown Menu End */}
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Students and Classes */}
              <SidebarLinkGroup
                activeCondition={
                  pathname.includes("/students") ||
                  pathname.includes("/classes")
                }
              >
                {(handleClick, open) => (
                  <React.Fragment>
                    <NavLink
                      to="/students"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-gray-50 duration-300 ease-in-out hover:bg-primHover dark:hover:bg-meta-4 ${
                        (pathname.includes("/students") ||
                          pathname.includes("/classes")) &&
                        "bg-primHover dark:bg-meta-4"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <TbTargetArrow className="h-5 w-5 " />
                      Students & Classes
                      <svg
                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                          open && "rotate-180"
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        
                      </svg>
                    </NavLink>
                    {/* Dropdown Menu Start */}
                    <div
                      className={`translate transform overflow-hidden ${
                        !open && "hidden"
                      }`}
                    >
                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        <li>
                          <NavLink
                            to="/students/add"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-semibold text-gray-200 duration-300 ease-in-out hover:text-white " +
                              (isActive && "!text-blue-800")
                            }
                          >
                            Add Student
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/students/manage"
                            className={({ isActive }) =>
                              "group relative flex items-center gap-2.5 rounded-md px-4 font-semibold text-gray-200 duration-300 ease-in-out hover:text-white " +
                              (isActive && "!text-blue-800")
                            }
                          >
                            Manage Students
                          </NavLink>
                        </li>
                        
                      </ul>
                    </div>
                    {/* Dropdown Menu End */}
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Reports and Settings */}
              <li>
                <NavLink
                  to="/chat/handwritten-notes"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-gray-50 duration-300 ease-in-out hover:bg-primHover dark:hover:bg-meta-4 ${
                    pathname.includes("handwritten") &&
                    "bg-primHover dark:bg-meta-4"
                  }`}
                >
                  <TfiWrite  />
                  Handwritten Notes
                </NavLink>
              </li>
              <li>
                <a
                  href="https://eduaid.streamlit.app/"
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-gray-50 duration-300 ease-in-out hover:bg-primHover dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-primHover dark:bg-meta-4"
                  }`}
                >
                  {/* ... (unchanged) */}
                  <FaVideo />
                  Analyse Class Video
                </a>
              </li>
              
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
