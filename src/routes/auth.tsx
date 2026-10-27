import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import logo from '@/assets/cyclamens-logo.jpg.asset.json';

export const Route = createFileRoute('/auth')({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: typeof s['redirect'] === 'string' && s['redirect'].startsWith('/') && !s['redirect'].startsWith('//') ? s['redirect'] : '/owner' }),
  head: () => ({
    meta: [
      { title: 'Owner sign in — Les Cyclamens' },
      { name: 'description', content: 'Private sign-in for the owner of Les Cyclamens.' },
      { property: 'og:title', content: 'Owner sign in — Les Cyclamens' },
      { property: 'og:description', content: 'Private owner area for Les Cyclamens.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  useEffect(() => {
    const go = () => navigate({ to: redirect, replace: true });
    supabase.auth.getUser().then(({ data }) => { if (data.user) go(); });
    const { data } = supabase.auth.onAuthStateChange((event, session) => { if (event === 'SIGNED_IN' && session) go(); });
    return () => data.subscription.unsubscribe();
  }, [navigate, redirect]);
  async function signIn() {
    setError('');
    const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin + '/auth' });
    if (result.error) setError('Sign-in failed. Please try again.');
  }
  return <main className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="w-full max-w-sm rounded-md border bg-card p-8 text-center">
      <img src={logo.url} alt="Les Cyclamens logo" className="mx-auto h-16 w-16 object-contain" />
      <h1 className="mt-4 text-3xl">Owner area</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to read guest enquiries and questions.</p>
      <Button className="mt-6 w-full" onClick={() => void signIn()}>Continue with Google</Button>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  </main>;
}
