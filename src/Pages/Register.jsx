import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";

import useAuth from "../Hooks/useAuth";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    // console.log(data);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        const formData = new FormData();
        formData.append("image", profileImg);

        const imageAPi = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_host
        }`;

        axios.post(imageAPi, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in db--->>>
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user create in db");
            }
          });
          // create user in db---<<<

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Registration Successful!",
                text: "Welcome to Digital Life Lessons 🎉",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                navigate(location.state || "/");
              });
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card mt-6 bg-amber-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
        <p className="text-2xl font-semibold text-emerald-500 text-center">
          Please Register
        </p>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}

          {/* Email */}
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}

          {/* Image */}
          <label className="label">Photo</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input"
            placeholder="Choose Your Photo"
          />
          {errors.photo && <p className="text-red-500">Photo is required.</p>}

          {/* PAssword */}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or Longer
            </p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              “Password must be 6 characters long and include at least one
              uppercase letter, one lowercase letter, one number, and one
              special character.”
            </p>
          )}

          <button className="btn btn-outline btn-accent mt-4">Register</button>
        </fieldset>
        <p className="text-center ">
          Already Have an Account?
          <Link
            className=" hover:font-bold text-blue-500"
            state={location.state}
            to="/login"
          >
            Please Login
          </Link>
        </p>
      </form>
      <GoogleLogin></GoogleLogin>
    </div>
  );
};

export default Register;
