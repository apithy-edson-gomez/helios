/**
 * Helios String Module
 *
 * Collection of string utility functions modeled after Lodash string methods.
 * All functions are self-contained, typed, efficient, and security-hardened.
 * No external imports.
 */

// ─── Character mappings for deburr ───────────────────────────────────────────

const DEBURR_MAP: Record<string, string> = {
  Æ: 'AE', æ: 'ae', Ð: 'D', ð: 'd', Ø: 'O', ø: 'o',
  Þ: 'Th', þ: 'th', ß: 'ss',
  À: 'A', Á: 'A', Â: 'A', Ã: 'A', Ä: 'A', Å: 'A', ª: 'A',
  à: 'a', á: 'a', â: 'a', ã: 'a', ä: 'a', å: 'a', º: 'a',
  Ç: 'C', ç: 'c',
  È: 'E', É: 'E', Ê: 'E', Ë: 'E',
  è: 'e', é: 'e', ê: 'e', ë: 'e',
  Ì: 'I', Í: 'I', Î: 'I', Ï: 'I',
  ì: 'i', í: 'i', î: 'i', ï: 'i',
  Ñ: 'N', ñ: 'n',
  Ò: 'O', Ó: 'O', Ô: 'O', Õ: 'O', Ö: 'O',
  ò: 'o', ó: 'o', ô: 'o', õ: 'o', ö: 'o',
  Ù: 'U', Ú: 'U', Û: 'U', Ü: 'U',
  ù: 'u', ú: 'u', û: 'u', ü: 'u',
  Ý: 'Y', ý: 'y', ÿ: 'y',
  Š: 'S', š: 's',
  Ā: 'A', ā: 'a', Ă: 'A', ă: 'a', Ą: 'A', ą: 'a',
  Ć: 'C', ć: 'c', Ĉ: 'C', ĉ: 'c', Ċ: 'C', ċ: 'c', Č: 'C', č: 'c',
  Ď: 'D', ď: 'd', Đ: 'D', đ: 'd',
  Ē: 'E', ē: 'e', Ĕ: 'E', ĕ: 'e', Ė: 'E', ė: 'e', Ę: 'E', ę: 'e', Ě: 'E', ě: 'e',
  Ĝ: 'G', ĝ: 'g', Ğ: 'G', ğ: 'g', Ġ: 'G', ġ: 'g', Ģ: 'G', ģ: 'g',
  Ĥ: 'H', ĥ: 'h', Ħ: 'H', ħ: 'h',
  Ĩ: 'I', ĩ: 'i', Ī: 'I', ī: 'i', Ĭ: 'I', ĭ: 'i', Į: 'I', į: 'i', İ: 'I', ı: 'i',
  Ĳ: 'IJ', ĳ: 'ij',
  Ĵ: 'J', ĵ: 'j',
  Ķ: 'K', ķ: 'k', ĸ: 'k',
  Ĺ: 'L', ĺ: 'l', Ļ: 'L', ļ: 'l', Ľ: 'L', ľ: 'l', Ŀ: 'L', ŀ: 'l', Ł: 'L', ł: 'l',
  Ń: 'N', ń: 'n', Ņ: 'N', ņ: 'n', Ň: 'N', ň: 'n', ŉ: 'n', Ŋ: 'N', ŋ: 'n',
  Ō: 'O', ō: 'o', Ŏ: 'O', ŏ: 'o', Ő: 'O', ő: 'o',
  Œ: 'OE', œ: 'oe',
  Ŕ: 'R', ŕ: 'r', Ŗ: 'R', ŗ: 'r', Ř: 'R', ř: 'r',
  Ś: 'S', ś: 's', Ŝ: 'S', ŝ: 's', Ş: 'S', ş: 's',
  Ţ: 'T', ţ: 't', Ť: 'T', ť: 't', Ŧ: 'T', ŧ: 't',
  Ũ: 'U', ũ: 'u', Ū: 'U', ū: 'u', Ŭ: 'U', ŭ: 'u', Ů: 'U', ů: 'u', Ű: 'U', ű: 'u', Ų: 'U', ų: 'u',
  Ŵ: 'W', ŵ: 'w',
  Ŷ: 'Y', ŷ: 'y', Ÿ: 'Y',
  Ź: 'Z', ź: 'z', Ż: 'Z', ż: 'z', Ž: 'Z', ž: 'z',
};

// ─── Word splitting regex ────────────────────────────────────────────────────

const WORD_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]+|\d+/g;

/** Splits a string into words using a smart pattern. */
function splitWords(string: string, pattern?: RegExp): string[] {
  if (pattern) {
    const matches = string.match(pattern);
    return matches ?? [];
  }
  const matches = string.match(WORD_REGEX);
  return matches ?? [];
}

