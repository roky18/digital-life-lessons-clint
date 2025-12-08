import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const Links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/add-lesson">Add Lesson</NavLink>
      </li>
      <li>
        <NavLink to="/my-lessons">My Lessons</NavLink>
      </li>

      {/* {user && (
        <>
          <li>
            <NavLink to="/add-lesson">Add Lesson</NavLink>
          </li>
          <li>
            <NavLink to="/my-lessons">My Lessons</NavLink>
          </li>
        </>
      )} */}
      <li>
        <NavLink to="/public-lessons">Public Lessons</NavLink>
      </li>
      <li>
        <NavLink to="/upgrade">Upgrade</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <div className="w-15">
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img src={user.photoURL} alt="User" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-xl w-52"
            >
              <li className="font-semibold text-center py-2">
                {user.displayName}
              </li>

              <li>
                <Link to="">Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-600 font-semibold"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline btn-accent" to="/register">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
