import { supabase } from "../lib/supabase";

/**
 * Check if user already submitted an active adoption request for a pet.
 * Active statuses are 'pending' or 'approved'.
 */
export async function checkExistingRequest(petId, requesterId) {
  if (!petId || !requesterId) return null;
  try {
    const { data, error } = await supabase
      .from("adoption_requests")
      .select("*")
      .eq("pet_id", petId)
      .eq("requester_id", requesterId)
      .in("status", ["pending", "approved"])
      .maybeSingle();

    if (error) {
      console.warn("[PawConnect] Error checking existing adoption request:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.warn("[PawConnect] Unexpected error in checkExistingRequest:", err);
    return null;
  }
}

/**
 * Creates a new adoption request for a pet listing.
 */
export async function createAdoptionRequest({ petId, requesterId, sellerId, message }) {
  if (!petId || !requesterId) {
    return { success: false, error: "Missing required adoption request fields." };
  }

  try {
    // 1. Resolve pet's seller_id if missing
    let finalSellerId = sellerId;
    if (!finalSellerId) {
      const { data: petData } = await supabase
        .from("pets")
        .select("seller_id")
        .eq("id", petId)
        .maybeSingle();
      finalSellerId = petData?.seller_id;
    }

    // 2. Prevent self-adoption
    if (finalSellerId && finalSellerId === requesterId) {
      return {
        success: false,
        isOwner: true,
        error: "You cannot submit an adoption request for your own pet listing.",
      };
    }

    // 3. Check for existing active request
    const existing = await checkExistingRequest(petId, requesterId);
    if (existing) {
      return {
        success: false,
        isDuplicate: true,
        error: `You have already submitted an active adoption request for this pet (Status: ${existing.status}).`,
      };
    }

    // Default seller_id fallback if missing in system
    if (!finalSellerId) {
      finalSellerId = "00000000-0000-0000-0000-000000000001";
    }

    const { data, error } = await supabase
      .from("adoption_requests")
      .insert([
        {
          pet_id: petId,
          requester_id: requesterId,
          seller_id: finalSellerId,
          message: message?.trim() || "I would love to adopt this pet!",
          status: "pending",
        },
      ])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data ? data[0] : null };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all adoption requests received by a seller for their listings.
 */
export async function getSellerAdoptionRequests(sellerId) {
  if (!sellerId) return [];
  try {
    let { data, error } = await supabase
      .from("adoption_requests")
      .select("*, pets(*), profiles!adoption_requests_requester_id_fkey(*)")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (error) {
      // Fallback query without explicit relation hint if alias fails
      const fallback = await supabase
        .from("adoption_requests")
        .select("*, pets(*)")
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false });
      
      if (fallback.error) {
        console.warn("[PawConnect] Error fetching seller adoption requests:", fallback.error.message);
        return [];
      }
      return fallback.data || [];
    }

    return data || [];
  } catch (err) {
    console.warn("[PawConnect] Unexpected error in getSellerAdoptionRequests:", err);
    return [];
  }
}

/**
 * Fetch all adoption requests submitted by a requester.
 */
export async function getUserAdoptionRequests(requesterId) {
  if (!requesterId) return [];
  try {
    let { data, error } = await supabase
      .from("adoption_requests")
      .select("*, pets(*), profiles!adoption_requests_seller_id_fkey(*)")
      .eq("requester_id", requesterId)
      .order("created_at", { ascending: false });

    if (error) {
      // Fallback query without explicit relation hint if alias fails
      const fallback = await supabase
        .from("adoption_requests")
        .select("*, pets(*)")
        .eq("requester_id", requesterId)
        .order("created_at", { ascending: false });

      if (fallback.error) {
        console.warn("[PawConnect] Error fetching user adoption requests:", fallback.error.message);
        return [];
      }
      return fallback.data || [];
    }

    return data || [];
  } catch (err) {
    console.warn("[PawConnect] Unexpected error in getUserAdoptionRequests:", err);
    return [];
  }
}

/**
 * Update the status of an adoption request ('approved', 'rejected', 'cancelled').
 */
export async function updateAdoptionRequestStatus(requestId, status) {
  if (!requestId || !status) return { success: false, error: "Missing parameters" };
  try {
    const { data, error } = await supabase
      .from("adoption_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", requestId)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data ? data[0] : null };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
