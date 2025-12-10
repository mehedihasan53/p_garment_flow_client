import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../components/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import Products from "../pages/products/Products";
import Profile from "../components/Profile";
import AddProducts from "../pages/products/AddProducts";
import ManageProduct from "../dashboard/ManageProduct";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>404</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "main",
        element: <Dashboard />,
      },
      {
        path: "add-products",
        element: <AddProducts />,
      },
      {
        path: "manage-products",
        element: <ManageProduct />,
      },
    ],
  },
]);
