export const LOCALES = ['pl', 'en', 'de', 'uk'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pl'

export const localeMeta: Record<
  Locale,
  { html: string; nativeName: string; short: string }
> = {
  pl: { html: 'pl', nativeName: 'Polski', short: 'PL' },
  en: { html: 'en', nativeName: 'English', short: 'EN' },
  de: { html: 'de', nativeName: 'Deutsch', short: 'DE' },
  uk: { html: 'uk', nativeName: 'Українська', short: 'UK' },
}

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale)
}

/** First path segment after the GitHub Pages base, e.g. "en" from "/en/rodo". */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.replace(/^\//, '').split('/')[0]
  if (first && isLocale(first) && first !== DEFAULT_LOCALE) return first
  return DEFAULT_LOCALE
}

/** Path without the locale prefix. `/en/rodo` → `/rodo`, `/de` → `/`. */
export function stripLocale(pathname: string): string {
  const locale = localeFromPath(pathname)
  if (locale === DEFAULT_LOCALE) return pathname || '/'
  const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '')
  return rest || '/'
}

export function withLocale(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return clean
  if (clean === '/') return `/${locale}`
  return `/${locale}${clean}`
}
