import { useState } from 'react'
import { company } from '../data/content'
import { useI18n } from '../i18n'
import { Button } from './ui/Button'
import { Icon, type IconName } from './ui/Icon'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'

const FIELD =
  'w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder:text-steel-500 transition-colors focus:border-ice-400/60 focus:bg-white/8 focus:outline-none'

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  website: '',
}

type FormState = typeof EMPTY_FORM
type Status = 'idle' | 'sending' | 'success' | 'error'

function ContactForm() {
  const { t } = useI18n()
  const c = t.contact
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>('idle')

  const update = (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (form.website) return

    setStatus('sending')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          [c.mailCompany]: form.company || '—',
          [c.mailPhone]: form.phone || '—',
          message: form.message,
          _subject: c.mailSubject,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = (await response.json()) as { success?: boolean | string }
      if (!response.ok || data.success === false || data.success === 'false') {
        throw new Error('submit failed')
      }

      setForm(EMPTY_FORM)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass rounded-3xl p-6 sm:p-8" role="status">
        <p className="flex items-start gap-3 text-ice-100">
          <Icon name="check" className="mt-0.5 size-5 shrink-0 text-ice-300" />
          <span>{c.success}</span>
        </p>
        <Button type="button" variant="secondary" className="mt-6 w-full" onClick={() => setStatus('idle')}>
          {c.sendAnother}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="relative glass rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            {c.name}
          </span>
          <input
            required
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            placeholder={c.namePlaceholder}
            className={FIELD}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            {c.emailField}
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            placeholder={c.emailPlaceholder}
            className={FIELD}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            {c.companyField}
          </span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            value={form.company}
            onChange={update('company')}
            placeholder={c.companyPlaceholder}
            className={FIELD}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold tracking-[0.16em] text-steel-400 uppercase">
            {c.phoneField}
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
            {c.message}
          </span>
          <textarea
            required
            name="message"
            rows={5}
            value={form.message}
            onChange={update('message')}
            placeholder={c.messagePlaceholder}
            className={`${FIELD} resize-y`}
          />
        </label>
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={update('website')}
        className="hidden"
        aria-hidden="true"
      />

      <Button type="submit" className="mt-6 w-full" disabled={status === 'sending'}>
        {status === 'sending' ? c.sending : c.submit}
        {status !== 'sending' && (
          <Icon
            name="arrowRight"
            className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        )}
      </Button>

      {status === 'error' && (
        <p className="mt-4 text-sm leading-relaxed text-ember-400" role="alert">
          {c.error}
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-steel-500">{c.formNote}</p>
    </form>
  )
}

export function Contact() {
  const { t, locale } = useI18n()
  const c = t.contact

  const details: {
    icon: IconName
    label: string
    value: string
    href?: string
    note?: string
  }[] = [
    {
      icon: 'pin',
      label: c.address,
      value: `${company.street}, ${company.postalCode} ${company.city}`,
      href: company.mapsUrl,
      note: `NIP ${company.nip} · KRS ${company.krs} · REGON ${company.regon}`,
    },
    {
      icon: 'phone',
      label: c.phone,
      value: company.phone,
      href: `tel:${company.phoneHref}`,
      note: `${c.secretariat}: ${company.phoneSecondary}`,
    },
    {
      icon: 'mail',
      label: c.email,
      value: company.email,
      href: `mailto:${company.email}`,
      note: company.emailHr,
    },
  ]

  const mapQuery = encodeURIComponent(
    'GANC IZOLACJE Sp. z o.o., ul. Dworcowa 16, 76-004 Sianów',
  )
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&z=18&hl=${locale}&output=embed`

  return (
    <Section id="kontakt" decorated className="bg-steel-950">
      <SectionHeading eyebrow={c.heading} title={company.legalName} lead={c.lead} />

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
                title={`${c.mapTitle} — GANC IZOLACJE, ${company.street}, ${company.city}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="block bg-steel-900/90 px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-ice-300 transition-colors hover:bg-steel-800 hover:text-white"
              >
                {c.openMap}
              </a>
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
