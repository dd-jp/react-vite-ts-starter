# CLAUDE.md

React 19 + Vite 8 + TypeScript 7 starter. Node 24, npm.

## Layout

- `src/app/` composes features into the page. May import `features` and `shared`.
- `src/features/<name>/` one folder per feature, public API in `index.ts`. May import `shared` only.
- `src/shared/` cross-cutting runtime code. Imports nothing from `app` or `features`.
- `test/` unit-test setup and helpers, imported via `@test/`. Test files only: oxlint rejects `@test/` imports from non-test files.
- `e2e/` Playwright specs.

`src/` holds only code that ships. Test types (`vitest/globals`, jest-dom) live in `tsconfig.test.json`, not the app config.

Import a feature only through its `index.ts` barrel (oxlint `no-restricted-imports`). Zone rules are enforced by `fallow architecture`. Use the `@/` alias for cross-zone imports, relative paths inside a feature.

## Tool ownership

Each concern has exactly one owner. Do not add overlapping rules.

| Concern | Owner |
| --- | --- |
| Formatting (TS, JSX, CSS, JSON) | Biome |
| Import organising | Biome assist (`organizeImports`) |
| CSS lint | Biome (linter enabled for `*.css` only) |
| All JS/TS lint, incl. a11y, React, hooks, imports, type-aware | oxlint + oxlint-tsgolint |
| Comment hygiene | `eslint-plugin-no-comment-slop` via oxlint `jsPlugins` |
| Dead code, dupes, boundaries, cycles, CSS health | fallow |
| Complexity + CRAP | fallow health with Vitest coverage |
| Unit + a11y (jsdom) | Vitest + Testing Library + axe-core |
| E2E + a11y incl. colour contrast | Playwright + @axe-core/playwright |
| Mutation | Stryker |

Suppressions use `oxlint-disable-next-line <rule> -- reason` for lint and `biome-ignore` only for formatting/CSS.

## Gates

Every PR must pass, in CI:

- `npm run lint` — oxlint (warnings fail) then Biome check.
- `npm run typecheck` — `tsc -b`.
- `npm run crap` — Vitest with coverage (80% lines/branches/functions/statements), then `fallow health --max-crap 6`. Fallow fails at >= 6, so any function must score below 6. CRAP = CC² × (1 − cov)³ + CC, so complexity 6+ cannot pass at any coverage: split the function.
- `npm run fallow` — dead code, architecture, dupes, CSS health.
- `npm run e2e` — builds, serves, runs Playwright including the WCAG 2.2 AA axe scan.
- `npm run mutation` — Stryker, break below 80% mutation score. Incremental: the report is cached per branch in CI.

`npm run check` runs all of them locally. Lefthook runs Biome, oxlint and typecheck on commit.

**Never loosen a rule, threshold or exclusion to get green. Fix the code, or raise it with the maintainer.**

## Known constraints

- Vitest is held at 4.x. Stryker 10 runs on Vitest 5 but its mutants never take effect, so every mutant survives. Renovate blocks Vitest 5 until Stryker supports it.
- Stryker's `tsconfigFile` points at a file that does not exist: TS 7 has no JS compiler API and Stryker's tsconfig preprocessor would crash.
- TS 7 removed `baseUrl`; aliases use `paths` only and are mirrored in `vite.config.ts`.
- jsdom cannot compute colour contrast; unit axe runs disable `color-contrast`, Playwright covers it.

## Future option

Biome could be replaced by oxfmt (Oxc formatter, has `sortImports`) once it reaches 1.0. No lint rule overlaps, so the swap is `biome.json` → `.oxfmtrc.json`, except CSS lint, which Oxc does not cover.
