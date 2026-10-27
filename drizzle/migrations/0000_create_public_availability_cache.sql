CREATE TABLE public.availability_cache (
 id text PRIMARY KEY CHECK (id = 'airbnb'),
 blocked_ranges jsonb NOT NULL DEFAULT '[]'::jsonb,
 synced_at timestamptz,
 checked_at timestamptz NOT NULL DEFAULT now(),
 sync_ok boolean NOT NULL DEFAULT false
);
GRANT SELECT ON public.availability_cache TO anon, authenticated;
GRANT ALL ON public.availability_cache TO service_role;
ALTER TABLE public.availability_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public sanitized availability" ON public.availability_cache FOR SELECT TO anon, authenticated USING (id = 'airbnb');
COMMENT ON TABLE public.availability_cache IS 'Sanitized date ranges only. Never store private feed URLs or event details.';