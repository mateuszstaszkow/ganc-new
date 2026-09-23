import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { useI18n } from '../i18n'

export default function Rodo() {
  const { t, homePath } = useI18n()
  const rodo = t.rodo

  return (
    <>
      <Header onHome={false} />

      <main id="tresc" className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="grid-lines absolute inset-0 opacity-50" />
          <div className="hero-orb absolute -top-40 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-ice-600/18 blur-[130px]" />
        </div>

        <div className="shell max-w-3xl">
          <Reveal direction="up">
            <Link
              to={homePath}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ice-300 transition-colors hover:text-white"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              {t.ui.home}
            </Link>
          </Reveal>

          <Reveal direction="up" delay={0.06}>
            <h1 className="mt-7 text-fluid-3xl font-extrabold text-white">{rodo.heading}</h1>
          </Reveal>

          {t.ui.legalNote ? (
            <p className="mt-4 text-sm text-ice-300/90">{t.ui.legalNote}</p>
          ) : null}

          <Reveal direction="up" delay={0.12}>
            <p className="mt-7 font-semibold text-ice-200">{rodo.intro}</p>
          </Reveal>

          <Reveal direction="up" delay={0.16}>
            <p className="mt-4 leading-relaxed text-steel-300">{rodo.preamble}</p>
          </Reveal>

          <div className="mt-12 space-y-10">
            {rodo.blocks.map((block, index) => (
              <Reveal key={block.title} direction="up" delay={0.05 + index * 0.04}>
                <section className="glass rounded-2xl p-6 sm:p-8">
                  <h2 className="flex items-center gap-3 text-fluid-lg font-bold text-white">
                    <span
                      aria-hidden="true"
                      className="h-4 w-1 rounded-full bg-gradient-to-b from-ice-400 to-ember-500"
                    />
                    {block.title}
                  </h2>

                  {block.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-relaxed text-steel-300">
                      {paragraph}
                    </p>
                  ))}

                  {'list' in block && block.list && (
                    <ul className="mt-4 space-y-2.5">
                      {block.list.map((entry) => (
                        <li key={entry} className="flex gap-3 text-steel-300">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-ice-400"
                          />
                          {entry}
                        </li>
                      ))}
                    </ul>
                  )}

                  {'after' in block &&
                    block.after?.map((paragraph) => (
                      <p key={paragraph} className="mt-4 leading-relaxed text-steel-300">
                        {paragraph}
                      </p>
                    ))}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
