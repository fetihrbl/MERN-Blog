import React from "react";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon } from "react-icons/fa";

export default function Header() {

    const path = useLocation().pathname;

  return (
    <Navbar fluid  className="border-b-2">
      <NavbarBrand as={Link} to="/">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Fatih's
        </span>
        Blog
      </NavbarBrand>

      <div className="flex md:order-2 gap-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                Sign In
            </Button>
        </Link>
      </div>

      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === '/'}>Home</NavbarLink>
        <NavbarLink as={Link} to="/about" active={path === '/about'}>About</NavbarLink>
        <NavbarLink as={Link} to="/projects" active={path === '/projects'}>Projects</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
