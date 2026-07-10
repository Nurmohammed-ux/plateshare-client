import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxios from "../../hooks/UseAxios";
import FoodCart from "../FoodCart/FoodCart";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const axios = useAxios();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/featuredFoods")
      .then((result) => {
        setFoods(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching foods:", error.message);
      });
  }, [axios]);

  return (
    <div className="px-3">
      {/* Heading */}
      <motion.div
        className="text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <p className="badge badge-secondary badge-outline font-semibold mb-3">
          Featured right now
        </p>

        <h2 className="text-3xl md:text-4xl font-bold">Fresh off the shelf</h2>

        <p className="text-gray-600 mt-3">
          The six listings with the most food to share, so a little effort finds
          a lot of mouths to feed &mdash; sorted by servings available.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
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
      )}
    </div>
  );
};

export default FeaturedFoods;
