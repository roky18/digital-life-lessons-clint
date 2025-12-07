import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-16 text-center w-full max-w-md">
        <h1 className="text-6xl md:text-8xl font-extrabold text-red-600 mb-4 animate-pulse">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Oops!
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-6">
          ❌ Page Not Found ❌
        </p>

        <Link to="/">
          <button className="btn btn-outline btn-success px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:scale-105 transition-transform duration-300">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
