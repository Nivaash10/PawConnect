import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "AI Assistant", path: "/ai" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          🐾 PawConnect
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="text-xl">
            🌙
          </button>

          <Link
            to="/login"
            className="font-medium text-gray-700 hover:text-orange-500"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition"
          >
            Register
          </Link>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;