import Navbar from "../../components/layout/Navbar";

import Hero from "./sections/Hero";
import SearchBar from "./sections/SearchBar";
import Categories from "./sections/Categories";
import FeaturedPets from "./sections/FeaturedPets";
import HowItWorks from "./sections/HowItWorks";
import AISection from "./sections/AISection";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <SearchBar />

      <Categories />

      <FeaturedPets />

      <HowItWorks />

      <AISection />

      <Testimonials />

      <Footer />
    </>
  );
}

export default Home;