import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { process } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'

export function Process() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 72%', 'end 62%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const scaleY = useTransform(progress, [0, 1], [0, 1])

  return (
    <Section id="proces" className="bg-steel-900">
      <SectionHeading
        eyebrow="Jak pracujemy"
        title="Od analizy inwestycji do odbioru obiektu"
        lead="Każdy etap prowadzimy w uzgodnieniu z inwestorem — z naciskiem na optymalizację kosztową i sprawdzone materiały."
      />

      <ol ref={listRef} className="relative mt-14 lg:mt-20">
        {/* Rail + scroll-linked fill, hidden on the narrowest screens. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[1.4rem] w-px bg-white/10 sm:left-[1.75rem]"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY, originY: 0 }}
          className="absolute top-2 bottom-2 left-[1.4rem] w-px bg-gradient-to-b from-ice-400 via-ice-500 to-ember-500 sm:left-[1.75rem]"
        />

        {process.map((step, index) => (
          <li key={step.step} className="relative pb-10 pl-16 last:pb-0 sm:pl-20">
            {/* Kept outside <Reveal>: that wrapper animates filter/transform and
                would otherwise become this badge's containing block, pulling it
                off the rail and over the heading. */}
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute top-0 left-0 flex size-11 items-center justify-center rounded-full bg-steel-900 text-sm font-extrabold text-ice-300 ring-1 ring-ice-500/40 sm:size-14 sm:text-base"
            >
              {step.step}
            </motion.span>

            <Reveal direction="up" delay={index * 0.05}>
              <h3 className="text-fluid-2xl font-bold text-white">{step.title}</h3>
              <p className="mt-2.5 max-w-2xl leading-relaxed text-steel-300">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
