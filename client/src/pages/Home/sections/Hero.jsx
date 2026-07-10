import hero from "../../../assets/images/hero.png";

function Hero() {
  return (
    <section className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* LEFT */}

          <div>

            <p className="text-orange-500 font-semibold mb-4">
              🐾 AI Powered Pet Adoption Platform
            </p>

            <h1 className="text-6xl font-extrabold leading-tight">

              Find Your

              <span className="text-orange-500">

                {" "}Perfect Pet

              </span>

              Companion

            </h1>

            <p className="text-gray-600 mt-8 text-lg">

              Adopt, buy, sell and care for pets with the
              power of Artificial Intelligence.

            </p>

            <div className="flex gap-5 mt-10">

              <button className="bg-orange-500 text-white px-7 py-4 rounded-xl hover:bg-orange-600 transition">

                Adopt a Pet

              </button>

              <button className="border border-orange-500 text-orange-500 px-7 py-4 rounded-xl hover:bg-orange-50 transition">

                List Your Pet

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <img
              src={hero}
              alt="Hero"
              className="w-full"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;