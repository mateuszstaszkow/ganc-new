import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { Icon } from './ui/Icon'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'
import { Tilt } from './ui/Magnetic'

export function Specialties() {
  const { t } = useI18n()
  const specialties = t.specialties

  return (
    <Section id="specjalizacje" className="bg-steel-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(0,160,227,0.16),transparent)]"
      />

      <SectionHeading
        eyebrow={specialties.eyebrow}
        eyebrowClassName="pt-4"
        title={
          <>
            {specialties.titleBefore}
            <span className="text-gradient-ice">{specialties.titleAccent}</span>
          </>
        }
        lead={specialties.lead}
        align="center"
      />

      <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
        {specialties.items.map((item, index) => (
          <Reveal key={item.id} direction={index === 0 ? 'right' : 'left'} delay={index * 0.1}>
            <Tilt className="h-full">
              <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative">
                  <Photo
                    slug={item.photo}
                    alt={item.summary}
                    className="aspect-[16/10] w-full"
                    imgClassName="group-hover:scale-[1.06]"
                    sizes="(max-width: 1024px) 92vw, 44vw"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-900 via-steel-900/35 to-transparent"
                  />

                  <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-steel-950/70 px-3.5 py-2 backdrop-blur-md ring-1 ring-white/15">
                    <Icon name="snowflake" className="size-4 text-ice-300" />
                    <span className="text-sm font-extrabold text-white tabular-nums">
                      {item.tempLabel} °C
                    </span>
                  </div>

                  <h3 className="absolute bottom-4 left-5 text-3xl font-extrabold text-white sm:text-4xl">
                    {item.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-xs font-bold tracking-[0.2em] text-ice-400 uppercase">
                    {item.range}
                  </p>
                  <p className="mt-3 leading-relaxed text-steel-300">{item.summary}</p>

                  <ul className="mt-6 space-y-3">
                    {item.points.map((point, pointIndex) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + pointIndex * 0.08, duration: 0.5 }}
                        className="flex gap-3 text-sm text-steel-200"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ice-500/15 text-ice-300">
                          <Icon name="check" className="size-3.5" />
                        </span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
