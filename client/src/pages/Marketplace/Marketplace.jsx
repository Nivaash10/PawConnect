import Navbar from "../../components/layout/Navbar";
import FilterBar from "./sections/FilterBar";
import PetGrid from "./sections/PetGrid";
import Footer from "../Home/sections/Footer";


function Marketplace() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">

        {/* Page Header */}

        <section className="bg-orange-500 text-white py-16">

          <div className="max-w-7xl mx-auto px-6">

            <h1 className="text-5xl font-bold">
              Marketplace
            </h1>

            <p className="mt-4 text-lg">
              Browse pets available for adoption or sale.
            </p>

          </div>

        </section>

        <FilterBar />

        <PetGrid />

      </main>

      <Footer />
    </>
  );
}

export default Marketplace;