import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";
import PetCard from "../Marketplace/sections/PetCard";
import { useAuth } from "../../context/AuthContext";
import { getUserFavorites } from "../../services/favoriteService";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!user?.id) return;

    setLoading(true);
    getUserFavorites(user.id)
      .then((data) => {
        if (isMounted) {
          setFavorites(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load favorites");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const handleRemoveFavorite = (removedPetId) => {
    setFavorites((prev) => prev.filter((pet) => String(pet.id) !== String(removedPetId)));
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* Page Header Banner */}
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-14">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FaHeart className="text-3xl text-red-200" />
                <h1 className="text-4xl font-bold">My Saved Pets</h1>
              </div>
              <p className="mt-2 text-orange-100 text-base">
                Manage your bookmarked pet listings and adoption choices.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="hidden sm:flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              <FaArrowLeft className="text-xs" />
              Back to Marketplace
            </Link>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
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
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center max-w-lg mx-auto">
              <p className="font-semibold">Unable to load your saved pets</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto my-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-2xl">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Favorites Saved Yet</h3>
              <p className="text-gray-500 text-sm mb-6">
                You haven't saved any pets to your favorites list yet. Explore available pets in our marketplace!
              </p>
              <Link
                to="/marketplace"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-sm hover:shadow-md"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Saved Listings ({favorites.length})
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {favorites.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onRemoveFavorite={handleRemoveFavorite}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Favorites;
