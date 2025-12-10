import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-xl p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            alt="profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user?.displayName || "No Name"}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <p className="text-gray-500 text-sm">Username</p>
            <p className="font-medium">{user?.displayName || "N/A"}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-500 text-sm">Account Created</p>
            <p className="font-medium">
              {user?.metadata?.creationTime || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
