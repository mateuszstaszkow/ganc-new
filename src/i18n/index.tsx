import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { de } from './de'
import { en } from './en'
import {
  LOCALES,
  localeFromPath,
  localeMeta,
  stripLocale,
  withLocale,
  type Locale,
} from './locales'
import { pl, type Dictionary } from './pl'
import { uk } from './uk'

export const dictionaries: Record<Locale, Dictionary> = { pl, en, de, uk }

type I18nValue = {
  locale: Locale
  t: Dictionary
  homePath: string
  localize: (path: string) => string
  sectionHref: (id: string, onHome: boolean) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const locale = localeFromPath(pathname)
  const t = dictionaries[locale]

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].html
    document.title = t.meta.title
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', t.meta.description)

    const rest = stripLocale(pathname)
    document
      .querySelectorAll('link[data-hreflang]')
      .forEach((node) => node.parentElement?.removeChild(node))
    const origin = `${window.location.origin}${import.meta.env.BASE_URL}`.replace(/\/?$/, '/')
    for (const code of LOCALES) {
      const href = `${origin}${withLocale(code, rest).replace(/^\//, '')}`
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = localeMeta[code].html
      link.href = href
      link.dataset.hreflang = 'true'
      document.head.appendChild(link)
    }

    try {
      localStorage.setItem('ganc-lang', locale)
    } catch {
      /* private mode */
    }
  }, [locale, pathname, t])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t,
      homePath: withLocale(locale, '/'),
      localize: (path: string) => withLocale(locale, path),
      sectionHref: (id: string, onHome: boolean) =>
        onHome ? `#${id}` : `${withLocale(locale, '/')}#${id}`,
    }),
    [locale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}

export { DEFAULT_LOCALE, localeFromPath, localeMeta, LOCALES, withLocale, stripLocale, isLocale } from './locales'
export type { Locale } from './locales'
export type { Dictionary }
