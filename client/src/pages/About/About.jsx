import { Link } from "react-router-dom";
import {
  FaPaw,
  FaRobot,
  FaShieldAlt,
  FaHeart,
  FaHandshake,
  FaUsers,
  FaMapMarkerAlt,
  FaArrowRight,
  FaBolt,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";

const STATS = [
  { value: "50+", label: "Pets Listed" },
  { value: "30+", label: "Happy Adoptions" },
  { value: "3+", label: "Cities Covered" },
  { value: "24/7", label: "AI Support" },
];

const VALUES = [
  {
    icon: FaHeart,
    title: "Animal Welfare First",
    description: "Every decision we make is guided by the well-being of animals. We vet listings to ensure only ethical sellers are on our platform.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: FaShieldAlt,
    title: "Safety & Transparency",
    description: "We use Supabase-backed authentication and row-level security to protect every user's data and ensure trust in every transaction.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: FaRobot,
    title: "AI-Powered Experience",
    description: "From personalized pet matching to AI care guides — technology helps you make more informed, compassionate decisions.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: FaHandshake,
    title: "Community Trust",
    description: "PawConnect is built on genuine connections between sellers and adopters. We're not just a marketplace — we're a community.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const TEAM = [
  {
    name: "Nivaash",
    role: "Founder & Developer",
    bio: "Full-stack developer passionate about using AI to solve real-world problems for pet lovers across India.",
    initial: "N",
    color: "bg-orange-500",
    location: "Coimbatore, TN",
  },
];

const FEATURES = [
  "Real listings from verified owners",
  "AI-powered pet matching & care",
  "Supabase-secured authentication",
  "Adoption request workflow",
  "AI price fairness analysis",
  "Mobile-first responsive design",
];

function About() {
  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">

        {/* ── Hero Banner ────────────────────────────────── */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
              <FaPaw />
              Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Connecting Pets<br />With Loving Homes
            </h1>
            <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              PawConnect is an AI-powered pet adoption and marketplace platform designed to make
              finding, adopting, and caring for pets simple, safe, and smart.
            </p>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────── */}
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-1">{s.value}</p>
                  <p className="text-gray-500 text-sm font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story ──────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-orange-200">
                Our Story
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Built by a Pet Lover, for Pet Lovers
              </h2>
              <div className="space-y-4 text-gray-600 leading-7">
                <p>
                  PawConnect was born from a simple frustration — finding a trustworthy, safe place to adopt
                  a pet in India was harder than it should be. Existing platforms were cluttered, unsafe, or
                  lacked any kind of guidance for first-time pet owners.
                </p>
                <p>
                  We decided to build something better — a platform that combines real database-backed listings,
                  Supabase authentication, and Google Gemini AI to provide not just a marketplace, but a
                  complete pet ownership companion.
                </p>
                <p>
                  From your first search to your first vet visit, PawConnect is with you every step of the way.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-sm transition shadow-lg shadow-orange-200"
                >
                  <FaPaw /> Explore Pets <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

            {/* Feature checklist */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <FaBolt className="text-orange-500" />
                What Makes Us Different
              </h3>
              <ul className="space-y-4">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-700 text-sm">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Values ────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-200">
                What We Believe In
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className={`w-12 h-12 ${v.bg} rounded-xl flex items-center justify-center mb-5`}>
                      <Icon className={`text-xl ${v.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-7">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Team ──────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-200">
                The Team
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900">Built With Care</h2>
            </div>
            <div className="flex justify-center">
              {TEAM.map((member) => (
                <div key={member.name} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center max-w-xs w-full">
                  <div className={`w-20 h-20 ${member.color} rounded-full text-white font-extrabold text-3xl flex items-center justify-center mx-auto mb-5`}>
                    {member.initial}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 text-sm font-semibold mb-3">{member.role}</p>
                  <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-4">
                    <FaMapMarkerAlt className="text-xs" />
                    {member.location}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust & Safety ────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-green-200">
              <FaLock /> Trust & Safety
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
              Every listing is backed by verified authentication, and every user interaction is protected
              by Supabase row-level security policies.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
              {[
                { icon: FaShieldAlt, title: "Supabase RLS", desc: "Row-level security policies protect every database interaction." },
                { icon: FaUsers, title: "Verified Users", desc: "Email-verified accounts ensure only real users can post listings." },
                { icon: FaLock, title: "Secure Auth", desc: "Industry-standard JWT authentication managed by Supabase Auth." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <item.icon className="text-green-500 text-xl mb-3" />
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-10 text-white text-center">
              <FaPaw className="text-4xl mx-auto mb-4 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Find Your Pet?
              </h2>
              <p className="text-orange-100 text-lg mb-8 max-w-lg mx-auto">
                Browse hundreds of loving pets waiting for a home — or list your own pet for adoption today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/marketplace"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3.5 rounded-2xl font-bold text-sm transition flex items-center gap-2 shadow-lg"
                >
                  <FaPaw /> Browse Pets
                </Link>
                <Link
                  to="/list-pet"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition border border-white/30"
                >
                  List a Pet
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default About;