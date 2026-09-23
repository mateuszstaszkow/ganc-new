import { Link } from 'react-router-dom'
import { company } from '../data/content'
import { useI18n } from '../i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Icon } from './ui/Icon'

export function Footer() {
  const { t, localize } = useI18n()

  return (
    <footer className="relative border-t border-white/10 bg-steel-900">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />

      <div className="shell relative py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}logo-lockup-light.png`}
              alt={company.legalName}
              width={988}
              height={269}
              className="h-9 w-auto sm:h-11"
            />
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
                  <br />
                  <span className="mt-1.5 block text-xs text-steel-500">
                    NIP {company.nip}
                    <span aria-hidden="true"> · </span>
                    KRS {company.krs}
                    <span aria-hidden="true"> · </span>
                    REGON {company.regon}
                  </span>
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
