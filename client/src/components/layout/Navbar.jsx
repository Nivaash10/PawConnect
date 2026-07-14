import { NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-orange-500 font-semibold"
        : "text-gray-700 hover:text-orange-500"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-bold text-orange-500"
        >
          🐾 PawConnect
        </NavLink>

        {/* Navigation */}
        <div className="flex gap-8 font-medium">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/marketplace" className={navLinkClass}>
            Marketplace
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <NavLink
            to="/login"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Register
          </NavLink>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;