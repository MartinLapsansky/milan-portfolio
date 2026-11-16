# Agent Rules — Milan Portfolio

This section is the project contract for how UI and code must be built. Follow it on every task. When a rule here conflicts with a habit from training data, **this file wins**.

## 1. Project context

- **Framework:** Next.js **16** (App Router) — this is not the Next.js of most training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.
- **React:** 19. **Language:** TypeScript (strict). **Styling:** Tailwind CSS **v4**.
- **Design system:** `app/tokens.css` (imported by `app/globals.css`). All colors, radii, shadows, gradients and type sizes come from here.
- **Import alias:** `@/*` maps to the project root. Always import via `@/*`, never with deep relative paths (`../../`).
- **Before finishing any task:** run `npm run lint` and `npm run build` (and `npx tsc --noEmit` when types changed). Do not hand back code that does not compile or lint.

## 2. Design-system rules (mandatory)

The tokens file has two layers:

1. **Raw palette** — `--brand-*`, `--neutral-*`, `--success-*`, `--warning-*`, `--danger-*`, `--info-*`, `--dark-*`. **Never use these directly in components.**
2. **Semantic layer** — `--color-*`, `--radius-*`, `--shadow-*`, `--gradient-*`, `--text-*`, `--font-*`. **This is the only layer components may reference.**

Rules:

- **Colors:** only use `--color-*` semantic tokens. Do **not** hardcode hex/rgb values (`#fff`, `rgb(…)`) for surfaces, text, borders, or brand.
- **Theme-safe by default:** because light/dark only swap the `--color-*` layer, using semantic tokens makes every component theme-ready. Never branch visuals on the theme in JS.
- **Radius / shadow / gradient / type:** use `--radius-*`, `--shadow-*`, `--gradient-*`, `--text-*`, `--font-*`. Never invent one-off values when a token exists.
- **States:** hover → `--color-primary-hover`, pressed → `--color-primary-active`, focus → `--color-focus-ring`. Links → `--color-link` / `--color-link-hover`.

### Semantic token cheat-sheet

| Purpose            | Tokens |
| ------------------ | ------ |
| Backgrounds        | `--color-bg`, `--color-surface`, `--color-surface-sunken`, `--color-brand-subtle` |
| Text               | `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-text-inverse`, `--color-text-brand` |
| Borders / dividers | `--color-border`, `--color-border-strong`, `--color-divider` |
| Brand / actions    | `--color-primary`, `--color-primary-hover`, `--color-primary-active`, `--color-on-primary`, `--color-primary-subtle`, `--color-primary-subtle-border` |
| Focus / links      | `--color-focus-ring`, `--color-link`, `--color-link-hover` |
| Radius             | `--radius-sm` · `md` · `lg` · `xl` · `full` |
| Shadow             | `--shadow-xs` · `sm` · `md` · `lg` · `brand` |
| Gradients          | `--gradient-brand`, `--gradient-hero` |
| Type scale         | `--text-xs` … `--text-6xl` |
| Fonts              | `--font-sans`, `--font-mono` |

> Consuming tokens in Tailwind v4: prefer mapping the semantic tokens in `@theme` (e.g. `--color-primary: var(--color-primary)`) so you can write utilities like `bg-primary`, `text-text`, `border-border`. When a utility is not mapped, use `bg-[var(--color-surface)]` / `style={{ color: "var(--color-text)" }}` — still always via a token.

## 3. Component architecture — Atomic Design

Every UI piece lives at exactly one level. Higher levels may import lower levels; never the reverse.

```
app/                 # App Router: routes & pages ONLY (compose organisms)
  layout.tsx
  page.tsx
  globals.css
  tokens.css

components/
  atoms/             # Smallest, single-purpose, not composed of other components
                     # Button, Input, Label, Icon, Badge, Link, Avatar, Spinner
  molecules/         # 2+ atoms working together as one unit
                     # Card, FormField, NavItem, SearchBar, Alert, Breadcrumb
  organisms/         # Self-contained page sections built from molecules/atoms
                     # Hero, ProjectGrid, Header, Footer, ContactForm
  shared/            # Cross-cutting layout/utility components reused app-wide
                     # Root chrome (Header, Footer, ThemeToggle), wrappers
```

- **Rule:** `atoms` import nothing above them; `molecules` import atoms; `organisms` import molecules + atoms; pages import organisms. `shared/` is for app-wide chrome that does not belong to a single page.
- One component = one file, PascalCase filename matching the component name (`Button.tsx`).
- Keep files small and single-responsibility. If a molecule grows two distinct responsibilities, split it.

## 4. Component conventions (mandatory)

- **Single source of truth / unified design.** There is exactly **one** `Button`, one `Input`, one `Card`, one `Badge`, etc. Add variants through **props** (`variant`, `size`, `tone`, `disabled`, …) — never create a second copy (`PrimaryButton`, `BigButton`). If a new look is needed, extend the existing component's props.
- **Inline default export.** Always: `export default function Button(props: ButtonProps) { … }`. Never write `function Button() {}` and a trailing `export default Button;`.
- **Typed props.** Give every component a `Props` interface (`interface ButtonProps`). No `any`. Prefer explicit unions for variants (`variant?: "primary" | "secondary" | "ghost"`).
- **Server Components by default.** Add `"use client"` only when the component truly needs state, effects, refs, or event handlers. Push the boundary as low as possible.
- **Composable & reusable.** Prefer `children` and well-typed props over hardcoded content. No business logic in presentational atoms.
- **Accessibility.** Use semantic HTML (`button`, `a`, `label`, `nav`, `main`), `aria-*` where needed, a visible focus style via `--color-focus-ring`, and keyboard-operable controls.

