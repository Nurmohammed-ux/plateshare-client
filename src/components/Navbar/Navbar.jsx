import { Link, NavLink } from "react-router";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  // console.log(user);
  const getLinkClass = ({ isActive }) =>
    `font-semibold ${isActive ? "text-gradient text-base font-semibold px-2" : "text-gray-600 px-2 text-base font-semibold hover:text-gray-900"}`;

  const links = (
    <>
      <NavLink to={"/"} className={getLinkClass}>
        Home
      </NavLink>

      <NavLink to={"/availableFoods"} className={getLinkClass}>
        Available Foods
      </NavLink>

      {/* Private Links for Logged-in Users */}
      {user && (
        <>
          <NavLink to={"/addFood"} className={getLinkClass}>
            Add Food
          </NavLink>

          <NavLink to={"/manageMyFoods"} className={getLinkClass}>
            Manage My Foods
          </NavLink>

          <NavLink to={"/myFoodRequests"} className={getLinkClass}>
            My Food Requests
          </NavLink>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your successfully signout from PlateShare",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 px-4">
      <div className="navbar-start">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold">
          Plate
          <span className="text-transparent bg-clip-text text-gradient">
            Share
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            {/* Profile Avatar - Always visible */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-primary">
                <img
                  alt="Profile"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm items-start dropdown-content bg-base-100 rounded-box z-50 mt-3 w-50 p-3 shadow"
            >
              {/* On LG screens, since links are hidden in navbar-center, 
              you might want to show them here instead */}
              <li className="lg:hidden">{links}</li>

              <button
                onClick={handleLogOut}
                className="text-gray-600 pl-2 pt-1 lg:pt-0 text-base font-semibold hover:text-red-400"
              >
                Logout
              </button>
            </ul>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="btn border border-secondary text-base pt-1.5 font-semibold text-gradient"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
