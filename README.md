# roshan-s-digital-twin

A personal single-page portfolio for Roshan Ravani, built as a product-first professional site rather than a generic resume dump.

The site highlights:

- home page positioning and intro
- featured work and certifications
- news notes for flagship projects like OpenJCK
- downloadable resume
- Brandfetch-powered social and issuer logos

## stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Vitest

## routes

- `/` - home
- `/works` - projects and certifications
- `/news` - news index
- `/news/openjck` - featured project note

## local development

```sh
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## scripts

```sh
npm run dev
npm run build
npm run preview
npm test
```

## assets and content

- site content is centralized in `src/content/siteContent.ts`
- profile images live in `src/assets/profile/`
- public download assets live in `public/resume/`
- favicon assets live in `public/`

## environment

Create a local env file if you want Brandfetch logos to render:

```sh
cp .env.example .env.local
```

Required variable:

```sh
VITE_BRANDFETCH_CLIENT_ID=your-brandfetch-client-id
```

Do not put private Brandfetch API keys in the frontend app.

## current release

Current prepared release: `v0.1.0`

Highlights:

- refreshed product-builder positioning
- works and news routing
- OpenJCK feature coverage
- resume download support
- Brandfetch logo integration
- updated profile image and favicon

## verification

```sh
npm run build
npm test
```

Note: on this Windows setup, `npm test` may need to run outside the sandbox because Vitest can hit an `esbuild` `spawn EPERM` restriction.
