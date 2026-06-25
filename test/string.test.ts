import * as _ from '../src';

describe('camelCase', () => {
  it('converts to camelCase', () => {
    expect(_.camelCase('Foo Bar')).toBe('fooBar');
    expect(_.camelCase('--foo-bar--')).toBe('fooBar');
    expect(_.camelCase('__FOO_BAR__')).toBe('fooBar');
  });
});

describe('capitalize', () => {
  it('capitalizes first char, lowercases rest', () => {
    expect(_.capitalize('FRED')).toBe('Fred');
  });
});

describe('kebabCase', () => {
  it('converts to kebab-case', () => {
    expect(_.kebabCase('Foo Bar')).toBe('foo-bar');
    expect(_.kebabCase('fooBar')).toBe('foo-bar');
  });
});

describe('snakeCase', () => {
  it('converts to snake_case', () => {
    expect(_.snakeCase('Foo Bar')).toBe('foo_bar');
    expect(_.snakeCase('fooBar')).toBe('foo_bar');
  });
});

describe('startCase', () => {
  it('converts to Start Case', () => {
    expect(_.startCase('--foo-bar--')).toBe('Foo Bar');
    expect(_.startCase('fooBar')).toBe('Foo Bar');
  });
});

describe('lowerCase', () => {
  it('converts to lower case words', () => {
    expect(_.lowerCase('--Foo-Bar--')).toBe('foo bar');
    expect(_.lowerCase('fooBar')).toBe('foo bar');
  });
});

describe('upperCase', () => {
  it('converts to UPPER CASE', () => {
    expect(_.upperCase('--foo-bar--')).toBe('FOO BAR');
    expect(_.upperCase('fooBar')).toBe('FOO BAR');
  });
});

describe('escape', () => {
  it('escapes HTML entities', () => {
    expect(_.escape('fred, barney, & pebbles')).toBe('fred, barney, &amp; pebbles');
    expect(_.escape('<script>')).toBe('&lt;script&gt;');
  });
});

describe('unescape', () => {
  it('unescapes HTML entities', () => {
    expect(_.unescape('fred, barney &amp; pebbles')).toBe('fred, barney & pebbles');
  });
});

describe('escapeRegExp', () => {
  it('escapes regexp special chars', () => {
    expect(_.escapeRegExp('[lodash](https://lodash.com/)'))
      .toBe('\\[lodash\\]\\(https://lodash\\.com/\\)');
  });
});

describe('pad', () => {
  it('pads on both sides', () => {
    expect(_.pad('abc', 8)).toBe('  abc   ');
    expect(_.pad('abc', 8, '_-')).toBe('_-abc_-_');
  });
});

describe('padStart', () => {
  it('pads left', () => {
    expect(_.padStart('abc', 6)).toBe('   abc');
    expect(_.padStart('abc', 6, '_-')).toBe('_-_abc');  // lodash behavior: 6 chars total
  });
});

describe('padEnd', () => {
  it('pads right', () => {
    expect(_.padEnd('abc', 6)).toBe('abc   ');
  });
});

describe('repeat', () => {
  it('repeats string', () => {
    expect(_.repeat('*', 3)).toBe('***');
  });
  it('defaults to 1', () => {
    expect(_.repeat('a')).toBe('a');
  });
  it('returns empty for 0 repeats', () => {
    expect(_.repeat('abc', 0)).toBe('');
  });
});

describe('trim', () => {
  it('trims whitespace', () => {
    expect(_.trim('  abc  ')).toBe('abc');
  });
  it('trims custom chars', () => {
    expect(_.trim('-_-abc-_-', '_-')).toBe('abc');
  });
});

describe('trimStart', () => {
  it('trims from start', () => {
    expect(_.trimStart('  abc  ')).toBe('abc  ');
  });
});

describe('trimEnd', () => {
  it('trims from end', () => {
    expect(_.trimEnd('  abc  ')).toBe('  abc');
  });
});

describe('startsWith', () => {
  it('checks start', () => {
    expect(_.startsWith('abc', 'a')).toBe(true);
    expect(_.startsWith('abc', 'b')).toBe(false);
  });
  it('respects position', () => {
    expect(_.startsWith('abc', 'b', 1)).toBe(true);
  });
});

describe('endsWith', () => {
  it('checks end', () => {
    expect(_.endsWith('abc', 'c')).toBe(true);
    expect(_.endsWith('abc', 'b')).toBe(false);
  });
  it('respects position', () => {
    expect(_.endsWith('abc', 'b', 2)).toBe(true);
  });
});

