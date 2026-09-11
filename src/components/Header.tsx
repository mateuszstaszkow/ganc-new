import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company, nav } from '../data/content'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { Icon } from './ui/Icon'
import { Logo } from './ui/Logo'

const SECTION_IDS = nav.map((item) => item.id)

export function Header({ onHome = true }: { onHome?: boolean }) {
  const [open, setOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const { scrollY } = useScroll()
  const active = useScrollSpy(SECTION_IDS)

  useMotionValueEvent(scrollY, 'change', (y) => setCondensed(y > 24))
  useLockBodyScroll(open)

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <>
      <a
        href="#tresc"
        className="sr-only rounded-full bg-white px-4 py-2 font-semibold text-steel-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80]"
      >
        Przejdź do treści
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          condensed
            ? 'border-b border-white/10 bg-steel-950/80 py-2.5 backdrop-blur-xl'
            : 'border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="shell flex items-center justify-between gap-4">
          <Link to="/" aria-label={`${company.legalName} — strona główna`} className="shrink-0">
            <Logo animate />
          </Link>

          <nav aria-label="Menu główne" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = onHome && active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={href(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors xl:px-4 ${
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

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${company.phoneHref}`}
              className="hidden items-center gap-2 rounded-full border border-ice-500/40 bg-ice-500/10 px-4 py-2.5 text-sm font-bold text-ice-200 transition-colors hover:bg-ice-500/20 hover:text-white md:inline-flex"
            >
              <Icon name="phone" className="size-4" />
              {company.phone}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Otwórz menu"
              aria-expanded={open}
              className="glass flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Zamknij menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-steel-950/70 backdrop-blur-sm"
            />

            <motion.nav
              aria-label="Menu mobilne"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-steel-900 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Zamknij menu"
                  className="flex size-11 items-center justify-center rounded-full text-steel-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon name="close" className="size-5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-4 py-5">
                {nav.map((item, index) => (
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

              <div className="space-y-2 border-t border-white/10 px-6 py-5">
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
