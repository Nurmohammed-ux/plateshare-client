import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/myFoods?email=${user.email}`)
      .then((result) => setFoods(result.data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load your foods.",
        });
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, user]);

  const handleDelete = (id, foodName) => {
    Swal.fire({
      title: "Delete this listing?",
      text: `"${foodName}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure
          .delete(`/foods/${id}`)
          .then((result) => {
            if (result.data.deletedCount > 0) {
              setFoods((prev) => prev.filter((food) => food._id !== id));
              Swal.fire(
                "Deleted!",
                "Your food listing has been removed.",
                "success",
              );
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the listing",
            });
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 md:px-0 py-14">
      <div className="mb-10 flex flex-col items-center">
        <p className="badge badge-secondary text-base badge-outline font-semibold mb-3">
          Your listings
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Manage My <span className="text-gradient">Foods</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Every item you've shared, in one place. Update the details or remove a
          listing once it's gone.
        </p>
      </div>

      {foods.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-box">
          <p className="text-gray-500">You haven't added any food yet.</p>
          <Link to="/addFood" className="btn btn-secondary btn-sm mt-4">
            Add your first food
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-lg shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <img
                          className="w-12 h-10 rounded-box"
                          src={food.food_image}
                          alt={food.food_name}
                        />
                      </div>
                      <p className="font-semibold">{food.food_name}</p>
                    </div>
                  </td>
                  <td>
                    {food.quantity} {food.quantity_unit}
                  </td>
                  <td>{food.pickup_location}</td>
                  <td className="font-mono text-sm">{food.expire_date}</td>
                  <td>
                    <span
                      className={`badge ${
                        food.status === "available"
                          ? "badge-success"
                          : "badge-ghost"
                      } capitalize`}
                    >
                      {food.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2 lg:gap-4">
                      <Link
                        to={`/update-food/${food._id}`}
                        className="btn btn-sm btn-outline btn-secondary"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(food._id, food.food_name)}
                        className="btn btn-sm font-medium btn-outline btn-error"
                      >
                        Delete
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
  );
};

export default ManageMyFoods;
