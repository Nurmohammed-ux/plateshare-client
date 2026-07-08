import { useEffect, useState } from "react";
import useAxios from "../../hooks/UseAxios";
import FoodCart from "../FoodCart/FoodCart";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios("/featuredFoods")
      .then((result) => {
        console.log(result.data);
        setFoods(result.data);
        setLoading(false)
      })
      .catch((error) => {
        // Correct way to handle fetch errors
        console.log("Error fetching foods:", error.message);
      });
  }, [axios]);
  return (
    <div className="px-3">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="badge badge-secondary badge-outline font-semibold mb-3">
          Featured right now
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">Fresh off the shelf</h2>
        <p className="text-gray-600 mt-3">
          The six listings with the most food to share, so a little effort finds
          a lot of mouths to feed &mdash; sorted by servings available.
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <FoodCart key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedFoods;
