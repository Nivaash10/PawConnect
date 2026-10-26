import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaMars,
  FaVenus,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
  FaRobot,
} from "react-icons/fa";
import { fetchPetsFromSupabase } from "../../../services/petService";

function MiniPetCard({ pet }) {
  const imageUrl = pet.image_url || pet.image || "/images/dog1.jpg";
  const aiScore = pet.ai_score ?? pet.aiScore ?? null;

  let displayPrice = pet.price;
  if (typeof pet.price === "number") {
    displayPrice = pet.price === 0 ? "Free" : `₹${pet.price.toLocaleString("en-IN")}`;
  }

  return (
    <div className="flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative flex-shrink-0" style={{ height: "160px" }}>
        <img
          src={imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "/images/dog1.jpg"; }}
        />
        {aiScore !== null && aiScore >= 90 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <FaRobot className="text-[9px]" /> AI Pick
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-gray-900 text-sm mb-0.5">{pet.name}</h4>
        <p className="text-gray-400 text-xs mb-3">{pet.breed}</p>

        <div className="space-y-1 text-xs text-gray-500 mb-3 flex-1">
          <div className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-orange-400 text-[10px]" />
            <span className="truncate">{pet.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {pet.gender === "Male" ? (
              <FaMars className="text-blue-400 text-[10px]" />
            ) : (
              <FaVenus className="text-pink-400 text-[10px]" />
            )}
            {pet.gender} · {pet.age}
          </div>
          <div className="flex items-center gap-1.5">
            <FaShieldAlt className={`text-[10px] ${pet.vaccinated ? "text-green-500" : "text-gray-300"}`} />
            {pet.vaccinated ? "Vaccinated" : "Pending"}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-orange-500 font-bold text-sm">{displayPrice}</span>
        </div>

        <Link to={`/pet/${pet.id}`}>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

function SimilarPets({ currentPetId, species }) {
  const scrollRef = useRef(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Fetch pets with same species, excluding current pet
    fetchPetsFromSupabase(species ? { species } : {})
      .then(({ data }) => {
        if (isMounted) {
          const filtered = (data || []).filter((p) => String(p.id) !== String(currentPetId));
          setPets(filtered.slice(0, 10)); // up to 10 similar
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [species, currentPetId]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 270, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="mt-12 mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Pets</h2>
        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="skeleton" style={{ height: "160px" }} />
              <div className="p-4 space-y-2">
                <div className="skeleton h-4 w-2/3 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
                <div className="skeleton h-8 w-full rounded-xl mt-3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (pets.length === 0) return null;

  return (
    <section className="mt-12 mb-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar Pets</h2>
          <p className="text-gray-400 text-sm mt-0.5">You might also like these</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="bg-white border border-gray-200 p-2.5 rounded-xl shadow-sm hover:bg-orange-50 hover:border-orange-300 transition group"
          >
            <FaChevronLeft className="text-gray-500 group-hover:text-orange-500 transition text-sm" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="bg-white border border-gray-200 p-2.5 rounded-xl shadow-sm hover:bg-orange-50 hover:border-orange-300 transition group"
          >
            <FaChevronRight className="text-gray-500 group-hover:text-orange-500 transition text-sm" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {pets.map((pet) => (
          <MiniPetCard key={pet.id} pet={pet} />
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition text-sm group"
        >
          Browse All Pets
          <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

export default SimilarPets;