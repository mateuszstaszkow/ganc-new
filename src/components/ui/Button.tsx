import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Magnetic } from './Magnetic'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ice-500 text-white shadow-glow-ice hover:bg-ice-400 active:bg-ice-600 focus-visible:outline-white',
  secondary:
    'glass text-white hover:border-white/30 hover:bg-white/10 active:bg-white/15',
  ghost: 'text-ice-300 hover:text-white',
}

const shared =
  'group/btn relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 sm:px-7 sm:text-base'

/** Light sweep that crosses the button on hover. */
function Sheen() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
    />
  )
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  children: ReactNode
  magnetic?: boolean
}

export function ButtonLink({
  variant = 'primary',
  children,
  className,
  magnetic = true,
  ...rest
}: LinkProps) {
  const anchor = (
    <a className={`${shared} ${VARIANTS[variant]} ${className ?? ''}`} {...rest}>
      <Sheen />
      <span className="relative flex items-center gap-2.5">{children}</span>
    </a>
  )

  if (!magnetic) return anchor
  return <Magnetic className="inline-flex">{anchor}</Magnetic>
}

type ActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', children, className, ...rest }: ActionProps) {
  return (
    <button className={`${shared} ${VARIANTS[variant]} ${className ?? ''}`} {...rest}>
      <Sheen />
      <span className="relative flex items-center gap-2.5">{children}</span>
    </button>
  )
}
