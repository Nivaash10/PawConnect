import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMars,
  FaVenus,
  FaShieldAlt,
  FaMicrochip,
  FaHeart,
  FaHome,
  FaTag,
  FaShare,
  FaComments,
  FaCheckCircle,
  FaStar,
  FaBolt,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { createAdoptionRequest, checkExistingRequest } from "../../../services/adoptionService";

const Badge = ({ icon: Icon, label, color = "orange" }) => {
  const colorMap = {
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    green: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    pink: "bg-pink-100 text-pink-700 border-pink-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${colorMap[color]}`}
    >
      {Icon && <Icon className="text-xs" />}
      {label}
    </span>
  );
};

function PetInfo({ pet }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', text: '' }

  const data = pet || {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 Years",
    gender: "Male",
    location: "Coimbatore, Tamil Nadu",
    vaccinationStatus: "Fully Vaccinated",
    price: 18000,
    aiPriceScore: 96,
    availability: "Available Now",
    purpose: "Adoption",
    microchipped: true,
    friendly: true,
    indoor: true,
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: data.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleAdoptClick = async () => {
    if (!isAuthenticated || !user?.id) {
      navigate("/login", { state: { from: { pathname: window.location.pathname } } });
      return;
    }

    const petSellerId = data.seller_id || data.seller?.id;
    if (user?.id && petSellerId && user.id === petSellerId) {
      setFeedback({
        type: "error",
        text: "This is your own pet listing. You cannot submit an adoption request for your own pet.",
      });
      setModalOpen(true);
      return;
    }

    setSubmitting(true);
    setModalOpen(true);
    setFeedback(null);

    // Pre-check for duplicate active request
    const existing = await checkExistingRequest(data.id, user.id);
    if (existing) {
      setFeedback({
        type: "error",
        text: `You have already submitted an adoption request for ${data.name} (Status: ${existing.status}).`,
      });
    }

    setSubmitting(false);
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const petSellerId = data.seller_id || data.seller?.id;

    const res = await createAdoptionRequest({
      petId: data.id,
      requesterId: user.id,
      sellerId: petSellerId,
      message: message || `Hi, I am interested in adopting ${data.name}!`,
    });

    setSubmitting(false);

    if (res.success) {
      setFeedback({
        type: "success",
        text: `Your adoption request for ${data.name} has been submitted successfully to the owner!`,
      });
      setMessage("");
    } else {
      setFeedback({
        type: "error",
        text: res.error || "Could not process request. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
            <p className="text-gray-500 text-lg mt-1">{data.breed}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">
              {typeof data.price === "number"
                ? data.price === 0
                  ? "Free"
                  : `₹${data.price.toLocaleString("en-IN")}`
                : data.price}
            </div>
            <div className="flex items-center gap-1 justify-end mt-1">
              <FaStar className="text-amber-400 text-sm" />
              <span className="text-sm text-gray-600 font-medium">
                AI Score {data.aiPriceScore || data.ai_score || 94}%
              </span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-600 font-medium text-sm">
            {data.availability || "Available Now"}
          </span>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 gap-3">
        <InfoRow
          icon={FaMars}
          label="Gender"
          value={data.gender}
          iconColor={data.gender === "Male" ? "text-blue-500" : "text-pink-500"}
        >
          {data.gender === "Female" ? (
            <FaVenus className="text-pink-500" />
          ) : null}
        </InfoRow>

        <InfoRow icon={FaBolt} label="Age" value={data.age} iconColor="text-amber-500" />

        <InfoRow
          icon={FaMapMarkerAlt}
          label="Location"
          value={data.location}
          iconColor="text-red-500"
        />

        <InfoRow
          icon={FaShieldAlt}
          label="Vaccines"
          value={data.vaccinationStatus || (data.vaccinated ? "Vaccinated" : "Pending")}
          iconColor="text-green-600"
        />

        <InfoRow
          icon={FaTag}
          label="Purpose"
          value={data.purpose}
          iconColor="text-orange-500"
        />

        <InfoRow
          icon={FaHome}
          label="Indoor"
          value={data.indoor !== false ? "Yes" : "No"}
          iconColor="text-purple-500"
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {data.microchipped && (
          <Badge icon={FaMicrochip} label="Microchipped" color="blue" />
        )}
        {data.friendly !== false && (
          <Badge icon={FaHeart} label="Friendly" color="pink" />
        )}
        <Badge icon={FaShieldAlt} label={data.vaccinated ? "Vaccinated" : "Pending"} color="green" />
        <Badge icon={FaHome} label="Indoor Pet" color="purple" />
        <Badge icon={FaTag} label={data.purpose} color="orange" />
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAdoptClick}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg cursor-pointer"
        >
          <FaHeart />
          Adopt Now
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAdoptClick}
            className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-orange-300 text-orange-600 font-semibold rounded-2xl hover:bg-orange-50 transition-all duration-200 hover:border-orange-500"
          >
            <FaComments />
            Contact Seller
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200 hover:border-gray-400"
          >
            <FaShare />
            Share
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-orange-50 rounded-2xl p-4 flex items-center gap-3">
        <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            PawConnect Verified Listing
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            This pet's details have been verified by our team.
          </p>
        </div>
      </div>

      {/* Adoption Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                <FaPaperPlane />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Adopt {data.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Send an adoption request directly to the pet owner.
                </p>
              </div>
            </div>

            {feedback ? (
              <div className="space-y-4 my-4">
                <div
                  className={`p-4 rounded-2xl text-sm font-medium ${
                    feedback.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {feedback.text}
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Message to Seller (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Tell the seller a bit about yourself and why you'd like to adopt ${data.name}...`}
                    className="w-full border border-gray-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? "Sending…" : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, iconColor }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
      <div className={`${iconColor} text-base flex-shrink-0`}>
        <Icon />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default PetInfo;