import { FaSearch, FaComments, FaHome } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Browse Pets",
    description:
      "Search thousands of pets available for adoption or sale.",
  },
  {
    icon: <FaComments />,
    title: "Connect with Owner",
    description:
      "Chat directly with owners or shelters securely.",
  },
  {
    icon: <FaHome />,
    title: "Bring Home",
    description:
      "Complete the adoption process and welcome your new friend.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            How PawConnect Works
          </h2>

          <p className="text-gray-500 mt-4">
            Finding your perfect companion is just three simple steps.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step, index) => (

            <div
              key={index}
              className="bg-gray-50 rounded-3xl p-10 text-center shadow hover:shadow-xl transition duration-300"
            >

              <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;