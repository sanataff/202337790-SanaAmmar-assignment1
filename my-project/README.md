# Sana Ammar — Portfolio (SWE363 Assignment 2)

An interactive personal portfolio for **Sana Ammar**, a designer, researcher and
software builder. Assignment 1 was a static page; this version is a React
single-page app with an editorial, typography-driven layout, a carefully tuned
motion system, and hand-drawn controls from the **drawably** UI library.

> **Student:** Sana Ammar · **ID:** 202337790
> ** repository name:** `202337790-SanaAmmar-assignment2`

**Design constraints:** no gradients and no shadows — depth comes from the
hand-drawn **drawably** sketches, thin rules, spacing and hover tints.

---

##  Features

- **Live project search** — filter the project list as you type.
- **Category filter & sorting** — narrow by Mobile / Web / Design and reorder by
  featured, newest or title.
- **Expandable project rows** — show or hide extra detail per project.
- **Toolkit tabs** — switch Frontend / Mobile / Design with a hand-drawn tab row
  whose underline follows the active tab.
- **Light / dark theme** — remembered in `localStorage`, following your system
  preference on the first visit.
- **Time-based greeting** — the hero greets you according to the time of day.
- **Validated contact form** — checks name, email and message, then shows an
  animated confirmation.


## ✍️ Hand-drawn UI

Every control is a pen sketch from **[drawably](https://www.drawably.dev/)** —
the strokes are generated at load and gently "boil", and they re-sketch on hover.
They are themed to the site's ink colour through a few `--drawably-*` variables,
so they re-colour with the light/dark theme.

| UI element | drawably component |
| ---------- | ------------------ |
| Buttons (hero, clear, details, submit, back-to-top) | `DrawablyButton` |
| Search / name / email fields, message box, sort dropdown | `DrawablyInput`, `DrawablyTextarea`, `DrawablySelect` |
| Theme switch | `DrawablyToggle` |
| Category filter & toolkit switcher | `DrawablyTabs` |
| Project tags and year | `DrawablyBadge` |
| Empty state | `DrawablyCard` |
| Form success message | `DrawablyAlert` |
| Rules between sections | `DrawablyDivider` |
| Project and contact lists | `DrawablyList` |
| Nav and meta links | `DrawablyUnderline` |


##  Motion

Motion follows the *web-animation-design* principles (Emil Kowalski's course):
`ease-out` for entrances, `ease` for hover, `ease-in-out` for movement,
`opacity`/`transform` only, and sub-300 ms durations for interactions.

- Masked line-slide-up reveals for headings and the hero.
- Blur-in scroll reveals for blocks.
- Scroll-linked word-by-word reveal in the About text.
- Staggered rows, hover nudges and a sliding `→` on project rows.
- A giant footer name that rises letter by letter.
- A floating back-to-top button.
- Hand-drawn strokes that boil and re-sketch on hover (drawably).
- Everything respects `prefers-reduced-motion`, and hover-only effects are
  always shown on touch devices.

## Tech Stack

React 19 · Vite 8 · TypeScript · [drawably](https://www.drawably.dev/)
(hand-drawn controls) · plain CSS (custom properties, light/dark)

## Structure

```text
my-project/
├── index.html
├── src/
│   ├── main.tsx / App.tsx
│   ├── index.css / App.css
│   ├── components/   Header, About, Projects, Stack, Contact, Footer,
│   │                 BackToTop, MaskedText, Reveal, WordsReveal, TableFigure
│   ├── data/         projects.ts
│   ├── lib/scroll.ts Reduced-motion-aware smooth scrolling
│   └── hooks/        useLocalStorage, useTheme, useRevealOnScroll,
│                     usePrefersReducedMotion
├── hairline/         table.js  — the figure's source (Hairline skill)
│                     hairline-table.html — built page
│                     hairline-table-*.png — look sheets
├── public/           favicon.svg, hairline-table.html
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

##  Run Locally

Requires **Node.js ^20.19.0 or >=22.12.0** and npm (Vite 8 requirement).

```bash
npm install      # install dependencies
npm run dev      # dev server with hot reload — http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npm run lint     # ESLint checks
```

## 🌐 Live Deployment

The `dist/` folder from `npm run build` is a static site.

- **Netlify / Vercel:** connect the repo; build command `npm run build`, output
  directory `dist`.
- **GitHub Pages:** publish the `dist/` folder (or use `actions/deploy-pages`).
  For a project sub-path, set `base: '/repo-name/'` in `vite.config.ts`.

After deploying, replace this line with the live URL:

> **Live demo:** 

## 🤖 AI Use (summary)

AI was used as a pair-programming and animation assistant. The primary tool was
the **OpenCode AI coding agent (DeepSeek V4.1 Flash)**, guided by the
**web-animation-design** skill. All output
was reviewed, corrected and verified — see
**[`docs/ai-usage-report.md`](docs/ai-usage-report.md)**.

## 📚 Documentation

- [AI usage report](docs/ai-usage-report.md)
- [Technical documentation](docs/technical-documentation.md)

## ✅ Verification

- `npm run lint` → 0 errors, 0 warnings
- `npm run build` → TypeScript compiles, production bundle generated
- Production bundle confirmed to include the drawably library

- Source and built CSS checked to contain **no gradients and no shadows**
