# react-vite-ts-starter

Opinionated kick-starter for React apps: fast Rust tooling, strict quality gates, accessibility checked at three layers.

**Use it:** click **Use this template** on GitHub, then:

```sh
nvm use        # Node 24
npm install
npm run dev
```

## Stack

| | |
| --- | --- |
| Runtime | React 19, Vite 8, TypeScript 7 (native `tsgo`), Node 24 |
| Format + imports | [Biome](https://biomejs.dev) |
| Lint | [oxlint](https://oxc.rs) with typescript, react, jsx-a11y, import, promise, unicorn, vitest plugins; type-aware via oxlint-tsgolint |
| Codebase health | [fallow](https://fallow.tools): dead code, duplication, architecture zones, complexity, CRAP |
| Unit | Vitest + Testing Library + axe-core (jsdom) |
| E2E | Playwright + @axe-core/playwright (WCAG 2.2 AA) |
| Mutation | Stryker |
| Hooks | lefthook |
| Deps | Renovate |

## Scripts

| Script | What |
| --- | --- |
| `dev` / `build` / `preview` | Vite |
| `lint` / `lint:fix` | oxlint + Biome |
| `format` | Biome format |
| `typecheck` | `tsc -b` |
| `test` / `test:watch` / `test:coverage` | Vitest |
| `crap` | Coverage, then fail any function with CRAP ≥ 6 |
| `fallow` | Dead code, architecture, dupes, CSS health |
| `e2e` | Playwright (builds and serves first) |
| `mutation` | Stryker, break < 80% |
| `check` | Everything above, in CI order |

## Quality gates

- Coverage ≥ 80% (lines, branches, functions, statements)
- CRAP < 6 per function (`CC² × (1 − cov)³ + CC`)
- Mutation score ≥ 80%
- Zero oxlint warnings, zero axe violations
- Architecture: `app → features → shared`, features imported via their `index.ts` only

See [CLAUDE.md](CLAUDE.md) for tool ownership and the rules behind each gate.

## Layout

```
src/
  app/                 page composition
  features/counter/    demo feature: component, logic, tests, barrel
  shared/              cross-cutting runtime code (empty)
test/                  unit-test setup and axe helper (import via @test/)
e2e/                   Playwright specs
```

## License

MIT
