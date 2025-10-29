import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute.jsx";


function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* Alt sayfalar buraya render edilir */}
      <Footer />
    </>
  );
}
// 🔹 Router tanımı
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}> {/* Layout parent route */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/projects" element={<Projects />} />
    </Route>
  )
);


export default function App() {
  return <RouterProvider router={router} />;
}
