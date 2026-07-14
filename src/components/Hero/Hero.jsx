import { Link } from "react-router";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="hero bg-base-100 min-h-150 rounded-box">
      <div className="hero-content w-full max-w-none flex-col justify-between lg:flex-row-reverse gap-12 lg:gap-20 px-4 lg:px-6 py-16 lg:py-24">
        {/* Hero Image */}
        <motion.img
          src="https://i.ibb.co.com/PZdckWfh/hero-banner.avif"
          alt="Neighbours sharing a meal"
          className="h-125 lg:h-140 w-full lg:w-1/2 rounded-[30%_0_30%_0] object-cover shadow-xl"
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
        />

        {/* Hero Content */}
        <motion.div
          className="flex-1 max-w-2xl lg:max-w-4xl text-center lg:text-left"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
        >
          <p className="badge text-secondary text-xl p-4 badge-outline font-semibold mb-4">
            Share more, waste less
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Good food finds a{" "}
            <span className="text-transparent bg-clip-text text-gradient">
              good home
            </span>
            , not a bin.
          </h1>

          <p className="py-6 text-gray-600 text-base md:text-lg">
            <span className="text-gradient font-semibold">PlateShare</span>{" "}
            connects neighbours with spare food to the people nearby who can use
            it. Post what you can't finish, find what you need, and collect it
            round the corner before it goes to waste.
          </p>

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.15 }}
            className="flex justify-center lg:justify-start"
          >
            <Link
              to="/availableFoods"
              className="btn btn-outline btn-secondary px-6"
            >
              Search Food
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="stats stats-vertical sm:stats-horizontal text-center shadow-sm mt-10 bg-base-100 border border-base-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.8 }}
          >
            <div className="stat p-6">
              <div className="stat-value text-3xl text-secondary">12.4k</div>
              <div className="stat-desc text-base">Meals rescued</div>
            </div>

            <div className="stat p-6">
              <div className="stat-value text-3xl text-secondary">3,180</div>
              <div className="stat-desc text-base">Neighbours sharing</div>
            </div>

            <div className="stat p-6">
              <div className="stat-value text-3xl text-secondary">96%</div>
              <div className="stat-desc text-base">Collected same day</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
