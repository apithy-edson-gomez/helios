# BUILD.md — Build & Test

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Commands

| Command | What it does |
|---------|-------------|
| `npm test` | Run all tests (jest --verbose) |
| `npx jest -t "chunk"` | Run tests matching a pattern |
| `npx jest --coverage` | Run with coverage report |
| `npm run build` | Compile TypeScript + bundle (tsc → esbuild) |
| `npm run bundle` | Generate helios.mjs + helios.cjs via esbuild |
| `npx tsc --noEmit` | Type-check without emitting |

## Testing conventions

- **807+ tests**, 9 test suites
- Tests use `ts-jest` to run TypeScript directly
- Test files mirror source structure: `test/array.test.ts` → `src/array/`
- New functions require: test (RED) → implementation (GREEN) → refactor
- Run full suite before committing: `npm test`

## Coverage targets

| Module | Line coverage |
|--------|:------------:|
| Array | 100% |
| Collection | ≥85% |
| Function | ≥90% |
| Lang | ≥96% |
| Math | ≥97% |
| Object | ≥93% |
| Security | ≥94% |
| String | ≥98% |
| Util | ≥95% |
