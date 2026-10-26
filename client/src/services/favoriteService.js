import { supabase } from "../lib/supabase";

/**
 * Fetches all favorited pet IDs for a given user.
 */
export async function getFavoritePetIds(userId) {
  if (!userId) return [];
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("pet_id")
      .eq("user_id", userId);

    if (error) {
      console.warn("[PawConnect] Error fetching favorite pet IDs:", error.message);
      return [];
    }

    return (data || []).map((item) => item.pet_id);
  } catch (err) {
    console.warn("[PawConnect] Unexpected error in getFavoritePetIds:", err);
    return [];
  }
}

/**
 * Fetches full favorited pet objects with pet data joined.
 */
export async function getUserFavorites(userId) {
  if (!userId) return [];
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("id, created_at, pet_id, pets(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[PawConnect] Error fetching user favorites:", error.message);
      return [];
    }

    // Filter out null pets if a pet was deleted
    return (data || [])
      .filter((fav) => fav.pets !== null)
      .map((fav) => ({
        favoriteId: fav.id,
        favoritedAt: fav.created_at,
        ...fav.pets,
      }));
  } catch (err) {
    console.warn("[PawConnect] Unexpected error in getUserFavorites:", err);
    return [];
  }
}

/**
 * Adds a pet to the user's favorites.
 */
export async function addFavorite(userId, petId) {
  if (!userId || !petId) return { success: false, error: "Missing parameters" };

  try {
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ user_id: userId, pet_id: petId }])
      .select();

    if (error) {
      // Handle unique constraint conflict gracefully
      if (error.code === "23505") {
        return { success: true, alreadyFavorited: true };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Removes a pet from the user's favorites.
 */
export async function removeFavorite(userId, petId) {
  if (!userId || !petId) return { success: false, error: "Missing parameters" };

  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("pet_id", petId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
