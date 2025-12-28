import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaUser, FaPlus, FaUsers } from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";

const Aside = () => {
  const { role } = useAuth();

  // Base links for all users
  const baseLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Products", path: "/dashboard/manage-products", icon: FaBoxOpen },
    { name: "Dashboard", path: "/dashboard", icon: FaUsers },
    { name: "Profile", path: "/profile", icon: FaUser },
  ];

  // Manager / Admin links
  const managerLinks =
    role === "manager" || role === "admin"
      ? [{ name: "Add Product", path: "/dashboard/add-products", icon: FaPlus }]
      : [];

  const finalLinks = [...baseLinks, ...managerLinks];

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded transition-colors ${
      isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
    }`;

  const NavItem = ({ name, path, icon: Icon }) => (
    <NavLink to={path} className={linkClasses}>
      <Icon className="text-lg" />
      <span>{name}</span>
    </NavLink>
  );

  return (
    <aside className="bg-gray-900 text-gray-200 w-64 min-h-screen p-6 flex flex-col">
      {/* title */}
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-3">
        {finalLinks.map((link) => (
          <NavItem
            key={link.name}
            name={link.name}
            path={link.path}
            icon={link.icon}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
