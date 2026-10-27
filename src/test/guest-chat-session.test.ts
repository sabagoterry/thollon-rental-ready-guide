import { describe, expect, it } from 'vitest';
import { activeConversation } from '@/lib/guest-chat-session';

describe('Active visitor chats', () => {
  it('starts clear without an active tab conversation', () => {
    expect(activeConversation(null, 1000)).toBe(null);
  });
  it('retains an ongoing conversation in the same tab', () => {
    expect(activeConversation(JSON.stringify({ id: 'active-chat', updatedAt: 1000 }), 2000)).toBe('active-chat');
  });
  it('clears a conversation after fifteen minutes without activity', () => {
    expect(activeConversation(JSON.stringify({ id: 'old-chat', updatedAt: 1000 }), 901000)).toBe(null);
  });
});