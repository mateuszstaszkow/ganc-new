import { useState } from 'react'
import { company, contact } from '../data/content'
import { Button } from './ui/Button'
import { Icon, type IconName } from './ui/Icon'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'

const details: {
  icon: IconName
  label: string
  value: string
  href?: string
  note?: string
}[] = [
  {
    icon: 'pin',
    label: 'Adres',
    value: `${company.street}, ${company.postalCode} ${company.city}`,
    href: `https://www.openstreetmap.org/search?query=${encodeURIComponent(
      `${company.street} ${company.postalCode} ${company.city}`,
    )}`,
    note: company.region,
  },
  {
    icon: 'phone',
    label: 'Telefon',
    value: company.phone,
    href: `tel:${company.phoneHref}`,
    note: `Sekretariat: ${company.phoneSecondary}`,
  },
  {
    icon: 'mail',
    label: 'E-mail',
    value: company.email,
    href: `mailto:${company.email}`,
    note: `Kadry: ${company.emailHr}`,
  },
]

const FIELD =
  'w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder:text-steel-500 transition-colors focus:border-ice-400/60 focus:bg-white/8 focus:outline-none'

/**
 * GitHub Pages serves static files only, so the form composes a pre-filled
 * message and hands it to the visitor's mail client rather than posting to a
 * backend that does not exist.
 */
function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', message: '' })

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const body = [
      `Imię i nazwisko: ${form.name}`,
      form.company && `Firma: ${form.company}`,
      form.phone && `Telefon: ${form.phone}`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      'Zapytanie ze strony ganc.com.pl',
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            Imię i nazwisko *
          </span>
          <input
            required
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            placeholder="Jan Kowalski"
            className={FIELD}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            Firma
          </span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            value={form.company}
            onChange={update('company')}
            placeholder="Nazwa firmy"
            className={FIELD}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            Telefon
          </span>
          <input
            type="tel"
            name="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+48 000 000 000"
            className={FIELD}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            Opis inwestycji *
          </span>
          <textarea
            required
            name="message"
            rows={5}
            value={form.message}
            onChange={update('message')}
            placeholder="Rodzaj obiektu, zakres prac, planowany termin, lokalizacja…"
            className={`${FIELD} resize-y`}
          />
        </label>
      </div>

      <Button type="submit" className="mt-6 w-full">
        Wyślij zapytanie
        <Icon
          name="arrowRight"
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-steel-500">{contact.formNote}</p>
    </form>
  )
}

export function Contact() {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    company.geo.lng - 0.022
  }%2C${company.geo.lat - 0.011}%2C${company.geo.lng + 0.022}%2C${
    company.geo.lat + 0.011
  }&layer=mapnik&marker=${company.geo.lat}%2C${company.geo.lng}`

  return (
    <Section id="kontakt" decorated className="bg-steel-950">
      <SectionHeading eyebrow={contact.heading} title={company.legalName} lead={contact.lead} />

      <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="space-y-4">
          {details.map((item, index) => {
            const inner = (
              <>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500/25 to-transparent text-ice-300 ring-1 ring-inset ring-white/10">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold tracking-[0.18em] text-steel-400 uppercase">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-semibold break-words text-white">
                    {item.value}
                  </span>
                  {item.note && (
                    <span className="mt-0.5 block text-sm text-steel-400">{item.note}</span>
                  )}
                </span>
              </>
            )

            return (
              <Reveal key={item.label} direction="up" delay={index * 0.07}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="glass flex items-start gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-ice-500/40 hover:bg-white/8"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="glass flex items-start gap-4 rounded-2xl p-5">{inner}</div>
                )}
              </Reveal>
            )
          })}

          <Reveal direction="up" delay={0.24}>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                title={`Mapa — ${company.city}, ${company.street}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 grayscale-[0.35] contrast-[1.05]"
              />
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
