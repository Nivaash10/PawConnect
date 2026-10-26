import { Link } from "react-router-dom";
import { FaPaw, FaShieldAlt, FaRobot } from "react-icons/fa";
import heroImage from "../../../assets/images/hero.jpg";

const TRUST_ITEMS = [
  { icon: FaShieldAlt, label: "Verified Listings" },
  { icon: FaRobot, label: "AI-Powered Matching" },
  { icon: FaPaw, label: "Trusted by Pet Lovers" },
];

function Hero() {
  return (
    <section className="bg-white overflow-hidden relative">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">

          {/* ── LEFT ───────────────────────────────────────────── */}
          <div className="animate-fadeInUp">
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-orange-200">
              <FaRobot className="text-xs" />
              AI-Powered Pet Adoption Platform
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Find Your
              <span className="text-orange-500 block">Perfect Pet</span>
              Companion
            </h1>

            {/* Subline */}
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Adopt, buy, or sell pets with the intelligence of AI. Browse verified
              listings, get personalized matches, and access expert care guidance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/marketplace?purpose=Adoption">
                <button className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2">
                  <FaPaw />
                  Adopt a Pet
                </button>
              </Link>
              <Link to="/list-pet">
                <button className="border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 cursor-pointer">
                  List Your Pet
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-5">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon className="text-orange-500 text-xs" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ───────────────────────────────────────────── */}
          <div className="relative flex justify-center items-center animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
            {/* Decorative ring */}
            <div className="absolute inset-0 m-auto w-[85%] h-[85%] bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl rotate-3 opacity-60" />

            {/* Hero image */}
            <img
              src={heroImage}
              alt="Happy golden retriever and tabby cat ready for adoption"
              className="relative w-full max-w-lg rounded-3xl object-cover shadow-2xl shadow-orange-100 z-10 transition-transform duration-700 hover:scale-[1.02]"
              style={{ aspectRatio: "4/3" }}
            />

            {/* Floating AI Match card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 flex items-center gap-3 z-20 animate-floatY">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                <FaShieldAlt className="text-green-600 text-sm" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Verified Listing</p>
                <p className="text-[11px] text-gray-400">AI-checked & safe</p>
              </div>
            </div>

            {/* Floating AI score card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 flex items-center gap-3 z-20 animate-floatY" style={{ animationDelay: "1.5s" }}>
              <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaRobot className="text-orange-500 text-sm" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">AI Match Ready</p>
                <p className="text-[11px] text-gray-400">96% compatibility</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;