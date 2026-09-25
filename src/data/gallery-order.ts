/** First photos on the homepage and in Realizacje, in this order. */
export const LEAD_SLUGS = [
  '02-drzwi-mroznicze-przesuwne',
  '41-komora-drzwi-swiatlo',
  '34-komora-otwarta',
  '06-konstrukcja-hali',
  '05-rampy-przeladunkowe',
  '03-korytarz-komor',
  '01-komora-chlodnicza',
  '18-wozki-chlodnicze',
  '04-hala-produkcyjna-wnetrze',
  '08-hala-elewacja',
  '09-plyty-warstwowe-strop',
  '07-drzwi-nierdzewne',
] as const

function mix(seed: number) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Lead photos first, then the rest in a stable shuffled order. */
export function orderGallery<T extends { slug: string }>(items: readonly T[]): T[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]))
  const lead = LEAD_SLUGS.map((slug) => bySlug.get(slug)).filter((item): item is T => Boolean(item))
  const used = new Set(lead.map((item) => item.slug))
  const rest = items.filter((item) => !used.has(item.slug))
  const random = mix(20260925)
  for (let i = rest.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const current = rest[i]
    rest[i] = rest[j]
    rest[j] = current
  }
  return [...lead, ...rest]
}
