import React from "react";
import Logo from "../Pages/Share/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className=" w-11/12 mt-16 md:w-6/12  mx-auto">
      <Logo></Logo>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
