import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";

import Gallery from "./sections/Gallery";
import PetInfo from "./sections/PetInfo";
import AICareGuide from "./sections/AICareGuide";
import PriceAnalysis from "./sections/PriceAnalysis";
import SellerCard from "./sections/SellerCard";
import SimilarPets from "./sections/SimilarPets";

import { fetchPetByIdFromSupabase } from "../../services/petService";
import { petDetailData } from "../../services/petDetailsData";

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(petDetailData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPetByIdFromSupabase(id).then(({ data }) => {
      if (isMounted) {
        setPet(data || petDetailData);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-gray-50 min-h-screen flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">Loading pet details…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                to="/marketplace"
                className="hover:text-orange-500 transition-colors"
              >
                Marketplace
              </Link>
              <span>/</span>
              <span className="text-orange-500 font-medium">{pet.name}</span>
            </nav>
          </div>
        </div>

        {/* Page Header Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
            <Link
              to="/marketplace"
              className="flex items-center gap-1.5 text-orange-100 hover:text-white transition-colors text-sm font-medium bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20"
            >
              <FaChevronLeft className="text-xs" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold">
                {pet.name} — {pet.breed}
              </h1>
              <p className="text-orange-100 text-sm mt-0.5">
                {pet.location} · {pet.purpose}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top Grid: Gallery + PetInfo */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Gallery images={pet.images} isAIPick={pet.isAIPick} />
            <PetInfo pet={pet} />
          </div>

          {/* Divider */}
          <div className="my-10 border-t border-gray-200" />

          {/* Bottom Sections: Two-column on large screens */}
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left column: AI Care + Price Analysis */}
            <div className="lg:col-span-2 space-y-0">
              <AICareGuide careGuide={pet.careGuide} pet={pet} />
              <PriceAnalysis priceAnalysis={pet.priceAnalysis} pet={pet} />
            </div>

            {/* Right column: Seller Card (sticky) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <SellerCard seller={pet.seller} />
              </div>
            </div>
          </div>

          {/* Similar Pets — Full width */}
          <div className="border-t border-gray-200 mt-10">
            <SimilarPets currentPetId={pet.id} species={pet.species} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PetDetails;