import { careers, company } from '../data/content'
import { ButtonLink } from './ui/Button'
import { Icon } from './ui/Icon'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

export function Careers() {
  return (
    <Section id="kariera" className="bg-steel-950">
      <Reveal direction="up">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-steel-800 via-steel-900 to-steel-950 p-7 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-20 size-80 animate-drift rounded-full bg-ember-600/20 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-16 size-80 animate-drift rounded-full bg-ice-500/20 blur-[110px]"
            style={{ animationDelay: '-9s' }}
          />
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-ember-400 uppercase">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-gradient-to-r from-ember-500 to-transparent"
                />
                {careers.heading}
              </p>

              <h2 className="mt-5 text-fluid-3xl font-extrabold text-white">
                {careers.headline}
              </h2>
              <p className="mt-4 max-w-xl text-fluid-lg text-steel-300">{careers.lead}</p>

              <ul className="mt-7 flex flex-wrap gap-3">
                {careers.roles.map((role, index) => (
                  <Reveal key={role} direction="up" delay={0.1 + index * 0.08} as="li">
                    <span className="glass inline-flex items-center gap-2.5 rounded-full py-2.5 pr-5 pl-3.5 font-semibold text-white">
                      <span className="flex size-6 items-center justify-center rounded-full bg-ice-500/20 text-ice-300">
                        <Icon name="check" className="size-3.5" />
                      </span>
                      {role}
                    </span>
                  </Reveal>
                ))}
              </ul>

              <p className="mt-7 flex items-center gap-2.5 font-semibold text-ice-200">
                <Icon name="clock" className="size-5 shrink-0 text-ice-400" />
                {careers.offerNote}
              </p>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-7">
              <p className="text-sm leading-relaxed text-steel-300">{careers.applyNote}</p>

              <ButtonLink
                href={`mailto:${company.emailHr}?subject=${encodeURIComponent(
                  'Aplikacja — praca w GANC IZOLACJE',
                )}`}
                className="mt-4 w-full"
              >
                <Icon name="mail" className="size-4" />
                {company.emailHr}
              </ButtonLink>

              <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-relaxed text-steel-500">
                {careers.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
