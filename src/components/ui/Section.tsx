import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
  /** Adds the faint blueprint grid + radial glow used on dark sections. */
  decorated?: boolean
}

export function Section({ id, children, className, decorated = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 sm:py-28 lg:py-36 ${className ?? ''}`}
    >
      {decorated && (
        <>
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="hero-orb pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-ice-500/12 blur-[120px]"
          />
        </>
      )}
      <div className="shell relative">{children}</div>
    </section>
  )
}

type HeadingProps = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: HeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} ${className ?? ''}`}
    >
      <Reveal direction="up">
        <p
          className={`flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-ice-400 uppercase ${
            centered ? 'justify-center' : ''
          }`}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-ember-500 to-ice-500" />
          {eyebrow}
        </p>
      </Reveal>

      <Reveal direction="up" delay={0.08}>
        <h2 className="mt-5 text-fluid-3xl font-extrabold text-white">{title}</h2>
      </Reveal>

      {lead && (
        <Reveal direction="up" delay={0.16}>
          <p className="mt-5 text-fluid-lg text-steel-300">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
