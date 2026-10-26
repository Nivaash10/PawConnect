import { supabase } from "../lib/supabase";
import defaultPets from "./petsData";
import { petDetailData } from "./petDetailsData";

/**
 * Fetches pet listings from Supabase `pets` table.
 * Applies optional filters for species, location, and search term.
 * Gracefully falls back to default pets data if Supabase fetch encounters an error.
 */
export async function fetchPetsFromSupabase(filters = {}) {
  try {
    let query = supabase
      .from("pets")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters.species && filters.species !== "All Pets") {
      query = query.ilike("species", `%${filters.species}%`);
    }

    if (filters.location && filters.location !== "Any Location") {
      query = query.ilike("location", `%${filters.location}%`);
    }

    if (filters.purpose && filters.purpose !== "All") {
      query = query.ilike("purpose", `%${filters.purpose}%`);
    }

    if (filters.search && filters.search.trim() !== "") {
      const term = filters.search.trim();
      query = query.or(
        `name.ilike.%${term}%,breed.ilike.%${term}%,location.ilike.%${term}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.warn("[PawConnect] Error fetching pets from Supabase:", error.message);
      // Filter defaultPets for fallback
      let filteredFallback = defaultPets;
      if (filters.species && filters.species !== "All Pets") {
        filteredFallback = filteredFallback.filter((p) =>
          p.species.toLowerCase().includes(filters.species.toLowerCase())
        );
      }
      if (filters.location && filters.location !== "Any Location") {
        filteredFallback = filteredFallback.filter((p) =>
          p.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      if (filters.purpose && filters.purpose !== "All") {
        filteredFallback = filteredFallback.filter((p) =>
          p.purpose.toLowerCase().includes(filters.purpose.toLowerCase())
        );
      }
      if (filters.search && filters.search.trim() !== "") {
        const t = filters.search.trim().toLowerCase();
        filteredFallback = filteredFallback.filter(
          (p) =>
            p.name.toLowerCase().includes(t) ||
            p.breed.toLowerCase().includes(t) ||
            p.location.toLowerCase().includes(t)
        );
      }
      return { data: filteredFallback, isFallback: true, error: null };
    }

    // If query returned results, use them
    if (data && data.length > 0) {
      return { data, isFallback: false, error: null };
    }

    // If table is empty without active search filters, return default mock data
    const hasActiveFilters =
      filters.search ||
      (filters.species && filters.species !== "All Pets") ||
      (filters.location && filters.location !== "Any Location") ||
      (filters.purpose && filters.purpose !== "All");

    if (!hasActiveFilters) {
      return { data: defaultPets, isFallback: true, error: null };
    }

    return { data: [], isFallback: false, error: null };
  } catch (err) {
    console.warn("[PawConnect] Unexpected error fetching pets:", err);
    return { data: defaultPets, isFallback: true, error: null };
  }
}

/**
 * Fetches single pet detail by ID from Supabase `pets` table, joining profiles and pet_images.
 * Falls back to static petDetailData or petsData match if not found or on error.
 */
export async function fetchPetByIdFromSupabase(id) {
  try {
    if (!id) return { data: petDetailData, isFallback: true };

    const { data: pet, error } = await supabase
      .from("pets")
      .select("*, profiles(*), pet_images(*)")
      .eq("id", id)
      .maybeSingle();

    if (error || !pet) {
      // Find matching pet in defaultPets fallback
      const foundMock = defaultPets.find(
        (p) => String(p.id) === String(id) || p.name.toLowerCase() === String(id).toLowerCase()
      );

      if (foundMock) {
        return {
          data: {
            ...petDetailData,
            id: foundMock.id,
            name: foundMock.name,
            breed: foundMock.breed,
            age: foundMock.age,
            gender: foundMock.gender,
            location: foundMock.location,
            price: typeof foundMock.price === "number" ? foundMock.price : parseFloat(foundMock.price) || 0,
            images: [foundMock.image_url || foundMock.image],
            vaccinated: foundMock.vaccinated,
            vaccinationStatus: foundMock.vaccinated ? "Fully Vaccinated" : "Vaccination Pending",
            purpose: foundMock.purpose
              ? foundMock.purpose.charAt(0).toUpperCase() + foundMock.purpose.slice(1).toLowerCase()
              : "Adoption",
          },
          isFallback: true,
        };
      }

      return { data: petDetailData, isFallback: true };
    }

    const gallery =
      pet.pet_images && pet.pet_images.length > 0
        ? pet.pet_images
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map((img) => img.image_url)
        : [pet.image_url || petDetailData.images[0]];

    const formattedPet = {
      ...petDetailData,
      id: pet.id,
      seller_id: pet.seller_id,
      name: pet.name,
      species: pet.species || "Dog",
      description: pet.description || petDetailData.description,
      breed: pet.breed || "Crossbreed",
      age: pet.age || "Unknown Age",
      gender: pet.gender || "Male",
      location: pet.location,
      vaccinated: pet.vaccinated,
      vaccinationStatus: pet.vaccinated ? "Fully Vaccinated" : "Vaccination Pending",
      price: typeof pet.price === "number" ? pet.price : parseFloat(pet.price) || 0,
      aiPriceScore: pet.ai_score || 94,
      purpose: pet.purpose
        ? pet.purpose.charAt(0).toUpperCase() + pet.purpose.slice(1).toLowerCase()
        : "Adoption",
      images: gallery,
      seller: pet.profiles
        ? {
            id: pet.seller_id,
            name: pet.profiles.full_name || "Pet Owner",
            avatar: pet.profiles.avatar_url || "https://randomuser.me/api/portraits/men/32.jpg",
            verified: true,
            rating: 4.9,
            totalAdoptions: 12,
            responseTime: "Usually within 2 hrs",
            memberSince: "2024",
          }
        : {
            ...petDetailData.seller,
            id: pet.seller_id,
          },
    };

    return { data: formattedPet, isFallback: false };
  } catch (err) {
    return { data: petDetailData, isFallback: true };
  }
}
