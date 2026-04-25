'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Lang = 'en' | 'ar'
interface LangContextType { lang: Lang; toggle: () => void; isAr: boolean }

const LangContext = createContext<LangContextType>({ lang: 'ar', toggle: () => {}, isAr: true })

const STORAGE_KEY = 'mindsync:lang'

export function LangProvider({ children }: { children: ReactNode }) {
  // Default to Arabic to match the Kuwait ICP. Client effect below hydrates
  // from localStorage if the user previously picked English.
  const [lang, setLang] = useState<Lang>('ar')

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
      if (stored === 'en' || stored === 'ar') setLang(stored)
    } catch {
      /* localStorage blocked — stay on default */
    }
  }, [])

  // Keep <html lang dir> and the document font class in sync with the
  // current language. This is the source of truth for screen readers,
  // hreflang, Arabic numeral shaping, and word-break behavior.
  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
    html.classList.toggle('font-arabic', lang === 'ar')
    try { window.localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignore */ }
  }, [lang])

  const toggle = () => setLang(l => (l === 'en' ? 'ar' : 'en'))

  return (
    <LangContext.Provider value={{ lang, toggle, isAr: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
