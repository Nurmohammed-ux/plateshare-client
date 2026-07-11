import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  const modalRef = useRef(null);
  const additionalNoteRef = useRef(null);
  console.log(id)

  useEffect(() => {
    axiosSecure
      .get(`/foods/${id}`)
      .then((res) => {setFood(res.data);
        console.log("inside foodDetails",res.data)
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load this food listing",
        });
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, id]);

  const isOwnListing = food?.donator?.email === user?.email;
  const isAvailable = food?.status === "available";

  const openRequestModal = () => modalRef.current?.showModal();
  const closeRequestModal = () => modalRef.current?.close();

//   const handleConfirmRequest = async () => {
//     try {
//       setRequesting(true);

//       const requestData = {
//         foodId: food._id,
//         foodName: food.food_name,
//         foodImage: food.food_image,
//         donatorEmail: food.donator?.email,
//         donatorName: food.donator?.name,
//         pickupLocation: food.pickup_location,
//         expireDate: food.expire_date,
//         requesterEmail: user.email,
//         requesterName: user.displayName,
//         requesterImage: user.photoURL,
//         requestDate: new Date().toISOString(),
//         additionalNote: additionalNoteRef.current?.value || "",
//         status: "pending",
//       };

//       const res = await axiosSecure.post("/foodRequests", requestData);

//       if (res.data.insertedId) {
//         // Reflect the request locally so the button updates immediately.
//         await axiosSecure.patch(`/foods/${id}`, { status: "requested" });
//         setFood((prev) => ({ ...prev, status: "requested" }));
//         setAlreadyRequested(true);
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Request sent to the donator!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         closeRequestModal();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Something went wrong. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.message || "Failed to send request",
//       });
//     } finally {
//       setRequesting(false);
//     }
//   };

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
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={food.food_image}
            alt={food.food_name}
            className="w-full h-100 lg:h-full object-cover rounded-box shadow-sm border border-base-200"
          />
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`badge capitalize ${
                food.status === "available" ? "badge-success" : "badge-ghost"
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

          <div className="grid grid-cols-2 gap-4 mt-6">
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
              <p className="font-semibold mt-1">📍 {food.pickup_location}</p>
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
            <span className="badge badge-ghost ml-auto text-xs">Donator</span>
          </div>

          {/* Additional notes */}
          {food.notes && (
            <div className="mt-6">
              <p className="text-xs text-gray-500 uppercase font-mono mb-1">
                Additional Notes
              </p>
              <p className="text-sm text-gray-600 bg-base-200 rounded-box p-4">
                {food.notes}
              </p>
            </div>
          )}

          {/* Request Food */}
          <div className="mt-8">
            {isOwnListing ? (
              <div className="alert bg-base-200 text-sm">
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

      {/* Request confirmation modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Request &ldquo;{food.food_name}&rdquo;
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {food.donator?.name} will be notified. Confirm the pickup details
            below and add a note if you'd like.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="bg-base-200 rounded-box p-3">
              <p className="text-xs text-gray-500">Pickup Location</p>
              <p className="font-semibold">{food.pickup_location}</p>
            </div>
            <div className="bg-base-200 rounded-box p-3">
              <p className="text-xs text-gray-500">Expire Date</p>
              <p className="font-semibold">{food.expire_date}</p>
            </div>
          </div>

          <label className="font-semibold text-sm mt-4 mb-1 block">
            Additional note (optional)
          </label>
          <textarea
            ref={additionalNoteRef}
            rows={3}
            placeholder="e.g. I can collect any time after 6pm."
            className="textarea textarea-bordered w-full"
          ></textarea>

          <div className="modal-action">
            <button onClick={closeRequestModal} className="btn btn-ghost">
              Cancel
            </button>
            <button
            //   onClick={handleConfirmRequest}
              disabled={requesting}
              className="btn btn-primary"
            >
              {requesting ? "Sending..." : "Confirm Request"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FoodDetails;
