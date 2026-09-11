import { useReducedMotion } from 'framer-motion'

/**
 * Infinite keyword ribbon. The list is rendered twice so the CSS translation
 * to -50% loops seamlessly; the duplicate is hidden from assistive tech.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion()

  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8 sm:gap-14 sm:pr-14"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 text-sm font-semibold tracking-[0.22em] whitespace-nowrap text-steel-300 uppercase sm:gap-14 sm:text-base"
        >
          {item}
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-ember-500" />
        </li>
      ))}
    </ul>
  )

  if (reduce) {
    return (
      <div className="no-scrollbar overflow-x-auto border-y border-white/10 bg-steel-900/60 py-5">
        <div className="shell flex">
          <Row />
        </div>
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden border-y border-white/10 bg-steel-900/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-steel-950 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-steel-950 to-transparent sm:w-32" />
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