describe('truncate', () => {
  it('truncates with omission', () => {
    expect(_.truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' }))
      .toBe('hi-diddly-ho there,...');
  });
  it('defaults length to 30', () => {
    expect(_.truncate('abcdefghijklmnopqrstuvwxyz123456')).toBe('abcdefghijklmnopqrstuvwxyz1...');
  });
});

describe('words', () => {
  it('splits into words', () => {
    expect(_.words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    expect(_.words('fooBar')).toEqual(['foo', 'Bar']);
  });
  it('works with custom pattern', () => {
    expect(_.words('helloWorld', /[A-Z]?[a-z]+/g)).toEqual(['hello', 'World']);
  });
});

describe('deburr', () => {
  it('converts accented chars to basic latin', () => {
    expect(_.deburr('déjà vu')).toBe('deja vu');
    expect(_.deburr('über')).toBe('uber');
    expect(_.deburr('Øresund')).toBe('Oresund');
  });
});

describe('escapeRegExp', () => {
  it('escapes various regex patterns', () => {
    expect(_.escapeRegExp('(test)')).toBe('\\(test\\)');
    expect(_.escapeRegExp('a+b*c')).toBe('a\\+b\\*c');
    expect(_.escapeRegExp('^start$')).toBe('\\^start\\$');
  });
  it('handles empty string', () => {
    expect(_.escapeRegExp('')).toBe('');
  });
});

describe('parseInt', () => {
  it('parses with radix', () => {
    expect(_.parseInt('10', 2)).toBe(2);
    expect(_.parseInt('FF', 16)).toBe(255);
    expect(_.parseInt('10')).toBe(10);
  });
});

describe('replace', () => {
  it('replaces with string pattern', () => {
    expect(_.replace('hello world', 'world', 'there')).toBe('hello there');
    expect(_.replace('abc-abc', 'abc', 'xyz')).toBe('xyz-xyz');
  });
  it('replaces with regex pattern', () => {
    expect(_.replace('Hello World', /[A-Z]/g, '_')).toBe('_ello _orld');
  });
});

describe('split', () => {
  it('splits with string separator', () => {
    expect(_.split('a-b-c', '-')).toEqual(['a', 'b', 'c']);
  });
  it('splits with limit', () => {
    expect(_.split('a-b-c', '-', 2)).toEqual(['a', 'b']);
  });
  it('splits with regex separator', () => {
    expect(_.split('a,b.c', /[,.]/)).toEqual(['a', 'b', 'c']);
  });
});

describe('trim', () => {
  it('trims custom chars', () => {
    expect(_.trim('__hello__', '_')).toBe('hello');
    expect(_.trim('  hello  ')).toBe('hello');
  });
  it('trims with multiple chars', () => {
    expect(_.trim('-_-abc-_-', '_-')).toBe('abc');
  });
});

describe('trimStart', () => {
  it('trims start with custom chars', () => {
    expect(_.trimStart('__hello__', '_')).toBe('hello__');
  });
});

describe('trimEnd', () => {
  it('trims end with custom chars', () => {
    expect(_.trimEnd('__hello__', '_')).toBe('__hello');
  });
});

describe('truncate', () => {
  it('uses string separator', () => {
    expect(_.truncate('hello world foo', { length: 12, separator: ' ' })).toBe('hello...');
  });
  it('uses regex separator', () => {
    expect(_.truncate('hello-world-foo', { length: 10, separator: /-/ })).toBe('hello...');
  });
  it('returns original if within length', () => {
    expect(_.truncate('abc')).toBe('abc');
  });
  it('defaults omission to ...', () => {
    const result = _.truncate('abcdefghijklmnopqrstuvwxyz123456');
    expect(result).toBe('abcdefghijklmnopqrstuvwxyz1...');
  });
});

describe('toLower', () => {
  it('converts to lower case', () => expect(_.toLower('ABC')).toBe('abc'));
});
describe('toUpper', () => {
  it('converts to upper case', () => expect(_.toUpper('abc')).toBe('ABC'));
});
describe('lowerFirst', () => {
  it('lowercases first letter', () => expect(_.lowerFirst('Fred')).toBe('fred'));
});
describe('upperFirst', () => {
  it('uppercases first letter', () => expect(_.upperFirst('fred')).toBe('Fred'));
});
