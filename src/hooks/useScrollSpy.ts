import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view so the nav can highlight it.
 * Uses a viewport band near the top third, which matches how people read a
 * long scrolling page better than a plain "is intersecting" check.
 */
export function useScrollSpy(ids: readonly string[], offset = 96) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) current = id
      }

      // Near the very bottom the last section may never cross the band.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 80
      if (atBottom) current = ids[ids.length - 1] ?? current

      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return active
}
