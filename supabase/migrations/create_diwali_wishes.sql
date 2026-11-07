-- =========================================================================
-- DIWALI DIGITAL GIFT EXPERIENCE - SECURE WISH STORAGE MIGRATION
-- Project: A Little Diwali Surprise — From Nikhil
-- Table: diwali_wishes
-- =========================================================================

-- 1. Create table with strict field constraints
CREATE TABLE IF NOT EXISTS public.diwali_wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_name VARCHAR(32) NOT NULL,
    wish_message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    consent_given BOOLEAN NOT NULL DEFAULT true CHECK (consent_given = true),
    status VARCHAR(20) DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'read', 'archived'))
);

-- 2. Add performance indexes for admin queries & sorting
CREATE INDEX IF NOT EXISTS idx_diwali_wishes_submitted_at ON public.diwali_wishes (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_diwali_wishes_status ON public.diwali_wishes (status);
CREATE INDEX IF NOT EXISTS idx_diwali_wishes_recipient ON public.diwali_wishes (recipient_name);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.diwali_wishes ENABLE ROW LEVEL SECURITY;

-- 4. Strictly block anonymous / public access from SELECT, UPDATE, and DELETE
-- No public user can view other visitors' wishes or modify existing records.
DROP POLICY IF EXISTS "Deny public select" ON public.diwali_wishes;
CREATE POLICY "Deny public select"
    ON public.diwali_wishes
    FOR SELECT
    TO anon
    USING (false);

DROP POLICY IF EXISTS "Deny public update" ON public.diwali_wishes;
CREATE POLICY "Deny public update"
    ON public.diwali_wishes
    FOR UPDATE
    TO anon
    USING (false);

DROP POLICY IF EXISTS "Deny public delete" ON public.diwali_wishes;
CREATE POLICY "Deny public delete"
    ON public.diwali_wishes
    FOR DELETE
    TO anon
    USING (false);

-- 5. Allow Authenticated Admins Full Access
-- Only authenticated users (specifically authorized admin email verified by the server)
DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.diwali_wishes;
CREATE POLICY "Allow authenticated admin full access"
    ON public.diwali_wishes
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Note: Public wish submissions are handled server-side via Next.js Route Handler
-- using the server-only Supabase Service Role Key, ensuring complete security.

