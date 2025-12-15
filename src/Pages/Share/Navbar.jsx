import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: userData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);

      return res.data;
    },
  });

  const admin = userData.role === "admin";

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

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/add-lessons">Add Lesson</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
          </li>

          <li>
            <NavLink to="/upgrade">Upgrade</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/public-lessons">Public Lessons</NavLink>
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
                <img
                  referrerPolicy="no-referrer"
                  src={user.photoURL}
                  alt="User"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-xl w-52"
            >
              <li className="font-semibold text-center py-2">
                {user.displayName}
              </li>

              {
                admin?<li>
                <button
                  onClick={() => navigate(`/dashboard/admin/profile/${user.email}`)}
                >
                  Profile
                </button>
              </li>:<li>
                <button
                  onClick={() => navigate(`/dashboard/profile/${user.email}`)}
                >
                  Profile
                </button>
              </li>
              }

              {admin ? (
                <li>
                  <Link to="/dashboard/admin">Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}

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
