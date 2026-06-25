# ARCHITECTURE.md — Module Structure

## File dependency order

```
types.ts              → Shared types (Predicate, Iteratee, PropertyPath, etc.)
security/index.ts     → sanitizePath, safeGet, deepFreeze, safeClone
array/index.ts        → 65 functions, standalone
collection/index.ts   → 25 functions, standalone
function/index.ts     → 19 functions, standalone
lang/index.ts         → 41 functions, standalone
math/index.ts         → 15 functions, standalone
object/index.ts       → 20 functions, standalone
string/index.ts       → 29 functions, standalone
util/index.ts         → 12 functions, standalone
index.ts              → Barrel re-export of all modules
```

**Rule**: No module imports from another module. Each is self-contained.

## Adding a new function

1. **Find the right category** — array, collection, function, lang, math, object, string, util, security
2. **Add JSDoc + export** to the category's `src/<cat>/index.ts` 
3. **Add test** in `test/<cat>.test.ts` (run `npm test` to verify)
4. **Add table row** in `docs/v1.0/<Category>.md`
5. **Add re-export** in `src/index.ts` barrel

## Bundle pipeline

```
src/*.ts  ──tsc──▶  dist/*.js  ──esbuild──▶  dist/helios.mjs (42.6 KB)
                                              dist/helios.cjs (43.3 KB)
```

- `tsc` compiles to CommonJS, per-module files
- `esbuild --bundle --minify` creates two single-file bundles (ESM + CJS)
- Type declarations stay in `dist/` per-module

## Security architecture

```
User input → sanitizePath()
    ↓
Gets blocked? → throws SecurityError (__proto__, prototype, constructor)
    ↓
Passes? → safe path segments returned
    ↓
Object operations → filter output keys
    ↓
Collection operations → skip dangerous keys silently
```

All functions are security-hardened at three levels:
1. **Input**: path validation blocks dangerous keys
2. **Access**: `hasOwnProperty.call()` prevents prototype traversal
3. **Output**: injected keys are silently filtered from results
