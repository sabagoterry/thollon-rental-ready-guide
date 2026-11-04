import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'fr';
export const LANG_KEY = 'les-cyclamens-lang';

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (en: string, fr: string) => string };
const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, tr: (en) => en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  useEffect(() => {
    if (localStorage.getItem(LANG_KEY) === 'fr') setLangState('fr');
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }, []);
  const tr = useCallback((en: string, fr: string) => (lang === 'fr' ? fr : en), [lang]);
  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
