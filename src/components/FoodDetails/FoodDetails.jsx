import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { CiLocationOn } from "react-icons/ci";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState([]);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const locationRef = useRef(null);
  const reasonRef = useRef(null);
  const contactRef = useRef(null);
  const modalRef = useRef(null);
  //   console.log(id);

  useEffect(() => {
    axiosSecure
      .get(`/foods/${id}`)
      .then((res) => {
        setFood(res.data);
        // console.log("inside foodDetails", res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load this food listing",
        });
      })
      .finally(() => {
        setRequestsLoading(false);
        setLoading(false);
      });

    axiosSecure
      .get(`/foodRequests?foodId=${id}`)
      .then((result) => {
        console.log(result.data);
        setRequests(result.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load this food listing",
        });
      })
      .finally(() => {
        setRequestsLoading(false);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  const isOwner = food?.donator?.email === user?.email;
  const isAvailable = food?.status === "available";

  const openRequestModal = () => modalRef.current?.showModal();
  const closeRequestModal = () => modalRef.current?.close();

  // ---- Submit a new food request ----
  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    const requestData = {
      foodId: food._id,
      foodName: food.food_name,
      foodImage: food.food_image,
      donatorEmail: food.donator?.email,
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      location: locationRef.current.value,
      reason: reasonRef.current.value,
      contact: contactRef.current.value,
      status: "pending",
      requested_at: new Date().toISOString(),
    };

    try {
      setSubmitting(true);

      const res = await axiosSecure.post("/foodRequests", requestData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Request sent to the donator.",
          timer: 1800,
          showConfirmButton: false,
        });

        setAlreadyRequested(true);
        e.target.reset();
        closeRequestModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: err.message || "Failed to send request.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Owner: accept a request ----
  const handleAccept = async (request) => {
    const confirm = await Swal.fire({
      title: "Accept this request?",
      text: `${request.name} will become the collector and this food will be marked as donated.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/foodRequests/${request._id}`, {
        status: "accepted",
      });

      await axiosSecure.patch(`/foods/${id}`, {
        status: "donated",
      });

      setRequests((prev) =>
        prev.map((r) =>
          r._id === request._id ? { ...r, status: "accepted" } : r,
        ),
      );

      setFood((prev) => ({
        ...prev,
        status: "donated",
      }));

      Swal.fire({
        icon: "success",
        title: "Accepted!",
        text: "The request has been accepted and the food is now donated.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to accept the request.",
      });
    }
  };

  // ---- Owner: reject a request ----
  const handleReject = async (request) => {
    const confirm = await Swal.fire({
      title: "Reject this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/foodRequests/${request._id}`, {
        status: "rejected",
      });

      setRequests((prev) =>
        prev.map((r) =>
          r._id === request._id ? { ...r, status: "rejected" } : r,
        ),
      );
      Swal.fire({
        icon: "success",
        title: "Rejected",
        text: "The request has been rejected.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to reject the request.",
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

  if (!food) {
    return (
      <div className="text-center py-24 text-gray-500">
        Food listing not found.
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={food.food_image}
            alt={food.food_name}
            className="w-full h-120 lg:h-150 object-cover rounded-box shadow-sm border border-base-200"
          />
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`badge capitalize ${
                food.status === "available" ? "badge-success" : "badge-secondary"
              }`}
            >
              {food.status}
            </span>
            {food.food_category && (
              <span className="badge badge-outline">{food.food_category}</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">{food.food_name}</h1>

          {food.description && (
            <p className="text-gray-600 mt-3">{food.description}</p>
          )}

          <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6">
            <div className="bg-base-200 rounded-box p-4">
              <p className="text-xs text-gray-500 uppercase font-mono">
                Quantity
              </p>
              <p className="font-semibold mt-1">
                {food.quantity} {food.quantity_unit}
              </p>
            </div>
            <div className="bg-base-200 rounded-box p-4">
              <p className="text-xs text-gray-500 uppercase font-mono">
                Pickup Location
              </p>
              <p className="font-semibold mt-1 flex flex-col md:flex-row items-center gap-2 text-center wrap-break-word w-full">
                <CiLocationOn />
                <span>{food.pickup_location}</span>
              </p>
            </div>
            <div className="bg-base-200 rounded-box p-4">
              <p className="text-xs text-gray-500 uppercase font-mono">
                Expire Date
              </p>
              <p className="font-semibold mt-1">{food.expire_date}</p>
            </div>
            <div className="bg-base-200 rounded-box p-4">
              <p className="text-xs text-gray-500 uppercase font-mono">
                Pickup Time
              </p>
              <p className="font-semibold mt-1">
                {food.pickup_time || "Flexible"}
              </p>
            </div>
          </div>

          {/* Donator info */}
          <div className="flex items-center gap-3 bg-base-100 border border-base-200 rounded-box p-4 mt-6">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={
                    food.donator?.image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={food.donator?.name}
                />
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm">{food.donator?.name}</p>
              <p className="text-xs text-gray-500">{food.donator?.email}</p>
            </div>
            <span className="badge badge-ghost text-secondary ml-auto text-base">
              Donator
            </span>
          </div>

          {/* Additional notes */}
          {food.notes && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 uppercase font-mono mb-1">
                Additional Notes
              </p>
              <p className="text-sm text-gray-600 bg-base-200 rounded-box p-4">
                {food.notes}
              </p>
            </div>
          )}

          {/* Request Food */}
          <div className="mt-8">
            {isOwner ? (
              <div className="alert bg-base-200 text-sm text-red-500 font-medium">
                This is your own listing — you can't request it.
              </div>
            ) : (
              <button
                onClick={openRequestModal}
                disabled={!isAvailable || alreadyRequested}
                className="btn btn-secondary w-full sm:w-auto px-10"
              >
                {alreadyRequested || !isAvailable
                  ? "Already Requested"
                  : "Request Food"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Request Food modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Request &ldquo;{food.food_name}&rdquo;
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Tell {food.donator?.name} where to bring it and why you need it.
          </p>

          <form onSubmit={handleSubmitRequest} className="space-y-4 mt-5">
            <div>
              <label className="font-semibold text-sm mb-1 block">
                Your Location
              </label>
              <input
                ref={locationRef}
                type="text"
                placeholder="e.g. Road 7, Dhanmondi, Dhaka"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold text-sm mb-1 block">
                Why Do You Need This Food?
              </label>
              <textarea
                ref={reasonRef}
                rows={3}
                placeholder="Briefly explain your situation"
                required
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div>
              <label className="font-semibold text-sm mb-1 block">
                Contact No.
              </label>
              <input
                ref={contactRef}
                type="tel"
                placeholder="e.g. 01712345678"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeRequestModal}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Food Requests table — owner only */}

      {isOwner && (
        <div className="mt-16">
          <div className="mb-6">
            <p className="badge badge-secondary text-base badge-outline font-semibold mb-3">
              Owner view
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">Food Requests</h2>
            <p className="text-gray-600 mt-1">
              People who've asked to collect this listing. Accept one to mark
              the food as donated.
            </p>
          </div>
          {requestsLoading ? (
            <div className="flex justify-center py-14">
              <span className="loading loading-spinner loading-md text-secondary"></span>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-14 bg-base-200 rounded-box text-gray-500">
              No requests yet for this listing.
            </div>
          ) : (
            <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-box shadow-sm">
              <table className="table">
                <thead>
                  <tr>
                    <th>Requester</th>
                    <th>Location</th>
                    <th>Reason</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 avatar rounded-full">
                            <img
                              src={
                                req.photoURL ||
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                              }
                              alt={req.name}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{req.name}</p>
                            <p className="text-xs text-gray-500">
                              {req.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm">{req.location}</td>
                      <td className="text-sm max-w-xs">
                        <p className="line-clamp-1 lg:line-clamp-2">
                          {req.reason}
                        </p>
                      </td>
                      <td className="text-sm">{req.contact}</td>
                      <td>
                        <span
                          className={`badge capitalize ${
                            req.status === "accepted"
                              ? "badge-success"
                              : req.status === "rejected"
                                ? "badge-error"
                                : "badge-warning"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleAccept(req)}
                            disabled={req.status !== "pending"}
                            className="btn btn-sm btn-success text-white"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(req)}
                            disabled={req.status !== "pending"}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
