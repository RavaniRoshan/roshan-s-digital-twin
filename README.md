# roshan-s-digital-twin v3

Personal site for Ravani Roshan — AI systems builder. Instrument-cluster HUD on the
SpaceUI stack (React 19 + Base UI + Tailwind v4 + Motion).

## design system — "Instrument Cluster"

Cold blue-grey near-black with a single acid cyan accent. One saturated accent on a
3-step achromatic ladder, per current high-end dark-site doctrine.

| token | value | contrast on bg |
|---|---|---|
| `--background` | `hsl(212 32% 8%)` | — |
| `--card` | `hsl(210 31% 15%)` | — |
| `--foreground` | `hsl(210 33% 93%)` | 15.7:1 AAA |
| `--muted-foreground` | `hsl(208 24% 70%)` | 8.7:1 AAA |
| `--primary` (cyan) | `hsl(186 67% 51%)` | 8.8:1 AAA |

No green anywhere. Tailwind's whole `green-*` ramp is remapped to cyan in
`@theme inline` so the GitHub contribution heatmap inherits the palette instead of
rendering GitHub green.

## routes

| route | purpose |
|---|---|
| `/` | status dashboard — session clock, KPI row, live commit heatmap, flagship, rack |
| `/systems` | all systems, filterable by language |
| `/systems/:slug` | case file — problem, approach, capabilities, signal |
| `/timeline` | ship log on SpaceUI `Timeline` |
| `/resume` | capability matrix, education, credentials |

## navigation

Fixed left rail (identity → indexed links → live IST clock → ⌘K hint) on desktop;
top bar + `Sheet` under `lg`. Plus a ⌘K command palette (SpaceUI `Command` /
Base UI `Autocomplete`) that searches routes, systems, and contact channels. The
palette is real `<button>`s over router navigation and is lazy-loaded on idle.

## stack

- React 19 · TypeScript · Vite 6
- Tailwind CSS v4 — CSS-first tokens in `src/index.css`
- SpaceUI registry via shadcn CLI (`@spaceui` namespace in `components.json`)
- React Router v7 · Motion

## SpaceUI components in use

`github-activity` (live 52-week heatmap, no API key) · `timeline` · `command` +
`autocomplete` + `kbd` · `card` · `button` · `badge` · `tabs` · `sheet` · `dialog` ·
`tooltip` · `scroll-area` · `avatar` · `empty` · `frame` · `spinner` · `orb/loading`

Install more with:

```sh
npx shadcn@latest add @spaceui/<handle>
```

Handles are the exact `name` values from `https://www.spaceui.one/r/registry.json`
(1100 items, 251 installable). Note the docs site shows some example handles that do
not exist — always check the registry index. **Marquee does not exist** in SpaceUI.

Items marked `isPro` in the registry require a paid licence; the PRO stats blocks and
the Agent/Deploy/Voice interactions are all gated.

## perf

Routes are `React.lazy` code-split. Command palette loads on `requestIdleCallback`;
the heatmap loads on mount since it makes a live network call anyway. Main bundle
~552 kB (~182 kB gzip), heatmap 72 kB, palette 63 kB — all lazy.

## local development

```sh
npm install
npm run dev
```

## verification

```sh
npm run build   # tsc -b && vite build
npm test        # vitest
npm run lint
```

Vendor code under `src/components/{ui,spaceui,orb}`, `src/lib`, and `src/utils` is
registry-generated; `no-explicit-any` is relaxed there in `eslint.config.js` because
re-running the CLI would revert local patches.

No env vars. No secrets in the frontend.
