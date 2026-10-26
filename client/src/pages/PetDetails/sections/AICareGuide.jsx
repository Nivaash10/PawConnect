import { useEffect, useState } from "react";
import {
  FaRobot,
  FaUtensils,
  FaRunning,
  FaSyringe,
  FaCut,
  FaHome,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { generatePetCareGuide } from "../../../services/aiService";

const difficultyColor = {
  Easy: "text-green-600 bg-green-100",
  Moderate: "text-amber-600 bg-amber-100",
  Hard: "text-red-600 bg-red-100",
};

const CareCard = ({ icon: Icon, iconBg, title, value, accent }) => (
  <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex gap-4 items-start group`}>
    <div className={`${iconBg} p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className={`text-xl ${accent}`} />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
        {title}
      </p>
      <p className="text-sm font-medium text-gray-800 leading-relaxed">{value}</p>
    </div>
  </div>
);

const CompatibilityBadge = ({ label, compatible }) => (
  <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
    {compatible ? (
      <FaCheckCircle className="text-green-500 text-2xl flex-shrink-0" />
    ) : (
      <FaTimesCircle className="text-red-400 text-2xl flex-shrink-0" />
    )}
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
        Compatible With
      </p>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
    </div>
    <span
      className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full ${
        compatible
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {compatible ? "Yes" : "No"}
    </span>
  </div>
);

function AICareGuide({ careGuide, pet }) {
  const [data, setData] = useState(careGuide || null);
  const [loading, setLoading] = useState(!careGuide);

  useEffect(() => {
    let isMounted = true;
    if (pet) {
      setLoading(true);
      generatePetCareGuide(pet).then((res) => {
        if (isMounted && res?.data) {
          setData(res.data);
          setLoading(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [pet]);

  const activeData = data || {
    dailyFood: "2–3 cups of high-quality dry kibble split into 2 meals",
    exerciseDuration: "60–90 minutes of active exercise per day",
    vaccinationReminders: [
      "Rabies & DHPP annual core boosters",
      "Regular deworming checkup",
    ],
    groomingFrequency: "Brush 2–3 times a week; bath once a month",
    suitableHomeType: "House or apartment with regular outdoor exercise access",
    compatibleWithKids: true,
    compatibleWithPets: true,
    firstOwnerDifficulty: "Easy — great companion for first-time pet owners",
    disclaimer: "AI-generated general educational pet-care guidance, NOT veterinary diagnosis. For medical concerns or illness, please consult a qualified veterinarian.",
  };

  const difficulty = activeData.firstOwnerDifficulty ? activeData.firstOwnerDifficulty.split(" ")[0] : "Easy";

  return (
    <section className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-3 rounded-2xl shadow-lg shadow-orange-200">
          <FaRobot className="text-white text-2xl" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              AI Care Guide
            </h2>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
              Exclusive ✨
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-0.5">
            Personalized care recommendations generated for {pet?.name || "this pet"}
          </p>
        </div>
      </div>

      {/* Vet Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 mb-6 flex items-start gap-3 text-xs leading-relaxed">
        <FaExclamationTriangle className="text-amber-500 text-base flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Medical Disclaimer: </span>
          {activeData.disclaimer}
        </div>
      </div>

      {/* Difficulty Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaStar className="text-amber-400 text-xl" />
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              First-Time Owner Difficulty
            </p>
            <p className="text-gray-800 font-semibold text-sm mt-0.5">
              {activeData.firstOwnerDifficulty}
            </p>
          </div>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold ${
            difficultyColor[difficulty] || "text-green-600 bg-green-100"
          }`}
        >
          {difficulty}
        </span>
      </div>

      {/* Care Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <CareCard
          icon={FaUtensils}
          iconBg="bg-orange-100"
          accent="text-orange-500"
          title="Daily Food"
          value={activeData.dailyFood}
        />
        <CareCard
          icon={FaRunning}
          iconBg="bg-blue-100"
          accent="text-blue-500"
          title="Exercise"
          value={activeData.exerciseDuration}
        />
        <CareCard
          icon={FaCut}
          iconBg="bg-purple-100"
          accent="text-purple-500"
          title="Grooming"
          value={activeData.groomingFrequency}
        />
        <CareCard
          icon={FaHome}
          iconBg="bg-green-100"
          accent="text-green-600"
          title="Suitable Home"
          value={activeData.suitableHomeType}
        />
      </div>

      {/* Vaccination Reminders */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-2.5 rounded-xl">
            <FaSyringe className="text-red-500 text-lg" />
          </div>
          <p className="font-semibold text-gray-800">Vaccination Reminders</p>
        </div>
        <ul className="space-y-2.5">
          {activeData.vaccinationReminders?.map((reminder, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-gray-700"
            >
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
              {reminder}
            </li>
          ))}
        </ul>
      </div>

      {/* Compatibility */}
      <div className="grid sm:grid-cols-2 gap-4">
        <CompatibilityBadge
          label="Kids & Children"
          compatible={activeData.compatibleWithKids}
        />
        <CompatibilityBadge
          label="Other Pets"
          compatible={activeData.compatibleWithPets}
        />
      </div>
    </section>
  );
}

export default AICareGuide;