## 5. Responsive design (mandatory)

The app must work at **mobile, tablet and desktop**.

- **Mobile-first:** write the base style for mobile, then layer `sm:` / `md:` / `lg:` / `xl:` / `2xl:` up. Do not start from desktop and override down.
- Use fluid layouts: flex/grid, `max-w-*` containers, `w-full`, `min-h-*`. Avoid fixed pixel widths that break small screens.
- Verify every screen at ~375px (mobile), ~768px (tablet) and ~1280px+ (desktop). Text, spacing, tap targets and images must all hold up.
- Use the token type scale (`--text-*`) so headings scale predictably.

## 6. Clean Next.js best practices

- **File & route naming:** component files `PascalCase.tsx`; route segments lowercase/kebab (`app/about/page.tsx`); non-component helpers `camelCase.ts`.
- **Imports:** always `@/*` alias, grouped (external → internal → styles). No deep relatives.
- **No magic numbers/colors:** everything traceable to a token or the Tailwind scale. Arbitrary values only when a token does not cover the need.
- **Styling:** Tailwind utilities (mapped to tokens) as the default; CSS variables directly when utilities are unavailable. No inline styles for design decisions.
- **Separation of concerns:** presentational components stay dumb; data fetching and side effects live in server components, route handlers, or dedicated hooks — not in atoms.
- **Metadata & fonts:** page titles/descriptions via Next `metadata`; fonts via `next/font`.
- **Images:** use `next/image` for raster assets; meaningful `alt` text.
- **Hygiene:** no `console.log` left behind, no commented-out dead code, no unused imports. Keep the diff focused on the task.
- **Docs first:** before using any Next.js API, confirm it against `node_modules/next/dist/docs/` — this version has breaking changes from older releases.

## SEO & Discoverability Standards (Next.js + Tailwind CSS)

Every new route, layout, or UI component must follow these Next.js SEO rules before completion:

### 1. Next.js Metadata API (`app/` Router)
- **Static & Dynamic Metadata:** Every public `page.tsx` must export either a `metadata` object (`Metadata` type) or an async `generateMetadata` function. Never use `<head>` or `next/head`.
- **Required Fields:** Define a unique `title` (50–60 chars), `description` (150–160 chars), `alternates.canonical`, and `openGraph` (`title`, `description`, `images`) on all public routes.
- **Private Routes:** Explicitly set `robots: { index: false, follow: false }` in metadata for authenticated or utility pages (e.g., `/dashboard`, `/settings`, `/api`).

### 2. Server Components & Rendering
- **SSR/SSG by Default:** Keep `page.tsx` files as **React Server Components (RSC)** so primary text and SEO content render in the initial HTML payload.
- **Client Component Isolation:** Push `'use client'` down to small, interactive leaf components (buttons, modals, forms). Never wrap an entire page in `'use client'` if it contains indexable text.

### 3. Semantic HTML & Tailwind Discipline
- **Decouple Styling from Semantics:** Do not choose heading tags (`<h1>`–`<h6>`) based on Tailwind font-size classes (`text-4xl`, `text-xl`). Maintain one `<h1>` per page and a strict sequential hierarchy (`<h2>` -> `<h3>`).
- **Landmarks:** Use `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>` instead of generic `<div>` wrappers for page layout.
- **Navigation:** Always use `<Link href="...">` from `next/link` for internal routing. Never use `router.push()` inside `onClick` handlers on `<div>` or `<button>` elements for standard navigation.

### 4. Images, Structured Data & Sitemaps
- **Images:** Always use `next/image` (`<Image />`) with descriptive `alt` text, explicit `width`/`height` (or `fill` inside a sized relative container) to prevent CLS, and `priority` on the above-the-fold LCP image.
- **JSON-LD:** Inject valid `application/ld+json` `<script>` tags inside Server Components for rich content types (`Article`, `Product`, `FAQPage`, `BreadcrumbList`).
- **Sitemap Registration:** Whenever creating a new public static or dynamic route, add it to `app/sitemap.ts` and verify `app/robots.ts` allows crawling.

### Definition of Done (SEO Check)
- [ ] `page.tsx` exports `metadata` or `generateMetadata` with canonical URL.
- [ ] Page renders primary content on the server (no full-page `'use client'`).
- [ ] Single `<h1>` verified; Tailwind classes used for visual sizing, not heading tags.
- [ ] All `<Image />` components have `alt` attributes and prevent layout shift.
- [ ] New public routes are registered in `app/sitemap.ts`.


## 7. Definition of done

A task is complete only when:

1. Components sit at the correct atomic level and reuse existing atoms/molecules.
2. All colors/spacing/radius/shadows/type come from `tokens.css` (no hardcoded values).
3. Default exports are inline (`export default function …`).
4. Layout is verified at mobile, tablet and desktop.
5. `npm run lint` and `npm run build` pass, and TypeScript is clean.

