import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const QUANTITY_UNITS = [
  "Servings",
  "Plates",
  "Pieces",
  "Boxes",
  "Packs",
  "Kg",
  "People",
];

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axiosSecure
      .get(`/foods/${id}`)
      .then((res) => {
        setFood(res.data);
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

  // Only re-uploads to imgbb if the user picked a new image; otherwise keeps the old URL.
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData,
    );
    return data.data.display_url;
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      setSaving(true);

      let food_image = food.food_image;
      if (imageFile) {
        setUploading(true);
        food_image = await uploadImage(imageFile);
        setUploading(false);
      }

      const updatedFood = {
        food_name: form.food_name.value,
        food_image,
        quantity: Number(form.quantity.value),
        quantity_unit: form.quantity_unit.value,
        pickup_location: form.pickup_location.value,
        expire_date: form.expire_date.value,
        notes: form.notes.value,
        status: form.status.value,
        updated_at: new Date().toISOString(),
      };

      const res = await axiosSecure.patch(`/foods/${id}`, updatedFood);

      if (res.data.matchedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Food listing updated!",
          showConfirmButton: false,
          timer: 1500,
        });
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
      setUploading(false);
      setSaving(false);
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
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <p className="badge badge-secondary text-base badge-outline font-semibold mb-3">
          Editing listing
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">Update Food</h1>
        <p className="text-gray-600 mt-2">
          Make your changes below and save to update this listing.
        </p>
      </div>

      <form
        onSubmit={handleUpdateFood}
        className="card bg-base-100 shadow-sm border border-base-200 p-6 md:p-8 space-y-5"
      >
        {/* Food name */}
        <div>
          <label className="font-semibold text-sm mb-1 block">Food Name</label>
          <input
            type="text"
            name="food_name"
            defaultValue={food.food_name}
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
            className="file-input file-input-bordered w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to keep the current image.
          </p>
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
              defaultValue={food.quantity}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-semibold text-sm mb-1 block">Unit</label>
            <select
              name="quantity_unit"
              defaultValue={food.quantity_unit}
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
            defaultValue={food.pickup_location}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Expire date */}
        <div>
          <label className="font-semibold text-sm mb-1 block">
            Expire Date
          </label>
          <input
            type="date"
            name="expire_date"
            defaultValue={food.expire_date}
            min={today}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Status */}
        <div>
          <label className="font-semibold text-sm mb-1 block">Status</label>
          <select
            name="status"
            defaultValue={food.status}
            className="select select-bordered w-full"
          >
            <option value="available">Available</option>
            <option value="requested">Requested</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Additional notes */}
        <div>
          <label className="font-semibold text-sm mb-1 block">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={food.notes}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn btn-secondary w-full mt-2"
        >
          {uploading
            ? "Uploading image..."
            : saving
              ? "Saving changes..."
              : "Update Food"}
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
