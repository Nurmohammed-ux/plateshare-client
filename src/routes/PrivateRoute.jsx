import { Navigate, useLocation } from "react-router";
import UseAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }


  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname} />;
};

export default PrivateRoute;
