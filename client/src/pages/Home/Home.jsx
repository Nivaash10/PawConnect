import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Hero from "./sections/Hero";
import SearchBar from "./sections/SearchBar";
import Categories from "./sections/Categories";
import FeaturedPets from "./sections/FeaturedPets";
import HowItWorks from "./sections/HowItWorks";
import AISection from "./sections/AISection";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import { FaPaw, FaArrowRight, FaRobot } from "react-icons/fa";

function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 overflow-hidden text-white">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold px-4 py-2 rounded-full mb-5">
                <FaPaw className="text-xs" />
                Start Your Journey Today
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                A Perfect Pet Is
                <span className="text-orange-400 block">Waiting For You</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">
                Join PawConnect — browse real listings, get AI-powered care advice, and find a companion that fits your life perfectly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link to="/marketplace">
                <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-sm transition shadow-lg shadow-orange-900/30 w-full sm:w-auto cursor-pointer">
                  <FaPaw /> Browse Pets <FaArrowRight className="text-xs" />
                </button>
              </Link>
              <Link to="/ai">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm transition w-full sm:w-auto cursor-pointer">
                  <FaRobot /> Try AI Assistant
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      <CtaBanner />
      <Footer />
    </>
  );
}

export default Home;