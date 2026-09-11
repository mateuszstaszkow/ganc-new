/**
 * Generates responsive WebP/JPEG derivatives plus tiny LQIP placeholders from
 * the originals in assets/photos, and the PWA icon set from assets/logo-mark.svg.
 *
 * Source photos are ~503x336, so we never upscale: widths larger than the
 * original are skipped and the gallery is designed around the native size.
 */
import sharp from 'sharp'
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'assets', 'photos')
const OUT = path.join(ROOT, 'public', 'photos')
const ICONS = path.join(ROOT, 'public', 'icons')
const WIDTHS = [320, 512]

await mkdir(OUT, { recursive: true })
await mkdir(ICONS, { recursive: true })

const manifest = []

for (const file of (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const slug = file.replace(/\.[^.]+$/, '')
  const input = sharp(path.join(SRC, file))
  const meta = await input.metadata()
  const widths = [...new Set([...WIDTHS.filter((w) => w < meta.width), meta.width])].sort(
    (a, b) => a - b,
  )

  for (const w of widths) {
    await sharp(path.join(SRC, file))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(OUT, `${slug}-${w}.webp`))

    await sharp(path.join(SRC, file))
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(path.join(OUT, `${slug}-${w}.jpg`))
  }

  // Inline blur-up placeholder so cards never flash empty on slow mobile links.
  const lqip = await sharp(path.join(SRC, file))
    .resize({ width: 20 })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer()

  manifest.push({
    slug,
    width: meta.width,
    height: meta.height,
    widths,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  })
  console.log(`✓ ${slug} (${meta.width}x${meta.height}) → ${widths.join(', ')}`)
}

await writeFile(
  path.join(ROOT, 'src', 'data', 'photo-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)

// PWA + favicon icons, rendered from the vector mark on a brand-dark tile.
const markSvg = path.join(ROOT, 'assets', 'logo-mark.svg')

async function icon(size, { maskable = false } = {}) {
  const pad = maskable ? 0.62 : 0.82
  const mark = await sharp(markSvg)
    .resize({ width: Math.round(size * pad), fit: 'inside' })
    .png()
    .toBuffer()

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 5, g: 18, b: 31, alpha: 1 },
    },
  })
    .composite([{ input: mark, gravity: 'centre' }])
    .png()
    .toBuffer()
}

await writeFile(path.join(ICONS, 'icon-192.png'), await icon(192))
await writeFile(path.join(ICONS, 'icon-512.png'), await icon(512))
await writeFile(path.join(ICONS, 'icon-maskable-512.png'), await icon(512, { maskable: true }))
await writeFile(path.join(ROOT, 'public', 'apple-touch-icon.png'), await icon(180))

// Social preview card.
const og = await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 5, g: 18, b: 31, alpha: 1 } },
})
  .composite([
    { input: await sharp(markSvg).resize({ width: 620 }).png().toBuffer(), top: 180, left: 290 },
  ])
  .png()
  .toBuffer()
await writeFile(path.join(ROOT, 'public', 'og-image.png'), og)

console.log('✓ icons + og image')
