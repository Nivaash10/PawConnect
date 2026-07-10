import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold text-orange-500"
        >
          🐾 PawConnect
        </Link>

        <div className="flex gap-8 font-medium">

          <Link to="/">Home</Link>

          <Link to="/marketplace">Marketplace</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

        </div>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-4 py-2 border rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;