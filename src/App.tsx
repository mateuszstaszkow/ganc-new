import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ScrollProgress } from './components/ui/ScrollProgress'
import Home from './pages/Home'

const Rodo = lazy(() => import('./pages/Rodo'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Jumps to the top on route change, but honours in-page #anchor links. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <ScrollManager />
      <Suspense fallback={<div className="min-h-screen bg-steel-950" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rodo" element={<Rodo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
