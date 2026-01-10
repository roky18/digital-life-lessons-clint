import React from "react";
import Logo from "../Pages/Share/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className=" w-11/12 pt-15 md:w-6/12 min-h-screen mx-auto">
      <Logo></Logo>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
