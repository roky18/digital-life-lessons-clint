import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Share/Footer";
import Navbar from "../Pages/Share/Navbar";
import { FaArrowUp } from "react-icons/fa";

const RootLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" dark:bg-black bg-gray-100">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>

      {/* Scroll To Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 bg-violet-600 text-white rounded-full shadow-lg hover:bg-violet-700 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default RootLayout;
