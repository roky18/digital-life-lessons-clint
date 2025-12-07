import React from "react";
import logo from "../../assets/dll-Logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div>
        <img className="w-25" src={logo} />
      </div>
    </Link>
  );
};

export default Logo;
