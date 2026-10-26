import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDog,
  FaCat,
  FaFeather,
  FaHorse,
  FaFish,
  FaPaw,
} from "react-icons/fa";
import { supabase } from "../../../lib/supabase";

const CATEGORIES = [
  {
    icon: FaDog,
    name: "Dogs",
    species: "Dog",
    color: "from-amber-50 to-orange-50",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    borderHover: "hover:border-amber-300",
  },
  {
    icon: FaCat,
    name: "Cats",
    species: "Cat",
    color: "from-purple-50 to-pink-50",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    borderHover: "hover:border-purple-300",
  },
  {
    icon: FaFeather,
    name: "Birds",
    species: "Bird",
    color: "from-sky-50 to-blue-50",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
    borderHover: "hover:border-sky-300",
  },
  {
    icon: FaPaw,
    name: "Rabbits",
    species: "Rabbit",
    color: "from-rose-50 to-pink-50",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
    borderHover: "hover:border-rose-300",
  },
  {
    icon: FaFish,
    name: "Fish",
    species: "Fish",
    color: "from-teal-50 to-emerald-50",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
    borderHover: "hover:border-teal-300",
  },
  {
    icon: FaHorse,
    name: "Others",
    species: "Other",
    color: "from-gray-50 to-slate-50",
    iconColor: "text-gray-600",
    iconBg: "bg-gray-100",
    borderHover: "hover:border-gray-300",
  },
];

// Demo pet counts for display — realistic demo data
const DEMO_COUNTS = {
  Dog: 48,
  Cat: 32,
  Bird: 14,
  Rabbit: 9,
  Fish: 17,
  Other: 11,
};

function Categories() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState(DEMO_COUNTS);

  // Try to load real counts from Supabase; fall back to demo data
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const { data, error } = await supabase
          .from("pets")
          .select("species");

        if (!error && data && data.length > 0) {
          const realCounts = {};
          data.forEach(({ species }) => {
            if (!species) return;
            const normalized =
              species.charAt(0).toUpperCase() + species.slice(1).toLowerCase();
            // Map to our categories
            const key = ["Dog", "Cat", "Bird", "Rabbit", "Fish"].includes(normalized)
              ? normalized
              : "Other";
            realCounts[key] = (realCounts[key] || 0) + 1;
          });
          // Merge — only replace if we have real data
          setCounts((prev) => ({ ...prev, ...realCounts }));
        }
      } catch {
        // Silently fall back to demo counts
      }
    };
    loadCounts();
  }, []);

  const handleCategoryClick = (species) => {
    navigate(`/marketplace?species=${encodeURIComponent(species)}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-200">
            Browse by Category
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Find Your Perfect Match
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From loyal dogs to graceful cats — discover the companion that fits your life.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = counts[cat.species] ?? counts["Other"] ?? 0;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.species)}
                className={`group bg-gradient-to-br ${cat.color} border-2 border-transparent ${cat.borderHover} rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400`}
              >
                <div className={`w-14 h-14 ${cat.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`text-2xl ${cat.iconColor}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{cat.name}</h3>
                <p className="text-gray-500 text-xs font-medium">
                  {count} {count === 1 ? "Pet" : "Pets"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;