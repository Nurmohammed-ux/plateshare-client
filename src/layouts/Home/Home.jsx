import { Link } from "react-router";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import OurMission from "../../components/OurMission/OurMission";
import CommunityImpact from "../../components/CommunityImpact/CommunityImpact";
import Testimonials from "../../components/Testimonials/Testimonials";
import Faq from "../../components/Faq/Faq";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedFoods />
      <div className="flex justify-center">
        <Link
          to={`/availableFoods`}
          className="btn text-base btn-outline my-10 px-6 py-3 font-semibold btn-secondary"
        >
          View All
        </Link>
      </div>
      <HowItWorks />
      <OurMission />
      <CommunityImpact />
      <Testimonials />
      <Faq />
    </div>
  );
};

export default Home;
