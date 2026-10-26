import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Pet Adopter",
    city: "Bangalore",
    initial: "R",
    color: "bg-orange-500",
    review:
      "PawConnect made the adoption process incredibly simple. I found my golden retriever Buddy within two days, and the AI care guide was a game-changer as a first-time pet owner.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Cat Owner",
    city: "Chennai",
    initial: "P",
    color: "bg-purple-500",
    review:
      "The AI assistant helped me prepare the perfect diet plan for my Persian cat Luna. The adoption form was simple and the seller was genuine. Highly recommended for every pet parent.",
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Dog Adopter",
    city: "Coimbatore",
    initial: "A",
    color: "bg-blue-500",
    review:
      "Clean interface, verified owners, and a smooth experience. PawConnect feels much safer than other marketplaces I've tried. My dog Rocky is home and thriving!",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-200">
            Sample Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Loved by Pet Families
          </h2>
          <p className="text-gray-500 text-lg">
            Real stories from our growing community of pet owners.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <FaQuoteLeft className="text-orange-200 text-3xl mb-5" />

              {/* Review */}
              <p className="text-gray-600 leading-7 text-[0.95rem] flex-1 mb-6">
                {item.review}
              </p>

              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full ${item.color} text-white font-bold text-base flex items-center justify-center flex-shrink-0`}
                >
                  {item.initial}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">
                    {item.role} · {item.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Reviews shown are sample testimonials for demonstration purposes.
        </p>
      </div>
    </section>
  );
}

export default Testimonials;