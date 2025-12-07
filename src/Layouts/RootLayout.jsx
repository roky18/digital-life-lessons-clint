import React from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Share/Footer";
import Navbar from "../Pages/Share/Navbar";

const RootLayout = () => {
  return (
    <div className="w-11/12 mx-auto bg-gray-100">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
