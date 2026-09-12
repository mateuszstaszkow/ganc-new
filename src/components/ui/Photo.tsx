import { useState } from 'react'
import manifest from '../../data/photo-manifest.json'

type Entry = {
  slug: string
  width: number
  height: number
  widths: number[]
  lqip: string
}

const BY_SLUG = new Map((manifest as Entry[]).map((entry) => [entry.slug, entry]))
const BASE = import.meta.env.BASE_URL

export function getPhoto(slug: string) {
  return BY_SLUG.get(slug)
}

/** Full-resolution source for a photo — used by the gallery lightbox. */
export function photoSrc(slug: string, ext: 'webp' | 'jpg' = 'webp') {
  const entry = BY_SLUG.get(slug)
  if (!entry) return ''
  return `${BASE}photos/${slug}-${entry.widths[entry.widths.length - 1]}.${ext}`
}

type PhotoProps = {
  slug: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
}

/**
 * Responsive <picture> with WebP first and a blurred inline placeholder that
 * cross-fades out on load.
 *
 * The source photographs from the legacy site are only ~503px wide, so we
 * never request more than their native width — that keeps them sharp at card
 * size instead of stretching them into a soft full-bleed image.
 */
export function Photo({
  slug,
  alt,
  className,
  imgClassName,
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw',
  priority = false,
}: PhotoProps) {
  const entry = BY_SLUG.get(slug)
  const [loaded, setLoaded] = useState(false)

  if (!entry) return null

  const srcSet = (ext: 'webp' | 'jpg') =>
    entry.widths.map((w) => `${BASE}photos/${slug}-${w}.${ext} ${w}w`).join(', ')

  const largest = entry.widths[entry.widths.length - 1]

  return (
    <span className={`relative block overflow-hidden ${className ?? ''}`}>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${entry.lqip})`, opacity: loaded ? 0 : 1 }}
      />
      <picture>
        <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
        <img
          src={`${BASE}photos/${slug}-${largest}.jpg`}
          srcSet={srcSet('jpg')}
          sizes={sizes}
          alt={alt}
          width={entry.width}
          height={entry.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName ?? ''}`}
        />
      </picture>
    </span>
  )
}
