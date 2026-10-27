CREATE TABLE public.enquiries (
 id uuid PRIMARY KEY,
 name text NOT NULL,
 email text NOT NULL,
 message text NOT NULL,
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','queued','failed','unknown')),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.enquiries IS 'Private guest enquiries and CallMeBot acceptance status. No public read or write access.';