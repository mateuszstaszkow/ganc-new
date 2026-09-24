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
  phoneSecondary: '+48 601 725 142',
  phoneSecondaryHref: '+48601725142',
  email: 'biuro@ganc.com.pl',
  emailHr: 'sekretariat@ganc.com.pl',
  nip: '6692518755',
  krs: '0000452240',
  regon: '321340115',
  mapsUrl: 'https://maps.app.goo.gl/sp4NCgffNAuH6jo47',
  geo: { lat: 54.23097, lng: 16.29725 },
} as const

export const SECTION_IDS = [
  'proces',
  'o-nas',
  'specjalizacje',
  'oferta',
  'realizacje',
  'kariera',
  'kontakt',
] as const
