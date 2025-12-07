import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="flex flex-col md:flex-row items-center ">
            <Logo></Logo>
            <span className="text-2xl font-semibold">Digital_Life_Lessons</span>
          </div>

          {/* Contact Info */}
          <div className="text-sm space-y-1 text-center md:text-left">
            <p>Contact Us:</p>
            <p>📞 +880 1712345678</p>
            <p>📩 roky18bd@gmail.com</p>
            <p>🏡 Pabna, Bangladesh</p>
          </div>

          {/* Terms & Links */}
          <div className="text-sm flex flex-col space-y-1 items-center md:items-end">
            <a href="" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="" className="hover:underline">
              Privacy Policy
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 justify-center md:justify-end">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} YourWebsiteName. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
