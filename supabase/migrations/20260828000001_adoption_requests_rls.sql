-- =============================================================================
-- PawConnect — RLS Policies Migration for adoption_requests
-- Migration: 20260828000001_adoption_requests_rls.sql
-- =============================================================================

-- Ensure RLS is enabled on adoption_requests
ALTER TABLE IF EXISTS public.adoption_requests ENABLE ROW LEVEL SECURITY;

-- 1. Requester read policy: requesters can view their own sent requests
DROP POLICY IF EXISTS "adoption_requests: requester read" ON public.adoption_requests;
CREATE POLICY "adoption_requests: requester read"
  ON public.adoption_requests FOR SELECT
  USING (auth.uid() = requester_id);

-- 2. Seller read policy: sellers can view requests for their pets
DROP POLICY IF EXISTS "adoption_requests: seller read" ON public.adoption_requests;
CREATE POLICY "adoption_requests: seller read"
  ON public.adoption_requests FOR SELECT
  USING (auth.uid() = seller_id);

-- 3. Requester insert policy: authenticated users can insert adoption requests where they are the requester
DROP POLICY IF EXISTS "adoption_requests: requester insert" ON public.adoption_requests;
CREATE POLICY "adoption_requests: requester insert"
  ON public.adoption_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

-- 4. Requester update policy: requesters can update their own requests (e.g. cancel)
DROP POLICY IF EXISTS "adoption_requests: requester update" ON public.adoption_requests;
CREATE POLICY "adoption_requests: requester update"
  ON public.adoption_requests FOR UPDATE
  USING (auth.uid() = requester_id)
  WITH CHECK (auth.uid() = requester_id);

-- 5. Seller update policy: sellers can update status for requests sent to them
DROP POLICY IF EXISTS "adoption_requests: seller update" ON public.adoption_requests;
CREATE POLICY "adoption_requests: seller update"
  ON public.adoption_requests FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);
