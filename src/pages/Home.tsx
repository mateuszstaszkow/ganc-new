import { About } from '../components/About'
import { Careers } from '../components/Careers'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Gallery } from '../components/Gallery'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Offer } from '../components/Offer'
import { Partners } from '../components/Partners'
import { Process } from '../components/Process'
import { Specialties } from '../components/Specialties'
import { Marquee } from '../components/ui/Marquee'
import { marqueeItems } from '../data/content'

export default function Home() {
  return (
    <>
      <Header />
      <main id="tresc">
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Specialties />
        <Offer />
        <Gallery />
        <Process />
        <Partners />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
