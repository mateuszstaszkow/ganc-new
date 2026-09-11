import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin brand-gradient bar pinned to the top edge, tied to page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-ice-500 via-ice-300 to-ember-500"
    />
  )
}
