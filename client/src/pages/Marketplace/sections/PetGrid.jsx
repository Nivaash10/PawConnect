import { useEffect, useState } from "react";
import PetCard from "./PetCard";
import NoPets from "./NoPets";
import { fetchPetsFromSupabase } from "../../../services/petService";
import { FaSync, FaExclamationTriangle } from "react-icons/fa";

function PetGrid({ filters, onResetFilters }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPets = () => {
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError("Request timed out. Please check your connection and try again.");
    }, 8000);

    fetchPetsFromSupabase(filters)
      .then(({ data, error: err }) => {
        clearTimeout(timeoutId);
        if (err) {
          setError(typeof err === "string" ? err : err.message || "Error loading pets");
        } else {
          setError(null);
        }
        setPets(data || []);
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        setError(err?.message || "Unexpected error occurred");
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
        setError("Request timed out. Please check your connection and try again.");
      }
    }, 8000);

    fetchPetsFromSupabase(filters)
      .then(({ data, error: err }) => {
        if (isMounted) {
          clearTimeout(timeoutId);
          if (err) {
            setError(typeof err === "string" ? err : err.message || "Error loading pets");
          } else {
            setError(null);
          }
          setPets(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          clearTimeout(timeoutId);
          setError(err?.message || "Unexpected error occurred");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [filters]);

  // Client-side price filter
  const filteredPets = pets.filter((pet) => {
    if (!filters?.priceRange || filters.priceRange === "Any Price") return true;
    const numPrice =
      typeof pet.price === "number"
        ? pet.price
        : parseFloat(pet.price?.toString().replace(/[^0-9.]/g, "")) || 0;
    if (filters.priceRange === "Free Adoption") return numPrice === 0;
    if (filters.priceRange === "₹0–₹5k" || filters.priceRange === "5k-10k") return numPrice >= 0 && numPrice <= 5000;
    if (filters.priceRange === "₹5k–₹10k") return numPrice >= 5000 && numPrice <= 10000;
    if (filters.priceRange === "10k-20k" || filters.priceRange === "₹10k–₹20k") return numPrice >= 10000 && numPrice <= 20000;
    if (filters.priceRange === "₹20k+") return numPrice > 20000;
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header row */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Available Pets</h2>
          {!loading && !error && (
            <p className="text-sm text-gray-400 mt-1">
              Showing {filteredPets.length} {filteredPets.length === 1 ? "pet" : "pets"}
            </p>
          )}
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="skeleton" style={{ height: "220px" }} />
              <div className="p-5 space-y-3">
                <div className="skeleton h-5 w-2/3 rounded-lg" />
                <div className="skeleton h-4 w-1/2 rounded-lg" />
                <div className="skeleton h-4 w-3/4 rounded-lg" />
                <div className="skeleton h-10 w-full rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl text-center max-w-lg mx-auto">
          <FaExclamationTriangle className="text-3xl mx-auto mb-3 text-red-400" />
          <p className="font-bold text-lg mb-1">Unable to Load Listings</p>
          <p className="text-sm mb-5 text-red-600">{error}</p>
          <button
            onClick={loadPets}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <FaSync className="text-xs" /> Try Again
          </button>
        </div>
      ) : filteredPets.length === 0 ? (
        <NoPets onReset={onResetFilters} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </section>
  );
}

export default PetGrid;