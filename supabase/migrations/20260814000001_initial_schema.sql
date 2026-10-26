-- =============================================================================
-- PawConnect — Initial Database Schema
-- Migration: 20260814000001_initial_schema.sql
-- =============================================================================
-- Tables: profiles, pets, pet_images, favorites, adoption_requests
-- RLS policies enforced on every table
-- Useful indexes for marketplace queries
-- =============================================================================

-- =============================================================================
-- 1. PROFILES
--    One row per authenticated user, auto-created by trigger on auth.users.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  avatar_url   TEXT,
  phone        TEXT,
  location     TEXT,
  role         TEXT        NOT NULL DEFAULT 'buyer'
                           CHECK (role IN ('buyer', 'seller', 'admin')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS 'Extended user profile data linked to auth.users.';
COMMENT ON COLUMN public.profiles.role IS 'buyer | seller | admin';

-- Trigger: keep updated_at fresh on every update
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger: auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =============================================================================
-- 2. PETS
--    Core pet listing table — one row per listed pet.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.pets (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name         TEXT        NOT NULL,
  species      TEXT        NOT NULL,                          -- dog, cat, bird, rabbit, etc.
  breed        TEXT,
  age          TEXT,                                          -- e.g. "2 Years"
  gender       TEXT        CHECK (gender IN ('Male', 'Female', 'Unknown')),
  location     TEXT        NOT NULL,
  price        NUMERIC(10, 2) NOT NULL DEFAULT 0,            -- 0 = free / adoption
  purpose      TEXT        NOT NULL DEFAULT 'adoption'
                           CHECK (purpose IN ('adoption', 'sale')),
  image_url    TEXT,                                          -- primary/cover image
  description  TEXT,
  vaccinated   BOOLEAN     NOT NULL DEFAULT FALSE,
  ai_score     SMALLINT    CHECK (ai_score BETWEEN 0 AND 100),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.pets IS 'Pet listings available for adoption or sale.';
COMMENT ON COLUMN public.pets.purpose IS 'adoption | sale';
COMMENT ON COLUMN public.pets.price IS 'Price in INR (₹). 0 indicates free/adoption.';
COMMENT ON COLUMN public.pets.ai_score IS 'AI-generated health/compatibility score 0–100.';

CREATE TRIGGER pets_updated_at
  BEFORE UPDATE ON public.pets
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- =============================================================================
-- 3. PET_IMAGES
--    Additional images for a pet listing (gallery / carousel).
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.pet_images (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID        NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  image_url     TEXT        NOT NULL,
  display_order SMALLINT    NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.pet_images IS 'Gallery images for a pet listing, ordered by display_order.';


-- =============================================================================
-- 4. FAVORITES
--    Users can save/bookmark pet listings they are interested in.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.favorites (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pet_id     UUID        NOT NULL REFERENCES public.pets(id)     ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, pet_id)
);

COMMENT ON TABLE public.favorites IS 'Saved/bookmarked pets for each user.';


-- =============================================================================
-- 5. ADOPTION_REQUESTS
--    A requester (buyer) sends a request to adopt/buy a pet from a seller.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.adoption_requests (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id       UUID        NOT NULL REFERENCES public.pets(id)     ON DELETE CASCADE,
  requester_id UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status       TEXT        NOT NULL DEFAULT 'pending'
                           CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  message      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.adoption_requests IS 'Adoption/purchase requests sent by buyers to sellers.';

CREATE TRIGGER adoption_requests_updated_at
  BEFORE UPDATE ON public.adoption_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- =============================================================================
-- INDEXES
--    Optimise common marketplace queries (filtering, searching, joining).
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_pets_species      ON public.pets (species);
CREATE INDEX IF NOT EXISTS idx_pets_breed        ON public.pets (breed);
CREATE INDEX IF NOT EXISTS idx_pets_location     ON public.pets (location);
CREATE INDEX IF NOT EXISTS idx_pets_purpose      ON public.pets (purpose);
CREATE INDEX IF NOT EXISTS idx_pets_price        ON public.pets (price);
CREATE INDEX IF NOT EXISTS idx_pets_seller_id    ON public.pets (seller_id);
CREATE INDEX IF NOT EXISTS idx_pets_created_at   ON public.pets (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_pet_images_pet_id ON public.pet_images (pet_id);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites (user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_pet_id  ON public.favorites (pet_id);

CREATE INDEX IF NOT EXISTS idx_adoption_pet_id          ON public.adoption_requests (pet_id);
CREATE INDEX IF NOT EXISTS idx_adoption_requester_id    ON public.adoption_requests (requester_id);
CREATE INDEX IF NOT EXISTS idx_adoption_seller_id       ON public.adoption_requests (seller_id);
CREATE INDEX IF NOT EXISTS idx_adoption_status          ON public.adoption_requests (status);


-- =============================================================================
-- ROW-LEVEL SECURITY (RLS)
-- =============================================================================

ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_images        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adoption_requests ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- RLS POLICIES — PROFILES
-- =============================================================================

CREATE POLICY "profiles: public read"
  ON public.profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "profiles: owner update"
  ON public.profiles FOR UPDATE
  USING  (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- =============================================================================
-- RLS POLICIES — PETS
-- =============================================================================

CREATE POLICY "pets: public read"
  ON public.pets FOR SELECT
  USING (TRUE);

CREATE POLICY "pets: seller insert"
  ON public.pets FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "pets: seller update"
  ON public.pets FOR UPDATE
  USING  (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "pets: seller delete"
  ON public.pets FOR DELETE
  USING (auth.uid() = seller_id);


-- =============================================================================
-- RLS POLICIES — PET_IMAGES
-- =============================================================================

CREATE POLICY "pet_images: public read"
  ON public.pet_images FOR SELECT
  USING (TRUE);

CREATE POLICY "pet_images: seller insert"
  ON public.pet_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_images.pet_id
        AND pets.seller_id = auth.uid()
    )
  );

CREATE POLICY "pet_images: seller update"
  ON public.pet_images FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_images.pet_id
        AND pets.seller_id = auth.uid()
    )
  );

CREATE POLICY "pet_images: seller delete"
  ON public.pet_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_images.pet_id
        AND pets.seller_id = auth.uid()
    )
  );


-- =============================================================================
-- RLS POLICIES — FAVORITES
-- =============================================================================

CREATE POLICY "favorites: owner read"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "favorites: owner insert"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "favorites: owner delete"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);


-- =============================================================================
-- RLS POLICIES — ADOPTION_REQUESTS
-- =============================================================================

CREATE POLICY "adoption_requests: requester read"
  ON public.adoption_requests FOR SELECT
  USING (auth.uid() = requester_id);

CREATE POLICY "adoption_requests: seller read"
  ON public.adoption_requests FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "adoption_requests: requester insert"
  ON public.adoption_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "adoption_requests: requester update"
  ON public.adoption_requests FOR UPDATE
  USING  (auth.uid() = requester_id)
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "adoption_requests: seller update"
  ON public.adoption_requests FOR UPDATE
  USING  (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);
