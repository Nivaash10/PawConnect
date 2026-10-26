import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaPaw,
  FaDog,
  FaHeart,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const USER_TYPES = [
  {
    id: "adopter",
    label: "Pet Adopter",
    icon: FaHeart,
    description: "I'm looking to adopt or buy a pet",
  },
  {
    id: "owner",
    label: "Pet Owner",
    icon: FaDog,
    description: "I want to list my pets for adoption or sale",
  },
];

function Register() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userType, setUserType] = useState("adopter");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Please enter your full name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email.";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";
    if (!agreedToTerms)
      return "You must agree to the Terms & Conditions to continue.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const { error: authError } = await signUp({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName.trim(),
      userType,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Registration failed. Please try again.");
    } else {
      setSuccess(true);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error: authError } = await signInWithGoogle();
    setLoading(false);
    if (authError) setError(authError.message);
  };

  // ── Success state ────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaPaw className="text-orange-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You're almost in! 🎉
          </h2>
          <p className="text-gray-500 mb-6">
            We've sent a confirmation link to{" "}
            <span className="font-semibold text-gray-700">{formData.email}</span>.
            Please check your inbox and click the link to activate your account.
          </p>
          <Link
            to="/login"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200"
          >
            Go to Login
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Didn't get it? Check your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Brand Panel ──────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-white/5 rounded-full" />

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
            Every pet deserves a loving home 🐾
          </h1>
          <p className="text-orange-100 text-lg leading-relaxed">
            Join thousands of pet lovers across India. Whether you want to
            adopt or list your pet, PawConnect has you covered.
          </p>

          {/* Feature list */}
          <ul className="space-y-3">
            {[
              "AI-powered pet matching & care guides",
              "Verified sellers & safe adoptions",
              "Real-time price analysis",
              "Connect with a community of pet lovers",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">
                  ✓
                </span>
                <span className="text-orange-100 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom info card */}
        <div className="z-10 bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="member"
                  className="w-8 h-8 rounded-full border-2 border-orange-400 object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Join 8,500+ happy members
              </p>
              <p className="text-orange-200 text-xs">
                Pets adopted in the last 30 days: 240+
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto py-10">
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
          <div className="mb-7">
            <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
            <p className="mt-2 text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
              >
                Sign in
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

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm font-medium">or register with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Full name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="register-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Arjun Mehra"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="register-email"
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
              <label
                htmlFor="register-password"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
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
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((level) => {
                    const strength =
                      formData.password.length >= 12 &&
                      /[A-Z]/.test(formData.password) &&
                      /[0-9]/.test(formData.password) &&
                      /[^A-Za-z0-9]/.test(formData.password)
                        ? 4
                        : formData.password.length >= 10
                        ? 3
                        : formData.password.length >= 8
                        ? 2
                        : 1;
                    return (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          level <= strength
                            ? strength === 1
                              ? "bg-red-400"
                              : strength === 2
                              ? "bg-amber-400"
                              : strength === 3
                              ? "bg-yellow-400"
                              : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Confirm password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 text-sm ${
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                      : "border-gray-200 focus:border-orange-400 focus:ring-orange-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500">
                    Passwords don't match
                  </p>
                )}
            </div>

            {/* User Type Selector */}
            <div>
              <p className="block text-sm font-semibold text-gray-700 mb-2">
                I am a…
              </p>
              <div className="grid grid-cols-2 gap-3">
                {USER_TYPES.map(({ id, label, icon: Icon, description }) => (
                  <button
                    key={id}
                    type="button"
                    id={`user-type-${id}`}
                    onClick={() => setUserType(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      userType === id
                        ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/30"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        userType === id
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Icon className="text-lg" />
                    </div>
                    <span
                      className={`font-semibold text-sm ${
                        userType === id ? "text-orange-600" : "text-gray-700"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-xs text-gray-400 leading-tight">
                      {description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                id="agree-terms"
                role="checkbox"
                aria-checked={agreedToTerms}
                onClick={() => setAgreedToTerms((v) => !v)}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  agreedToTerms
                    ? "bg-orange-500 border-orange-500"
                    : "bg-white border-gray-300 hover:border-orange-400"
                }`}
              >
                {agreedToTerms && (
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
              <p
                className="text-sm text-gray-600 cursor-pointer select-none"
                onClick={() => setAgreedToTerms((v) => !v)}
              >
                I agree to PawConnect's{" "}
                <Link
                  to="/terms"
                  className="text-orange-500 hover:underline font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-orange-500 hover:underline font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </Link>
              </p>
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
                  Creating your account…
                </>
              ) : (
                "Create my PawConnect account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;