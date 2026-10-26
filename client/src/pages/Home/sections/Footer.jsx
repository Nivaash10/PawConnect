import { Link } from "react-router-dom";
import {
  FaPaw,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRobot,
  FaHeart,
} from "react-icons/fa";

const PLATFORM_LINKS = [
  { label: "Home", to: "/" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "List a Pet", to: "/list-pet" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const AI_LINKS = [
  { label: "AI Assistant", to: "/ai" },
  { label: "Pet Matcher", to: "/pet-matching" },
  { label: "My Dashboard", to: "/dashboard" },
  { label: "My Favorites", to: "/favorites" },
];

const SOCIAL_LINKS = [
  { Icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                <FaPaw className="text-white text-base" />
              </div>
              <span className="text-xl font-bold text-white">PawConnect</span>
            </Link>
            <p className="text-gray-400 text-sm leading-7 mb-6">
              AI-powered pet adoption and marketplace platform. Helping pets find loving homes across India.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Platform</h3>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">AI Features</h3>
            <ul className="space-y-3">
              {AI_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1.5"
                  >
                    <FaRobot className="text-orange-500 text-xs opacity-70" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Contact</h3>
            <div className="space-y-4">
              <a
                href="mailto:support@pawconnect.in"
                className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors text-sm"
              >
                <FaEnvelope className="text-orange-500 text-xs flex-shrink-0" />
                support@pawconnect.in
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors text-sm"
              >
                <FaPhone className="text-orange-500 text-xs flex-shrink-0" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-orange-500 text-xs flex-shrink-0" />
                Coimbatore, Tamil Nadu, India
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PawConnect. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <FaHeart className="text-red-400 text-xs" /> for pet lovers in India
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;