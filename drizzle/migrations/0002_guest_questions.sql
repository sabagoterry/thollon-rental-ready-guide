CREATE TABLE public.guest_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL CHECK (char_length(content) <= 8000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX guest_chat_messages_conv_idx ON public.guest_chat_messages (conversation_id, created_at);
GRANT ALL ON public.guest_chat_messages TO service_role;
ALTER TABLE public.guest_chat_messages ENABLE ROW LEVEL SECURITY;