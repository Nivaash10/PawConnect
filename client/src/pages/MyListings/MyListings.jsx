import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaTrashAlt,
  FaEye,
  FaCheck,
  FaTimes,
  FaPaw,
  FaInbox,
  FaClock,
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import {
  getSellerAdoptionRequests,
  updateAdoptionRequestStatus,
} from "../../services/adoptionService";

function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("listings"); // 'listings' | 'requests'
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchMyPets = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPets(data || []);
    } catch (err) {
      console.warn("Error fetching seller listings:", err.message);
    }
  }, [user?.id]);

  const fetchRequests = useCallback(async () => {
    if (!user?.id) return;
    const reqs = await getSellerAdoptionRequests(user.id);
    setRequests(reqs);
  }, [user?.id]);

  useEffect(() => {
    let isMounted = true;
    if (!user?.id) return;

    setLoading(true);
    Promise.all([fetchMyPets(), fetchRequests()]).finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [user?.id, fetchMyPets, fetchRequests]);

  const handleDeletePet = async (petId) => {
    setDeletingId(petId);
    setActionError(null);
    try {
      const { error } = await supabase
        .from("pets")
        .delete()
        .eq("id", petId)
        .eq("seller_id", user.id);

      if (error) {
        setActionError("Failed to delete listing: " + error.message);
      } else {
        setPets((prev) => prev.filter((p) => p.id !== petId));
      }
    } catch (err) {
      setActionError("Error deleting listing: " + err.message);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    setActionLoadingId(requestId);
    setActionError(null);
    const res = await updateAdoptionRequestStatus(requestId, newStatus);
    setActionLoadingId(null);

    if (res.success) {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
      );
    } else {
      setActionError("Could not update request status: " + res.error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-14">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold">My Pet Listings</h1>
              <p className="mt-2 text-orange-100 text-base">
                Manage your posted pet listings and review adoption requests.
              </p>
            </div>
            <button
              onClick={() => navigate("/list-pet")}
              className="bg-white text-orange-600 hover:bg-orange-50 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2"
            >
              <FaPlus />
              List a New Pet
            </button>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 flex gap-8">
            <button
              onClick={() => setActiveTab("listings")}
              className={`py-4 font-semibold text-sm border-b-2 transition flex items-center gap-2 ${
                activeTab === "listings"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaPaw />
              My Pets ({pets.length})
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`py-4 font-semibold text-sm border-b-2 transition flex items-center gap-2 ${
                activeTab === "requests"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaInbox />
              Adoption Requests ({requests.length})
            </button>
          </div>
        </div>

        {/* Inline error banner */}
        {actionError && (
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 flex items-center justify-between text-sm">
              <span>{actionError}</span>
              <button onClick={() => setActionError(null)} className="ml-3 text-red-400 hover:text-red-600 font-bold">✕</button>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activeTab === "listings" ? (
            /* Tab 1: My Listings */
            <>
            pets.length === 0 ? (
              <div className="text-center py-16 px-6 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto my-6">
                <div className="text-5xl mb-4">🐾</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Pets Listed Yet</h3>
                <p className="text-gray-500 text-sm mb-6">
                  You haven't added any pets for adoption or sale yet.
                </p>
                <button
                  onClick={() => navigate("/list-pet")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition"
                >
                  List Your First Pet
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48">
                        <img
                          src={pet.image_url || "/images/dog1.jpg"}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {pet.purpose ? pet.purpose.toUpperCase() : "ADOPTION"}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                        <p className="text-gray-500 text-sm">{pet.breed} · {pet.age}</p>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                          <span className="text-lg font-bold text-orange-500">
                            {pet.price === 0 ? "Free" : `₹${Number(pet.price).toLocaleString("en-IN")}`}
                          </span>
                          <span className="text-xs text-gray-400">
                            {pet.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex gap-2">
                      <Link
                        to={`/pet/${pet.id}`}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <FaEye /> View
                      </Link>
                      {/* Delete button — shows inline confirm */}
                      {confirmDeleteId === pet.id ? (
                        <div className="flex gap-1 flex-1">
                          <button
                            onClick={() => handleDeletePet(pet.id)}
                            disabled={deletingId === pet.id}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-xs font-semibold transition disabled:opacity-50"
                          >
                            {deletingId === pet.id ? "Deleting…" : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-semibold transition"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(pet.id)}
                          className="px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold text-xs flex items-center justify-center transition"
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Tab 2: Adoption Requests */
            requests.length === 0 ? (
              <div className="text-center py-16 px-6 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto my-6">
                <div className="text-5xl mb-4">📥</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Requests Yet</h3>
                <p className="text-gray-500 text-sm">
                  You have not received any adoption requests for your pets yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl mx-auto">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-lg">
                          {req.profiles?.full_name || "Adopter"}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase ${
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
                      <p className="text-sm text-gray-600">
                        Requested pet: <strong className="text-orange-600">{req.pets?.name || "Pet"}</strong> ({req.pets?.breed})
                      </p>
                      {req.message && (
                        <p className="text-xs bg-gray-50 p-3 rounded-xl text-gray-700 mt-2 border border-gray-100 italic">
                          "{req.message}"
                        </p>
                      )}
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <FaClock className="text-[10px]" />
                        {new Date(req.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {req.status === "pending" && (
                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() => handleUpdateStatus(req.id, "approved")}
                          disabled={actionLoadingId === req.id}
                          className="flex-1 md:flex-initial bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                        >
                          <FaCheck /> Accept
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "rejected")}
                          disabled={actionLoadingId === req.id}
                          className="flex-1 md:flex-initial bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default MyListings;
