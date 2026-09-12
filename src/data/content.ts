/**
 * Locale-independent facts. All marketing copy lives in src/i18n/dictionaries.
 */

export const company = {
  name: 'GANC IZOLACJE',
  legalName: 'GANC IZOLACJE Sp. z o.o.',
  tagline: 'Sianów, Dworcowa 16',
  street: 'ul. Dworcowa 16',
  postalCode: '76-004',
  city: 'Sianów',
  phone: '+48 94 317 14 90',
  phoneHref: '+48943171490',
  phoneSecondary: '+48 94 318 66 89',
  phoneSecondaryHref: '+48943186689',
  email: 'biuro@ganc.com.pl',
  emailHr: 'sekretariat@ganc.com.pl',
  geo: { lat: 54.2436, lng: 16.2903 },
} as const

export const SECTION_IDS = [
  'o-nas',
  'specjalizacje',
  'oferta',
  'realizacje',
  'proces',
  'kariera',
  'kontakt',
] as const
