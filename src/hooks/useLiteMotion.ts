import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LITE_QUERY = '(max-width: 1023px), (pointer: coarse)'

function matchesLite() {
  return window.matchMedia(LITE_QUERY).matches
}

/**
 * Phones and coarse pointers skip enter-from-hidden animations and GPU-heavy
 * effects (canvas field, huge CSS blurs). Content stays visible on first paint
 * instead of fading in after JavaScript finishes.
 */
export function useLiteMotion() {
  const reduce = useReducedMotion()
  const [narrow, setNarrow] = useState(matchesLite)

  useEffect(() => {
    const mq = window.matchMedia(LITE_QUERY)
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return Boolean(reduce) || narrow
}
