import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { chatRequestSchema, guideInstructions } from './guest-guide';

const MODEL = 'openai/gpt-6-astra';
const HISTORY_LIMIT = 30;

export async function handleGuestChat(request: Request): Promise<Response> {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return Response.json({ error: 'The assistant is not configured.' }, { status: 500 });
  const parsed = chatRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: 'Please enter a question (up to 1000 characters).' }, { status: 400 });
  const { conversationId, message } = parsed.data;

  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data: past, error: readError } = await supabaseAdmin
    .from('guest_chat_messages').select('role, content')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false }).limit(HISTORY_LIMIT);
  if (readError) return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  const { error: insertError } = await supabaseAdmin.from('guest_chat_messages').insert({ conversation_id: conversationId, role: 'user', content: message });
  if (insertError) return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });

  const history = (past ?? []).reverse().map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
  const provider = createOpenAI({
    baseURL: 'https://ai.gateway.lovable.dev/v1',
    apiKey,
    headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
  });
  let failure: string | null = null;
  const result = streamText({
    model: provider.responses(MODEL),
    system: guideInstructions(),
    messages: [...history, { role: 'user', content: message }],
    abortSignal: request.signal,
    maxRetries: 0,
    providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: 'low', include: ['reasoning.encrypted_content'] } },
    onError: ({ error }) => {
      const status = (error as { statusCode?: number })?.statusCode;
      failure = status === 429 ? 'The assistant is busy right now — please try again in a minute.'
        : status === 402 || status === 403 ? 'The assistant is unavailable at the moment. Please use the enquiry form.'
        : 'Sorry, the assistant could not answer. Please try again.';
      console.error('guest chat failed', status);
    },
    onFinish: async ({ text }) => {
      if (!text.trim()) return;
      const { error } = await supabaseAdmin.from('guest_chat_messages').insert({ conversation_id: conversationId, role: 'assistant', content: text.slice(0, 8000) });
      if (error) console.error('guest chat save failed', error.code);
    },
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of result.textStream) controller.enqueue(encoder.encode(chunk));
      } catch { failure ??= 'Sorry, the assistant could not answer. Please try again.'; }
      if (failure) controller.enqueue(encoder.encode(`\u0000${failure}`));
      controller.close();
    },
  });
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache, no-transform' } });
}

export async function loadGuestChat(conversationId: string) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data } = await supabaseAdmin.from('guest_chat_messages').select('role, content')
    .eq('conversation_id', conversationId).order('created_at').limit(100);
  return (data ?? []).map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
}
