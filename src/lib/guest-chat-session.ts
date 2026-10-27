export const CHAT_IDLE_MS = 15 * 60 * 1000;
export const CHAT_SESSION_KEY = 'les-cyclamens-active-chat';

export function activeConversation(raw: string | null, now: number): string | null {
  if (!raw) return null;
  try {
    const session = JSON.parse(raw);
    return typeof session.id === 'string' && typeof session.updatedAt === 'number'
      && now >= session.updatedAt && now - session.updatedAt < CHAT_IDLE_MS
      ? session.id : null;
  } catch { return null; }
}