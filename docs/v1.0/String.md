# Helios v1.0 — String

The String module provides 29 functions for string manipulation, grouped into categories below.

---

## Case Conversion

| Function | Description | Example |
|---|---|---|
| `camelCase` | Converts a string to camelCase | `camelCase('Foo Bar')` → `'fooBar'` |
| `capitalize` | Converts the first character to uppercase, rest to lowercase | `capitalize('FRED')` → `'Fred'` |
| `kebabCase` | Converts a string to kebab-case | `kebabCase('Foo Bar')` → `'foo-bar'` |
| `lowerCase` | Converts a string to lowercase words separated by spaces | `lowerCase('--Foo-Bar--')` → `'foo bar'` |
| `lowerFirst` | Converts the first character of a string to lowercase | `lowerFirst('HELLO')` → `'hELLO'` |
| `snakeCase` | Converts a string to snake_case | `snakeCase('Foo Bar')` → `'foo_bar'` |
| `startCase` | Converts a string to Start Case | `startCase('foo_bar')` → `'Foo Bar'` |
| `toLower` | Converts the entire string to lowercase | `toLower('--Foo-Bar--')` → `'--foo-bar--'` |
| `toUpper` | Converts the entire string to uppercase | `toUpper('--foo-bar--')` → `'--FOO-BAR--'` |
| `upperCase` | Converts a string to uppercase words separated by spaces | `upperCase('--foo-bar--')` → `'FOO BAR'` |
| `upperFirst` | Converts the first character of a string to uppercase | `upperFirst('hello')` → `'Hello'` |

---

## Padding & Trimming

| Function | Description | Example |
|---|---|---|
| `pad` | Pads a string on both sides to the given length | `pad('abc', 8)` → `'  abc   '` |
| `padEnd` | Pads a string on the right side to the given length | `padEnd('abc', 6)` → `'abc   '` |
| `padStart` | Pads a string on the left side to the given length | `padStart('abc', 6)` → `'   abc'` |
| `trim` | Removes leading and trailing whitespace (or specified chars) | `trim('  abc  ')` → `'abc'` |
| `trimEnd` | Removes trailing whitespace (or specified chars) | `trimEnd('  abc  ')` → `'  abc'` |
| `trimStart` | Removes leading whitespace (or specified chars) | `trimStart('  abc  ')` → `'abc  '` |

---

## Escaping & Unescaping

| Function | Description | Example |
|---|---|---|
| `escape` | Escapes HTML entities (`&`, `<`, `>`, `"`, `'`) | `escape('fred & barney')` → `'fred &amp; barney'` |
| `escapeRegExp` | Escapes special RegExp characters in a string | `escapeRegExp('[lodash](https://...)')` → `'\\[lodash\\]\\(https://\\.\\.\\.\\)'` |
| `unescape` | Unescapes HTML entities back to their characters | `unescape('fred &amp; barney')` → `'fred & barney'` |

---

## Checking

| Function | Description | Example |
|---|---|---|
| `endsWith` | Checks if a string ends with a given suffix | `endsWith('abc', 'c')` → `true` |
| `startsWith` | Checks if a string starts with a given prefix | `startsWith('abc', 'a')` → `true` |

---

## Manipulation

| Function | Description | Example |
|---|---|---|
| `deburr` | Removes diacritical marks (accents) from Latin characters | `deburr('déjà vu')` → `'deja vu'` |
| `parseInt` | Parses a string as an integer with a given radix | `parseInt('08')` → `8` (base-10 by default) |
| `repeat` | Repeats a string n times | `repeat('*', 3)` → `'***'` |
| `replace` | Replaces matches with the replacement string/function | `replace('Hi Fred', 'Fred', 'Barney')` → `'Hi Barney'` |
| `split` | Splits a string by a separator | `split('a-b-c', '-')` → `['a', 'b', 'c']` |
| `truncate` | Truncates a string to a specified length with an omission | `truncate('hi-diddly-ho', {length:5})` → `'hi...'` |
| `words` | Splits a string into an array of words | `words('fred, barney, & pebbles')` → `['fred', 'barney', 'pebbles']` |

---

## Notes

- **Case conversion** functions split words on case changes, numbers, and special characters, then rejoin with the appropriate separator.
- **`truncate`** accepts an options object: `{ length: 30, omission: '...', separator: /\s/ }`. Default length is 30, default omission is `'...'`.
- **`words`** accepts an optional pattern parameter for custom word boundary detection.

[← Back to Overview](overview)
