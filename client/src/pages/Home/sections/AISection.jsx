import {
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import heroImage from "../../../assets/images/hero.png";

function AISection() {
  return (
    <section className="bg-orange-50 py-20">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Section */}

        <div>

          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🤖 AI Powered Pet Care
          </span>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Meet Your
            <span className="text-orange-500"> AI Pet Assistant</span>
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Get instant AI-powered advice about pet food, health,
            vaccination schedules, breed information and training
            whenever you need it.
          </p>

          {/* Search Box */}

          <div className="flex flex-col sm:flex-row gap-4 mb-8">

            <input
              type="text"
              placeholder="Ask anything about your pet..."
              className="flex-1 px-5 py-4 rounded-xl border border-gray-300 outline-none focus:border-orange-500"
            />

            <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 rounded-xl flex items-center justify-center gap-2 font-semibold">
              Ask AI
              <FaArrowRight />
            </button>

          </div>

          {/* AI Features */}

          <div className="grid grid-cols-2 gap-4">

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-orange-500" />
              <span>Diet Planner</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-orange-500" />
              <span>Breed Information</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-orange-500" />
              <span>Health Guidance</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-orange-500" />
              <span>Vaccination Tips</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-orange-500" />
              <span>Training Advice</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-orange-500" />
              <span>24/7 AI Support</span>
            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="relative flex justify-center">

          <div className="absolute w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-40"></div>

          <img
            src={heroImage}
            alt="AI Assistant"
            className="relative w-full max-w-md"
          />

          {/* Floating Card */}

          <div className="absolute bottom-8 left-0 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3">

            <div className="bg-orange-100 p-3 rounded-full">
              <FaRobot className="text-orange-500 text-xl" />
            </div>

            <div>
              <h4 className="font-semibold">
                AI Assistant Online
              </h4>

              <p className="text-sm text-gray-500">
                Ready to help your pets
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AISection;