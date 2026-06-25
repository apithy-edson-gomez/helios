# AGENTS.md — Helios

> A high-efficiency, security-hardened Lodash alternative for modern JavaScript.
> 231 functions, zero dependencies, 43 KB.

This file provides universal context for AI coding agents working on this project.
Compatible with Codex, Cursor, Claude Code, Copilot, Gemini CLI, Windsurf, Aider, OpenCode.

For deep-dive reference sections, see `.agents/index.md`.

## Project overview

**Helios** is a drop-in Lodash replacement with identical API surface, built from scratch with security and performance as primary goals. It covers Array (65), Collection (25), Function (19), Lang (41), Math (15), Object (20), String (29), Util (12), and Security (5) categories. Zero dependencies, tree-shakeable, full TypeScript declarations.

## Quick commands

| Action | Command |
|--------|---------|
| Install | `npm install @apithy-edson-gomez/helios` |
| Test all | `npm test` |
| Run one test | `npx jest -t "chunk"` |
| Build | `npm run build` |
| Build bundles | `npm run bundle` |
| Coverage | `npm run test:coverage` |
| Type check | `npx tsc --noEmit` |

## Critical conventions

1. **All functions block `__proto__` / `prototype` / `constructor`** — prototype pollution protection is built-in. Don't add manual guards.
2. **Use named exports** — `import { chunk, isEqual } from '@apithy-edson-gomez/helios'`. Never default import.
3. **Every exported function must have JSDoc** with `@param` and `@returns`. All functions already documented.
4. **Tests before code** — TDD with `jest`. New functions need a failing test first. See `.agents/WORKFLOW.md`.
5. **Simple `for` loops** — no `.map` / `.filter` / `.reduce` in implementation code (they're fine in tests).

## Architecture overview

```
src/           → TypeScript source (11 files)
├── types.ts, index.ts
├── array/     → 65 functions  
├── collection/ → 25 functions
├── function/  → 19 functions (debounce, throttle, curry, etc.)
├── lang/      → 41 type checks + deep equality + clone
├── math/      → 15 math utilities
├── object/    → 20 object functions (get/set/merge/pick/omit)
├── string/    → 29 string functions
├── util/      → 12 utilities (range, iteratee, etc.)
└── security/  → 5 safety utilities (sanitizePath, deepFreeze, safeClone)

test/          → Jest tests (807+ tests, 9 suites)
dist/          → Compiled bundles (helios.mjs 42.6 KB, helios.cjs 43.3 KB)
docs/          → API reference pages browsable on GitHub
```

## Agent files in this project

| File | Purpose |
|------|---------|
| `.agents/index.md` | TOC for all agent section files |
| `.agents/BUILD.md` | Build, test, and development setup |
| `.agents/STYLE.md` | Code conventions and patterns |
| `.agents/ARCHITECTURE.md` | Module structure and data flow |
| `.agents/WORKFLOW.md` | Git, CI/CD, and release process |
| `.agents/skills/helius/SKILL.md` | How to use Helios in downstream projects |
