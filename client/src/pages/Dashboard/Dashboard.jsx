import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaHeart, FaInbox, FaPlus, FaUser, FaCompass } from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useFavorites } from "../../context/FavoritesContext";
import {
  getUserAdoptionRequests,
  getSellerAdoptionRequests,
} from "../../services/adoptionService";

function Dashboard() {
  const { user } = useAuth();
  const { favoriteCount } = useFavorites();

  const [myPetsCount, setMyPetsCount] = useState(0);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!user?.id) return;

    setLoading(true);

    const loadDashboardData = async () => {
      try {
        // Fetch seller pet count
        const { count } = await supabase
          .from("pets")
          .select("*", { count: "exact", head: true })
          .eq("seller_id", user.id);

        const [sent, received] = await Promise.all([
          getUserAdoptionRequests(user.id),
          getSellerAdoptionRequests(user.id),
        ]);

        if (isMounted) {
          setMyPetsCount(count || 0);
          setSentRequests(sent || []);
          setReceivedRequests(received || []);
        }
      } catch (err) {
        console.warn("Error loading dashboard data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white mb-8 shadow-lg shadow-orange-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-orange-100 text-sm font-semibold uppercase tracking-wider">
                Welcome back
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                Hello, {displayName}! 👋
              </h1>
              <p className="text-orange-100 text-sm mt-2 max-w-xl">
                Here's a summary of your pet listings, adoption applications, and saved favorites.
              </p>
            </div>
            <Link
              to="/list-pet"
              className="bg-white text-orange-600 hover:bg-orange-50 px-5 py-3 rounded-2xl font-bold text-sm shadow transition flex items-center gap-2"
            >
              <FaPlus /> List a Pet
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <StatCard
              icon={FaPaw}
              label="My Listings"
              value={loading ? "…" : myPetsCount}
              color="orange"
              link="/my-listings"
            />
            <StatCard
              icon={FaHeart}
              label="Saved Favorites"
              value={loading ? "…" : favoriteCount}
              color="red"
              link="/favorites"
            />
            <StatCard
              icon={FaInbox}
              label="Requests Sent"
              value={loading ? "…" : sentRequests.length}
              color="blue"
              link="/dashboard"
            />
            <StatCard
              icon={FaUser}
              label="Requests Received"
              value={loading ? "…" : receivedRequests.length}
              color="green"
              link="/my-listings"
            />
          </div>

          {/* Quick Actions & Requests Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Recent Applications */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaInbox className="text-orange-500" />
                  My Adoption Applications
                </h3>

                {loading ? (
                  <p className="text-gray-400 text-sm py-4">Loading applications…</p>
                ) : sentRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm mb-4">
                      You haven't submitted any adoption requests yet.
                    </p>
                    <Link
                      to="/marketplace"
                      className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-orange-200 transition"
                    >
                      <FaCompass /> Explore Pets
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sentRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm">
                              {req.pets?.name || "Pet"}
                            </span>
                            {req.pets?.breed && (
                              <span className="text-xs text-gray-500 font-medium">
                                ({req.pets.breed})
                              </span>
                            )}
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                                req.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : req.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {req.status}
                            </span>
                          </div>
                          {req.message && (
                            <p className="text-xs text-gray-600 italic bg-white p-2 rounded-lg border border-gray-100">
                              "{req.message}"
                            </p>
                          )}
                          <p className="text-[11px] text-gray-400">
                            Requested on: {new Date(req.created_at || Date.now()).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <Link
                          to={`/pet/${req.pet_id}`}
                          className="self-start sm:self-center text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-xl font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition flex-shrink-0"
                        >
                          View Pet
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Shortcuts */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Quick Shortcuts</h3>
                <Link
                  to="/marketplace"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition text-sm font-semibold"
                >
                  <FaCompass /> Browse Marketplace
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-red-50 text-red-700 hover:bg-red-100 transition text-sm font-semibold"
                >
                  <FaHeart /> My Favorites ({favoriteCount})
                </Link>
                <Link
                  to="/my-listings"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm font-semibold"
                >
                  <FaPaw /> Manage My Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function StatCard({ icon: Icon, label, value, color, link }) {
  const colorMap = {
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <Link
      to={link}
      className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4 group"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${colorMap[color]}`}>
        <Icon />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition">
          {value}
        </p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </Link>
  );
}

export default Dashboard;
