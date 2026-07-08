import { useEffect, useState } from "react";
import useAxios from "../../hooks/UseAxios";
import FoodCart from "../../components/FoodCart/FoodCart";

const AvailableFoods = () => {
  const axios = useAxios();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  //   console.log(foods);

  useEffect(() => {
    axios
      .get("/foods")
      .then((result) => {
        // console.log(result.data);
        setFoods(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [axios]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 lg:px-0">
      <h2 className="text-2xl md:text-3xl text-center pb-10 font-bold leading-tight">
        Available <span className="text-gradient">Foods</span>
      </h2>
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

export default AvailableFoods;
