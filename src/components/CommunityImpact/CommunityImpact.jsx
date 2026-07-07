import { FaPlateWheat, FaShop, FaTree } from "react-icons/fa6";
import { MdHandshake } from "react-icons/md";

const stats = [
  { label: "Meals rescued this year", value: "12,400", icon: <FaPlateWheat /> },
  { label: "Neighbours sharing food", value: "3,180", icon: <MdHandshake /> },
  { label: "Food kept out of landfill", value: "2.6t", icon: <FaTree /> },
  { label: "Local shops on board", value: "410", icon: <FaShop /> },
];

const CommunityImpact = () => {
  return (
    <div className="pb-10">
      <div className="bg-neutral/80 text-neutral-content rounded-box px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="badge badge-secondary font-semibold mb-3">
            Community impact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Numbers that keep growing
          </h2>
          <p className="opacity-70 mt-3">
            Every listing on <span className="text-secondary">PlateShare</span> adds up to fewer bins full of good food
            and more full plates nearby.
          </p>
        </div>

        <div className="stats stats-vertical sm:stats-horizontal shadow-sm bg-base-100/5 border border-base-100/10 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat place-items-center flex flex-col py-8"
            >
              <div className="stat-figure text-3xl">{stat.icon}</div>
              <div className="stat-value text-secondary">{stat.value}</div>
              <div className="stat-desc text-white opacity-70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityImpact;
