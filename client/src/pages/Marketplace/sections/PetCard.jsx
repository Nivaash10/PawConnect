import {
  FaHeart,
  FaMapMarkerAlt,
  FaMars,
  FaVenus,
  FaShieldAlt,
} from "react-icons/fa";

function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      {/* Image */}
      <div className="relative">

        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-64 object-cover"
        />

        {/* Favorite Button */}
        <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow hover:scale-110 transition">
          <FaHeart className="text-red-500" />
        </button>

        {/* AI Pick Badge */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
          AI Pick ⭐
        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="text-2xl font-bold">
          {pet.name}
        </h3>

        <p className="text-gray-500">
          {pet.breed}
        </p>

        <div className="mt-4 space-y-2 text-sm text-gray-600">

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt />
            {pet.location}
          </p>

          <p className="flex items-center gap-2">
            {pet.gender === "Male" ? <FaMars /> : <FaVenus />}
            {pet.gender}
          </p>

          <p>{pet.age}</p>

        </div>

        {/* Price + AI Score */}
        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-bold text-orange-500">
            {pet.price}
          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            AI {pet.aiScore}%
          </span>

        </div>

        {/* Vaccination */}
        <div className="flex items-center gap-2 mt-4 text-sm">

          <FaShieldAlt className="text-green-600" />

          <span>
            {pet.vaccinated
              ? "Vaccinated"
              : "Vaccination Pending"}
          </span>

        </div>

        {/* Fair Price */}
        <div className="mt-2">

          {pet.fairPrice ? (
            <span className="text-green-600 text-sm font-medium">
              ✔ Fair Price
            </span>
          ) : (
            <span className="text-red-500 text-sm font-medium">
              Above Market Price
            </span>
          )}

        </div>

        {/* Purpose Badge */}
        <div className="mt-4">
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
            {pet.purpose}
          </span>
        </div>

        {/* Button */}
        <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
          View Details
        </button>

      </div>
    </div>
  );
}

export default PetCard;