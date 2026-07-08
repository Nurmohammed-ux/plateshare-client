import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiSlicedBread } from "react-icons/gi";

const STEPS = [
  {
    title: "Post Food",
    desc: "Snap a photo, say how many it serves, and set where and when it can be picked up.",
    icon: <GiSlicedBread fill="#AD9300" />,
  },
  {
    title: "Find Food",
    desc: "Browse what's nearby, filter by distance or servings, and claim what your household needs.",
    icon: <FaMagnifyingGlass fill="blue" />,
  },
  {
    title: "Collect Food",
    desc: "Message the poster, agree a time, and pick it up — usually within walking distance.",
    icon: "🧺",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-20 bg-base-200 rounded-box">
      <div className="text-center max-w-2xl mx-auto mb-12 px-4">
        <p className="badge badge-secondary badge-outline font-semibold mb-3">
          Three steps, no waste
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">How <span className="text-secondary px-1">PlateShare</span> Works</h2>
        <p className="text-gray-600 mt-3">
          Every listing moves through the same simple path, from someone&apos;s
          kitchen to someone else&apos;s table.
        </p>
      </div>

      <ul className="steps steps-horizontal w-full px-4 mb-10">
        {STEPS.map((step) => (
          <li key={step.title} className="step step-secondary font-semibold">
            {step.title}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-5xl mx-auto">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="card bg-base-100 shadow-sm border border-base-200"
          >
            <div className="card-body items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                {step.icon}
              </div>
              <h3 className="card-title text-lg">
                {i + 1}. {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;