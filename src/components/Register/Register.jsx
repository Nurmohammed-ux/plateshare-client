import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="card bg-base-100 w-full p-6 max-w-lg mx-auto mt-30 shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-4xl font-bold text-center mb-2">Register</h1>
        <p className="text-base text-center my-">
          Don't have an account?{" "}
          <Link to={"/login"} className="text-gradient font-medium">
            Login Now
          </Link>
        </p>
        <form action="">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              name="name"
              placeholder="Your Name"
            />
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input w-full"
              name="photo"
              placeholder="PhotoURL"
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              name="email"
              placeholder="Email"
            />
            <div className="form-control w-full">
              <label className="label mb-1.5">
                <span className="label-text">Password</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-10"
                  name="password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              </div>
            </div>
            <button className="btn bg-primary-gradient text-white font-semibold text-xl mt-4">
              Register
            </button>
            <div className="flex gap-6 items-center my-3">
              <hr className="w-full text-gray-300" />
              <p>Or</p>
              <hr className="w-full text-gray-300" />
            </div>
            {/* Google */}
            <button className="btn bg-white text-base text-black border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Sign Up with Google
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
