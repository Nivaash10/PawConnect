-- =============================================================================
-- PawConnect — Sample Pets Seed Script
-- Run this in the Supabase SQL Editor to populate Buddy, Luna, and Rocky.
-- =============================================================================

-- 1. Create demo seller user in auth.users (if not already present)
INSERT INTO auth.users (id, email)
VALUES ('00000000-0000-0000-0000-000000000001', 'seller@pawconnect.com')
ON CONFLICT (id) DO NOTHING;

-- 2. Create demo seller profile
INSERT INTO public.profiles (id, full_name, location, role)
VALUES ('00000000-0000-0000-0000-000000000001', 'Arjun Mehra', 'Coimbatore', 'seller')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert sample pets: Buddy, Luna, and Rocky
INSERT INTO public.pets (
  id,
  seller_id,
  name,
  species,
  breed,
  age,
  gender,
  location,
  price,
  purpose,
  image_url,
  description,
  vaccinated,
  ai_score
) VALUES
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  '00000000-0000-0000-0000-000000000001',
  'Buddy',
  'Dog',
  'Golden Retriever',
  '2 Years',
  'Male',
  'Coimbatore',
  18000.00,
  'adoption',
  '/images/dog1.jpg',
  'Friendly and active 2-year-old Golden Retriever looking for a loving home.',
  TRUE,
  96
),
(
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  '00000000-0000-0000-0000-000000000001',
  'Luna',
  'Cat',
  'Persian Cat',
  '1 Year',
  'Female',
  'Chennai',
  12000.00,
  'sale',
  '/images/dog2.jpg',
  'Gentle Persian Cat with a calm demeanor, litter trained and healthy.',
  TRUE,
  94
),
(
  'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
  '00000000-0000-0000-0000-000000000001',
  'Rocky',
  'Dog',
  'German Shepherd',
  '3 Years',
  'Male',
  'Bangalore',
  25000.00,
  'adoption',
  '/images/dog3.jpg',
  'Loyal and protective German Shepherd, great with active families.',
  FALSE,
  92
)
ON CONFLICT (id) DO NOTHING;
