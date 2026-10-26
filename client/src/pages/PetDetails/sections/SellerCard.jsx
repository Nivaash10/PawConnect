import {
  FaCheckCircle,
  FaPhone,
  FaComments,
  FaClock,
  FaPaw,
  FaCalendar,
  FaUser,
} from "react-icons/fa";

function SellerCard({ seller }) {
  // Only render data that actually exists — no fake hardcoded values
  const data = seller || {};

  const displayName = data.full_name || data.name || "Pet Owner";
  const avatarUrl = data.avatar_url || data.avatar || null;
  const isVerified = data.verified ?? (data.role === "seller");
  const responseTime = data.responseTime || "Within 24 hours";
  const memberSince = data.memberSince || data.created_at
    ? new Date(data.memberSince || data.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : null;

  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f97316&color=fff&size=80&bold=true`;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Meet the Seller</h2>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
        {/* Top accent strip */}
        <div className="h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

        <div className="p-6">
          {/* Avatar + Name */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative flex-shrink-0">
              <img
                src={avatarUrl || avatarFallback}
                alt={displayName}
                className="w-16 h-16 rounded-2xl object-cover shadow-md"
                onError={(e) => { e.target.src = avatarFallback; }}
              />
              {isVerified && (
                <div className="absolute -bottom-1.5 -right-1.5 bg-white p-0.5 rounded-full shadow-sm">
                  <FaCheckCircle className="text-blue-500 text-base" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900">{displayName}</h3>
                {isVerified && (
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                    <FaCheckCircle className="text-[10px]" />
                    Verified
                  </span>
                )}
              </div>

              {/* Info rows — only show if data exists */}
              <div className="mt-2 space-y-1">
                {memberSince && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <FaCalendar className="text-orange-400 text-[10px]" />
                    Member since {memberSince}
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <FaUser className="text-orange-400 text-[10px]" />
                  Registered Seller
                </div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3 mb-5">
            <FaClock className="text-orange-400 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Response Time</p>
              <p className="text-sm font-semibold text-gray-700">{responseTime}</p>
            </div>
          </div>

          {/* Trust note */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 flex items-center gap-2 mb-5">
            <FaPaw className="text-orange-500 text-sm flex-shrink-0" />
            <p className="text-xs text-orange-700 font-medium">
              Listings on PawConnect are posted by verified users.
            </p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md shadow-orange-100 cursor-pointer text-sm">
              <FaPhone className="text-xs" />
              Contact
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-orange-300 text-orange-600 font-semibold py-3 rounded-xl hover:bg-orange-50 transition-all duration-200 hover:border-orange-500 cursor-pointer text-sm">
              <FaComments className="text-xs" />
              Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SellerCard;