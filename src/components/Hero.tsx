import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import { company } from '../data/content'
import { useI18n } from '../i18n'
import { useLiteMotion } from '../hooks/useLiteMotion'
import { ButtonLink } from './ui/Button'
import { FrostField } from './ui/FrostField'
import { Icon } from './ui/Icon'
import { Photo } from './ui/Photo'

/** Counts from ambient down to freezer temperature once, on mount. */
function TemperatureReadout() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const value = useMotionValue(reduce ? -32 : 20)
  const [display, setDisplay] = useState(reduce ? '−32' : '20')

  useEffect(() => {
    if (reduce) return
    const unsubscribe = value.on('change', (v) => {
      const rounded = Math.round(v)
      setDisplay(rounded < 0 ? `−${Math.abs(rounded)}` : `${rounded}`)
    })
    const controls = animate(value, -32, {
      duration: 2.8,
      delay: 0.9,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [reduce, value])

  const progress = useTransform(value, [20, -32], [0, 1])
  const fillHeight = useTransform(progress, (p) => `${Math.max(6, p * 100)}%`)

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          style={{ height: fillHeight }}
          className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-ice-600 via-ice-400 to-ice-200"
        />
      </div>
      <div>
        <p className="flex items-baseline gap-1 font-extrabold tabular-nums">
          <span className="text-5xl text-white">{display}</span>
          <span className="text-2xl text-ice-400">°C</span>
        </p>
        <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-steel-400 uppercase">
          {t.hero.freezerRange}
        </p>
      </div>
    </div>
  )
}

export function Hero() {
  const { t } = useI18n()
  const hero = t.hero
  const reduce = useReducedMotion()
  const lite = useLiteMotion()
  const { scrollYProgress } = useScroll()

  // Gentle parallax: the hero drifts up and dims as the next section arrives.
  // Phones skip this — a transform on the whole hero is a jank source on iOS.
  const y = useTransform(scrollYProgress, [0, 0.16], [0, lite ? 0 : -90])
  const opacity = useTransform(scrollYProgress, [0, 0.13], [1, lite ? 1 : 0.1])

  const enter = !lite && !reduce

  return (
    <section
      id="start"
      aria-label={hero.introAria}
      className="relative flex h-[100svh] flex-col overflow-hidden pt-[4.75rem] pb-3 lg:justify-center lg:pt-28 lg:pb-10"
    >
      {/* ---- background stack ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-steel-950" />
        <div className="grid-lines absolute inset-0 opacity-70" />

        <div className="hero-orb absolute -top-40 -left-32 size-[38rem] animate-drift rounded-full bg-ice-600/25 blur-[130px]" />
        <div
          className="hero-orb absolute -right-28 top-1/4 size-[32rem] animate-drift rounded-full bg-ice-400/18 blur-[120px]"
          style={{ animationDelay: '-7s' }}
        />
        <div
          className="hero-orb absolute -bottom-20 left-1/3 size-[26rem] animate-drift rounded-full bg-ember-600/14 blur-[120px]"
          style={{ animationDelay: '-14s' }}
        />

        {!lite && <FrostField className="absolute inset-0 h-full w-full" />}

        <div className="noise absolute inset-0 opacity-[0.16] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-steel-950 to-transparent" />
      </div>

      <motion.div style={{ y, opacity }} className="shell flex min-h-0 w-full flex-1 flex-col justify-center">
        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] items-stretch gap-4 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-1 lg:gap-16">
          {/* ---- copy ---- */}
          <div className="min-w-0 shrink-0 lg:flex lg:flex-col lg:justify-center">
            <motion.p
              initial={enter ? { opacity: 0, y: 12 } : false}
              animate={enter ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white sm:text-base"
            >
              <span className="inline-flex items-center gap-1.5">
                <Icon name="pin" className="size-4 text-ember-500" />
                {company.street}, {company.postalCode} {company.city}
              </span>
              <a
                href={`tel:${company.phoneHref}`}
                className="text-ice-300 transition-colors hover:text-white"
              >
                {company.phone}
              </a>
            </motion.p>

            <motion.p
              initial={enter ? { opacity: 0, y: 16 } : false}
              animate={enter ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-6 inline-flex max-w-full items-center gap-2.5 rounded-full py-1.5 pr-3 pl-2 text-left text-xs leading-snug font-semibold text-ice-100 sm:mt-5 sm:py-2 sm:pr-4 sm:pl-2.5 sm:text-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ice-400" />
                <span className="relative size-2 rounded-full bg-ice-400" />
              </span>
              {hero.kicker}
            </motion.p>

            <h1 className="headline-hero mt-6 text-[1.7rem] leading-[1.05] font-extrabold text-white sm:mt-5 sm:text-fluid-hero lg:mt-6">
              <span className="sr-only">{hero.titleLines.join(' ')}</span>
              <span aria-hidden="true" className="block">
                {hero.titleLines.map((line, index) => (
                  <motion.span
                    key={line}
                    initial={enter ? { opacity: 0, y: 20 } : false}
                    animate={enter ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      delay: 0.1 + index * 0.08,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={enter ? { opacity: 0, y: 18 } : false}
              animate={enter ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl text-sm text-steel-300 lg:mt-7 lg:text-fluid-lg"
            >
              {hero.lead}
            </motion.p>

            <motion.div
              initial={enter ? { opacity: 0, y: 18 } : false}
              animate={enter ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 mb-8 flex flex-row items-center gap-2 sm:mt-5 sm:gap-3 lg:mt-9 lg:mb-0"
            >
              <ButtonLink href="#kontakt" className="min-w-0 flex-1 sm:w-auto sm:flex-none">
                {hero.primaryCta}
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
              <ButtonLink
                href="#oferta"
                variant="secondary"
                className="min-w-0 flex-1 sm:w-auto sm:flex-none"
              >
                {hero.secondaryCta}
              </ButtonLink>
            </motion.div>
          </div>

          {/* ---- visual ---- */}
          <motion.div
            initial={enter ? { opacity: 0, y: 28 } : false}
            animate={enter ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex min-h-0 w-full flex-col overflow-hidden lg:h-full"
          >
            <div className="glass relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl p-4 sm:p-7">
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-16 size-52 rounded-full bg-ice-400/20 blur-3xl"
              />

              <div className="relative flex shrink-0 items-start justify-between gap-3 sm:gap-4">
                <TemperatureReadout />
                <span className="rounded-full bg-ember-500/15 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.16em] text-ember-400 uppercase ring-1 ring-ember-500/30">
                  {hero.freezerBadge}
                </span>
              </div>

              <div className="relative mt-8 min-h-0 w-full flex-1 overflow-hidden rounded-2xl ring-1 ring-white/10 lg:mt-5">
                <Photo
                  slug="41-komora-drzwi-swiatlo"
                  alt={hero.photoAlt}
                  className="h-full min-h-0 w-full lg:bg-steel-950/50"
                  imgClassName="!object-cover !object-center lg:!object-[center_42%]"
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950/70 via-transparent to-transparent"
                />
                <p className="absolute bottom-2 left-3 text-[0.65rem] font-semibold text-white/90 sm:bottom-3 sm:left-4 sm:text-xs">
                  {hero.photoCaption}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---- scroll cue ---- */}
      <motion.a
        href="#proces"
        aria-label={hero.scrollAria}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-steel-400 transition-colors hover:text-white sm:flex"
      >
        <span className="text-[0.62rem] font-bold tracking-[0.3em] uppercase">{hero.scroll}</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon name="arrowDown" className="size-5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
