import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600 text-sm">{today}</p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/100"}
            alt="profile"
            className="w-12 h-12 rounded-full border"
          />
          <p className="font-medium">{user?.displayName || "User"}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-blue-100 border">
          <p className="text-sm text-gray-700">Total Products</p>
          <h2 className="text-2xl font-semibold mt-1">18</h2>
        </div>

        <div className="p-5 rounded-xl bg-green-100 border">
          <p className="text-sm text-gray-700">Total Orders</p>
          <h2 className="text-2xl font-semibold mt-1">52</h2>
        </div>

        <div className="p-5 rounded-xl bg-yellow-100 border">
          <p className="text-sm text-gray-700">Pending Reviews</p>
          <h2 className="text-2xl font-semibold mt-1">4</h2>
        </div>
      </div>

      {/* Quick section */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-lg font-semibold mb-3">Quick Overview</h2>
        <p className="text-gray-600">
          This is your main workspace. You can manage products, track orders,
          and handle everything from the dashboard.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
