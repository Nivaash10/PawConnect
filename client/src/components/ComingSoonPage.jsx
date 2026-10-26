import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import Navbar from "./layout/Navbar/Navbar";
import Footer from "../pages/Home/sections/Footer";

/**
 * Reusable "Coming Soon" banner used by Dashboard, Profile, and My Listings.
 * Pass `title`, `description`, and `icon` as props.
 */
function ComingSoonPage({ title, description, icon = "🐾" }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">{icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-500 text-lg mb-8">{description}</p>
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <FaPaw />
            Coming Soon
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-orange-200"
            >
              Go Home
            </Link>
            <Link
              to="/marketplace"
              className="px-6 py-3 border-2 border-gray-200 hover:border-orange-300 text-gray-700 rounded-xl font-semibold transition-all duration-200"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ComingSoonPage;
