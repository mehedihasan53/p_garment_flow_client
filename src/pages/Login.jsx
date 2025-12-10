import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Provider/AuthProvider";

const roles = [
  { value: "customer", label: "Customer" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Employee" },
];

const Login = () => {
  const { login, loginWithGoogle, refreshRole } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await login(form.email, form.password);
      await refreshRole(userCredential.user.uid);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const userCredential = await loginWithGoogle();
      await axios.post(`${BASE_URL}/users`, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        role,
      });
      await refreshRole(userCredential.user.uid);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const Input = ({ label, type = "text", name, placeholder }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-primary">
          Login
        </h1>
        <p className="text-center text-sm text-base-content/70 mb-6">
          Access your account to manage your profile
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter password"
          />

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
            className={`btn btn-primary w-full mt-2 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogle}
          className={`btn btn-outline w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Sign in with Google
        </button>

        <p className="text-center mt-4 text-sm text-base-content/70">
          Don't have an account?{" "}
          <Link to="/register" className="link link-primary font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
