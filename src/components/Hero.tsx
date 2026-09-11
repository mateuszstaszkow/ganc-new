import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import { company, hero } from '../data/content'
import { ButtonLink } from './ui/Button'
import { FrostField } from './ui/FrostField'
import { Icon } from './ui/Icon'
import { Photo } from './ui/Photo'

/** Counts from ambient down to freezer temperature once, on mount. */
function TemperatureReadout() {
  const reduce = useReducedMotion()
  const value = useMotionValue(reduce ? -25 : 20)
  const [display, setDisplay] = useState(reduce ? '−25' : '20')

  useEffect(() => {
    if (reduce) return
    const unsubscribe = value.on('change', (v) => {
      const rounded = Math.round(v)
      setDisplay(rounded < 0 ? `−${Math.abs(rounded)}` : `${rounded}`)
    })
    const controls = animate(value, -25, {
      duration: 2.8,
      delay: 0.9,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [reduce, value])

  const progress = useTransform(value, [20, -25], [0, 1])
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
          <span className="text-4xl text-white sm:text-5xl">{display}</span>
          <span className="text-xl text-ice-400 sm:text-2xl">°C</span>
        </p>
        <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-steel-400 uppercase">
          Zakres mroźniczy
        </p>
      </div>
    </div>
  )
}

/** Exploded view of a sandwich panel — the core material GANC builds with. */
function PanelStack() {
  const layers = [
    { label: 'Blacha powlekana', className: 'bg-steel-200/90', height: 'h-2.5' },
    { label: 'Rdzeń izolacyjny', className: 'bg-gradient-to-r from-ice-200/80 to-white/70', height: 'h-14' },
    { label: 'Blacha powlekana', className: 'bg-steel-200/90', height: 'h-2.5' },
  ]

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-bold tracking-[0.22em] text-ice-400 uppercase">Płyta warstwowa</p>
      <div className="space-y-1.5">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -18, scaleX: 0.9 }}
            animate={{ opacity: 1, x: 0, scaleX: 1 }}
            transition={{ delay: 1.1 + index * 0.16, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="flex items-center gap-3"
          >
            <span className={`${layer.height} flex-1 rounded-sm ${layer.className}`} />
            <span className="w-28 shrink-0 text-[0.6rem] leading-tight font-medium text-steel-400 sm:text-[0.65rem]">
              {layer.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Gentle parallax: the hero drifts up and dims as the next section arrives.
  const y = useTransform(scrollYProgress, [0, 0.16], [0, reduce ? 0 : -90])
  const opacity = useTransform(scrollYProgress, [0, 0.13], [1, reduce ? 1 : 0.1])

  const words = hero.titleLines.join(' ').split(' ')

  return (
    <section
      id="start"
      aria-label="Wprowadzenie"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      {/* ---- background stack ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-steel-950" />
        <div className="grid-lines absolute inset-0 opacity-70" />

        <div className="absolute -top-40 -left-32 size-[38rem] animate-drift rounded-full bg-ice-600/25 blur-[130px]" />
        <div
          className="absolute -right-28 top-1/4 size-[32rem] animate-drift rounded-full bg-ice-400/18 blur-[120px]"
          style={{ animationDelay: '-7s' }}
        />
        <div
          className="absolute -bottom-20 left-1/3 size-[26rem] animate-drift rounded-full bg-ember-600/14 blur-[120px]"
          style={{ animationDelay: '-14s' }}
        />

        <FrostField className="absolute inset-0 h-full w-full" />

        <div className="noise absolute inset-0 opacity-[0.16] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-steel-950 to-transparent" />
      </div>

      <motion.div style={{ y, opacity }} className="shell w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ---- copy ---- */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass inline-flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5 text-xs font-semibold text-ice-100 sm:text-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ice-400" />
                <span className="relative size-2 rounded-full bg-ice-400" />
              </span>
              {hero.kicker}
            </motion.p>

            <h1 className="headline-hero mt-6 text-fluid-hero font-extrabold text-white">
              <span className="sr-only">
                {hero.titleLines.join(' ')} {hero.titleAccent}
              </span>
              <span aria-hidden="true" className="block">
                {words.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={reduce ? false : { opacity: 0, y: 32, filter: 'blur(12px)' }}
                    animate={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.15 + index * 0.09,
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mr-[0.24em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={reduce ? false : { opacity: 0, y: 32, filter: 'blur(12px)' }}
                  animate={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.15 + words.length * 0.09,
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-gradient-ice inline-block"
                >
                  {hero.titleAccent}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-fluid-lg text-steel-300"
            >
              {hero.lead}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.76, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink href={hero.primaryCta.href} className="w-full sm:w-auto">
                {hero.primaryCta.label}
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryCta.href}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-steel-400"
            >
              <Icon name="pin" className="size-4 text-ember-500" />
              {company.street}, {company.postalCode} {company.city}
              <span aria-hidden="true" className="text-steel-600">
                •
              </span>
              <a
                href={`tel:${company.phoneHref}`}
                className="font-semibold text-ice-300 transition-colors hover:text-white"
              >
                {company.phone}
              </a>
            </motion.p>
          </div>

          {/* ---- visual ---- */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-7">
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-16 size-52 rounded-full bg-ice-400/20 blur-3xl"
              />

              <div className="relative flex items-start justify-between gap-4">
                <TemperatureReadout />
                <span className="rounded-full bg-ember-500/15 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.16em] text-ember-400 uppercase ring-1 ring-ember-500/30">
                  Mroźnia
                </span>
              </div>

              <div className="relative mt-7">
                <PanelStack />
              </div>

              <div className="relative mt-7 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Photo
                  slug="01-komora-chlodnicza"
                  alt="Wnętrze komory chłodniczej z drzwiami mroźniczymi i stanowiskiem higieny"
                  className="aspect-[3/2] w-full"
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950/70 via-transparent to-transparent"
                />
                <p className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">
                  Komora chłodnicza — realizacja GANC
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---- scroll cue ---- */}
      <motion.a
        href="#o-nas"
        aria-label="Przewiń do sekcji O nas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-steel-400 transition-colors hover:text-white sm:flex"
      >
        <span className="text-[0.62rem] font-bold tracking-[0.3em] uppercase">Przewiń</span>
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
