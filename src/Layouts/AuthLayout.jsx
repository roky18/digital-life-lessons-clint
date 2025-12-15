import React from "react";
import Logo from "../Pages/Share/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="md:w-6/12 mx-auto">
      <Logo></Logo>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
