# String

29 string manipulation functions — case conversion, trimming, padding, escaping, and more.

## Case conversion

| Function | Description | Example |
|----------|-------------|---------|
| `camelCase(string)` | Convert to camelCase | `camelCase('Foo Bar')` → `'fooBar'` |
| `capitalize(string)` | Capitalize first char | `capitalize('FRED')` → `'Fred'` |
| `kebabCase(string)` | Convert to kebab-case | `kebabCase('Foo Bar')` → `'foo-bar'` |
| `lowerCase(string)` | Convert to lower case words | `lowerCase('--Foo-Bar--')` → `'foo bar'` |
| `lowerFirst(string)` | Lowercase first character | `lowerFirst('Fred')` → `'fred'` |
| `snakeCase(string)` | Convert to snake_case | `snakeCase('Foo Bar')` → `'foo_bar'` |
| `startCase(string)` | Convert to Start Case | `startCase('--foo-bar--')` → `'Foo Bar'` |
| `upperCase(string)` | Convert to UPPER CASE | `upperCase('--foo-bar--')` → `'FOO BAR'` |
| `upperFirst(string)` | Uppercase first character | `upperFirst('fred')` → `'Fred'` |

## Escaping

| Function | Description | Example |
|----------|-------------|---------|
| `escape(string)` | Escape HTML entities | `escape('&<>"\'')` → `'&amp;&lt;&gt;&quot;&#39;'` |
| `unescape(string)` | Unescape HTML entities | `unescape('&amp;lt;')` → `'&lt;'` |
| `escapeRegExp(string)` | Escape RegExp special chars | `escapeRegExp('[lodash](https://...)')` |

## Padding & trimming

| Function | Description | Example |
|----------|-------------|---------|
| `pad(string, length, chars)` | Pad both sides | `pad('abc', 8)` → `'  abc   '` |
| `padEnd(string, length, chars)` | Pad right | `padEnd('abc', 6)` → `'abc   '` |
| `padStart(string, length, chars)` | Pad left | `padStart('abc', 6)` → `'   abc'` |
| `trim(string, chars)` | Trim whitespace or custom chars | `trim('  abc  ')` → `'abc'` |
| `trimEnd(string, chars)` | Trim right | `trimEnd('  abc  ')` → `'  abc'` |
| `trimStart(string, chars)` | Trim left | `trimStart('  abc  ')` → `'abc  '` |

## Checking

| Function | Description | Example |
|----------|-------------|---------|
| `endsWith(string, target, position)` | Check end | `endsWith('abc', 'c')` → `true` |
| `startsWith(string, target, position)` | Check start | `startsWith('abc', 'a')` → `true` |

## Manipulation

| Function | Description | Example |
|----------|-------------|---------|
| `deburr(string)` | Remove diacritics | `deburr('déjà vu')` → `'deja vu'` |
| `repeat(string, n)` | Repeat string | `repeat('*', 3)` → `'***'` |
| `replace(string, pattern, replacement)` | Replace | `replace('abc', 'b', 'x')` → `'axc'` |
| `split(string, separator, limit)` | Split | `split('a-b-c', '-', 2)` → `['a', 'b']` |
| `truncate(string, options)` | Truncate with omission | `truncate('hi-diddly-ho...', {length:24, separator:' '})` |
| `words(string, pattern)` | Split into words | `words('fred, barney, & pebbles')` → `['fred','barney','pebbles']` |
| `parseInt(string, radix)` | Parse integer | `parseInt('08')` → `8` |
| `toLower(string)` | Convert to lowercase | `toLower('ABC')` → `'abc'` |
| `toUpper(string)` | Convert to uppercase | `toUpper('abc')` → `'ABC'` |

## Truncate options

```typescript
{ length?: number = 30, omission?: string = '...', separator?: RegExp | string }
```
