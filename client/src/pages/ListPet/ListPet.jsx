import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaPaw, FaCamera, FaCheckCircle, FaImage, FaMagic, FaRobot, FaSync } from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { generatePetDescription } from "../../services/aiService";

const PRESET_IMAGES = [
  { label: "Golden Retriever", url: "/images/dog1.jpg" },
  { label: "Persian Cat", url: "/images/dog2.jpg" },
  { label: "German Shepherd", url: "/images/dog3.jpg" },
  { label: "Playful Puppy", url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80" },
  { label: "Cute Kitten", url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80" },
];

function ListPet() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "1 Year",
    gender: "Male",
    location: "",
    price: "0",
    purpose: "adoption",
    image_url: "/images/dog1.jpg",
    description: "",
    vaccinated: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPreview, setAiPreview] = useState(null);

  const handleGenerateAIDescription = async () => {
    if (!formData.name.trim()) {
      setError("Please enter the pet's name before generating an AI description.");
      return;
    }
    setAiGenerating(true);
    setError(null);
    try {
      const res = await generatePetDescription(formData);
      if (res?.description) {
        setAiPreview(res.description);
      }
    } catch (err) {
      console.warn("Error generating AI description:", err);
    } finally {
      setAiGenerating(false);
    }
  };

  // Unauthenticated user redirect
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/list-pet" } } });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectPresetImage = (url) => {
    setFormData((prev) => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setError("You must be logged in to create a pet listing.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter the pet's name.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter the city / location.");
      return;
    }

    const numericPrice = parseFloat(formData.price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      setError("Price must be a valid non-negative number (0 for free adoption).");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const finalPrice = formData.purpose === "adoption" ? 0 : numericPrice;
      const finalImageUrl = formData.image_url.trim() || "/images/dog1.jpg";

      // 1. Insert into pets table
      const { data: petData, error: insertError } = await supabase
        .from("pets")
        .insert([
          {
            seller_id: user.id,
            name: formData.name.trim(),
            species: formData.species,
            breed: formData.breed.trim() || "Crossbreed",
            age: formData.age.trim() || "1 Year",
            gender: formData.gender,
            location: formData.location.trim(),
            price: finalPrice,
            purpose: formData.purpose,
            image_url: finalImageUrl,
            description: formData.description.trim() || `${formData.name} is looking for a warm and loving home!`,
            vaccinated: formData.vaccinated,
            ai_score: 95,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      // 2. Insert primary image into pet_images gallery table if pet was created
      if (petData && petData[0]) {
        await supabase.from("pet_images").insert([
          {
            pet_id: petData[0].id,
            image_url: finalImageUrl,
            display_order: 0,
          },
        ]);
      }

      setSuccessMsg(`"${formData.name}" has been published successfully!`);
      
      setTimeout(() => {
        navigate("/my-listings");
      }, 1200);
    } catch (err) {
      console.error("[PawConnect] Error inserting pet listing:", err);
      setError(err.message || "Failed to create pet listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <>
        <Navbar />
        <main className="bg-gray-50 min-h-screen flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-6">
          {/* Back link */}
          <Link
            to="/my-listings"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition mb-6 font-medium"
          >
            <FaArrowLeft className="text-xs" />
            Back to My Listings
          </Link>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 text-xl">
                <FaPaw />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">List a New Pet</h1>
                <p className="text-xs text-gray-500">
                  Fill in the details to publish your pet for adoption or sale.
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm mb-6 font-medium">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl text-sm mb-6 font-medium flex items-center gap-2">
                <FaCheckCircle className="text-lg text-green-600" />
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Pet Name & Species */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Max"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Species *
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Breed & Age */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="e.g. Golden Retriever"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 2 Years"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  />
                </div>
              </div>

              {/* Gender & Purpose */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Listing Purpose *
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition bg-white font-medium text-orange-600"
                  >
                    <option value="adoption">Adoption (Free)</option>
                    <option value="sale">Sale (Paid)</option>
                  </select>
                </div>
              </div>

              {/* Location & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Coimbatore"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Price (₹) {formData.purpose === "adoption" && "(Free Adoption)"}
                  </label>
                  <input
                    type="number"
                    name="price"
                    disabled={formData.purpose === "adoption"}
                    value={formData.purpose === "adoption" ? "0" : formData.price}
                    onChange={handleChange}
                    placeholder="0 for adoption"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
              </div>

              {/* Image Picker / URL */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1 flex justify-between">
                  <span>Pet Image URL</span>
                  <span className="text-[10px] text-gray-400 font-normal">Pick preset or paste custom URL</span>
                </label>

                {/* Presets */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => handleSelectPresetImage(img.url)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition flex items-center gap-1 ${
                        formData.image_url === img.url
                          ? "bg-orange-50 border-orange-500 text-orange-700"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <FaImage className="text-[10px]" />
                      {img.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  />
                  <FaCamera className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
                </div>
                {formData.image_url && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                      onError={(e) => {
                        e.target.src = "/images/dog1.jpg";
                      }}
                    />
                    <span className="text-xs text-gray-400">Selected image preview</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">
                    Description
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateAIDescription}
                    disabled={aiGenerating}
                    className="text-xs text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200 transition disabled:opacity-50 cursor-pointer"
                  >
                    {aiGenerating ? (
                      <>
                        <div className="w-3 h-3 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                        Generating…
                      </>
                    ) : (
                      <>
                        <FaMagic className="text-orange-500 text-xs" />
                        Generate Description with AI ✨
                      </>
                    )}
                  </button>
                </div>

                {/* AI Preview Box */}
                {aiPreview && (
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4 mb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
                        <FaRobot className="text-sm text-orange-500" />
                        AI Generated Listing Preview
                      </div>
                      <span className="text-[10px] text-gray-500">Based on provided facts</span>
                    </div>

                    <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap bg-white/80 p-3 rounded-xl border border-orange-100">
                      {aiPreview}
                    </p>

                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={handleGenerateAIDescription}
                        disabled={aiGenerating}
                        className="text-xs text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1"
                      >
                        <FaSync className="text-[10px]" />
                        Regenerate
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, description: aiPreview }));
                          setAiPreview(null);
                        }}
                        className="text-xs text-white bg-orange-500 hover:bg-orange-600 px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 shadow-xs"
                      >
                        <FaCheckCircle className="text-[10px]" />
                        Use Description
                      </button>
                    </div>
                  </div>
                )}

                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your pet's personality, health, and background..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                />
              </div>

              {/* Vaccinated Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="vaccinated"
                  name="vaccinated"
                  checked={formData.vaccinated}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="vaccinated" className="text-sm text-gray-700 font-medium cursor-pointer">
                  Pet is fully vaccinated
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/my-listings")}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition shadow-md shadow-orange-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing…
                    </>
                  ) : (
                    "Publish Pet Listing"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ListPet;
