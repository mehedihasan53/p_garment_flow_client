import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X/Twitter logo

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo & Social Media */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white">
            Shop<span className="text-blue-500">Ease</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Your one-stop shop for quality products and seamless online shopping
            experience.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <SiX size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100 transition-colors"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-blue-500 transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-500 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-blue-500 transition-colors"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-400 text-sm">support@shopease.com</p>
          <p className="text-gray-400 text-sm">+880 123 456 789</p>
          <p className="text-gray-400 text-sm">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
