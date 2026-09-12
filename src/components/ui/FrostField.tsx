import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  spin: number
  angle: number
}

/**
 * Drifting ice-crystal field painted on a canvas behind the hero. Deliberately
 * cheap: a few dozen particles, device-pixel-ratio capped at 2, paused when
 * scrolled out of view or when the tab is hidden, and skipped entirely for
 * users who ask for reduced motion.
 */
export function FrostField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    // iPhone-class devices: skip the rAF loop entirely. A 3x canvas behind
    // the hero is the main reason the first screen felt empty / stuck.
    if (window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let visible = true

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      // Scale count with area, but keep phones light.
      const count = Math.round(Math.min(70, Math.max(22, (width * height) / 26000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: 0.08 + Math.random() * 0.32,
        alpha: 0.12 + Math.random() * 0.45,
        spin: (Math.random() - 0.5) * 0.01,
        angle: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr())
      canvas.height = Math.round(height * dpr())
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0)
      seed()
    }

    const drawCrystal = (p: Particle) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.strokeStyle = `rgba(190, 232, 255, ${p.alpha})`
      ctx.lineWidth = p.r > 1.8 ? 0.9 : 0.6

      if (p.r > 1.6) {
        // Larger motes get a 6-spoke snowflake silhouette.
        for (let i = 0; i < 3; i += 1) {
          const a = (i * Math.PI) / 3
          ctx.beginPath()
          ctx.moveTo(-Math.cos(a) * p.r * 2, -Math.sin(a) * p.r * 2)
          ctx.lineTo(Math.cos(a) * p.r * 2, Math.sin(a) * p.r * 2)
          ctx.stroke()
        }
      } else {
        ctx.fillStyle = `rgba(214, 240, 255, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(0, 0, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!visible) return

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx + Math.sin((p.y + p.angle * 40) / 90) * 0.16
        p.y += p.vy
        p.angle += p.spin

        if (p.y - p.r * 2 > height) {
          p.y = -p.r * 2
          p.x = Math.random() * width
        }
        if (p.x < -12) p.x = width + 12
        if (p.x > width + 12) p.x = -12

        drawCrystal(p)
      }
    }

    resize()
    tick()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    // Stop painting when the hero scrolls away or the tab loses focus.
    const inView = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !document.hidden
      },
      { threshold: 0 },
    )
    inView.observe(canvas)

    const onVisibility = () => {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      inView.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  if (reduce) return null

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
