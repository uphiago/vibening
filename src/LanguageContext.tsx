import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from './i18n'
import type { Lang } from './types'

type Translations = typeof translations['pt-BR']

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LangContextValue | null>(null)

const VALID_LANGS: readonly Lang[] = ['pt-BR', 'en']

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('lang')
      return VALID_LANGS.includes(stored as Lang) ? (stored as Lang) : 'en'
    } catch { return 'en' }
  })

  const t = translations[lang]

  function setLang(l: Lang) {
    try { localStorage.setItem('lang', l) } catch { /* storage unavailable */ }
    setLangState(l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
