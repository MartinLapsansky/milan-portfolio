# Agent Rules — Milan Portfolio

This section is the project contract for how UI and code must be built. Follow it on every task. When a rule here conflicts with a habit from training data, **this file wins**.

## 1. Project context

- **Framework:** Next.js **16** (App Router) — this is not the Next.js of most training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.
- **React:** 19. **Language:** TypeScript (strict). **Styling:** Tailwind CSS **v4**.
- **Validation:** Zod **4** — schemas live in `lib/<domain>.ts`, shared by client and server.
- **Mutations:** database writes happen only in Server Actions under `lib/actions/<domain>.ts`.
- **Reads:** Server Components read data in-process (through `lib/prisma.ts` / `lib/<domain>.ts`) — never by calling the app's own REST endpoints.
- **REST endpoints:** `app/api/**/route.ts` exists **only** for webhooks, third-party integrations and non-React consumers — never for the app's own data fetching or forms. See §7.4.
- **Hooks:** every React hook lives in `hooks/`, one hook per file. See §7.5.
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

lib/
  <domain>.ts        # Payload types, constants, Zod schema, pure mappers
  actions/<domain>.ts  # "use server" — the only place database writes live
  prisma.ts          # Prisma 7 client singleton

hooks/
  useThing.ts        # Every React hook — one per file, "use client", default export
```

- **Rule:** `atoms` import nothing above them; `molecules` import atoms; `organisms` import molecules + atoms; pages import organisms. `shared/` is for app-wide chrome that does not belong to a single page.
- One component = one file, PascalCase filename matching the component name (`Button.tsx`).
- Keep files small and single-responsibility. If a molecule grows two distinct responsibilities, split it.
- **Hooks folder:** `hooks/` holds React hooks and nothing else. Components import them via `@/hooks/useThing`; a hook is never declared inside a component. See §7.5.

## 4. Component conventions (mandatory)

- **Single source of truth / unified design.** There is exactly **one** `Button`, one `Input`, one `Card`, one `Badge`, etc. Add variants through **props** (`variant`, `size`, `tone`, `disabled`, …) — never create a second copy (`PrimaryButton`, `BigButton`). If a new look is needed, extend the existing component's props.
- **Inline default export.** Always: `export default function Button(props: ButtonProps) { … }`. Never write `function Button() {}` and a trailing `export default Button;`.
- **Typed props.** Give every component a `Props` interface (`interface ButtonProps`). No `any`. Prefer explicit unions for variants (`variant?: "primary" | "secondary" | "ghost"`).
- **Hooks are files, not blocks.** Reusable stateful logic is extracted into `hooks/useThing.ts` — never written inline inside a component (see §7.5).
- **Server Components are the default — every component that _can_ be a Server Component _must_ be one.** Add `"use client"` only when the component genuinely needs state (`useState` / `useReducer` / `useActionState`), effects (`useEffect`), refs, browser APIs, or event handlers (`onClick`, `onChange`, `onSubmit`, …). Push the boundary as low as possible.
- **Never** put `"use client"` on `app/**/page.tsx` or `app/layout.tsx` when the page contains indexable text.
- **Server shell + client island.** A section that needs interactivity keeps its `<section>`, headings and copy in a Server Component and delegates only the interactive part to a small client child — e.g. `organisms/contact/Contact.tsx` (server) → `organisms/contact/ContactForm.tsx` (client).
- **Distinguish the three kinds at a glance:**

  | Kind             | Marker                                          | Lives in                  | May use                                                       |
  | ---------------- | ----------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
  | Server Component | _no directive_                                  | `app/`, `components/**`   | `async`/`await`, Prisma, `metadata`, env secrets              |
  | Client Component | `"use client"` as the **first line** of the file | interactive leaves only   | hooks, events, browser APIs — **never** Prisma or secrets     |
  | Server Action    | `"use server"` at the **top of the file**        | `lib/actions/<domain>.ts` | Prisma, cookies, secrets — **async functions only**           |

- A client component must never import `@/lib/prisma` or any server-only module. The directive always sits above the imports so the boundary is obvious in review.
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
- **Separation of concerns:** presentational components stay dumb; **reads** happen in Server Components, **writes** happen in Server Actions (`lib/actions/<domain>.ts`). REST route handlers (`app/api/**/route.ts`) are the **last resort**: allowed only for webhooks, third-party integrations and non-React consumers — never for the app's own data fetching or forms, and the app never calls its own `app/api/**` routes. See §7.4.
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


## 7. Server vs Client, mutations & validation (mandatory)

### 7.1 Zod is the only validation layer

- All user input is validated with a **Zod** schema (`zod` is a runtime dependency).
- One schema per payload, defined in `lib/<domain>.ts`; the client imports that same module for its types, limits and messages (never duplicate rules or regexes), while the server action runs `safeParse` as the authoritative check. Client affordances come from the shared constants (`required`, `type="email"`, `maxLength`).
- Payload types are derived: `type ContactFormValues = z.infer<typeof contactFormSchema>`. Never redeclare the shape by hand.
- The server action **always** re-runs `schema.safeParse(...)`. Client-side validation is UX only, never a security boundary.
- Convert `ZodError.issues` into field-level messages (`Partial<Record<FieldName, string>>`) via a pure mapper in the same `lib/<domain>.ts`.

### 7.2 Every database write is a Server Action in `lib/actions/<domain>.ts`

- The file starts with `"use server"`; it exports **async functions only**.
- Signature for forms with error UI: `(prevState: State, formData: FormData) => Promise<State>`; the returned state is plain and serializable (`{ status, message?, errors? }`).
- Because `"use server"` modules cannot export constants or types, those live in the sibling plain module `lib/<domain>.ts` — this separation is mandatory, not stylistic.
- Wrap the Prisma call in `try/catch` and return a user-facing Slovak message; never leak driver errors or stack traces.
- Treat every action as a public POST endpoint: validate, never trust the client, and add a honeypot to public forms.

### 7.3 Nothing but the component inside a component file

| What                                               | Location                  |
| -------------------------------------------------- | ------------------------- |
| Payload/state types, literal unions                | `lib/<domain>.ts`         |
| Constants: limits, labels, messages, initial state | `lib/<domain>.ts`         |
| Zod schema + pure parse/validate/map helpers       | `lib/<domain>.ts`         |
| Database writes                                    | `lib/actions/<domain>.ts` |
| Cross-domain, non-React logic                      | `lib/<name>.ts`           |
| React hooks (state, effects, refs, browser APIs)   | `hooks/useThing.ts`       |

- No type aliases, `const` maps, regexes, helper functions or `utils`/`helpers` files at the top of (or next to) a component. Extract them and import via `@/*`.
- Allowed exception: a module-level `const` that is purely visual and used only by that same component (`BASE`, `VARIANTS` in `atoms/Button.tsx`). Never payload types, constants or validation.

### 7.4 REST endpoints (`app/api/**/route.ts`) are the exception, not the data layer

The app reaches its own data **in-process**, not over HTTP. A route handler is justified only when something *outside* the React app must reach us — never as an internal API layer for our own components.

| Need | Correct place | Not allowed |
| ---- | ------------- | ----------- |
| Read data for a page / section | `async` Server Component reading through `lib/prisma.ts` / `lib/<domain>.ts` | `fetch("/api/…")` from a Server Component, a client component or `useEffect`; SWR/React Query as the primary data path |
| Write from the app's own UI (forms, buttons) | Server Action in `lib/actions/<domain>.ts` | `fetch("/api/…", { method: "POST" })` from the app's own components |
| Inbound webhook from a provider (Stripe, Resend, GitHub, …) | Route handler at `app/api/<provider>/route.ts` | A Server Action — providers cannot call it |
| Third-party REST API that needs a server-side secret | Call it from a Server Component / Server Action; add a route handler **only** if a non-React consumer needs the same data | Exposing the key to the browser; `NEXT_PUBLIC_*` for secrets |
| Non-React consumers: mobile app, external client, partner integration, cron job | `app/api/<resource>/route.ts` | — |

Rules for every route handler that is genuinely needed:

- Location `app/api/<resource>/route.ts`; export only the HTTP methods actually used (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`) as `async` functions. A `route.ts` and a `page.tsx` can never live in the same segment.
- Validate body / query with the **same Zod schema** from `lib/<domain>.ts` — a route handler is a public endpoint, so §7.1 and §7.2 apply unchanged.
- Webhook handlers must **verify the provider signature** before touching the database and must be idempotent (idempotency key or `upsert`).
- No duplicated Prisma logic: call the shared function from `lib/actions/<domain>.ts` (write) or `lib/<domain>.ts` (read).
- Respond with `NextResponse.json(…)` and an explicit status code; never leak driver errors or stack traces.
- Route handlers are **not cached by default** in this Next.js version. Opt into caching a `GET` explicitly (`export const dynamic = "force-static"`) only when the response is user-independent, and confirm against `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md` first.
- Not a page and not an SEO surface: never add `app/api/**` to `app/sitemap.ts`, never link it as navigation, and keep it excluded from crawling in `app/robots.ts`.
- **Smell test:** if the only caller of the endpoint is our own UI, delete it — the read becomes a Server Component, the write becomes a Server Action.

