import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaPaw, FaChevronDown, FaSignOutAlt, FaUser, FaList, FaHeart } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useFavorites } from "../../../context/FavoritesContext";

function Navbar() {
  const { isAuthenticated, user, signOut, loading } = useAuth();
  const { favoriteCount } = useFavorites();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "AI Pet Matcher", path: "/pet-matching" },
    { name: "AI Assistant", path: "/ai" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors duration-200 ${
      isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
    }`;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setProfileOpen(false);
    await signOut();
    navigate("/");
  };

  // Derive display name and avatar initial
  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Account";
  const avatarInitial = displayName.charAt(0).toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* ── Logo ──────────────────────────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2 text-orange-500">
          <FaPaw className="text-2xl" />
          <span className="text-2xl font-bold tracking-tight">PawConnect</span>
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* ── Right Side ────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4">

          {/* Show nothing while auth is loading to prevent flash */}
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : isAuthenticated ? (
            /* ── Logged-in state ─────────────────────────────────────────── */
            <div className="flex items-center gap-4">
              {/* Favorites link */}
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 font-medium text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`
                }
                title="My Saved Favorites"
              >
                <div className="relative">
                  <FaHeart className="text-base text-red-500" />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fadeIn">
                      {favoriteCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Favorites</span>
              </NavLink>

              {/* My Listings link */}
              <NavLink
                to="/my-listings"
                className={({ isActive }) =>
                  `hidden sm:flex items-center gap-1.5 font-medium text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-orange-500"
                  }`
                }
              >
                <FaList className="text-xs" />
                My Listings
              </NavLink>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  id="profile-menu-btn"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-orange-50 transition-colors duration-200 group"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  {/* Avatar */}
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-orange-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold border-2 border-orange-300">
                      {avatarInitial}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-semibold text-gray-700 group-hover:text-orange-600 max-w-[100px] truncate">
                    {displayName}
                  </span>
                  <FaChevronDown
                    className={`text-gray-400 text-xs transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/favorites"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <FaHeart className="text-red-400 text-xs" />
                      Saved Favorites ({favoriteCount})
                    </Link>

                    <Link
                      to="/my-listings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <FaList className="text-gray-400 text-xs" />
                      My Listings
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <span className="text-gray-400 text-xs">📊</span>
                      Dashboard
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        id="logout-btn"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt className="text-xs" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ── Logged-out state ────────────────────────────────────────── */
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-orange-300"
              >
                Register
              </Link>
            </div>
          )}

          {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
          <button
            id="mobile-menu-btn"
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-gray-100">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  My Profile
                </Link>
                <Link
                  to="/my-listings"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  My Listings
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); handleSignOut(); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;