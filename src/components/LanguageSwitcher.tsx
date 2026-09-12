import { Link, useLocation } from 'react-router-dom'
import { LOCALES, localeMeta, stripLocale, useI18n, withLocale } from '../i18n'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useI18n()
  const { pathname, hash } = useLocation()
  const rest = stripLocale(pathname)

  return (
    <nav aria-label={t.ui.language} className={compact ? '' : 'w-full'}>
      <ul className={`flex items-center ${compact ? 'gap-0.5' : 'flex-wrap gap-2'}`}>
        {LOCALES.map((code) => {
          const active = code === locale
          const to = `${withLocale(code, rest)}${hash}`
          const meta = localeMeta[code]
          return (
            <li key={code}>
              <Link
                to={to}
                hrefLang={meta.html}
                aria-current={active ? 'true' : undefined}
                aria-label={meta.nativeName}
                title={meta.nativeName}
                className={
                  compact
                    ? `rounded-md px-1.5 py-1 text-[0.68rem] font-extrabold tracking-wide transition-colors ${
                        active ? 'text-white' : 'text-steel-400 hover:text-white'
                      }`
                    : `rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                        active
                          ? 'bg-white/10 text-white ring-1 ring-white/15'
                          : 'text-steel-300 hover:bg-white/5 hover:text-white'
                      }`
                }
              >
                {compact ? meta.short : meta.nativeName}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
