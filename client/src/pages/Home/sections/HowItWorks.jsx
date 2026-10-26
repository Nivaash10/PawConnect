import { Link } from "react-router-dom";
import {
  FaSearch,
  FaHandshake,
  FaFileAlt,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    step: "01",
    icon: FaSearch,
    title: "Discover",
    description: "Browse verified pet listings across India. Filter by species, location, and purpose. Use AI matching to find your ideal companion.",
    path: "/marketplace",
    color: "bg-orange-100 text-orange-600",
    hoverColor: "group-hover:bg-orange-500 group-hover:text-white",
  },
  {
    step: "02",
    icon: FaHandshake,
    title: "Connect",
    description: "Submit an adoption request directly to the pet owner. Share a personal message about why you'd be a great home.",
    path: "/marketplace",
    color: "bg-blue-100 text-blue-600",
    hoverColor: "group-hover:bg-blue-500 group-hover:text-white",
  },
  {
    step: "03",
    icon: FaFileAlt,
    title: "Apply",
    description: "The seller reviews your application. Once approved, coordinate the details and ensure a smooth handover for your new companion.",
    path: "/dashboard",
    color: "bg-purple-100 text-purple-600",
    hoverColor: "group-hover:bg-purple-500 group-hover:text-white",
  },
  {
    step: "04",
    icon: FaHome,
    title: "Welcome Home",
    description: "Your pet is officially family! Use PawConnect's AI Care Guide for personalized feeding, grooming, and health advice.",
    path: "/ai",
    color: "bg-green-100 text-green-600",
    hoverColor: "group-hover:bg-green-500 group-hover:text-white",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-200">
            Simple & Transparent
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How PawConnect Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From discovery to welcoming your new companion home — four simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange-200 via-blue-200 via-purple-200 to-green-200 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Link
                key={step.step}
                to={step.path}
                className="group bg-white rounded-3xl p-7 border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 block relative z-10"
              >
                {/* Step number */}
                <div className="text-xs font-bold text-gray-300 mb-5 tracking-widest uppercase">
                  Step {step.step}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl mb-5 transition-all duration-300 ${step.color} ${step.hoverColor}`}>
                  <Icon />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow */}
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1">
                  Learn more <FaArrowRight className="text-xs" />
                </div>

                {/* Step indicator dot (desktop connector) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-12 w-6 h-6 bg-white border-2 border-orange-200 rounded-full z-20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;