### 7.5 All React hooks live in `hooks/`

- One hook per file: `hooks/useThing.ts` — camelCase, `use` prefix, and the exported function name **matches the filename**: `hooks/useInView.ts` → `export default function useInView(…)`. No `hooks/index.ts` barrel.
- The file starts with `"use client"` (hooks are consumed only by client components) and is imported as `@/hooks/useThing` — never with a relative path.
- Typed signature: `function useThing(options: UseThingOptions): UseThingResult`. Option/result types used by more than one module live in `lib/<domain>.ts`, never inline in the hook file.
- Hooks are **never** declared inside a component file, an `app/**` file or `lib/**`. Reusable stateful logic is extracted to `hooks/`; logic that is not React-specific (formatting, parsing, mapping, constants) belongs in `lib/<name>.ts`.
- A hook returns values and callbacks; it never renders JSX, never imports components, and never talks to Prisma directly — it may call a Server Action imported from `lib/actions/<domain>.ts`.
- Keep validation out of hooks: schemas, limits and messages stay in `lib/<domain>.ts` and are imported, not re-declared (§7.1).

## 8. Definition of done

A task is complete only when:

1. Components sit at the correct atomic level and reuse existing atoms/molecules.
2. All colors/spacing/radius/shadows/type come from `tokens.css` (no hardcoded values).
3. Default exports are inline (`export default function …`).
4. Layout is verified at mobile, tablet and desktop.
5. `npm run lint` and `npm run build` pass, and TypeScript is clean.
6. Every component that can be a Server Component is one; `"use client"` appears only on interactive leaves.
7. No types, constants, schemas or helpers declared inside a component file.
8. Every write is a Server Action in `lib/actions/*`, validated with Zod on the server.
9. REST endpoints exist only for webhooks, third-party integrations or non-React consumers; the app never calls its own `app/api/**` routes.
10. Every React hook lives in `hooks/useThing.ts` — none is declared inside a component, `app/**` or `lib/**`.

