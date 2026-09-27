# roshan-s-digital-twin v2

Personal site for Ravani Roshan — AI systems builder. Remade from scratch on the
SpaceUI stack (React 19 + Base UI + Tailwind v4 + Motion), dark-first with an
electric volt accent and mono display type.

## stack

- React 19 + TypeScript + Vite 6
- Tailwind CSS v4 (CSS-first tokens in `src/index.css`)
- SpaceUI registry via shadcn CLI (`components.json`, `@spaceui` namespace)
- React Router v7

## local development

```sh
npm install
npm run dev
```

## SpaceUI components

```sh
npx shadcn@latest add @spaceui/primitives-button
```

No env vars needed. No secrets in the frontend.
