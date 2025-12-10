import React, { useState } from "react";

import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    signUser(data.email, data.password)
      .then((result) => {
        alert("Login successful");
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.message);
      });
  };

  return (
    <div className="card bg-amber-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <p className="text-2xl font-semibold text-blue-500 text-center">
          Please Login
        </p>
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          {/* pass */}
          <label className="label">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Minimum 6 Character.</p>
          )}
          {loginError && <p className="text-red-600 mt-2">{loginError}</p>}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-outline btn-info mt-4">Login</button>
        </fieldset>
        <div>
          <p className="text-center ">
            New to Digital Life Lesson?
            <Link state={location.state} to="/register">
              <span className="hover:font-bold text-blue-500"> Register</span>
            </Link>
          </p>
        </div>
      </form>
      <GoogleLogin></GoogleLogin>
    </div>
  );
};

export default Login;
