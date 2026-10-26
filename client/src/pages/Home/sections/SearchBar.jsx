import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("All Pets");
  const [purpose, setPurpose] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchTerm.trim()) params.append("search", searchTerm.trim());
    if (location.trim()) params.append("location", location.trim());
    if (species && species !== "All Pets") params.append("species", species);
    if (purpose && purpose !== "All") params.append("purpose", purpose);

    const queryString = params.toString();
    navigate(queryString ? `/marketplace?${queryString}` : "/marketplace");
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6">
            🔍 Search Your Perfect Pet
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {/* Search Keyword */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm font-medium">
                Pet Name / Breed
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. Buddy, Golden"
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm font-medium">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter City"
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>

            {/* Pet Type */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm font-medium">
                Pet Type
              </label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
              >
                <option value="All Pets">All Pets</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm font-medium">
                Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
              >
                <option value="All">All Purposes</option>
                <option value="Adoption">Adoption</option>
                <option value="Sale">Sale</option>
              </select>
            </div>

            {/* Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white rounded-xl p-3 hover:bg-orange-600 transition font-semibold cursor-pointer text-sm shadow-sm"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;