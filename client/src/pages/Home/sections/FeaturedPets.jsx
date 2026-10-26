import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PetCard from "../../Marketplace/sections/PetCard";
import { fetchPetsFromSupabase } from "../../../services/petService";

function FeaturedPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchPetsFromSupabase()
      .then(({ data }) => {
        if (isMounted) {
          setPets((data || []).slice(0, 3));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("Error fetching featured pets:", err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-14 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 text-center sm:text-left">
              Featured Pets
            </h2>
            <p className="text-gray-500 mt-2 text-center sm:text-left">
              Find your new best friend today from our verified listings.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm hover:underline"
          >
            View All Marketplace Listings →
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl h-96 animate-pulse shadow-md p-5 flex flex-col justify-between"
              >
                <div className="bg-gray-200 h-52 rounded-2xl w-full" />
                <div className="space-y-3 mt-4">
                  <div className="bg-gray-200 h-6 rounded w-3/4" />
                  <div className="bg-gray-200 h-4 rounded w-1/2" />
                </div>
                <div className="bg-gray-200 h-10 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedPets;