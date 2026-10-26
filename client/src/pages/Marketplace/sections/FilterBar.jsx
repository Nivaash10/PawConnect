import { useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaSlidersH,
} from "react-icons/fa";

const SPECIES_OPTIONS = ["All Pets", "Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];
const LOCATION_OPTIONS = ["Any Location", "Coimbatore", "Chennai", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Delhi"];
const PURPOSE_OPTIONS = ["All", "Adoption", "Sale"];
const PRICE_OPTIONS = ["Any Price", "Free Adoption", "₹0–₹5k", "₹5k–₹10k", "₹10k–₹20k", "₹20k+"];

function FilterBar({ filters, setFilters }) {
  const [locationText, setLocationText] = useState(
    filters?.location && filters.location !== "Any Location" ? filters.location : ""
  );

  const handleChange = (field, value) => {
    if (setFilters) {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleLocationChange = (e) => {
    const val = e.target.value;
    setLocationText(val);
    handleChange("location", val || "Any Location");
  };

  const hasActiveFilters =
    (filters?.search && filters.search.trim() !== "") ||
    (filters?.species && filters.species !== "All Pets") ||
    (filters?.location && filters.location !== "Any Location") ||
    (filters?.purpose && filters.purpose !== "All") ||
    (filters?.priceRange && filters.priceRange !== "Any Price");

  const handleClearAll = () => {
    setLocationText("");
    if (setFilters) {
      setFilters({
        search: "",
        species: "All Pets",
        location: "Any Location",
        purpose: "All",
        priceRange: "Any Price",
      });
    }
  };

  // Active filter chips
  const activeChips = [];
  if (filters?.species && filters.species !== "All Pets") {
    activeChips.push({ label: filters.species, field: "species", reset: "All Pets" });
  }
  if (filters?.location && filters.location !== "Any Location") {
    activeChips.push({ label: filters.location, field: "location", reset: "Any Location" });
  }
  if (filters?.purpose && filters.purpose !== "All") {
    activeChips.push({ label: filters.purpose, field: "purpose", reset: "All" });
  }
  if (filters?.priceRange && filters.priceRange !== "Any Price") {
    activeChips.push({ label: filters.priceRange, field: "priceRange", reset: "Any Price" });
  }

  return (
    <section className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-5">
        {/* Filter row */}
        <div className="flex items-center gap-2 mb-4">
          <FaSlidersH className="text-orange-500 text-base flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-700 mr-2">Filters</span>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="relative lg:col-span-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search pets…"
                value={filters?.search || ""}
                onChange={(e) => handleChange("search", e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-gray-50"
              />
            </div>

            {/* Species */}
            <div>
              <select
                value={filters?.species || "All Pets"}
                onChange={(e) => handleChange("species", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-gray-50 appearance-none cursor-pointer"
              >
                {SPECIES_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Location text input */}
            <div>
              <input
                type="text"
                placeholder="City or location…"
                value={locationText}
                onChange={handleLocationChange}
                list="location-suggestions"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-gray-50"
              />
              <datalist id="location-suggestions">
                {LOCATION_OPTIONS.slice(1).map((l) => (
                  <option key={l} value={l} />
                ))}
              </datalist>
            </div>

            {/* Purpose */}
            <div>
              <select
                value={filters?.purpose || "All"}
                onChange={(e) => handleChange("purpose", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-gray-50 appearance-none cursor-pointer"
              >
                {PURPOSE_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <select
                value={filters?.priceRange || "Any Price"}
                onChange={(e) => handleChange("priceRange", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-gray-50 appearance-none cursor-pointer"
              >
                {PRICE_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-orange-600 bg-gray-100 hover:bg-orange-50 px-3 py-2.5 rounded-xl transition flex-shrink-0"
            >
              <FaTimes className="text-[10px]" />
              Clear
            </button>
          )}
        </div>

        {/* Active chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.field}
                onClick={() => {
                  handleChange(chip.field, chip.reset);
                  if (chip.field === "location") setLocationText("");
                }}
                className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-orange-200 transition border border-orange-200"
              >
                {chip.label}
                <FaTimes className="text-[9px]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FilterBar;