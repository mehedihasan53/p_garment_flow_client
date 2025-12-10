import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.config";
import { useAuth } from "../Provider/AuthProvider";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const roles = [
  { value: "customer", label: "Customer" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Employee" },
];

const Register = () => {
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const { refreshRole } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const file = form.photoURL.files[0];

    if (!file)
      return toast.error("Please upload a profile photo"), setLoading(false);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=19c7a7e2bec3f8ca2d8fd552c47beced",
        formData
      );

      const uploadedPhotoURL = res.data.data.url;

      const userData = {
        name,
        email,
        password,
        photoURL: uploadedPhotoURL,
        role,
      };

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: uploadedPhotoURL,
      });

      await axios.post("http://localhost:3000/users", userData);
      await refreshRole(userCredential.user.uid);

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await axios.post("http://localhost:3000/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role,
      });
      await refreshRole(user.uid);

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const Input = ({
    label,
    type = "text",
    name,
    placeholder,
    required = true,
  }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-primary">
          Create Account
        </h1>
        <p className="text-center text-sm text-base-content/70 mb-6">
          Sign up to get started with your account
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input label="Full Name" name="name" placeholder="Your name" />
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create password"
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Profile Photo</label>
            <input
              type="file"
              name="photoURL"
              accept="image/*"
              required
              className="file-input file-input-bordered w-full rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Select Role</label>
            <select
              className="select select-bordered w-full rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full mt-2 ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={googleSignup}
          disabled={loading}
          className={`btn btn-outline w-full ${loading ? "loading" : ""}`}
        >
          Sign up with Google
        </button>

        <p className="text-center mt-4 text-sm text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
