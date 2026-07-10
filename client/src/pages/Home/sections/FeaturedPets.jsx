import {
  FaHeart,
  FaMapMarkerAlt,
  FaMars,
  FaShieldAlt,
} from "react-icons/fa";

const pets = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 Years",
    gender: "Male",
    location: "Chennai",
    vaccinated: true,
    type: "Adoption",
    ai: true,
    image: "https://placehold.co/600x400?text=Golden+Retriever",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Persian Cat",
    age: "1 Year",
    gender: "Female",
    location: "Coimbatore",
    vaccinated: true,
    type: "Sale",
    ai: false,
    image: "https://placehold.co/600x400?text=Persian+Cat",
  },
  {
    id: 3,
    name: "Rocky",
    breed: "German Shepherd",
    age: "3 Years",
    gender: "Male",
    location: "Bangalore",
    vaccinated: false,
    type: "Adoption",
    ai: true,
    image: "https://placehold.co/600x400?text=German+Shepherd",
  },
];

function FeaturedPets() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Featured Pets
          </h2>

          <p className="text-gray-500 mt-3">
            Find your new best friend today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {pets.map((pet) => (

            <div
              key={pet.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="relative">

                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-60 object-cover"
                />

                <button className="absolute top-4 left-4 bg-white rounded-full p-3 shadow">
                  <FaHeart className="text-red-500" />
                </button>

                {pet.ai && (
                  <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    AI Pick ⭐
                  </span>
                )}

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {pet.name}
                </h3>

                <p className="text-gray-500 mb-5">
                  {pet.breed}
                </p>

                <div className="space-y-2 text-gray-600">

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {pet.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMars />
                    {pet.gender}
                  </div>

                  <div>
                    {pet.age}
                  </div>

                  <div className="flex items-center gap-2">

                    <FaShieldAlt />

                    {pet.vaccinated
                      ? "Vaccinated"
                      : "Vaccination Pending"}

                  </div>

                </div>

                <div className="mt-5">

                  <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm">
                    {pet.type}
                  </span>

                </div>

                <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition">
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedPets;