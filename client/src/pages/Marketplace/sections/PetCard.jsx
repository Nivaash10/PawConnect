import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaMars,
  FaVenus,
  FaShieldAlt,
  FaRobot,
} from "react-icons/fa";
import { useFavorites } from "../../../context/FavoritesContext";

function PetCard({ pet, onRemoveFavorite }) {
  const navigate = useNavigate();
  const { isFavorited, toggleFavorite } = useFavorites();

  const favorited = isFavorited(pet.id);

  // Normalize property names
  const imageUrl = pet.image_url || pet.image || "/images/dog1.jpg";
  const aiScore = pet.ai_score ?? pet.aiScore ?? null;

  // Only show "AI Pick" badge if ai_score >= 90
  const isAIPick = aiScore !== null && aiScore >= 90;

  // Format price
  let displayPrice = pet.price;
  if (typeof pet.price === "number") {
    displayPrice = pet.price === 0 ? "Free" : `₹${pet.price.toLocaleString("en-IN")}`;
  } else if (pet.price && !pet.price.toString().startsWith("₹")) {
    displayPrice = `₹${pet.price}`;
  }

  const purposeDisplay = pet.purpose
    ? pet.purpose.charAt(0).toUpperCase() + pet.purpose.slice(1).toLowerCase()
    : "Adoption";

  const purposeStyle =
    purposeDisplay === "Adoption"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await toggleFavorite(pet.id);
    if (res?.requireLogin) {
      navigate("/login", { state: { from: { pathname: "/marketplace" } } });
      return;
    }
    if (onRemoveFavorite && !res?.favorited) {
      onRemoveFavorite(pet.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative flex-shrink-0">
        <img
          src={imageUrl}
          alt={pet.name}
          className="w-full object-cover"
          style={{ height: "220px" }}
          onError={(e) => { e.target.src = "/images/dog1.jpg"; }}
        />

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
        >
          {favorited ? (
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            <FaRegHeart className="text-gray-500 hover:text-red-500 text-sm transition-colors" />
          )}
        </button>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${purposeStyle}`}>
            {purposeDisplay}
          </span>
          {isAIPick && (
            <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm flex items-center gap-1">
              <FaRobot className="text-[10px]" /> AI Pick
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{pet.name}</h3>
            <span className="text-lg font-extrabold text-orange-500 flex-shrink-0">
              {displayPrice}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{pet.breed}</p>

          {/* Info row */}
          <div className="space-y-1.5 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-400 text-xs flex-shrink-0" />
              <span className="truncate">{pet.location}</span>
            </div>
            <div className="flex items-center gap-2">
              {pet.gender === "Male" ? (
                <FaMars className="text-blue-400 text-xs flex-shrink-0" />
              ) : (
                <FaVenus className="text-pink-400 text-xs flex-shrink-0" />
              )}
              <span>{pet.gender} · {pet.age}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className={`text-xs flex-shrink-0 ${pet.vaccinated ? "text-green-500" : "text-gray-300"}`} />
              <span className={pet.vaccinated ? "text-green-600 font-medium" : "text-gray-400"}>
                {pet.vaccinated ? "Vaccinated" : "Vaccination Pending"}
              </span>
            </div>
          </div>

          {/* AI Score bar (only if score exists) */}
          {aiScore !== null && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400 font-medium">AI Match Score</span>
                <span className="text-xs font-bold text-orange-600">{aiScore}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${aiScore}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link to={`/pet/${pet.id}`} className="block w-full mt-auto">
          <button className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PetCard;