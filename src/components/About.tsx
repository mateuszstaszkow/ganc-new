import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { about, trustPoints } from '../data/content'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'
import { Photo } from './ui/Photo'
import { Section, SectionHeading } from './ui/Section'

export function About() {
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
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          <motion.div style={{ y: yA }} className="space-y-4">
            <Photo
              slug="03-korytarz-komor"
              alt="Korytarz technologiczny z drzwiami komór chłodniczych"
              className="aspect-[3/4] w-full rounded-2xl ring-1 ring-white/10"
              sizes="(max-width: 1024px) 44vw, 20vw"
            />
            <Photo
              slug="09-plyty-warstwowe-strop"
              alt="Strop i ściany wykonane z płyt warstwowych"
              className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
              sizes="(max-width: 1024px) 44vw, 20vw"
            />
          </motion.div>

          <motion.div style={{ y: yB }} className="space-y-4 pt-8">
            <Photo
              slug="08-hala-elewacja"
              alt="Elewacja hali z obudową panelową"
              className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
              sizes="(max-width: 1024px) 44vw, 20vw"
            />
            <Photo
              slug="06-konstrukcja-hali"
              alt="Konstrukcja stalowa hali magazynowej w trakcie budowy"
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
