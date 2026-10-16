# Technical Documentation

Portfolio website — SWE363 Assignment 2 (Interactive Features)
**Author:** Sana Ammar · **Student ID:** 202337790

---

## 1. Overview

An interactive personal portfolio built as a **React + Vite + TypeScript**
single-page application. It presents a hero, an about section, a filterable
project catalogue, a toolkit tab switcher and a validated contact form, styled
as a light, editorial, typography-driven layout with a considered motion system
and **hand-drawn controls** from the drawably library.

**Two hard design constraints:** the interface uses **no gradients and no
shadows** — depth comes from the sketched controls, thin rules, spacing and hover
tints.

## 2. Tech Stack

| Layer | Choice | Why |
| ----- | ------ | --- |
| UI library | React 19 | Component model, declarative state |
| Build tool | Vite 8 | Fast dev server and production bundling |
| Language | TypeScript | Catches mistakes (wrong prop / field names) at build time |
| Styling | Plain CSS + custom properties | Small surface, easy theming, no shadows/gradients |
| Components | [drawably](https://www.drawably.dev/) v0.4.2 | Hand-drawn (sketched) buttons, inputs, tabs, cards, alerts, badges, dividers and lists |
| Fonts | Inter (sans), Instrument Serif (accent), system mono | Editorial feel |
| Linting | ESLint (typescript-eslint + react-hooks) | Enforces React best practices |

The only runtime dependency beyond React and React DOM is drawably, which is
zero-dependency itself.

## 3. Project Structure

```text
my-project/
├── index.html                     Vite entry (+ pre-paint theme script)
├── src/
│   ├── main.tsx                   React bootstrap
│   ├── App.tsx                    Page composition
│   ├── index.css                  Design tokens, animation primitives, layout rules
│   ├── App.css                    Component styles
│   ├── data/
│   │   └── projects.ts            Project catalogue + types
│   ├── lib/
│   │   └── scroll.ts              Smooth scrolling (reduced-motion aware)
│   ├── hooks/
│   │   ├── useLocalStorage.ts        Persistence with safe error handling
│   │   ├── useTheme.ts               Light/dark theme + data-theme attribute
│   │   ├── useRevealOnScroll.ts      IntersectionObserver reveal
│   │   └── usePrefersReducedMotion.ts Tracks the reduced-motion setting
│   └── components/
│       ├── Header.tsx             Nav, greeting, theme toggle, hero
│       ├── About.tsx              Bio + scroll-linked word reveal
│       ├── Projects.tsx           Search / filter / sort / expand + empty state
│       ├── Stack.tsx              drawably tab switcher + checked list
│       ├── Contact.tsx            Validated form + animated confirmation
│       ├── TableFigure.tsx        Frames the Hairline figure (theme, width, height)
│       ├── Footer.tsx             Giant slide-up name + meta bar
│       ├── BackToTop.tsx          Floating back-to-top button
│       ├── MaskedText.tsx         Line-slide-up heading reveal
│       ├── Reveal.tsx             Fade / rise / blur-in wrapper
│       └── WordsReveal.tsx        Scroll-linked word-by-word paragraph
├── public/                        favicon.svg; hairline-table.html (the figure)
├── hairline/                      table.js — the figure's source
│                                  hairline-table.html — built page
│                                  hairline-table-*.png — look sheets
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── .gitignore
└── README.md
```

## 4. Requirements → Implementation Map

| Assignment requirement | Where it is implemented |
| ---------------------- | ----------------------- |
| **Dynamic content** | `Projects.tsx` (live search, category filter, sort, expand), `Stack.tsx` (tabs), `Header.tsx` (time-based greeting, theme toggle) |
| **Data handling** | `localStorage` for the theme (`useLocalStorage`) and a validated form (`Contact.tsx`) |
| **Animation / transitions** | Masked line reveals, blur-in scroll reveals, scroll-linked word reveal, staggered rows, hover motion, drawably's boiling sketches, footer name reveal, floating button — all reduced-motion aware |
| **Error handling / feedback** | Field-level form errors, an animated form confirmation, and an empty state ("No projects found") |
| **A hand-drawn figure** (portfolio craft) | `hairline/table.js` — a Hairline *table for two* in the contact section; the chair under the pointer draws up to the table and the read-out names it, framed by `TableFigure.tsx` |

## 5. State and Data Flow

- **Project data** lives in `src/data/projects.ts` as a typed array. Adding a
  project is a data change, not a markup change.
- **Derived list.** `Projects.tsx` keeps raw inputs (`query`, `category`,
  `sort`) in state and derives the visible list with `useMemo`, so it recomputes
  only when an input changes.
- **Expansion.** A `Set<string>` of expanded ids drives the animated detail panel.
- **Theme.** `useTheme` stores `'light' | 'dark'` via `useLocalStorage` and
  writes `<html data-theme>`, which all colour tokens react to.

## 6. Data Handling Details

### localStorage (`useLocalStorage.ts`)
Reads and writes are wrapped in `try/catch` with a safe fallback, so
private-browsing or a disabled store degrades gracefully. The theme uses the key
`portfolio-theme`, and a small inline script in `index.html` applies it before
first paint to avoid a flash of the wrong colours; the first visit follows the
system preference.


### Form validation (`Contact.tsx`)
- Rules: name ≥ 2 chars; email matches an `@` + domain pattern; message ≥ 10
  chars. `noValidate` lets the custom logic own the messaging.
- Errors appear beside the field, are announced (`role="alert"`), and clear as
  the user types. A simulated send shows a spinner then a success message.

## 7. Design System & Animation

**Layout & type.** Near-black ink on white; thin hairlines derived from the ink
(`color-mix(in srgb, var(--ink) 12%, transparent)`); tabular monospace labels;
large headings with tight tracking (`letter-spacing: -0.04em`); a serif italic
used sparingly for accent.

**Colour.** Deliberately monochrome: `--accent` simply follows `--ink`, so the
serif italics, solid buttons, the active tab (its label *and* its sketched
underline), the availability dot and the hover states on links, arrows and field
labels are all ink-on-paper. The muted greys, hairlines and surfaces are derived
from the ink with `color-mix()`, so the whole scheme is one colour plus a theme
swap.


**No gradients, no shadows.** Confirmed absent from both the source and the
built CSS. Depth is expressed with drawably's pen strokes, borders, spacing and
a `rgba(0,0,0,0.03)` hover tint.

**Hand-drawn controls (drawably).** Every interactive element is a library
component: `DrawablyButton`, `DrawablyInput`, `DrawablyTextarea`,
`DrawablySelect`, `DrawablyToggle`, `DrawablyTabs`, `DrawablyBadge`,
`DrawablyCard`, `DrawablyAlert`, `DrawablyDivider`, `DrawablyList` and
`DrawablyUnderline`. The library's colours are mapped onto the site tokens
(`--drawably-stroke` / `--drawably-fill` / `--drawably-paper` → ink/bg) so the
sketches re-theme with light/dark mode. Each control draws a fresh seeded sketch
and boils through three frames in pure CSS; drawably ships its own
`prefers-reduced-motion` freeze that our global rule reinforces. Lists are
re-keyed by their contents so the pen markers re-draw whenever the visible items
change.


**Motion tokens** (`index.css`):

| Token | Value | Use |
| ----- | ----- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | entrances / reveals |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | on-screen movement (arrows, rows) |
| `--ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | hover / colour changes |
| `--dur-fast` / `--dur` / `--dur-slow` / `--dur-reveal` | 150 / 250 / 500 / 800 ms | micro-interactions → reveals |

**Animation inventory**

| Effect | Where | Implementation |
| ------ | ----- | -------------- |
| Line-slide-up reveal | section headings, hero, contact title | `MaskedText` (`overflow:hidden` + `translateY(110%)`) |
| Fade / rise / blur-in | about intro, contact intro | `Reveal` + `.reveal` |
| Scroll-linked word reveal | about paragraphs | `WordsReveal` writes `opacity` in a `requestAnimationFrame` loop |
| Staggered rise | project rows, stack items | CSS keyframes with per-item `animation-delay` |
| Row hover | project rows | background tint + title `translateX(4px)` + arrow fade-in |
| Sketch boil / re-sketch | every drawably control | library CSS frame counter + a seeded redraw on hover |
| Letter reveal | footer name | per-letter `translateY(110%)` with 40 ms stagger |
| Back-to-top | floating button | opacity + `translateY` with `ease-out` |

Only `transform`, `opacity` and small `filter: blur()` are animated; the JS word
reveal touches `opacity` only and runs outside React's render cycle.

**Reduced motion.** A global `@media (prefers-reduced-motion: reduce)` block
disables animations and shows all content immediately, and
`usePrefersReducedMotion` lets the JS-driven effects opt out too.



## 9. Compatibility

- Targets evergreen browsers (Chrome, Edge, Firefox, Safari). Uses
  `IntersectionObserver`, `matchMedia`, `color-mix()` and `svh` units, each with
  graceful fallbacks where relevant.
- Responsive from 320 px up; verified at desktop and mobile widths.
- Hover-only affordances are always shown on touch devices via
  `@media (hover: none)`.

## 10. Performance

- Only one runtime dependency beyond React (the zero-dependency drawably);
  production JS ≈ 83 KB gzipped.
- Single page, no routing; filtering runs in memory via `useMemo`.
- Animations are GPU-friendly (`opacity` / `transform`); the word reveal is
  `requestAnimationFrame`-throttled.
- The contact figure is a separate static page, lazy-loaded in a sandboxed frame,
  so it costs nothing until the section is scrolled into view.

## 11. Running Locally

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm run lint     # ESLint
```

Requires Node.js 20.19+ or 22.12+ (the Vite 8 requirement).

## 12. Known Limitations

- The contact form is front-end only; no message is transmitted (the copy says so).

- Project entries are static data, not fetched from a CMS.
