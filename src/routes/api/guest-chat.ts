import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { handleGuestChat, loadGuestChat } from '@/lib/guest-chat.server';

export const Route = createFileRoute('/api/guest-chat')({
  server: {
    handlers: {
      POST: ({ request }) => handleGuestChat(request),
      GET: async ({ request }) => {
        const id = z.string().uuid().safeParse(new URL(request.url).searchParams.get('id'));
        if (!id.success) return Response.json({ messages: [] });
        return Response.json({ messages: await loadGuestChat(id.data) }, { headers: { 'Cache-Control': 'no-store' } });
      },
    },
  },
});
