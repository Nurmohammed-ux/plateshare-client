import { motion } from "framer-motion";
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
      {/* Heading */}
      <motion.div
        className="text-center max-w-2xl mx-auto mb-12 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="badge badge-secondary badge-outline font-semibold mb-3">
          Three steps, no waste
        </p>

        <h2 className="text-3xl md:text-4xl font-bold">
          How <span className="text-secondary px-1">PlateShare</span> Works
        </h2>

        <p className="text-gray-600 mt-3">
          Every listing moves through the same simple path, from someone's
          kitchen to someone else's table.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.ul
        className="steps steps-horizontal w-full px-4 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {STEPS.map((step) => (
          <li key={step.title} className="step step-secondary font-semibold">
            {step.title}
          </li>
        ))}
      </motion.ul>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-5xl mx-auto"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="card bg-base-100 shadow-sm border border-base-200"
          >
            <div className="card-body items-center text-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {step.icon}
              </motion.div>

              <h3 className="card-title text-lg">
                {i + 1}. {step.title}
              </h3>

              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
