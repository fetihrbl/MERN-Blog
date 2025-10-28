import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";


export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  return (
    <Navbar fluid className="border-b-2 border-gray-200 dark:border-gray-700 py-4">      
      {/* LOGO */}
      <NavbarBrand
        as={Link}
        to="/"
        className="text-l sm:text-xl font-semibold self-center whitespace-normal dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Fatih's
        </span>
        Blog
      </NavbarBrand>

      {/* SAĞ TARAF */}
      <div className="flex md:order-2 gap-3 items-center">
        {/* DARK MODE BUTTON */}
        <Button
         className="w-12 h-10 hidden sm:flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 focus:ring-0"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon/>}
        </Button>

        {/* USER LOGIN DURUMU */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
              alt={currentUser?.username || "User"}
              img={currentUser?.profilePicture || "https://via.placeholder.com/96"}
              rounded
              className="cursor-pointer"
            />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </DropdownHeader>
            <DropdownItem as={Link} to="/dashboard?tab=profile">
              Profile
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 text-lg">
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === "/"} className="text-lg">
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/about"
          active={path === "/about"}
          className="text-lg"
        >
          About
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/projects"
          active={path === "/projects"}
          className="text-lg"
        >
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
