import { IoCheckmarkSharp } from "react-icons/io5";

const OurMission = () => {
  return (
    <div className="py-10 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <img
          src="https://i.ibb.co.com/0pYN4RTf/packing-food.avif"
          alt="Volunteers packing a food donation crate"
          className="rounded-box shadow-xl w-full order-2 lg:order-1"
        />
        <div className="order-1 lg:order-2">
          <p className="badge badge-secondary badge-outline font-semibold mb-3">
            Our mission
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Every bin bag is a missed dinner.{" "}
            <span className="text-transparent bg-clip-text text-gradient">
              We're here to close that gap.
            </span>
          </h2>
          <p className="text-gray-600 mt-4">
            A third of all food produced is never eaten.{" "}
            <span className="text-secondary">PlateShare</span> exists to shrink
            that number one shared meal, one neighbour, one street at a time —
            by making it just as easy to give food away as it is to throw it
            out.
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center-safe gap-3">
              <span>
                <IoCheckmarkSharp size={18} />
              </span>
              <span className="text-gray-600">
                Free to post and free to collect, always.
              </span>
            </li>
            <li className="flex items-center-safe gap-3">
              <span>
                <IoCheckmarkSharp size={18} />
              </span>
              <span className="text-gray-600">
                Built for neighbours, local shops, and community kitchens.
              </span>
            </li>
            <li className="flex items-center-safe gap-3">
              <span>
                <IoCheckmarkSharp size={18} />
              </span>
              <span className="text-gray-600">
                Every listing helps keep good food out of landfill.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
