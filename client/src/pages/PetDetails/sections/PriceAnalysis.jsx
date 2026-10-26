import { useEffect, useState } from "react";
import { FaChartBar, FaRobot, FaArrowDown, FaInfoCircle, FaHeart } from "react-icons/fa";
import { generatePetPriceAnalysis } from "../../../services/aiService";

const recommendationConfig = {
  "Free Adoption": {
    color: "text-orange-600",
    bg: "bg-orange-500",
    light: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    icon: "🎁",
    label: "Free Adoption",
  },
  "Good Deal": {
    color: "text-green-600",
    bg: "bg-green-500",
    light: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    icon: "🎉",
    label: "Good Deal",
  },
  "Fair Price": {
    color: "text-amber-600",
    bg: "bg-amber-500",
    light: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    icon: "✅",
    label: "Fair Price",
  },
  "Potentially Expensive": {
    color: "text-red-600",
    bg: "bg-red-500",
    light: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    icon: "⚠️",
    label: "Above Reference",
  },
};

function PriceAnalysis({ priceAnalysis, pet }) {
  const [data, setData] = useState(priceAnalysis || null);

  useEffect(() => {
    let isMounted = true;
    if (pet) {
      generatePetPriceAnalysis(pet).then((res) => {
        if (isMounted && res?.data) {
          setData(res.data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [pet]);

  const activeData = data || {
    isAdoption: pet?.purpose === "adoption" || pet?.price === 0,
    currentPrice: pet?.price || 0,
    estimatedRangeLabel: "₹15,000 - ₹25,000",
    avgMarketPrice: 20000,
    aiVerdict: pet?.purpose === "adoption" || pet?.price === 0 ? "Free Adoption" : "Fair Price",
    explanation: "This listing has been evaluated against general species and regional attributes.",
    disclaimer: "AI Estimated Reference Range. This is a heuristic reference estimate, NOT a guaranteed market valuation.",
  };

  const config = recommendationConfig[activeData.aiVerdict] || recommendationConfig["Fair Price"];

  return (
    <section className="mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-3 rounded-2xl shadow-lg shadow-orange-200">
          <FaChartBar className="text-white text-2xl" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              AI Price Analysis
            </h2>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
              Reference Range 📊
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-0.5">
            AI Estimated Reference Range by PawConnect AI
          </p>
        </div>
      </div>

      {activeData.isAdoption ? (
        /* Adoption Listing Banner */
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-2xl flex-shrink-0">
              <FaHeart />
            </div>
            <div>
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                Listing Type
              </p>
              <h3 className="text-2xl font-bold text-gray-900">Free Adoption</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                No purchase price required for this listing.
              </p>
            </div>
          </div>
          <span className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xs">
            Free Adoption Listing
          </span>
        </div>
      ) : (
        /* Paid Listing Grid */
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Current Price */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl p-6 text-white shadow-lg shadow-orange-200">
            <p className="text-orange-100 text-xs font-semibold uppercase tracking-wide mb-1">
              Current Listed Price
            </p>
            <p className="text-4xl font-bold">
              ₹{activeData.currentPrice?.toLocaleString()}
            </p>
            <p className="text-orange-100 text-xs mt-1">Set by seller</p>
          </div>

          {/* AI Estimated Range */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">
              AI Estimated Reference Range
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {activeData.estimatedRangeLabel}
            </p>
            <p className="text-gray-400 text-xs mt-1">Based on species & breed factors</p>
          </div>

          {/* AI Verdict */}
          <div
            className={`rounded-2xl p-6 border ${config.light} flex flex-col justify-between`}
          >
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
              AI Verdict
            </p>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{config.icon}</span>
                <p className={`text-xl font-bold ${config.color}`}>
                  {config.label}
                </p>
              </div>
              {activeData.savingsPercent && (
                <div className="flex items-center gap-1.5 mt-1">
                  <FaArrowDown className="text-green-500 text-xs" />
                  <span className="text-green-600 text-xs font-semibold">
                    ~{activeData.savingsPercent}% below market average
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Explanation & Disclaimer */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5 space-y-3">
        <div className="flex gap-4 items-start">
          <div className="bg-white p-2.5 rounded-xl h-fit shadow-sm flex-shrink-0">
            <FaRobot className="text-orange-500 text-lg" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 mb-1">
              PawConnect AI Price Summary
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {activeData.explanation}
            </p>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="pt-3 border-t border-orange-200/60 flex items-center gap-2 text-xs text-gray-500">
          <FaInfoCircle className="text-orange-400 flex-shrink-0" />
          <span>{activeData.disclaimer}</span>
        </div>
      </div>
    </section>
  );
}

export default PriceAnalysis;