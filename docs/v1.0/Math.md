# Helios v1.0 — Math

The Math module provides 15 functions for common mathematical operations, including arithmetic, rounding, and statistical computations.

---

## Function Reference

| Function | Description | Example |
|---|---|---|
| `add` | Adds two numbers together | `add(6, 4)` → `10` |
| `ceil` | Computes the ceiling of a number to the given precision | `ceil(4.006, 2)` → `4.01` |
| `divide` | Divides two numbers | `divide(6, 4)` → `1.5` |
| `floor` | Computes the floor of a number to the given precision | `floor(4.006, 2)` → `4.00` |
| `max` | Returns the maximum value in an array | `max([4, 2, 8, 6])` → `8` |
| `maxBy` | Like `max` but uses an iteratee | `maxBy([{n:4},{n:2},{n:8}], o => o.n)` → `{n:8}` |
| `mean` | Computes the arithmetic mean of an array | `mean([4, 2, 8, 6])` → `5` |
| `meanBy` | Like `mean` but uses an iteratee | `meanBy([{n:4},{n:2},{n:6}], o => o.n)` → `4` |
| `min` | Returns the minimum value in an array | `min([4, 2, 8, 6])` → `2` |
| `minBy` | Like `min` but uses an iteratee | `minBy([{n:4},{n:2},{n:8}], o => o.n)` → `{n:2}` |
| `multiply` | Multiplies two numbers | `multiply(6, 4)` → `24` |
| `round` | Rounds a number to the given precision | `round(4.006, 2)` → `4.01` |
| `subtract` | Subtracts the second number from the first | `subtract(6, 4)` → `2` |
| `sum` | Computes the sum of values in an array | `sum([4, 2, 8, 6])` → `20` |
| `sumBy` | Like `sum` but uses an iteratee | `sumBy([{n:4},{n:2},{n:6}], o => o.n)` → `12` |

---

## Notes

- **Precision**: For `ceil`, `floor`, and `round`, a negative precision rounds to tens/hundreds/etc: `round(1234, -2)` → `1200`.
- **Empty arrays**: `max`/`min` return `undefined` for empty arrays. `sum`/`mean` return `0`/`NaN` respectively.
- **Iteratee shorthand**: `maxBy`, `meanBy`, `minBy`, and `sumBy` accept property-name strings and object partial matchers as iteratees.

[← Back to Overview](overview)
