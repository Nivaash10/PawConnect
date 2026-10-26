import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaRobot,
  FaArrowRight,
  FaMagic,
  FaHeartbeat,
  FaChartLine,
  FaComments,
} from "react-icons/fa";
import aiAssistantImage from "../../../assets/images/ai-assistant.jpg";

const AI_FEATURES = [
  {
    icon: FaComments,
    title: "AI Pet Assistant",
    description: "Instant answers on nutrition, grooming, training, and health — 24/7.",
    link: "/ai",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: FaMagic,
    title: "Smart Pet Matcher",
    description: "Tell us about your lifestyle and we'll find your perfect companion.",
    link: "/pet-matching",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: FaHeartbeat,
    title: "AI Care Guide",
    description: "Personalized care guides generated for every pet you're considering.",
    link: "/marketplace",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: FaChartLine,
    title: "Price Analysis",
    description: "AI checks whether a pet's price is fair based on market data.",
    link: "/marketplace",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

function AISection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAskAI = (e) => {
    e.preventDefault();
    navigate("/ai", { state: { initialQuery: query.trim() || undefined } });
  };

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-200">
            <FaRobot className="text-xs" />
            Powered by Google Gemini AI
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            AI Built For Pet Lovers
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From personalized pet matching to real-time care advice — our AI suite is designed to help you at every step.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Feature Cards + Ask AI */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {AI_FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <Link
                    key={f.title}
                    to={f.link}
                    className={`group ${f.bg} border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className={`${f.color} text-base`} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.description}</p>
                  </Link>
                );
              })}
            </div>

            {/* Ask AI Input */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FaRobot className="text-orange-500" />
                Ask PawConnect AI
              </p>
              <form onSubmit={handleAskAI} className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. What should I feed my 3-month puppy?"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm bg-white text-gray-800 transition"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition shadow-md shadow-orange-100 cursor-pointer"
                >
                  Ask <FaArrowRight className="text-xs" />
                </button>
              </form>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <img
              src={aiAssistantImage}
              alt="PawConnect AI Pet Assistant"
              className="relative w-full max-w-sm rounded-3xl object-cover shadow-2xl shadow-orange-100 z-10 transition-transform duration-500 hover:scale-[1.02]"
            />

            {/* Floating online badge */}
            <div className="absolute bottom-6 -left-4 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 z-20 animate-floatY">
              <div className="relative">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FaRobot className="text-orange-500 text-base" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">AI Online</p>
                <p className="text-xs text-gray-400">Ready to help</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AISection;