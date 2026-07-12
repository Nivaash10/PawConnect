import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahul Kumar",
    pet: "Adopted Buddy 🐶",
    review:
      "PawConnect made the adoption process incredibly simple. I found Buddy within two days and the AI gave me excellent care tips.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    pet: "Owner of Luna 🐱",
    review:
      "The AI assistant helped me prepare the perfect diet plan for my Persian cat. Highly recommended for every pet parent.",
  },
  {
    id: 3,
    name: "Arjun Patel",
    pet: "Adopted Rocky 🐕",
    review:
      "Clean interface, verified owners, and an amazing experience. PawConnect feels much safer than other marketplaces.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            What Pet Lovers Say ❤️
          </h2>

          <p className="text-gray-500 mt-4">
            Trusted by hundreds of happy pet owners.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="bg-orange-50 rounded-3xl p-8 shadow hover:shadow-xl transition duration-300"
            >

              {/* Avatar */}

              <div className="w-16 h-16 rounded-full bg-orange-500 text-white text-2xl flex items-center justify-center font-bold mb-5">
                {item.name.charAt(0)}
              </div>

              {/* Stars */}

              <div className="flex gap-1 text-yellow-400 mb-4">

                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} />
                ))}

              </div>

              {/* Review */}

              <p className="text-gray-600 leading-7 mb-6">
                "{item.review}"
              </p>

              {/* Name */}

              <h3 className="font-bold text-lg">
                {item.name}
              </h3>

              <p className="text-orange-500 text-sm">
                {item.pet}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;