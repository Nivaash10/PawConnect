-- =============================================================================
-- PawConnect — RLS Policies Migration for pets and pet_images
-- Migration: 20260828000002_pets_rls.sql
-- =============================================================================

-- Ensure RLS is enabled on pets and pet_images
ALTER TABLE IF EXISTS public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pet_images ENABLE ROW LEVEL SECURITY;

-- ── 1. PETS POLICIES ──────────────────────────────────────────────────────────

-- Public read policy: Anyone can browse pets in the marketplace
DROP POLICY IF EXISTS "pets: public read" ON public.pets;
CREATE POLICY "pets: public read"
  ON public.pets FOR SELECT
  USING (TRUE);

-- Seller insert policy: Authenticated sellers can list pets under their own seller_id
DROP POLICY IF EXISTS "pets: seller insert" ON public.pets;
CREATE POLICY "pets: seller insert"
  ON public.pets FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

-- Seller update policy: Sellers can only update their own listings
DROP POLICY IF EXISTS "pets: seller update" ON public.pets;
CREATE POLICY "pets: seller update"
  ON public.pets FOR UPDATE
  USING  (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Seller delete policy: Sellers can only delete their own listings
DROP POLICY IF EXISTS "pets: seller delete" ON public.pets;
CREATE POLICY "pets: seller delete"
  ON public.pets FOR DELETE
  USING (auth.uid() = seller_id);


-- ── 2. PET_IMAGES POLICIES ────────────────────────────────────────────────────

-- Public read policy: Anyone can view pet gallery images
DROP POLICY IF EXISTS "pet_images: public read" ON public.pet_images;
CREATE POLICY "pet_images: public read"
  ON public.pet_images FOR SELECT
  USING (TRUE);

-- Seller insert policy: Sellers can add gallery images for their own pets
DROP POLICY IF EXISTS "pet_images: seller insert" ON public.pet_images;
CREATE POLICY "pet_images: seller insert"
  ON public.pet_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_images.pet_id
        AND pets.seller_id = auth.uid()
    )
  );

-- Seller update policy: Sellers can update gallery images for their own pets
DROP POLICY IF EXISTS "pet_images: seller update" ON public.pet_images;
CREATE POLICY "pet_images: seller update"
  ON public.pet_images FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_images.pet_id
        AND pets.seller_id = auth.uid()
    )
  );

-- Seller delete policy: Sellers can delete gallery images for their own pets
DROP POLICY IF EXISTS "pet_images: seller delete" ON public.pet_images;
CREATE POLICY "pet_images: seller delete"
  ON public.pet_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_images.pet_id
        AND pets.seller_id = auth.uid()
    )
  );
