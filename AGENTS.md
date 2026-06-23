## Setup & Commands

- Dev: `npm run dev` or `pnpm dev` (Next.js on port 3000)
- Build: `npm run build` → check `.next/` for artifacts
- Lint only: `npx eslint` (explicit; not auto-run by CLI)
- Typecheck only: `tsc --noEmit`

## Stack & Conventions

- Next.js 16 + React 19, TS5, ES2017 target
- ESLint v9 with `eslint-config-next`; no custom config override
- CSS Modules; imports via `./path.css` or styled-components syntax
- Markdown content in `/content/`, parsed by [`getStudies()`](src/lib/markdown.ts)

### Entry Points & Boundaries

```text
/content/*.md → lib/markdown.ts (extract metadata + text, group by category)
  → src/app/page.tsx (render as cards via components/StudyCard)
     └─ /estudo/{slug} → app/EstudoPage.tsx
src/types/study.ts defines shared study shape for all consumers

```

## Linting & Formatting Workflow

1. `eslint` (ESLint v9, report mode by default; no auto-fix unless configured locally)
2. Optional: run typecheck before test or commit (`tsc --noEmit`)

Avoid mutating build artifacts in `.next/`; they are regenerated on each build/run.

## Repo Layout Highlights

```text/content/<name>.md     → Markdown study files with frontmatter (slug, category, text)
src/app/*.tsx          → App Router pages and layout
src/components/*        → Reusable React components
lib/markdown.ts         → Reads /content/, returns array of Study objects + metadata extraction helper

```yaml

## Notes for Agents Starting Here

- The "getStudies()" function is the central data source; all markdown studies must conform to its expected shape in `src/types/study.ts`.
- Do not edit Next.js config via `.next/`; always rebuild after changes.
- For type errors, run `tsc --noEmit` explicitly (CLI doesn't auto-type-check).
