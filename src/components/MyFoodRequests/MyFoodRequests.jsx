import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/useAuth";

const STATUS_STYLES = {
  pending: "badge-warning",
  accepted: "badge-success",
  rejected: "badge-error",
};

const MyFoodRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/myFoodRequests?userEmail=${user.email}`)
      .then((res) => {
        // console.log(res.data);
        setRequests(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to load your food requests.",
        });
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, user?.email]);

  const handleCancel = async (id, foodName) => {
    const result = await Swal.fire({
      title: "Cancel this request?",
      text: `Your request for "${foodName}" will be withdrawn.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/foodRequests/${id}`);

      if (res.data.deletedCount > 0) {
        setRequests((prev) => prev.filter((req) => req._id !== id));
        Swal.fire({
          icon: "success",
          title: "Cancelled!",
          text: "Your food request has been cancelled.",
          timer: 1800,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to cancel the request.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="mb-10 flex flex-col items-center justify-center">
        <p className="badge badge-secondary text-base badge-outline font-semibold mb-3">
          Your requests
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">
          My <span className="text-gradient">Food</span> Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Every food you've asked to collect, and whether the donator has
          accepted, rejected, or hasn't responded yet.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-box">
          <p className="text-gray-500">You haven't requested any food yet.</p>
          <Link
            to="/availableFoods"
            className="btn btn-secondary font-semibold text-base btn-sm mt-4"
          >
            Browse available food
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-box shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Your Location</th>
                <th>Reason</th>
                <th>Requested On</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-box">
                          <img src={req.foodImage} alt={req.foodName} />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{req.foodName}</p>
                        <p className="text-xs text-gray-500">
                          from {req.donatorEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{req.location}</td>
                  <td className="text-sm max-w-xs">
                    <p className="line-clamp-1 lg:line-clamp-2">{req.reason}</p>
                  </td>
                  <td className="font-mono text-xs">
                    {new Date(req.requested_at).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`badge capitalize ${
                        STATUS_STYLES[req.status] || "badge-ghost"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/food/${req.foodId}`}
                        className="btn btn-sm btn-outline btn-secondary"
                      >
                        View Food
                      </Link>
                      {req.status === "pending" && (
                        <button
                          onClick={() => handleCancel(req._id, req.foodName)}
                          className="btn btn-sm btn-outline btn-error"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;
