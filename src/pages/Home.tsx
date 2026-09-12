import { lazy, Suspense } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { useI18n } from '../i18n'

const Marquee = lazy(() => import('../components/ui/Marquee').then((m) => ({ default: m.Marquee })))
const About = lazy(() => import('../components/About').then((m) => ({ default: m.About })))
const Specialties = lazy(() =>
  import('../components/Specialties').then((m) => ({ default: m.Specialties })),
)
const Offer = lazy(() => import('../components/Offer').then((m) => ({ default: m.Offer })))
const Gallery = lazy(() => import('../components/Gallery').then((m) => ({ default: m.Gallery })))
const Process = lazy(() => import('../components/Process').then((m) => ({ default: m.Process })))
const Partners = lazy(() => import('../components/Partners').then((m) => ({ default: m.Partners })))
const Careers = lazy(() => import('../components/Careers').then((m) => ({ default: m.Careers })))
const Contact = lazy(() => import('../components/Contact').then((m) => ({ default: m.Contact })))
const Footer = lazy(() => import('../components/Footer').then((m) => ({ default: m.Footer })))

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      <Header />
      <main id="tresc">
        <Hero />
        <Suspense fallback={<div className="min-h-[40vh] bg-steel-950" aria-hidden="true" />}>
          <Marquee items={t.marqueeItems} />
          <About />
          <Specialties />
          <Offer />
          <Gallery />
          <Process />
          <Partners />
          <Careers />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
