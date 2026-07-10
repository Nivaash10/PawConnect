const pets = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 Years",
    location: "Chennai",
    image: "https://placehold.co/400x300?text=Dog",
    type: "Adoption",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Persian Cat",
    age: "1 Year",
    location: "Coimbatore",
    image: "https://placehold.co/400x300?text=Cat",
    type: "Sale",
  },
  {
    id: 3,
    name: "Rocky",
    breed: "German Shepherd",
    age: "3 Years",
    location: "Bangalore",
    image: "https://placehold.co/400x300?text=Dog",
    type: "Adoption",
  },
];

function FeaturedPets() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold">Featured Pets</h2>
            <p className="text-gray-500">
              Find your new best friend.
            </p>
          </div>

          <button className="text-orange-500 font-semibold hover:underline">
            View All →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {pet.name}
                </h3>

                <p className="text-gray-500">
                  {pet.breed}
                </p>

                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span>{pet.age}</span>
                  <span>{pet.location}</span>
                </div>

                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full mt-5">
                  {pet.type}
                </span>

                <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600">
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