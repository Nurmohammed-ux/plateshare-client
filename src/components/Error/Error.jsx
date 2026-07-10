import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center py-20 bg-base-100 px-4">
      <div className="text-center max-w-2xl">
        <img
          src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
          alt="404 Not Found"
          className="w-full max-w-xl mx-auto rounded-lg"
        />

        <h1 className="text-5xl font-bold mt-8">4<span className="text-secondary">0</span>4</h1>

        <h2 className="text-2xl font-semibold mt-3">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to <span className="text-secondary font-medium">PlateShare</span>.
        </p>

        <Link to="/" className="btn btn-secondary mt-8 px-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;