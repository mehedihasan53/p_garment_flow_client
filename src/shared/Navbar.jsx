import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import {
  Search,
  Menu,
  User,
  ShoppingBag,
  LogOut,
  Home,
  Package,
  PlusSquare,
  Grid,
} from "lucide-react";

const linkClasses = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
    isActive
      ? "bg-blue-50 text-blue-600 font-medium"
      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
  }`;

const NavItem = ({ to, icon: Icon, label }) => (
  <li>
    <NavLink to={to} className={linkClasses}>
      <Icon size={18} />
      {label}
    </NavLink>
  </li>
);

const Navbar = () => {
  const { user, role, logout } = useAuth();

  const commonLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
  ];

  const guestLinks = [
    { to: "/login", label: "Login", icon: User },
    { to: "/register", label: "Register", icon: User },
  ];

  const managerLinks = [
    { to: "/add-product", label: "Add Product", icon: PlusSquare },
  ];

  const userLinks = [
    { to: "/dashboard/main", label: "Dashboard", icon: Grid },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const finalLinks = user
    ? [
        ...commonLinks,
        ...(role === "manager" ? managerLinks : []),
        ...userLinks,
      ]
    : [...commonLinks, ...guestLinks];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-gray-900 hover:text-blue-600"
          >
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">
              Shop<span className="text-blue-600">Ease</span>
            </span>
          </NavLink>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {finalLinks.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              ))}

              {user && (
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              )}
            </ul>

            {user && (
              <NavLink
                to="/profile"
                className="flex items-center gap-2 ml-4 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {user?.displayName?.charAt(0) || "U"}
                </div>
                <span>{user?.displayName?.split(" ")[0] || "Profile"}</span>
              </NavLink>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="lg:hidden flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {user ? (
              <NavLink
                to="/profile"
                className="p-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700"
              >
                <User className="h-5 w-5" />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm"
              >
                Login
              </NavLink>
            )}

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost p-2 rounded-lg">
                <Menu className="h-6 w-6 text-gray-700" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-white rounded-xl w-64 mt-2 border border-gray-200"
              >
                <li className="px-3 py-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
                    />
                  </div>
                </li>

                <div className="border-t my-2"></div>

                {finalLinks.map((item) => (
                  <NavItem
                    key={item.to + "-m"}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}

                {user && (
                  <li>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile full search */}
        <div className="md:hidden mt-2 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
