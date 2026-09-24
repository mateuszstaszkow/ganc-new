import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/content'
import { useI18n } from '../i18n'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Icon } from './ui/Icon'
const SECTION_IDS = [
  'proces',
  'o-nas',
  'specjalizacje',
  'oferta',
  'realizacje',
  'kariera',
  'kontakt',
]

export function Header({ onHome = true }: { onHome?: boolean }) {
  const { t, homePath, sectionHref } = useI18n()
  const [open, setOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const { scrollY } = useScroll()
  const active = useScrollSpy(SECTION_IDS)

  useMotionValueEvent(scrollY, 'change', (y) => setCondensed(y > 24))
  useLockBodyScroll(open)

  const href = (id: string) => sectionHref(id, onHome)

  return (
    <>
      <a
        href="#tresc"
        className="sr-only rounded-full bg-white px-4 py-2 font-semibold text-steel-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80]"
      >
        {t.ui.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          condensed
            ? 'border-b border-white/10 bg-steel-950/80 py-2.5 backdrop-blur-xl'
            : 'border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="shell flex flex-nowrap items-center justify-between gap-3">
          <Link
            to={homePath}
            aria-label={`${company.legalName} — ${t.ui.homeAria}`}
            className="inline-flex shrink-0 items-center gap-2.5"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo-lockup-light.png`}
              alt=""
              width={988}
              height={269}
              className="h-7 w-auto sm:h-8"
            />
            <span className="text-sm font-extrabold tracking-normal text-white sm:text-[0.9375rem]">
              GANC
            </span>
          </Link>

          <nav aria-label={t.ui.mainMenu} className="hidden min-w-0 xl:block">
            <ul className="flex items-center justify-center">
              {t.nav.map((item) => {
                const isActive = onHome && active === item.id
                return (
                  <li key={item.id} className="shrink-0">
                    <a
                      href={href(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block whitespace-nowrap rounded-full px-2.5 py-2 text-[0.8125rem] font-semibold transition-colors 2xl:px-3.5 ${
                        isActive ? 'text-white' : 'text-steel-300 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher compact />

            <a
              href={`tel:${company.phoneHref}`}
              aria-label={company.phone}
              className="inline-flex size-10 items-center justify-center rounded-full border border-ice-500/40 bg-ice-500/10 text-ice-200 transition-colors hover:bg-ice-500/20 hover:text-white md:hidden"
            >
              <Icon name="phone" className="size-4" />
            </a>
            <a
              href={`tel:${company.phoneHref}`}
              className="hidden items-center gap-2 rounded-full border border-ice-500/40 bg-ice-500/10 px-3.5 py-2.5 text-sm font-bold whitespace-nowrap text-ice-200 transition-colors hover:bg-ice-500/20 hover:text-white md:inline-flex"
            >
              <Icon name="phone" className="size-4" />
              {company.phone}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.ui.openMenu}
              aria-expanded={open}
              className="glass flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 xl:hidden"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label={t.ui.closeMenu}
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-steel-950/70 backdrop-blur-sm"
            />

            <motion.nav
              aria-label={t.ui.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-steel-900 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <Link
                  to={homePath}
                  onClick={() => setOpen(false)}
                  aria-label={`${company.legalName} — ${t.ui.homeAria}`}
                  className="inline-flex items-center gap-2.5"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}logo-lockup-light.png`}
                    alt=""
                    width={988}
                    height={269}
                    className="h-7 w-auto"
                  />
                  <span className="text-sm font-extrabold tracking-normal text-white">GANC</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.ui.closeMenu}
                  className="flex size-11 items-center justify-center rounded-full text-steel-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon name="close" className="size-5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-4 py-5">
                {t.nav.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.055, duration: 0.4 }}
                  >
                    <a
                      href={href(item.id)}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/10"
                    >
                      {item.label}
                      <Icon name="arrowRight" className="size-4 text-ice-400" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-4 border-t border-white/10 px-6 py-5">
                <LanguageSwitcher />
                <a
                  href={`tel:${company.phoneHref}`}
                  className="flex items-center gap-3 rounded-2xl bg-ice-500 px-4 py-3.5 font-bold text-white"
                >
                  <Icon name="phone" className="size-5" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-steel-200 transition-colors hover:bg-white/5"
                >
                  <Icon name="mail" className="size-5 text-ice-400" />
                  {company.email}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
