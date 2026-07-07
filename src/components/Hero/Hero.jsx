import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="hero bg-base-100 min-h-100 rounded-box">
      <div className="hero-content  flex-col justify-between lg:flex-row-reverse gap-12 py-16 lg:py-24">
        <img
          src="https://i.ibb.co.com/PZdckWfh/hero-banner.avif"
          className="h-125 lg:h-150 w-full lg:w-1/2 static  rounded-[30%_0_30%_0] object-cover shadow-xl"
          alt="Neighbours sharing a meal"
        />
        <div className="flex-1 max-w-2xl lg:max-w-4xl text-center lg:text-left">
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
            it. Post what you can&apos;t finish, find what you need, and collect
            it round the corner &mdash; before it goes to waste.
          </p>
          <div className="flex flex-wrap my-4 gap-3 justify-center lg:justify-start">
            <Link
              to="/availableFoods"
              className="btn bg-primary-gradient text-white font-semibold px-6"
            >
              Search Food
            </Link>
            <Link
              to="/availableFoods"
              className="btn btn-outline btn-secondary px-6"
            >
              View All Foods
            </Link>
          </div>

          <div className="stats stats-vertical text-center sm:stats-horizontal shadow-sm mt-10 bg-base-100 border border-base-200">
            <div className="stat p-6">
              <div className="stat-value text-3xl text-secondary">12.4k</div>
              <div className="stat-desc text-base">meals rescued</div>
            </div>
            <div className="stat p-6">
              <div className="stat-value text-3xl text-secondary">3,180</div>
              <div className="stat-desc text-base">neighbours sharing</div>
            </div>
            <div className="stat p-6">
              <div className="stat-value text-3xl text-secondary">96%</div>
              <div className="stat-desc text-base">collected same day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
