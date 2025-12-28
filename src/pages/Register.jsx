import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="label">Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="label">Blood Group</label>
            <select name="bloodGroup" className="select select-bordered w-full">
              <option value="">Select blood group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="label">District</label>
            <select name="district" className="select select-bordered w-full">
              <option value="">Select district</option>
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="label">Upazila</label>
            <select name="upazila" className="select select-bordered w-full">
              <option value="">Select upazila</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="••••••••"
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit */}
          <button className="btn btn-primary w-full mt-2">Register</button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
