import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LOCALES, localeMeta, stripLocale, useI18n, withLocale } from '../i18n'
import { Icon } from './ui/Icon'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useI18n()
  const { pathname } = useLocation()
  const rest = stripLocale(pathname)
  const current = localeMeta[locale]
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!compact) {
    return (
      <nav aria-label={t.ui.language} className="w-full">
        <ul className="flex flex-wrap gap-2">
          {LOCALES.map((code) => {
            const active = code === locale
            const meta = localeMeta[code]
            return (
              <li key={code}>
                <Link
                  to={withLocale(code, rest)}
                  hrefLang={meta.html}
                  aria-current={active ? 'true' : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                    active
                      ? 'bg-white/10 text-white ring-1 ring-white/15'
                      : 'text-steel-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {meta.nativeName}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={t.ui.language}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-1 rounded-full px-2.5 text-xs font-extrabold tracking-wide text-steel-200 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
      >
        {current.short}
        <Icon name="arrowDown" className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.ui.language}
          className="absolute top-[calc(100%+0.4rem)] right-0 z-[80] min-w-[11rem] overflow-hidden rounded-2xl border border-white/10 bg-steel-900/95 py-1 shadow-2xl backdrop-blur-xl"
        >
          {LOCALES.map((code) => {
            const active = code === locale
            const meta = localeMeta[code]
            return (
              <li key={code} role="option" aria-selected={active}>
                <Link
                  to={withLocale(code, rest)}
                  hrefLang={meta.html}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm font-semibold ${
                    active ? 'bg-white/10 text-white' : 'text-steel-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {meta.nativeName}
                  <span className="text-[0.65rem] font-extrabold tracking-wide text-steel-500">
                    {meta.short}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
