import { sanitizePath, safeGet, deepFreeze, safeClone, isOfType, clampIndex, isPlainObject } from '../src/security';
import * as _ from '../src';

describe('sanitizePath', () => {
  it('allows normal paths', () => {
    expect(sanitizePath('a.b.c')).toEqual(['a', 'b', 'c']);
  });
  it('rejects __proto__', () => {
    expect(() => sanitizePath('__proto__')).toThrow('SecurityError');
  });
  it('rejects prototype', () => {
    expect(() => sanitizePath('prototype')).toThrow('SecurityError');
  });
  it('rejects constructor', () => {
    expect(() => sanitizePath('constructor')).toThrow('SecurityError');
  });
  it('parses array paths', () => {
    expect(sanitizePath(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });
});

describe('safeGet', () => {
  it('gets value at path', () => {
    expect(safeGet({ a: { b: 1 } }, 'a.b')).toBe(1);
  });
  it('returns default for missing', () => {
    expect(safeGet({}, 'x', 42)).toBe(42);
  });
  it('blocks dangerous keys', () => {
    expect(() => safeGet({}, '__proto__')).toThrow('SecurityError');
  });
});

describe('deepFreeze', () => {
  it('freezes nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const frozen = deepFreeze(obj);
    expect(Object.isFrozen(frozen)).toBe(true);
    expect(Object.isFrozen(frozen.a)).toBe(true);
    expect(Object.isFrozen(frozen.a.b)).toBe(true);
  });
  it('returns primitives unchanged', () => {
    expect(deepFreeze(42)).toBe(42);
    expect(deepFreeze('abc')).toBe('abc');
  });
});

describe('safeClone', () => {
  it('clones objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = safeClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });
  it('returns primitives unchanged', () => {
    expect(safeClone(42)).toBe(42);
    expect(safeClone(null)).toBeNull();
  });
});

describe('isOfType', () => {
  it('checks types via toString', () => {
    expect(isOfType('String')('hello')).toBe(true);
    expect(isOfType('String')(42)).toBe(false);
    expect(isOfType('Number')(42)).toBe(true);
  });
});

describe('clampIndex', () => {
  it('clamps to valid range', () => {
    expect(clampIndex(-10, 5)).toBe(-5);
    expect(clampIndex(10, 5)).toBe(4);
    expect(clampIndex(2, 5)).toBe(2);
    expect(clampIndex(0, 5)).toBe(0);
  });
});

describe('isPlainObject', () => {
  it('returns true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });
  it('returns false for non-plain objects', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
  });
});
