import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
  getFavoritePetIds,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load user favorites on login / auth change
  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setFavoriteIds(new Set());
      return;
    }

    setLoading(true);
    const ids = await getFavoritePetIds(user.id);
    setFavoriteIds(new Set(ids));
    setLoading(false);
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const isFavorited = (petId) => {
    return favoriteIds.has(String(petId));
  };

  const toggleFavorite = async (petId) => {
    if (!isAuthenticated || !user?.id) {
      return { success: false, requireLogin: true };
    }

    const strPetId = String(petId);
    const currentlyFavorited = favoriteIds.has(strPetId);

    // Optimistic update
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (currentlyFavorited) {
        next.delete(strPetId);
      } else {
        next.add(strPetId);
      }
      return next;
    });

    if (currentlyFavorited) {
      const result = await removeFavorite(user.id, petId);
      if (!result.success) {
        // Rollback
        setFavoriteIds((prev) => new Set(prev).add(strPetId));
        return result;
      }
    } else {
      const result = await addFavorite(user.id, petId);
      if (!result.success) {
        // Rollback
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(strPetId);
          return next;
        });
        return result;
      }
    }

    return { success: true, favorited: !currentlyFavorited };
  };

  const value = {
    favoriteIds,
    favoriteCount: favoriteIds.size,
    isFavorited,
    toggleFavorite,
    reloadFavorites: loadFavorites,
    loading,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within <FavoritesProvider>");
  }
  return context;
}

export default FavoritesContext;
