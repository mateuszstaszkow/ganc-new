import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const DISTANCE: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
}

type RevealProps = {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  blur?: boolean
  className?: string
  as?: ElementType
  once?: boolean
}

/**
 * The workhorse scroll-in animation. Everything on the page reveals through
 * this so timing and easing stay consistent; with reduced motion it renders
 * the content plainly instead of animating.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  blur = true,
  className,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div
  const { x, y } = DISTANCE[direction]

  if (reduce) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-64px 0px -64px 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Parent/child pair for staggered lists and card grids. */
export const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  shown: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

type StaggerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function Stagger({ children, className, as = 'div' }: StaggerProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  if (reduce) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-48px' }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: StaggerProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  if (reduce) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  )
}
