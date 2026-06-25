# STYLE.md — Code Conventions

## TypeScript

- **Target**: ES2020. No down-level iteration (`for...of` on Map uses `.forEach()`).
- **Strict mode**: `strict: true`, `noImplicitAny`, `strictNullChecks`.
- **No `any` casts** in source code (tests may use them for typed callbacks).

## Naming

- Functions use **camelCase**, identical to Lodash API (`chunk`, `differenceBy`, `isEqual`).
- Type parameters use `T`, `R`, `V` (single letters).
- Private helpers use `_` prefix (`_sameValueZero`).

## Export style

```typescript
// Every exported function MUST have JSDoc
/** Creates an array split into chunks. */
export function chunk<T>(array: T[], size: number = 1): T[][] {
  // implementation
}
```

- Named exports only. No default exports.
- One function per conceptual unit (multiple related functions OK per file).
- Function signature follows Lodash 4.18.1 exactly.

## Security rules

1. **Every path-based function** must call `sanitizePath()` or inline-block `__proto__`/`prototype`/`constructor`.
2. **Property access** uses `Object.prototype.hasOwnProperty.call()` — never `value[key]` for unknown keys.
3. **Output objects** filter dangerous keys silently (don't throw, just skip).
4. **No `eval`**, no `new Function()`, no dynamic `require()`.

## Performance

- Use `for` loops, not `.map()` / `.filter()` / `.reduce()` in implementation.
- Use `Set` / `Map` for O(1) lookups (`uniq`, `difference`, `union`).
- Write-pointer pattern for in-place mutation (`pull`, `remove`).
- Binary search for sorted operations.

## Testing

```typescript
describe('functionName', () => {
  it('behaves correctly for X', () => {
    expect(_.chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a','b'], ['c','d']]);
  });
  it('handles edge case Y', () => {
    expect(_.chunk([], 2)).toEqual([]);
  });
});
```

- One `describe` per function (or small related group).
- Descriptive test names — `handles NaN correctly`, `blocks prototype pollution`.
- Test real behavior, not implementation.
