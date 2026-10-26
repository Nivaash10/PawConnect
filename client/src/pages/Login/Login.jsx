import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPaw,
  FaInfoCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  // Redirect back to the page the user was trying to access, or home
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    const { error: authError } = await signIn({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);
    if (authError) {
      setError(authError.message || "Invalid email or password. Please try again.");
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleForgotPassword = () => {
    setError("");
    // Forgot password via Supabase is not yet implemented in the UI.
    // Users can contact support at support@pawconnect.in
    setError("Forgot password is coming soon. Please contact support@pawconnect.in");
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Brand Panel ──────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-10">
          <FaPaw className="text-white text-4xl" />
          <span className="text-white text-3xl font-bold tracking-tight">
            PawConnect
          </span>
        </Link>

        {/* Central content */}
        <div className="z-10 space-y-6">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
            Welcome back to your furry family 🐾
          </h1>
          <p className="text-orange-100 text-lg leading-relaxed">
            Thousands of pets are waiting for a loving home. Sign in to
            continue your journey.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { label: "Pets Listed", value: "50+" },
              { label: "Happy Adoptions", value: "30+" },
              { label: "Cities", value: "3+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2"
              >
                <p className="text-white font-bold text-lg">{stat.value}</p>
                <p className="text-orange-100 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="z-10 bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
          <p className="text-white text-sm leading-relaxed italic">
            "PawConnect made it so easy to find my golden retriever Buddy. The
            AI care guide was a game-changer for a first-time pet owner!"
          </p>
          <div className="flex items-center gap-3 mt-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Priya S."
              className="w-8 h-8 rounded-full border-2 border-white/50"
            />
            <div>
              <p className="text-white font-semibold text-sm">Priya S.</p>
              <p className="text-orange-200 text-xs">Pet Adopter, Bangalore</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-white">
        {/* Mobile logo */}
        <Link
          to="/"
          className="lg:hidden flex items-center gap-2 mb-8 text-orange-500 font-bold text-2xl"
        >
          <FaPaw />
          PawConnect
        </Link>

        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-gray-500">
              New to PawConnect?{" "}
              <Link
                to="/register"
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}



          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                id="remember-me"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe((v) => !v)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  rememberMe
                    ? "bg-orange-500 border-orange-500"
                    : "bg-white border-gray-300 hover:border-orange-400"
                }`}
              >
                {rememberMe && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-600 cursor-pointer select-none"
                onClick={() => setRememberMe((v) => !v)}
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in to PawConnect"
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-gray-400">
            By signing in, you agree to use PawConnect responsibly and ethically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;