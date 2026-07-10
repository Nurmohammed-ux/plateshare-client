import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxios from "../../hooks/UseAxios";
import FoodCart from "../../components/FoodCart/FoodCart";

const AvailableFoods = () => {
  const axios = useAxios();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/foods")
      .then((result) => {
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
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl text-center pb-10 font-bold leading-tight">
          Available <span className="text-gradient">Foods</span>
        </h2>
      </motion.div>

      {/* Food Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {foods.map((food) => (
          <motion.div
            key={food._id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
          >
            <FoodCart food={food} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AvailableFoods;
