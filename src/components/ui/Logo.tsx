import { motion, useReducedMotion } from 'framer-motion'

/**
 * Vector rebuild of the GANC mark, traced from the original bitmap logo:
 * a square outline split horizontally — red above, blue below — with a long
 * blue rule running through the split and a gap at the square's centre.
 * On mount the rule draws itself in from the left.
 */
export function LogoMark({
  className,
  animate = false,
}: {
  className?: string
  animate?: boolean
}) {
  const reduce = useReducedMotion()
  const shouldAnimate = animate && !reduce

  return (
    <svg
      viewBox="0 0 480 147"
      className={className}
      role="img"
      aria-label="GANC IZOLACJE"
      focusable="false"
    >
      <title>GANC IZOLACJE</title>
      <motion.path
        fill="#E31E24"
        d="M346 12h120v46h-11V23h-98v35h-11z"
        initial={shouldAnimate ? { opacity: 0, y: -14 } : false}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      <motion.path
        fill="#00A0E3"
        d="M346 89h11v34h98V89h11v45H346z"
        initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      <motion.rect
        fill="#00A0E3"
        x="14"
        y="68"
        width="379"
        height="12"
        initial={shouldAnimate ? { scaleX: 0 } : false}
        animate={shouldAnimate ? { scaleX: 1 } : undefined}
        style={{ originX: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      />
      <motion.rect
        fill="#00A0E3"
        x="420"
        y="68"
        width="46"
        height="12"
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={shouldAnimate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.9 }}
      />
    </svg>
  )
}

/** Mark plus company name, used in the header and footer. */
export function Logo({
  className,
  animate = false,
}: {
  className?: string
  animate?: boolean
}) {
  return (
    <span className={`flex items-center gap-2.5 sm:gap-3 ${className ?? ''}`}>
      <LogoMark animate={animate} className="h-5 w-auto shrink-0 sm:h-6" />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-extrabold tracking-[0.16em] text-white sm:text-base">
          GANC
        </span>
        <span className="text-[0.6rem] font-semibold tracking-[0.3em] text-ice-400 sm:text-[0.68rem]">
          IZOLACJE
        </span>
      </span>
    </span>
  )
}