/** Converts a string to a case-separated form (used by case converters). */
function caseConvert(string: string, separator: string): string {
  const words = splitWords(
    string.replace(/['\u2019]/g, '').replace(/[^a-zA-Z0-9]+/g, ' ')
  );
  return words.map((w) => w.toLowerCase()).join(separator);
}

/** Capitalizes the first letter of a string. */
function capitalizeFirst(str: string): string {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

/** Uncapitalizes the first letter of a string. */
function uncapitalizeFirst(str: string): string {
  if (str.length === 0) return str;
  return str[0].toLowerCase() + str.slice(1);
}

// ─── Exported Functions ──────────────────────────────────────────────────────

/**
 * Converts string to camel case.
 * "Foo Bar" → "fooBar"
 */
export function camelCase(string: string = ''): string {
  const words = splitWords(
    string.replace(/['\u2019]/g, '').replace(/[^a-zA-Z0-9]+/g, ' ')
  );
  if (words.length === 0) return '';
  let result = words[0].toLowerCase();
  for (let i = 1; i < words.length; i++) {
    result += capitalizeFirst(words[i].toLowerCase());
  }
  return result;
}

/**
 * Converts the first character of string to upper case and the remaining to lower case.
 */
export function capitalize(string: string = ''): string {
  if (string.length === 0) return '';
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters
 * to basic Latin letters.
 */
export function deburr(string: string = ''): string {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const ch = string[i];
    const mapped = DEBURR_MAP[ch];
    result += mapped !== undefined ? mapped : ch;
  }
  return result;
}

/**
 * Checks if string ends with the given target string.
 */
export function endsWith(
  string: string = '',
  target: string,
  position?: number
): boolean {
  const len = string.length;
  const pos = position !== undefined ? Math.min(position, len) : len;
  const start = pos - target.length;
  if (start < 0) return false;
  return string.slice(start, pos) === target;
}

/**
 * Escapes special HTML characters in string.
 * & < > " '
 */
export function escape(string: string = ''): string {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    switch (string[i]) {
      case '&': result += '&amp;'; break;
      case '<': result += '&lt;'; break;
      case '>': result += '&gt;'; break;
      case '"': result += '&quot;'; break;
      case "'": result += '&#39;'; break;
      default: result += string[i];
    }
  }
  return result;
}

/**
 * Escapes the RegExp special characters in string.
 */
export function escapeRegExp(string: string = ''): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Converts string to kebab case.
 * "Foo Bar" → "foo-bar"
 */
export function kebabCase(string: string = ''): string {
  return caseConvert(string, '-');
}

/**
 * Converts string, as space separated words, to lower case.
 * "Foo Bar" → "foo bar"
 */
export function lowerCase(string: string = ''): string {
  return caseConvert(string, ' ');
}

/**
 * Converts the first character of string to lower case.
 */
export function lowerFirst(string: string = ''): string {
  return uncapitalizeFirst(string);
}

/**
 * Pads string on the left and right sides if it's shorter than length.
 */
export function pad(
  string: string = '',
  length: number = 0,
  chars: string = ' '
): string {
  const strLen = string.length;
  if (strLen >= length) return string;
  const totalPad = length - strLen;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;
  return repeatChar(chars, leftPad) + string + repeatChar(chars, rightPad);
}

/**
 * Pads string on the right side if it's shorter than length.
 */
export function padEnd(
  string: string = '',
  length: number = 0,
  chars: string = ' '
): string {
  const strLen = string.length;
  if (strLen >= length) return string;
  return string + repeatChar(chars, length - strLen);
}

/**
 * Pads string on the left side if it's shorter than length.
 */
export function padStart(
  string: string = '',
  length: number = 0,
  chars: string = ' '
): string {
  const strLen = string.length;
  if (strLen >= length) return string;
  return repeatChar(chars, length - strLen) + string;
}

/**
 * Repeats a character pattern to fill n spaces.
 */
function repeatChar(chars: string, n: number): string {
  if (n <= 0 || chars.length === 0) return '';
  let result = '';
  while (result.length < n) {
    result += chars;
  }
  return result.slice(0, n);
}

/**
 * Converts string to an integer of the specified radix.
 * If radix is undefined, assumes 10 (not auto-detect like parseInt).
 */
export function parseInt(string: string = '', radix?: number): number {
  return Number.parseInt(string, radix ?? 10);
}

/**
 * Repeats the given string n times.
 */
export function repeat(string: string = '', n: number = 1): string {
  if (n <= 0 || string.length === 0) return '';
  let result = '';
  for (let i = 0; i < n; i++) {
    result += string;
  }
  return result;
}

/**
 * Replaces matches for pattern in string with replacement.
 * Handles both strings and RegExp patterns.
 */
export function replace(
  string: string = '',
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: unknown[]) => string)
): string {
  if (typeof pattern === 'string') {
    // Escape the string pattern to use as literal in regex
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return string.replace(new RegExp(escaped, 'g'), replacement as string);
  }
  return string.replace(pattern, replacement as string);
}

/**
 * Converts string to snake case.
 * "Foo Bar" → "foo_bar"
 */
export function snakeCase(string: string = ''): string {
  return caseConvert(string, '_');
}

/**
 * Splits string by separator.
 * If separator is a string, it's treated as a literal separator (not regex).
 */
export function split(
  string: string = '',
  separator: string | RegExp,
  limit?: number
): string[] {
  if (typeof separator === 'string') {
    const escaped = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return string.split(new RegExp(escaped, 'g'), limit);
  }
  return string.split(separator, limit);
}

/**
 * Converts string to start case.
 * "fooBar" → "Foo Bar"
 */
export function startCase(string: string = ''): string {
  const words = splitWords(
    string.replace(/['\u2019]/g, '').replace(/[^a-zA-Z0-9]+/g, ' ')
  );
  return words.map((w) => capitalizeFirst(w.toLowerCase())).join(' ');
}

/**
 * Checks if string starts with the given target string.
 */
export function startsWith(
  string: string = '',
  target: string,
  position?: number
): boolean {
  const pos = position ?? 0;
  return string.slice(pos, pos + target.length) === target;
}

/**
 * Converts string to lower case.
 */
export function toLower(string: string = ''): string {
  return string.toLowerCase();
}

/**
 * Converts string to upper case.
 */
export function toUpper(string: string = ''): string {
  return string.toUpperCase();
}

/**
 * Removes leading and trailing whitespace or specified characters from string.
 */
export function trim(string: string = '', chars?: string): string {
  if (!chars) return string.trim();
  const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g');
  return string.replace(regex, '');
}

/**
 * Removes trailing whitespace or specified characters from string.
 */
export function trimEnd(string: string = '', chars?: string): string {
  if (!chars) return string.trimEnd();
  const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`[${escaped}]+$`, 'g');
  return string.replace(regex, '');
}

/**
 * Removes leading whitespace or specified characters from string.
 */
export function trimStart(string: string = '', chars?: string): string {
  if (!chars) return string.trimStart();
  const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^[${escaped}]+`, 'g');
  return string.replace(regex, '');
}

/**
 * Truncates string if it's longer than the given maximum string length.
 * The last characters are replaced with the omission string which defaults to "...".
 */
export function truncate(
  string: string = '',
  options?: {
    length?: number;
    omission?: string;
    separator?: string | RegExp;
  }
): string {
  const maxLength = options?.length ?? 30;
  const omission = options?.omission ?? '...';
  const separator = options?.separator;

  if (string.length <= maxLength) return string;

  let truncated = string.slice(0, maxLength - omission.length);

  if (separator) {
    const lastSepIndex = findLastSeparatorIndex(truncated, separator);
    if (lastSepIndex > 0) {
      truncated = truncated.slice(0, lastSepIndex);
    }
  }

  return truncated + omission;
}

/**
 * Finds the last index of a separator within a string.
 */
function findLastSeparatorIndex(
  str: string,
  separator: string | RegExp
): number {
  if (typeof separator === 'string') {
    return str.lastIndexOf(separator);
  }
  // For regex, find the last match
  let lastIndex = -1;
  let match: RegExpExecArray | null;
  const regex = new RegExp(separator.source, 'g');
  while ((match = regex.exec(str)) !== null) {
    lastIndex = match.index;
  }
  return lastIndex;
}

/**
 * The inverse of escape. Unescapes HTML entities back to characters.
 */
export function unescape(string: string = ''): string {
  return string
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

/**
 * Converts string, as space separated words, to upper case.
 * "Foo Bar" → "FOO BAR"
 */
export function upperCase(string: string = ''): string {
  const words = splitWords(
    string.replace(/['\u2019]/g, '').replace(/[^a-zA-Z0-9]+/g, ' ')
  );
  return words.map((w) => w.toUpperCase()).join(' ');
}

/**
 * Converts the first character of string to upper case.
 */
export function upperFirst(string: string = ''): string {
  return capitalizeFirst(string);
}

/**
 * Splits string into an array of its words.
 */
export function words(
  string: string = '',
  pattern?: RegExp
): string[] {
  return splitWords(string, pattern);
}
