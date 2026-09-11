# GANC IZOLACJE — strona firmowa

Nowa strona internetowa dla **GANC IZOLACJE Sp. z o.o.** (Sianów) — firmy specjalizującej się
w budowie chłodni i mroźni oraz izolacjach termicznych dla handlu i przemysłu.

**Live:** https://mateuszstaszkow.github.io/ganc-new/

Cała treść (opisy, profil działalności, dane kontaktowe, kariera, RODO) oraz zdjęcia pochodzą
z dotychczasowej strony [ganc.com.pl](https://ganc.com.pl/). Warstwa wizualna została
zaprojektowana od zera.

## Stack

- **React 18 + TypeScript**, build: **Vite 6**
- **Tailwind CSS 4** (tokeny motywu w `src/index.css`)
- **Framer Motion** — animacje scrollowe, parallax, przejścia
- **vite-plugin-pwa** (Workbox) — manifest, service worker, tryb offline
- **sharp** — generowanie WebP/JPEG oraz ikon PWA

## Kolory marki

Pobrane bezpośrednio z logo GANC:

| Rola          | Hex       | Token Tailwind |
| ------------- | --------- | -------------- |
| Jasny niebieski | `#00A0E3` | `ice-500`      |
| Czerwony      | `#E31E24` | `ember-500`    |

## Uruchomienie

```bash
npm install
npm run dev        # serwer developerski
npm run build      # produkcyjny build do dist/
npm run preview    # podgląd builda
npm run lint       # sprawdzenie typów
npm run images     # regeneracja zdjęć i ikon z assets/
```

## Struktura

```
assets/            # źródłowe zdjęcia i logo (nie są wysyłane do przeglądarki)
public/photos/     # wygenerowane WebP/JPEG (commitowane — CI ich nie generuje)
public/icons/      # ikony PWA
scripts/           # generator obrazów i ikon
src/data/          # cała treść strony (content.ts) + manifest zdjęć
src/components/    # sekcje strony
src/components/ui/ # prymitywy: animacje, przyciski, zdjęcia, ikony
src/pages/         # Home, RODO, 404
```

Treść edytuje się w jednym miejscu: [`src/data/content.ts`](src/data/content.ts).

### Zdjęcia

Oryginały odziedziczone ze starej strony mają tylko ~503×336 px, dlatego układ celowo nie
używa ich jako pełnoekranowego tła — są pokazywane w rozmiarach kart, gdzie pozostają ostre.
Skrypt `npm run images` nigdy nie skaluje ich w górę.

Aby dodać nowe zdjęcia: wrzuć pliki do `assets/photos/`, uruchom `npm run images`,
a następnie dopisz je do tablicy `gallery` w `src/data/content.ts`.

## Deploy

Każdy push na `main` uruchamia workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
który buduje projekt i publikuje `dist/` na GitHub Pages.

Strona działa pod ścieżką `/ganc-new/`, dlatego `base` w `vite.config.ts` jest ustawione na
`/ganc-new/`. Przy przenoszeniu na własną domenę (np. `ganc.com.pl`) wystarczy zbudować
z `VITE_BASE=/` i dodać plik `public/CNAME`.

## Dostępność i wydajność

- Mobile first, wszystkie sekcje responsywne od 320 px w górę
- `prefers-reduced-motion` wyłącza animacje, zachowując pełną treść
- Obrazy: WebP + JPEG fallback, `srcset`, lazy loading, rozmyte placeholdery
- Semantyczny HTML, etykiety ARIA, obsługa klawiatury w galerii (strzałki, Esc)
- Dane strukturalne schema.org (`GeneralContractor`) w `index.html`
