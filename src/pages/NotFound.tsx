import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/ui/Icon'
import { useI18n } from '../i18n'

export default function NotFound() {
  const { t, homePath } = useI18n()

  return (
    <>
      <Header onHome={false} />

      <main
        id="tresc"
        className="relative flex min-h-[70svh] items-center overflow-hidden pt-32 pb-20"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="grid-lines absolute inset-0 opacity-50" />
          <div className="absolute top-0 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-ice-600/18 blur-[130px]" />
        </div>

        <div className="shell text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-ember-400 uppercase">
            {t.ui.notFoundKicker}
          </p>
          <h1 className="mt-5 text-fluid-3xl font-extrabold text-white">{t.ui.notFoundTitle}</h1>
          <p className="mx-auto mt-4 max-w-md text-steel-300">{t.ui.notFoundLead}</p>

          <Link
            to={homePath}
            className="mt-9 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ice-500 px-7 font-bold text-white shadow-glow-ice transition-colors hover:bg-ice-400"
          >
            {t.ui.backHome}
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </main>

      <Footer onHome={false} />
    </>
  )
}
