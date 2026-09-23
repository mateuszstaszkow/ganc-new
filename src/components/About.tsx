import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '../i18n'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'
import { Photo } from './ui/Photo'
import { Section, SectionHeading } from './ui/Section'

function DiamondMark() {
  return (
    <svg viewBox="0 0 64 72" className="h-16 w-14 shrink-0" aria-hidden="true">
      <polygon points="32,2 62,24 32,70 2,24" fill="#08345c" />
      <polygon points="32,2 62,24 32,24" fill="#d7f3ff" />
      <polygon points="2,24 32,2 32,24" fill="#7ec8f3" />
      <polygon points="17,24 32,24 32,42" fill="#2f93d4" />
      <polygon points="47,24 32,24 32,42" fill="#176eab" />
      <polygon points="2,24 17,24 32,70" fill="#0c4e82" />
      <polygon points="62,24 47,24 32,70" fill="#062844" />
      <polygon points="17,24 47,24 32,70" fill="#0e5f96" />
      <polygon points="32,2 22,24 32,24" fill="#ffffff" opacity="0.72" />
      <polyline
        points="2,24 32,24 62,24"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.75"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function About() {
  const { t } = useI18n()
  const { about, trustPoints } = t
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })

  // Opposing drift between the two photo columns as the section passes.
  const yA = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 44, reduce ? 0 : -44])
  const yB = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -34, reduce ? 0 : 34])

  return (
    <Section id="o-nas" decorated className="bg-steel-950">
      <SectionHeading eyebrow={about.heading} title={about.lead} />

      <div ref={wrapRef} className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
        <div className="space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} direction="up" delay={index * 0.06}>
              <p
                className={
                  index === 0
                    ? 'text-fluid-lg leading-relaxed text-steel-100'
                    : 'leading-relaxed text-steel-300'
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal direction="up" className="overflow-visible">
            <div className="overflow-visible pt-2">
              <div className="flex items-center gap-4 overflow-visible">
                <DiamondMark />
                <img
                  src={`${import.meta.env.BASE_URL}forbes-word.png`}
                  alt={about.forbes.logoAlt}
                  width={838}
                  height={306}
                  className="h-11 w-auto max-w-none shrink-0 overflow-visible object-contain sm:h-14"
                />
              </div>
              <p className="mt-4 text-xs font-bold tracking-[0.16em] text-ice-400 uppercase">
                {about.forbes.kicker}
              </p>
              <p className="mt-1 text-lg font-extrabold text-white">{about.forbes.title}</p>
              <ul className="mt-4 space-y-3">
                {about.forbes.editions.map((edition) => (
                  <li key={edition.year}>
                    <p className="font-extrabold text-white">{edition.year}</p>
                    <p className="text-sm text-steel-100">{edition.name}</p>
                    <p className="text-sm text-steel-400">{edition.role}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-steel-200">{about.forbes.partner}</p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          <motion.div style={{ y: yA }} className="space-y-4">
            <Photo
              slug="16-komora-regaly"
              alt={about.photoAlts.corridor}
              className="aspect-[3/4] w-full rounded-2xl ring-1 ring-white/10"
              sizes="(max-width: 1024px) 44vw, 20vw"
            />
            <Photo
              slug="22-odboje"
              alt={about.photoAlts.doors}
              className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
              sizes="(max-width: 1024px) 44vw, 20vw"
            />
          </motion.div>

          <motion.div style={{ y: yB }} className="space-y-4 pt-8">
            <Photo
              slug="34-komora-otwarta"
              alt={about.photoAlts.freezerDoor}
              className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
              sizes="(max-width: 1024px) 44vw, 20vw"
            />
            <Photo
              slug="28-montaz-oscieznicy"
              alt={about.photoAlts.steel}
              className="aspect-[3/4] w-full rounded-2xl ring-1 ring-white/10"
              sizes="(max-width: 1024px) 44vw, 20vw"
            />
          </motion.div>
        </div>
      </div>

      <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {trustPoints.map((point) => (
          <StaggerItem key={point.label}>
            <div className="glass group h-full rounded-2xl p-6 transition-colors duration-300 hover:border-ice-500/40">
              <p className="text-xl font-extrabold text-white sm:text-2xl">{point.value}</p>
              <p className="mt-1 text-xs font-bold tracking-[0.18em] text-ice-400 uppercase">
                {point.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-steel-400">{point.detail}</p>
              <span
                aria-hidden="true"
                className="mt-5 block h-0.5 w-10 origin-left bg-gradient-to-r from-ember-500 to-ice-500 transition-transform duration-500 group-hover:scale-x-[2.4]"
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
