import { Link } from 'react-router-dom'
import { company, footer, nav } from '../data/content'
import { Icon } from './ui/Icon'
import { Logo } from './ui/Logo'

export function Footer({ onHome = true }: { onHome?: boolean }) {
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <footer className="relative border-t border-white/10 bg-steel-900">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40" />

      <div className="shell relative py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-400">
              Specjalistyczne usługi izolacyjne dla handlu i przemysłu — budowa chłodni i mroźni w
              systemie płyt warstwowych oraz tradycyjnym.
            </p>

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

          <nav aria-label="Stopka — nawigacja">
            <h2 className="text-xs font-bold tracking-[0.22em] text-white uppercase">Strona</h2>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
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
            <h2 className="text-xs font-bold tracking-[0.22em] text-white uppercase">Informacje</h2>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  to="/rodo"
                  className="text-sm text-steel-400 transition-colors hover:text-ice-300"
                >
                  RODO — ochrona danych osobowych
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${company.emailHr}`}
                  className="text-sm text-steel-400 transition-colors hover:text-ice-300"
                >
                  Rekrutacja: {company.emailHr}
                </a>
              </li>
              <li>
                <a
                  href="https://ganc.com.pl/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-steel-400 transition-colors hover:text-ice-300"
                >
                  Poprzednia wersja strony
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-[0.7rem] leading-relaxed text-steel-500">
          {footer.copyrightNotice}
        </p>

        <p className="mt-4 text-xs text-steel-600">
          © {new Date().getFullYear()} {company.legalName}
        </p>
      </div>
    </footer>
  )
}
