import { IoLocationOutline, IoTimerOutline } from "react-icons/io5";
import { Link } from "react-router";

const FoodCart = ({ food }) => {
  const {
    _id,
    food_image,
    food_name,
    quantity,
    pickup_location,
    pickup_time,
    expire_date,
  } = food;
  return (
    <div>
      <div
        key={_id}
        className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-lg transition-shadow"
      >
        <figure className="h-74 relative">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-full object-cover"
          />
          <span className="badge badge-secondary p-3 absolute top-3 right-3 font-semibold">
            Serves {quantity}
          </span>
        </figure>
        <div className="card-body">
          <h3 className="card-title text-lg">{food_name}</h3>
          <p className="text-sm flex items-center gap-2 text-gray-500">
            <IoLocationOutline /> {pickup_location}
          </p>
          <p className="text-sm flex items-center gap-2 text-gray-500"><IoTimerOutline />  {pickup_time}</p>
          <div className="card-actions justify-between items-center mt-2">
            <span className="text-xs font-mono text-gray-400">
              Use by {expire_date}
            </span>
            <Link
              to={`/food/${_id}`}
              className="btn btn-sm btn-outline btn-secondary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
