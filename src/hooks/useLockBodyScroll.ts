import { useEffect } from 'react'

/** Freezes the page behind modals/drawers without the iOS scroll-jump. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const { overflow, paddingRight } = document.body.style
    const gutter = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}
