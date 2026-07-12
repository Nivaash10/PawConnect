import {
  FaPaw,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-2 mb-5">

            <FaPaw className="text-orange-500 text-2xl" />

            <h2 className="text-3xl font-bold text-orange-500">
              PawConnect
            </h2>

          </div>

          <p className="text-gray-400 leading-7">
            AI-powered pet adoption and marketplace platform helping
            pets find loving homes.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-orange-500 cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-orange-500 cursor-pointer transition">
              Marketplace
            </li>

            <li className="hover:text-orange-500 cursor-pointer transition">
              AI Assistant
            </li>

            <li className="hover:text-orange-500 cursor-pointer transition">
              Contact
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <p className="flex items-center gap-3">
              <FaEnvelope className="text-orange-500" />
              support@pawconnect.com
            </p>

            <p className="flex items-center gap-3">
              <FaPhone className="text-orange-500" />
              +91 98765 43210
            </p>

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-500" />
              Coimbatore, Tamil Nadu
            </p>

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Follow Us
          </h3>

          <div className="flex gap-5 text-2xl">

            <FaGithub className="hover:text-orange-500 cursor-pointer transition" />

            <FaLinkedin className="hover:text-orange-500 cursor-pointer transition" />

            <FaInstagram className="hover:text-orange-500 cursor-pointer transition" />

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">

        © 2026 PawConnect. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;