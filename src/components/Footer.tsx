import { Link } from 'react-router-dom'
import { company } from '../data/content'
import { useI18n } from '../i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Icon } from './ui/Icon'
import { Logo } from './ui/Logo'

export function Footer({ onHome = true }: { onHome?: boolean }) {
  const { t, localize, sectionHref } = useI18n()
  const href = (id: string) => sectionHref(id, onHome)

  return (
    <footer className="relative border-t border-white/10 bg-steel-900">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />

      <div className="shell relative py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-400">{t.footer.blurb}</p>

            <address className="mt-6 space-y-2.5 text-sm not-italic">
              <p className="flex items-start gap-2.5 text-steel-300">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-ice-400" />
                <span>
                  {company.legalName}
                  <br />
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                </span>
              </p>
              <p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="inline-flex items-center gap-2.5 text-steel-300 transition-colors hover:text-white"
                >
                  <Icon name="phone" className="size-4 shrink-0 text-ice-400" />
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2.5 text-steel-300 transition-colors hover:text-white"
                >
                  <Icon name="mail" className="size-4 shrink-0 text-ice-400" />
                  {company.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label={t.ui.footerNav}>
            <h2 className="text-xs font-bold tracking-[0.22em] text-white uppercase">{t.ui.page}</h2>
            <ul className="mt-5 space-y-2.5">
              {t.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={href(item.id)}
                    className="text-sm text-steel-400 transition-colors hover:text-ice-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold tracking-[0.22em] text-white uppercase">{t.ui.info}</h2>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  to={localize('/rodo')}
                  className="text-sm text-steel-400 transition-colors hover:text-ice-300"
                >
                  {t.ui.privacy}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${company.emailHr}`}
                  className="text-sm text-steel-400 transition-colors hover:text-ice-300"
                >
                  {t.ui.recruitment}: {company.emailHr}
                </a>
              </li>
              <li>
                <a
                  href="https://ganc.com.pl/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-steel-400 transition-colors hover:text-ice-300"
                >
                  {t.ui.previousSite}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-[0.7rem] leading-relaxed text-steel-500">
          {t.footer.copyrightNotice}
        </p>

        <p className="mt-4 text-xs text-steel-600">
          © {new Date().getFullYear()} {company.legalName}
        </p>
      </div>
    </footer>
  )
}
