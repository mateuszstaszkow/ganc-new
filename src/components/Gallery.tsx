import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { Icon } from './ui/Icon'
import { Photo, photoSrc } from './ui/Photo'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'

const ALL = '__all__'

export function Gallery() {
  const { t } = useI18n()
  const gallery = t.gallery.items
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(gallery.map((item) => item.category)))],
    [gallery],
  )
  const [filter, setFilter] = useState<string>(ALL)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    setFilter(ALL)
    setOpenIndex(null)
  }, [t.gallery.all])

  const visible = useMemo(
    () => (filter === ALL ? [...gallery] : gallery.filter((item) => item.category === filter)),
    [filter, gallery],
  )

  useLockBodyScroll(openIndex !== null)

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? current : (current + delta + visible.length) % visible.length,
      ),
    [visible.length],
  )

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, close, step])

  const current = openIndex === null ? null : visible[openIndex]

  return (
    <Section id="realizacje" decorated className="bg-steel-950">
      <SectionHeading
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        lead={t.gallery.lead}
      />

      <Reveal direction="up" className="mt-10">
        <div
          role="tablist"
          aria-label={t.gallery.filterAria}
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {categories.map((category) => {
            const selected = filter === category
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(category)}
                className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  selected
                    ? 'text-steel-950'
                    : 'text-steel-300 ring-1 ring-white/15 ring-inset hover:text-white'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-ice-400"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                {category === ALL ? t.gallery.all : category}
              </button>
            )
          })}
        </div>
      </Reveal>

      <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl text-left ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-glow-ice"
              >
                <Photo
                  slug={item.slug}
                  alt={item.title}
                  className="aspect-[3/2] w-full"
                  imgClassName="group-hover:scale-[1.07]"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/20 to-transparent opacity-90"
                />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span>
                    <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-ice-400 uppercase">
                      {item.category}
                    </span>
                    <span className="mt-1 block text-sm leading-snug font-semibold text-white">
                      {item.title}
                    </span>
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <Icon name="expand" className="size-4" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[75] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              aria-label={t.gallery.closePreview}
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default bg-steel-950/90 backdrop-blur-md"
            />

            <motion.figure
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) step(1)
                if (info.offset.x > 70) step(-1)
              }}
              className="relative z-10 w-full max-w-3xl"
            >
              {/* Native resolution is ~503px, so the frame is capped to stay sharp. */}
              <picture>
                <source type="image/webp" srcSet={photoSrc(current.slug, 'webp')} />
                <img
                  src={photoSrc(current.slug, 'jpg')}
                  alt={current.title}
                  className="mx-auto w-full max-w-[36rem] rounded-2xl bg-steel-900 shadow-2xl ring-1 ring-white/15"
                />
              </picture>

              <figcaption className="mx-auto mt-4 flex max-w-[36rem] items-center justify-between gap-4">
                <span>
                  <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-ice-400 uppercase">
                    {current.category}
                  </span>
                  <span className="mt-1 block font-semibold text-white">{current.title}</span>
                </span>
                <span className="shrink-0 text-sm text-steel-400 tabular-nums">
                  {(openIndex ?? 0) + 1} / {visible.length}
                </span>
              </figcaption>

              <div className="mx-auto mt-5 flex max-w-[36rem] items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t.gallery.prevPhoto}
                  className="glass flex size-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
                >
                  <Icon name="arrowRight" className="size-5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.gallery.nextPhoto}
                  className="glass flex size-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
                >
                  <Icon name="arrowRight" className="size-5" />
                </button>
              </div>
            </motion.figure>

            <button
              type="button"
              onClick={close}
              aria-label={t.gallery.closePreview}
              className="glass absolute top-4 right-4 z-20 flex size-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 sm:top-6 sm:right-6"
            >
              <Icon name="close" className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
