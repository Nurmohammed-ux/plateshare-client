import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, signInWithGoogle, updateUserProfile } = UseAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(createUser)

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    console.log(name, email, photo, password);

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(name, photo)
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your successfully register in PlateShare",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ||"/")
          })
          .catch((profileError) => {
            setError(
              profileError.message || "Account created, but profile update failed.",
            );
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const HandleGoogleSignUp = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your successfully register in PlateShare",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ||"/")
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
        <form onSubmit={handleRegister}>
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
            <button
              onClick={HandleGoogleSignUp}
              className="btn bg-white text-base text-black border-[#e5e5e5]"
            >
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
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
