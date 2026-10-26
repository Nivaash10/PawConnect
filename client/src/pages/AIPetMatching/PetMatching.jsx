import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaMagic,
  FaCheckCircle,
  FaSlidersH,
  FaArrowRight,
  FaRedo,
  FaPaw,
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";
import PetCard from "../Marketplace/sections/PetCard";
import { fetchPetsFromSupabase } from "../../services/petService";
import { calculatePetMatches } from "../../services/aiService";

function PetMatching() {
  const [formData, setFormData] = useState({
    species: "Dog",
    age: "Young",
    location: "Coimbatore",
    homeType: "Apartment",
    activityLevel: "Moderate",
    experience: "Beginner",
    hasKids: true,
    hasPets: true,
    purpose: "Adoption",
    budget: "Free Adoption",
  });

  const [allPets, setAllPets] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    fetchPetsFromSupabase()
      .then(({ data }) => {
        setAllPets(data || []);
      })
      .catch((err) => {
        console.warn("Error prefetching pets for matcher:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSubmitted(true);

    setTimeout(() => {
      const results = calculatePetMatches(formData, allPets);
      setMatches(results.slice(0, 3));
      setLoading(false);
    }, 600);
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white mb-10 shadow-lg shadow-orange-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                <FaRobot className="text-sm" />
                Smart AI Companion Finder
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Find My Ideal Pet</h1>
              <p className="text-orange-100 text-sm mt-1 max-w-xl">
                Answer a few quick lifestyle questions. PawConnect AI will analyze live marketplace listings to recommend your top pet matches!
              </p>
            </div>
            <Link
              to="/marketplace"
              className="bg-white text-orange-600 hover:bg-orange-50 px-5 py-3 rounded-2xl font-bold text-sm transition shadow-sm flex items-center gap-2 flex-shrink-0"
            >
              <FaPaw /> Browse All Pets
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Column: Questionnaire Form */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-fit">
              <div className="flex items-center gap-2 pb-4 mb-5 border-b border-gray-100 font-bold text-gray-800 text-lg">
                <FaSlidersH className="text-orange-500 text-base" />
                Matching Questionnaire
              </div>

              <form onSubmit={handleMatchSubmit} className="space-y-4 text-sm">
                {/* Species */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Preferred Pet Type
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 text-sm focus:border-orange-500 outline-none"
                  >
                    <option value="Any">Any Species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Location Preference
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 text-sm focus:border-orange-500 outline-none"
                  >
                    <option value="Any">Any Location</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>

                {/* Purpose & Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Purpose
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 text-sm focus:border-orange-500 outline-none"
                    >
                      <option value="Any">Any</option>
                      <option value="Adoption">Adoption</option>
                      <option value="Sale">Sale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Max Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 text-sm focus:border-orange-500 outline-none"
                    >
                      <option value="Free Adoption">Free Only</option>
                      <option value="Up to ₹10k">₹10k</option>
                      <option value="Up to ₹25k">₹25k</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                </div>

                {/* Home Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Home Environment
                  </label>
                  <select
                    name="homeType"
                    value={formData.homeType}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 text-sm focus:border-orange-500 outline-none"
                  >
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="House with yard">House with Fenced Yard</option>
                    <option value="Farm/Rural">Farm / Large Estate</option>
                  </select>
                </div>

                {/* Activity Level & Experience */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Activity Level
                    </label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 text-sm focus:border-orange-500 outline-none"
                    >
                      <option value="Low">Low / Relaxed</option>
                      <option value="Moderate">Moderate Walks</option>
                      <option value="High">High / Active</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Pet Experience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-800 text-sm focus:border-orange-500 outline-none"
                    >
                      <option value="Beginner">First Time</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Experienced">Experienced</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasKids"
                      checked={formData.hasKids}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                    />
                    Children at home
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasPets"
                      checked={formData.hasPets}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                    />
                    Other pets at home
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition shadow-md shadow-orange-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing Matches…
                    </>
                  ) : (
                    <>
                      Find AI Matches
                      <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Recommendations Results */}
            <div className="lg:col-span-2 space-y-6">
              {!hasSubmitted ? (
                <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    <FaMagic />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Ready to Find Your Match?
                  </h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Select your lifestyle preferences on the left questionnaire and click "Find AI Matches" to see your personalized recommendations.
                  </p>
                </div>
              ) : loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      className="bg-white rounded-3xl h-96 animate-pulse shadow-md p-5 flex flex-col justify-between"
                    >
                      <div className="bg-gray-200 h-48 rounded-2xl w-full" />
                      <div className="space-y-3 mt-4">
                        <div className="bg-gray-200 h-6 rounded w-3/4" />
                        <div className="bg-gray-200 h-4 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : matches.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
                  <p className="text-xl font-bold text-gray-800">No Direct Matches Found</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Try broadening your species or budget preferences to see available pets.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Top AI Pet Recommendations
                      </h2>
                      <p className="text-xs text-gray-500">
                        Matched against live PawConnect marketplace listings
                      </p>
                    </div>
                    <button
                      onClick={handleMatchSubmit}
                      className="text-xs text-orange-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FaRedo className="text-[10px]" /> Re-run Matcher
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {matches.map(({ pet, matchPercentage, matchReasons }) => (
                      <div key={pet.id} className="relative flex flex-col">
                        {/* Match score banner overlay */}
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-3xl px-5 py-3 flex justify-between items-center shadow-md">
                          <span className="text-sm font-extrabold tracking-wide">
                            {pet.name} — {matchPercentage}% Match
                          </span>
                          <span className="bg-white/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                            Top Recommendation ⭐
                          </span>
                        </div>

                        {/* Match Reasons Card */}
                        <div className="bg-orange-50 border-x border-orange-200 p-4 space-y-1 text-xs text-orange-950 font-medium">
                          {matchReasons.map((reason, idx) => (
                            <p key={idx} className="flex items-center gap-1.5">
                              {reason}
                            </p>
                          ))}
                        </div>

                        {/* PetCard */}
                        <div className="flex-1 border-x border-b border-gray-200 rounded-b-3xl overflow-hidden bg-white">
                          <PetCard pet={pet} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PetMatching;
