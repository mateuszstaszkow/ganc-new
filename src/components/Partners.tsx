import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { Icon } from './ui/Icon'
import { Photo } from './ui/Photo'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'

export function Partners() {
  const { t } = useI18n()
  const partners = t.partners
  const brands = [
    { name: 'cool it', role: partners.role },
    { name: 'PFEUFFER', role: partners.role },
    { name: 'Celltherm', role: partners.role },
  ]

  return (
    <Section id="partnerzy" className="bg-steel-900">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={partners.eyebrow}
            title={partners.heading}
            lead={partners.lead}
          />

          <Stagger className="mt-10 space-y-3">
            {brands.map((brand) => (
              <StaggerItem key={brand.name}>
                <div className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-ice-500/40">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500/25 to-transparent text-ice-300 ring-1 ring-inset ring-white/10">
                    <Icon name="door" className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-extrabold tracking-wide text-white">
                      {brand.name}
                    </span>
                    <span className="block text-sm text-steel-400">{brand.role}</span>
                  </span>
                  <motion.span
                    aria-hidden="true"
                    className="ml-auto text-ice-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <Icon name="arrowRight" className="size-5" />
                  </motion.span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal direction="left" delay={0.15}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-ice-500/15 to-ember-500/10 blur-2xl"
            />
            <div className="relative grid grid-cols-2 gap-4">
              <Photo
                slug="22-odboje"
                alt={partners.photoAlts.stainless}
                className="col-span-2 aspect-[16/10] w-full rounded-2xl ring-1 ring-white/10"
                sizes="(max-width: 1024px) 92vw, 44vw"
              />
              <Photo
                slug="36-drzwi-zamkniete"
                alt={partners.photoAlts.sliding}
                className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
                sizes="(max-width: 1024px) 44vw, 22vw"
              />
              <Photo
                slug="26-brama-segmentowa"
                alt={partners.photoAlts.docks}
                className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
                sizes="(max-width: 1024px) 44vw, 22vw"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
