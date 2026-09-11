import { offer } from '../data/content'
import { Icon } from './ui/Icon'
import { Stagger, StaggerItem } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'

export function Offer() {
  return (
    <Section id="oferta" decorated className="bg-steel-950">
      <SectionHeading
        eyebrow="Oferta"
        title="Profil działalności"
        lead="Pełny zakres prac, które wykonujemy dla inwestorów z branży handlowej i przemysłowej."
      />

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3" as="ul">
        {offer.map((item) => (
          <StaggerItem key={item.text} as="li">
            <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ice-500/40 hover:shadow-glow-ice">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-10 size-36 rounded-full bg-ice-500/0 blur-2xl transition-colors duration-500 group-hover:bg-ice-500/25"
              />

              <span className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500/25 to-ice-500/5 text-ice-300 ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:text-white">
                <Icon name={item.icon} className="size-6" />
              </span>

              <p className="relative mt-5 leading-relaxed text-steel-200 transition-colors duration-300 group-hover:text-white">
                {item.text}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
