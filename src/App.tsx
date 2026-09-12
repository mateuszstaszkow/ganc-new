import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { I18nProvider, isLocale } from './i18n'
import Home from './pages/Home'

const Rodo = lazy(() => import('./pages/Rodo'))
const NotFound = lazy(() => import('./pages/NotFound'))

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

function LocaleHome() {
  const { lang } = useParams()
  if (lang === 'pl') return <Navigate to="/" replace />
  if (!isLocale(lang)) return <NotFound />
  return <Home />
}

function LocaleRodo() {
  const { lang } = useParams()
  if (lang === 'pl') return <Navigate to="/rodo" replace />
  if (!isLocale(lang)) return <NotFound />
  return <Rodo />
}

export default function App() {
  return (
    <I18nProvider>
      <ScrollProgress />
      <ScrollManager />
      <Suspense fallback={<div className="min-h-screen bg-steel-950" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rodo" element={<Rodo />} />
          <Route path="/:lang/rodo" element={<LocaleRodo />} />
          <Route path="/:lang" element={<LocaleHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </I18nProvider>
  )
}
