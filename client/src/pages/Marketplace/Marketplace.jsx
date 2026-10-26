import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import FilterBar from "./sections/FilterBar";
import PetGrid from "./sections/PetGrid";
import Footer from "../Home/sections/Footer";
import { FaPaw } from "react-icons/fa";

function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters = {
    search: searchParams.get("search") || "",
    species: searchParams.get("species") || "All Pets",
    location: searchParams.get("location") || "Any Location",
    purpose: searchParams.get("purpose") || "All",
    priceRange: searchParams.get("priceRange") || "Any Price",
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      species: searchParams.get("species") || "All Pets",
      location: searchParams.get("location") || "Any Location",
      purpose: searchParams.get("purpose") || "All",
      priceRange: searchParams.get("priceRange") || "Any Price",
    });
  }, [searchParams]);

  const handleResetFilters = () => {
    const reset = {
      search: "",
      species: "All Pets",
      location: "Any Location",
      purpose: "All",
      priceRange: "Any Price",
    };
    setFilters(reset);
    setSearchParams({});
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaPaw className="text-orange-500 text-sm" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900">Pet Marketplace</h1>
            </div>
            <p className="text-gray-500 text-base ml-12">
              Browse verified pets available for adoption or sale across India.
            </p>
          </div>
        </section>

        <FilterBar filters={filters} setFilters={setFilters} />

        <PetGrid filters={filters} onResetFilters={handleResetFilters} />
      </main>

      <Footer />
    </>
  );
}

export default Marketplace;