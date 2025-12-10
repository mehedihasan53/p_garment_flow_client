import React from "react";

const Home = () => {
  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome Back 👋</h1>

        <p className="text-gray-600 mb-6">
          This is your dashboard home. You can view stats, manage products, and
          navigate to all sections using the sidebar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Total Products</h2>
            <p className="text-2xl font-bold">120</p>
          </div>

          <div className="p-5 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-2xl font-bold">450</p>
          </div>

          <div className="p-5 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Orders Today</h2>
            <p className="text-2xl font-bold">32</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
