import React from "react";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";
import Aside from "../dashboard/Aside";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Aside />
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
