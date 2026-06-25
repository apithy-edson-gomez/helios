# Math

15 math utility functions.

| Function | Description | Example |
|----------|-------------|---------|
| `add(augend, addend)` | Addition (clamped) | `add(6, 4)` → `10` |
| `ceil(number, precision)` | Ceiling with precision | `ceil(4.006, 2)` → `4.01` |
| `divide(dividend, divisor)` | Division | `divide(10, 4)` → `2.5` |
| `floor(number, precision)` | Floor with precision | `floor(0.046, 2)` → `0.04` |
| `max(array)` | Maximum value | `max([4, 2, 8, 6])` → `8` |
| `maxBy(array, iteratee)` | Maximum by iteratee | `maxBy([{n:1}, {n:2}], o => o.n)` → `{n:2}` |
| `mean(array)` | Mean (average) | `mean([4, 2, 8, 6])` → `5` |
| `meanBy(array, iteratee)` | Mean by iteratee | `meanBy([{n:4},{n:6}], o => o.n)` → `5` |
| `min(array)` | Minimum value | `min([4, 2, 8, 6])` → `2` |
| `minBy(array, iteratee)` | Minimum by iteratee | `minBy([{n:1},{n:2}], o => o.n)` → `{n:1}` |
| `multiply(multiplier, multiplicand)` | Multiplication | `multiply(6, 4)` → `24` |
| `round(number, precision)` | Round with precision | `round(4.006, 2)` → `4.01` |
| `subtract(minuend, subtrahend)` | Subtraction | `subtract(10, 4)` → `6` |
| `sum(array)` | Sum of values | `sum([4, 2, 8, 6])` → `20` |
| `sumBy(array, iteratee)` | Sum by iteratee | `sumBy([{n:4},{n:6}], o => o.n)` → `10` |
