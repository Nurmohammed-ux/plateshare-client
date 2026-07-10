import { useState } from "react";
import { useNavigate } from "react-router";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const QUANTITY_UNITS = [
  "Servings",
  "Plates",
  "Pieces",
  "Boxes",
  "Packs",
  "Kg",
  "People",
];

const AddFood = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // prevents picking a past expire date

  // Uploads the selected image to imgbb and returns the hosted display URL.
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData,
    );
    return data.data.display_url;
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!imageFile) {
      return Swal.fire("Please select a food image");
    }

    try {
      setLoading(true);
      const food_image = await uploadImage(imageFile);

      const formatTime = (time) => {
        const [hour, minute] = time.split(":");

        const date = new Date();
        date.setHours(Number(hour));
        date.setMinutes(Number(minute));

        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      };
      const pickup_time = `${formatTime(form.pickup_start.value)} - ${formatTime(form.pickup_end.value)}`;

      const food = {
        food_name: form.food_name.value,
        food_image,
        quantity: Number(form.quantity.value),
        quantity_unit: form.quantity_unit.value,
        pickup_location: form.pickup_location.value,
        pickup_time: pickup_time,
        expire_date: form.expire_date.value,
        notes: form.notes.value,
        status: "available",
        donator: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        request_count: 0,
        requested_by: null,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const result = await axiosSecure.post("/foods", food);

      if (result.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Food added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        setImageFile(null);
        navigate("/manageMyFoods");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message || "Failed to update food",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <p className="badge badge-secondary text-base badge-outline font-semibold mb-3">
          Share your surplus
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Add <span className="text-gradient">Food</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below so a neighbour nearby can find and collect
          it.
        </p>
      </div>

      <form
        onSubmit={handleAddFood}
        className="card bg-base-100 shadow-sm border border-base-200 p-6 md:p-8 space-y-5"
      >
        {/* Donator info — auto-filled from the logged-in Firebase user, read-only */}
        <div className="flex items-center gap-3 bg-base-200 rounded-box p-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="Donator"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.displayName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <span className="badge badge-ghost ml-auto text-xs">Donator</span>
        </div>

        {/* Food name */}
        <div>
          <label className="font-semibold text-sm mb-1 block">Food Name</label>
          <input
            type="text"
            name="food_name"
            placeholder="e.g. Beef Curry"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Food image */}
        <div>
          <label className="font-semibold text-sm mb-1 block">Food Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-sm mb-1 block">
              Food Quantity
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              placeholder="e.g. 5"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-semibold text-sm mb-1 block">Unit</label>
            <select
              name="quantity_unit"
              className="select select-bordered w-full"
              required
            >
              {QUANTITY_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pickup location */}
        <div>
          <label className="font-semibold text-sm mb-1 block">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickup_location"
            placeholder="e.g. Mirpur, Dhaka"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-sm mb-1 block">
              Pickup Start Time
            </label>
            <input
              type="time"
              name="pickup_start"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-semibold text-sm mb-1 block">
              Pickup End Time
            </label>
            <input
              type="time"
              name="pickup_end"
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Expire date */}
        <div>
          <label className="font-semibold text-sm mb-1 block">
            Expire Date
          </label>
          <input
            type="date"
            name="expire_date"
            min={today}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Additional notes */}
        <div>
          <label className="font-semibold text-sm mb-1 block">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="e.g. Please bring your own food container."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn font-semibold btn-secondary w-full mt-2"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
