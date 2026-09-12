import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Register the service worker after first paint so it does not compete with
// the JS the phone needs to replace the HTML shell.
if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const later =
      'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 2500 })
        : (cb: () => void) => window.setTimeout(cb, 1200)
    later(() => {
      void import('virtual:pwa-register').then(({ registerSW }) => {
        registerSW({ immediate: true })
      })
    })
  })
}
