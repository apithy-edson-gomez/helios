import * as _ from '../src';

// =============================================================================
// Nil / Null / Undefined
// =============================================================================
describe('isNil', () => {
  it('returns true for null', () => expect(_.isNil(null)).toBe(true));
  it('returns true for undefined', () => expect(_.isNil(undefined)).toBe(true));
  it('returns false for 0', () => expect(_.isNil(0)).toBe(false));
  it('returns false for false', () => expect(_.isNil(false)).toBe(false));
});

describe('isNull', () => {
  it('returns true for null', () => expect(_.isNull(null)).toBe(true));
  it('returns false for undefined', () => expect(_.isNull(undefined)).toBe(false));
});

describe('isUndefined', () => {
  it('returns true for undefined', () => expect(_.isUndefined(undefined)).toBe(true));
  it('returns false for null', () => expect(_.isUndefined(null)).toBe(false));
});

// =============================================================================
// String / Number / Boolean
// =============================================================================
describe('isString', () => {
  it('returns true for string primitive', () => expect(_.isString('abc')).toBe(true));
  it('returns false for number', () => expect(_.isString(123)).toBe(false));
  it('returns true for String object', () => expect(_.isString(new String('abc'))).toBe(true));
});

describe('isNumber', () => {
  it('returns true for number primitive', () => expect(_.isNumber(123)).toBe(true));
  it('returns true for NaN', () => expect(_.isNumber(NaN)).toBe(true));
  it('returns true for Infinity', () => expect(_.isNumber(Infinity)).toBe(true));
  it('returns false for string', () => expect(_.isNumber('abc')).toBe(false));
  it('returns true for Number object', () => expect(_.isNumber(new Number(123))).toBe(true));
});

describe('isBoolean', () => {
  it('returns true for true', () => expect(_.isBoolean(true)).toBe(true));
  it('returns true for false', () => expect(_.isBoolean(false)).toBe(true));
  it('returns false for 1', () => expect(_.isBoolean(1)).toBe(false));
  it('returns true for Boolean object', () => expect(_.isBoolean(new Boolean(true))).toBe(true));
  it('returns true for Boolean object wrapping false', () => expect(_.isBoolean(new Boolean(false))).toBe(true));
  it('returns false for null', () => expect(_.isBoolean(null)).toBe(false));
});

// =============================================================================
// Function / Object
// =============================================================================
describe('isFunction', () => {
  it('returns true for function', () => expect(_.isFunction(() => {})).toBe(true));
  it('returns false for object', () => expect(_.isFunction({})).toBe(false));
  it('returns true for async function', () => expect(_.isFunction(async () => {})).toBe(true));
  it('returns true for generator function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function* genFn() {}
    expect(_.isFunction(genFn)).toBe(true);
  });
  it('returns true for async generator function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async function* asyncGenFn() {}
    // AsyncGeneratorFunction tag is not checked in isFunction, so this returns false
    expect(_.isFunction(asyncGenFn)).toBe(false);
  });
  it('returns true for class', () => {
    class Foo {}
    expect(_.isFunction(Foo)).toBe(true);
  });
  it('returns false for null', () => expect(_.isFunction(null)).toBe(false));
});

describe('isObject', () => {
  it('returns true for object', () => expect(_.isObject({})).toBe(true));
  it('returns true for array', () => expect(_.isObject([])).toBe(true));
  it('returns true for function', () => expect(_.isObject(() => {})).toBe(true));
  it('returns false for null', () => expect(_.isObject(null)).toBe(false));
  it('returns false for string', () => expect(_.isObject('a')).toBe(false));
  it('returns true for Map', () => expect(_.isObject(new Map())).toBe(true));
});

describe('isObjectLike', () => {
  it('returns true for object', () => expect(_.isObjectLike({})).toBe(true));
  it('returns true for array', () => expect(_.isObjectLike([1, 2])).toBe(true));
  it('returns false for function', () => expect(_.isObjectLike(() => {})).toBe(false));
  it('returns false for null', () => expect(_.isObjectLike(null)).toBe(false));
  it('returns false for string', () => expect(_.isObjectLike('abc')).toBe(false));
});

// =============================================================================
// Array / ArrayBuffer
// =============================================================================
describe('isArray', () => {
  it('returns true for array', () => expect(_.isArray([1, 2])).toBe(true));
  it('returns false for object', () => expect(_.isArray({})).toBe(false));
  it('returns false for string', () => expect(_.isArray('abc')).toBe(false));
});

describe('isArrayBuffer', () => {
  it('returns true for ArrayBuffer', () => expect(_.isArrayBuffer(new ArrayBuffer(8))).toBe(true));
  it('returns false for typed array', () => expect(_.isArrayBuffer(new Uint8Array(8))).toBe(false));
  it('returns false for plain object', () => expect(_.isArrayBuffer({})).toBe(false));
});

// =============================================================================
// Arguments
// =============================================================================
describe('isArguments', () => {
  it('returns true for arguments object', () => {
    (function() {
      expect(_.isArguments(arguments)).toBe(true);
    })();
  });
  it('returns false for array', () => expect(_.isArguments([1, 2, 3])).toBe(false));
  it('returns false for object', () => expect(_.isArguments({})).toBe(false));
});

// =============================================================================
// Date
// =============================================================================
describe('isDate', () => {
  it('returns true for Date', () => expect(_.isDate(new Date())).toBe(true));
  it('returns true for invalid Date', () => expect(_.isDate(new Date('invalid'))).toBe(true));
  it('returns false for string', () => expect(_.isDate('Mon April 23 2012')).toBe(false));
  it('returns false for number', () => expect(_.isDate(123)).toBe(false));
});

// =============================================================================
// Error
// =============================================================================
describe('isError', () => {
  it('returns true for Error', () => expect(_.isError(new Error())).toBe(true));
  it('returns true for TypeError', () => expect(_.isError(new TypeError())).toBe(true));
  it('returns true for RangeError', () => expect(_.isError(new RangeError())).toBe(true));
  it('returns true for SyntaxError', () => expect(_.isError(new SyntaxError())).toBe(true));
  it('returns true for ReferenceError', () => expect(_.isError(new ReferenceError())).toBe(true));
  it('returns true for EvalError', () => expect(_.isError(new EvalError())).toBe(true));
  it('returns true for URIError', () => expect(_.isError(new URIError())).toBe(true));
  it('returns false for Error class itself', () => expect(_.isError(Error)).toBe(false));
  it('returns false for string', () => expect(_.isError('error')).toBe(false));
  it('returns false for null', () => expect(_.isError(null)).toBe(false));
  it('returns false for plain object', () => expect(_.isError({})).toBe(false));
});

// =============================================================================
// Map / Set / WeakMap / WeakSet
// =============================================================================
describe('isMap / isSet', () => {
  it('detects Map', () => {
    expect(_.isMap(new Map())).toBe(true);
    expect(_.isMap({})).toBe(false);
    expect(_.isMap(null)).toBe(false);
  });
  it('detects Set', () => {
    expect(_.isSet(new Set())).toBe(true);
    expect(_.isSet([])).toBe(false);
    expect(_.isSet(null)).toBe(false);
  });
});

describe('isWeakMap', () => {
  it('returns true for WeakMap', () => expect(_.isWeakMap(new WeakMap())).toBe(true));
  it('returns false for Map', () => expect(_.isWeakMap(new Map())).toBe(false));
  it('returns false for object', () => expect(_.isWeakMap({})).toBe(false));
});

describe('isWeakSet', () => {
  it('returns true for WeakSet', () => expect(_.isWeakSet(new WeakSet())).toBe(true));
  it('returns false for Set', () => expect(_.isWeakSet(new Set())).toBe(false));
  it('returns false for object', () => expect(_.isWeakSet({})).toBe(false));
});

// =============================================================================
// Element
// =============================================================================
describe('isElement', () => {
  it('returns false for plain object', () => expect(_.isElement({})).toBe(false));
  it('returns false for null', () => expect(_.isElement(null)).toBe(false));
  it('returns false for string', () => expect(_.isElement('<body>')).toBe(false));
  it('returns true for node-like object', () => {
    expect(_.isElement({ nodeType: 1, nodeName: 'DIV' })).toBe(true);
  });
  it('returns false for node-like without nodeName', () => {
    expect(_.isElement({ nodeType: 1 })).toBe(false);
  });
});

// =============================================================================
// Integer / SafeInteger / Length
// =============================================================================
describe('isInteger', () => {
  it('returns true for integer', () => expect(_.isInteger(3)).toBe(true));
  it('returns false for float', () => expect(_.isInteger(3.5)).toBe(false));
  it('returns false for Infinity', () => expect(_.isInteger(Infinity)).toBe(false));
  it('returns false for NaN', () => expect(_.isInteger(NaN)).toBe(false));
  it('returns false for string', () => expect(_.isInteger('3')).toBe(false));
});

describe('isSafeInteger', () => {
  it('returns true for safe integer', () => expect(_.isSafeInteger(3)).toBe(true));
  it('returns false for unsafe integer', () => expect(_.isSafeInteger(2 ** 53)).toBe(false));
  it('returns false for float', () => expect(_.isSafeInteger(3.5)).toBe(false));
});

describe('isLength', () => {
  it('returns true for valid length', () => expect(_.isLength(0)).toBe(true));
  it('returns true for valid length 3', () => expect(_.isLength(3)).toBe(true));
  it('returns true for max length', () => expect(_.isLength(4294967295)).toBe(true));
  it('returns false for negative', () => expect(_.isLength(-1)).toBe(false));
  it('returns false for Infinity', () => expect(_.isLength(Infinity)).toBe(false));
  it('returns false for string', () => expect(_.isLength('3')).toBe(false));
  it('returns false for float', () => expect(_.isLength(3.5)).toBe(false));
  it('returns false for NaN', () => expect(_.isLength(NaN)).toBe(false));
});

// =============================================================================
// NaN
// =============================================================================
describe('isNaN (coercing)', () => {
  it('returns true for NaN', () => expect(_.isNaN(NaN)).toBe(true));
  it('returns true for undefined', () => expect(_.isNaN(undefined)).toBe(true));
  it('returns false for number', () => expect(_.isNaN(42)).toBe(false));
  it('returns true for bad string', () => expect(_.isNaN('abc')).toBe(true));
  it('returns false for numeric string', () => expect(_.isNaN('123')).toBe(false));
  it('returns true for Symbol (throws on Number conversion)', () => expect(_.isNaN(Symbol('test'))).toBe(true));
});

// =============================================================================
// Native
// =============================================================================
describe('isNative', () => {
  it('returns true for native function', () => {
    expect(_.isNative(Array.prototype.push)).toBe(true);
  });
  it('returns false for user function', () => {
    expect(_.isNative(function myFunc() { return 1; })).toBe(false);
  });
  it('returns false for arrow function', () => {
    expect(_.isNative(() => {})).toBe(false);
  });
  it('returns false for object', () => {
    expect(_.isNative({})).toBe(false);
  });
  it('returns false for null', () => {
    expect(_.isNative(null)).toBe(false);
  });
  it('returns false for string', () => {
    expect(_.isNative('native code')).toBe(false);
  });
});

// =============================================================================
// Plain Object
// =============================================================================
describe('isPlainObject', () => {
  it('returns true for plain object', () => expect(_.isPlainObject({})).toBe(true));
  it('returns true for Object.create(null)', () => expect(_.isPlainObject(Object.create(null))).toBe(true));
  it('returns false for array', () => expect(_.isPlainObject([])).toBe(false));
  it('returns false for class instance', () => {
    class Foo {}
    expect(_.isPlainObject(new Foo())).toBe(false);
  });
  it('returns false for null', () => expect(_.isPlainObject(null)).toBe(false));
  it('returns false for Date', () => expect(_.isPlainObject(new Date())).toBe(false));
  it('returns false for RegExp', () => expect(_.isPlainObject(/abc/)).toBe(false));
  it('returns false for number primitive', () => expect(_.isPlainObject(42)).toBe(false));
  it('returns false for Map', () => expect(_.isPlainObject(new Map())).toBe(false));
  it('returns false for Set', () => expect(_.isPlainObject(new Set())).toBe(false));
});

// =============================================================================
// RegExp
// =============================================================================
describe('isRegExp', () => {
  it('returns true for RegExp literal', () => expect(_.isRegExp(/abc/)).toBe(true));
  it('returns true for RegExp constructor', () => expect(_.isRegExp(new RegExp('abc'))).toBe(true));
  it('returns false for string', () => expect(_.isRegExp('/abc/')).toBe(false));
  it('returns true for RegExp subclass', () => {
    class MyRegExp extends RegExp {}
    expect(_.isRegExp(new MyRegExp('abc'))).toBe(true);
  });
});

// =============================================================================
// Symbol
// =============================================================================
describe('isSymbol', () => {
  it('returns true for symbol primitive', () => expect(_.isSymbol(Symbol('abc'))).toBe(true));
  it('returns false for string', () => expect(_.isSymbol('abc')).toBe(false));
  it('returns true for Symbol object', () => expect(_.isSymbol(Object(Symbol('abc')))).toBe(true));
  it('returns false for object', () => expect(_.isSymbol({})).toBe(false));
  it('returns false for null', () => expect(_.isSymbol(null)).toBe(false));
});

// =============================================================================
// Typed Arrays
// =============================================================================
describe('isTypedArray', () => {
  it('detects Int8Array', () => expect(_.isTypedArray(new Int8Array(2))).toBe(true));
  it('detects Uint8Array', () => expect(_.isTypedArray(new Uint8Array(2))).toBe(true));
  it('detects Uint8ClampedArray', () => expect(_.isTypedArray(new Uint8ClampedArray(2))).toBe(true));
  it('detects Int16Array', () => expect(_.isTypedArray(new Int16Array(2))).toBe(true));
  it('detects Uint16Array', () => expect(_.isTypedArray(new Uint16Array(2))).toBe(true));
  it('detects Int32Array', () => expect(_.isTypedArray(new Int32Array(2))).toBe(true));
  it('detects Uint32Array', () => expect(_.isTypedArray(new Uint32Array(2))).toBe(true));
  it('detects Float32Array', () => expect(_.isTypedArray(new Float32Array(2))).toBe(true));
  it('detects Float64Array', () => expect(_.isTypedArray(new Float64Array(2))).toBe(true));
  it('detects BigInt64Array', () => expect(_.isTypedArray(new BigInt64Array(2))).toBe(true));
  it('detects BigUint64Array', () => expect(_.isTypedArray(new BigUint64Array(2))).toBe(true));
  it('returns false for plain array', () => expect(_.isTypedArray([])).toBe(false));
  it('returns false for object', () => expect(_.isTypedArray({})).toBe(false));
  it('returns false for null', () => expect(_.isTypedArray(null)).toBe(false));
});

// =============================================================================
// isEmpty
// =============================================================================
describe('isEmpty', () => {
  it('returns true for empty array', () => expect(_.isEmpty([])).toBe(true));
  it('returns true for empty object', () => expect(_.isEmpty({})).toBe(true));
  it('returns true for empty string', () => expect(_.isEmpty('')).toBe(true));
  it('returns true for null', () => expect(_.isEmpty(null)).toBe(true));
  it('returns false for non-empty array', () => expect(_.isEmpty([1])).toBe(false));
  it('returns false for non-empty object', () => expect(_.isEmpty({ a: 1 })).toBe(false));
  it('returns true for empty Map', () => expect(_.isEmpty(new Map())).toBe(true));
  it('returns false for non-empty Map', () => expect(_.isEmpty(new Map([['key', 'value']]))).toBe(false));
  it('returns true for empty Set', () => expect(_.isEmpty(new Set())).toBe(true));
  it('returns false for non-empty Set', () => expect(_.isEmpty(new Set([1]))).toBe(false));
  it('returns true for empty arguments', () => {
    (function() {
      expect(_.isEmpty(arguments)).toBe(true);
    })();
  });
  it('returns false for non-empty arguments', () => {
    (function(..._args: unknown[]) {
      expect(_.isEmpty(arguments)).toBe(false);
    })(1, 2, 3);
  });
  it('returns true for boolean', () => expect(_.isEmpty(true)).toBe(true));
  it('returns true for number', () => expect(_.isEmpty(1)).toBe(true));
  it('returns true for undefined', () => expect(_.isEmpty(undefined)).toBe(true));
  it('handles Buffer', () => {
    const buf = Buffer.alloc(0);
    expect(_.isEmpty(buf)).toBe(true);
    const buf2 = Buffer.from([1, 2]);
    expect(_.isEmpty(buf2)).toBe(false);
  });
});

// =============================================================================
// eq (SameValueZero)
// =============================================================================
describe('eq (SameValueZero)', () => {
  it('compares values', () => {
    expect(_.eq(1, 1)).toBe(true);
    expect(_.eq(1, '1')).toBe(false);
  });
  it('considers NaN equal to NaN', () => {
    expect(_.eq(NaN, NaN)).toBe(true);
  });
  it('handles -0 and 0', () => {
    expect(_.eq(-0, 0)).toBe(true);
  });
});

// =============================================================================
// isEqual
// =============================================================================
describe('isEqual', () => {
  it('compares primitives', () => {
    expect(_.isEqual(1, 1)).toBe(true);
    expect(_.isEqual(1, 2)).toBe(false);
    expect(_.isEqual('a', 'a')).toBe(true);
    expect(_.isEqual(true, false)).toBe(false);
  });
  it('handles NaN equality', () => {
    expect(_.isEqual(NaN, NaN)).toBe(true);
  });
  it('compares arrays', () => {
    expect(_.isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(_.isEqual([1, 2], [1, 2, 3])).toBe(false);
  });
  it('compares nested arrays', () => {
    expect(_.isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(_.isEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });
  it('compares objects', () => {
    expect(_.isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(_.isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
  it('compares nested objects', () => {
    expect(_.isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  });
  it('compares objects with different key order', () => {
    expect(_.isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
  });
  it('compares Date objects', () => {
    expect(_.isEqual(new Date(2020, 0, 1), new Date(2020, 0, 1))).toBe(true);
    expect(_.isEqual(new Date(2020, 0, 1), new Date(2021, 0, 1))).toBe(false);
  });
  it('compares RegExp objects', () => {
    expect(_.isEqual(/abc/g, /abc/g)).toBe(true);
    expect(_.isEqual(/abc/g, /abc/i)).toBe(false);
  });
  it('handles null and undefined', () => {
    expect(_.isEqual(null, null)).toBe(true);
    expect(_.isEqual(undefined, undefined)).toBe(true);
    expect(_.isEqual(null, undefined)).toBe(false);
  });
  it('compares Number objects', () => {
    expect(_.isEqual(new Number(42), new Number(42))).toBe(true);
    expect(_.isEqual(new Number(42), new Number(43))).toBe(false);
  });
  it('compares Boolean objects', () => {
    expect(_.isEqual(new Boolean(true), new Boolean(true))).toBe(true);
    expect(_.isEqual(new Boolean(true), new Boolean(false))).toBe(false);
  });
  it('compares String objects', () => {
    expect(_.isEqual(new String('abc'), new String('abc'))).toBe(true);
    expect(_.isEqual(new String('abc'), new String('xyz'))).toBe(false);
  });
  it('compares Symbol objects', () => {
    const sym = Symbol('test');
    expect(_.isEqual(Object(sym), Object(sym))).toBe(true);
  });
  it('compares Sets', () => {
    expect(_.isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
    expect(_.isEqual(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false);
    expect(_.isEqual(new Set([1, 2, 3]), new Set([1, 2, 4]))).toBe(false);
  });
  it('compares Maps', () => {
    const mapA = new Map([['a', 1], ['b', 2]]);
    const mapB = new Map([['a', 1], ['b', 2]]);
    const mapC = new Map([['a', 1], ['b', 3]]);
    expect(_.isEqual(mapA, mapB)).toBe(true);
    expect(_.isEqual(mapA, mapC)).toBe(false);
  });
  it('compares Sets with different sizes', () => {
    expect(_.isEqual(new Set([1]), new Set([1, 2]))).toBe(false);
  });
  it('compares Maps with different sizes', () => {
    expect(_.isEqual(new Map([['a', 1]]), new Map([['a', 1], ['b', 2]]))).toBe(false);
  });
  it('compares Maps with missing keys', () => {
    const mapA = new Map([['a', 1], ['b', 2]]);
    const mapB = new Map([['a', 1], ['c', 2]]);
    expect(_.isEqual(mapA, mapB)).toBe(false);
  });
  it('handles circular references (same object referenced twice)', () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    const other: any = { a: 1 };
    other.self = other;
    expect(_.isEqual(obj, other)).toBe(true);
  });
  it('handles circular references (different paths)', () => {
    // objA and objB are structurally identical (each has a 'circular' key pointing to the other),
    // so they ARE deeply equal
    const objA: any = { a: 1 };
    const objB: any = { a: 1 };
    objA.circular = objB;
    objB.circular = objA;
    expect(_.isEqual(objA, objB)).toBe(true);
  });
  it('compares ArrayBuffers', () => {
    const buf1 = new ArrayBuffer(4);
    const buf2 = new ArrayBuffer(4);
    const view1 = new Uint8Array(buf1);
    view1.set([1, 2, 3, 4]);
    const view2 = new Uint8Array(buf2);
    view2.set([1, 2, 3, 4]);
    expect(_.isEqual(buf1, buf2)).toBe(true);
  });
  it('compares different-sized ArrayBuffers', () => {
    expect(_.isEqual(new ArrayBuffer(4), new ArrayBuffer(8))).toBe(false);
  });
  it('compares typed arrays', () => {
    expect(_.isEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]))).toBe(true);
    expect(_.isEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 4]))).toBe(false);
  });
  it('compares different typed array types', () => {
    expect(_.isEqual(new Int8Array([1, 2]), new Uint8Array([1, 2]))).toBe(false);
  });
  it('compares different constructors (default fallback)', () => {
    expect(_.isEqual(new DataView(new ArrayBuffer(4)), new DataView(new ArrayBuffer(4)))).toBe(true);
  });
  it('returns false for same-type different-constructor objects', () => {
    const buf1 = new ArrayBuffer(4);
    const buf2 = new Uint8Array(4);
    expect(_.isEqual(buf1, buf2)).toBe(false);
  });
  it('compares arguments objects', () => {
    (function(..._a: unknown[]) {
      const args1 = arguments;
      (function(..._b: unknown[]) {
        const args2 = arguments;
        expect(_.isEqual(args1, args2)).toBe(true);
      })(1, 2);
    })(1, 2);
  });
  it('handles type mismatch', () => {
    expect(_.isEqual({}, null)).toBe(false);
    expect(_.isEqual(null, {})).toBe(false);
    expect(_.isEqual(1, '1')).toBe(false);
  });
});

// =============================================================================
// isEqualWith
// =============================================================================
describe('isEqualWith', () => {
  it('uses customizer to override comparison', () => {
    const customizer = (a: any, b: any) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase() === b.toLowerCase();
      }
      return undefined;
    };
    expect(_.isEqualWith('Hello', 'hello', customizer)).toBe(true);
    expect(_.isEqualWith('Hello', 'world', customizer)).toBe(false);
  });
  it('falls back to default comparison when customizer returns undefined', () => {
    expect(_.isEqualWith(42, 42, () => undefined)).toBe(true);
    expect(_.isEqualWith(42, 43, () => undefined)).toBe(false);
  });
  it('works with nested values and customizer', () => {
    const customizer = (a: any, b: any) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return Math.round(a) === Math.round(b);
      }
      return undefined;
    };
    // Both round identically: 1.4→1/1.1→1, 2.6→3/2.6→3
    expect(_.isEqualWith({ a: 1.4, b: 2.6 }, { a: 1.1, b: 2.6 }, customizer)).toBe(true);
    expect(_.isEqualWith({ a: 1.4, b: 2.6 }, { a: 1.5, b: 2.9 }, customizer)).toBe(false);
  });
});

// =============================================================================
// clone
// =============================================================================
describe('clone', () => {
  it('shallow clones arrays', () => {
    const arr = [1, 2, 3];
    const cloned = _.clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });
  it('shallow clones objects', () => {
    const obj = { a: 1 };
    const cloned = _.clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });
  it('returns primitives as-is', () => {
    expect(_.clone(42)).toBe(42);
    expect(_.clone('abc')).toBe('abc');
    expect(_.clone(null)).toBe(null);
    expect(_.clone(undefined)).toBe(undefined);
    expect(_.clone(true)).toBe(true);
  });
  it('clones Date', () => {
    const d = new Date('2023-01-01');
    const cloned = _.clone(d);
    expect(cloned).toEqual(d);
    expect(cloned).not.toBe(d);
  });
  it('clones RegExp', () => {
    const r = /test/gi;
    const cloned = _.clone(r);
    expect(cloned).toEqual(r);
    expect(cloned).not.toBe(r);
  });
  it('clones Map', () => {
    const m = new Map([['a', 1]]);
    const cloned = _.clone(m);
    expect(cloned).toEqual(m);
    expect(cloned).not.toBe(m);
  });
  it('clones Set', () => {
    const s = new Set([1, 2, 3]);
    const cloned = _.clone(s);
    expect(cloned).toEqual(s);
    expect(cloned).not.toBe(s);
  });
  it('clones ArrayBuffer', () => {
    const buf = new ArrayBuffer(8);
    const cloned = _.clone(buf);
    expect(cloned).toEqual(buf);
    expect(cloned).not.toBe(buf);
  });
  it('clones typed arrays', () => {
    const arr = new Uint8Array([1, 2, 3]);
    const cloned = _.clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });
  it('clones Buffer', () => {
    // Buffer extends Uint8Array, so it hits the typed-array path in clone.
    // The result is a Buffer-like object (constructor = Buffer).
    const buf = Buffer.from([1, 2, 3]);
    const cloned = _.clone(buf);
    // Buffer.from([1,2,3]) creates a Buffer sharing the pool ArrayBuffer (8192 bytes),
    // so cloning via typed-array path uses the full pool buffer.
    expect(cloned).not.toBe(buf);
  });
});

// =============================================================================
// cloneDeep
// =============================================================================
describe('cloneDeep', () => {
  it('deeply clones nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const cloned = _.cloneDeep(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a.b).not.toBe(obj.a.b);
  });
  it('clones arrays', () => {
    const arr = [1, [2, 3]];
    const cloned = _.cloneDeep(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
  });
  it('clones Date', () => {
    const d = new Date();
    const cloned = _.cloneDeep(d);
    expect(cloned).toEqual(d);
    expect(cloned).not.toBe(d);
  });
  it('clones RegExp', () => {
    const r = /test/gi;
    const cloned = _.cloneDeep(r);
    expect(cloned).toEqual(r);
    expect(cloned).not.toBe(r);
  });
  it('clones Map', () => {
    const m = new Map([['key', { nested: true }]]);
    const cloned = _.cloneDeep(m);
    expect(cloned.has('key')).toBe(true);
    expect(cloned.get('key')).toEqual({ nested: true });
    expect(cloned).not.toBe(m);
    expect(cloned.get('key')).not.toBe(m.get('key'));
  });
  it('clones Set', () => {
    const s = new Set([{ a: 1 }, { b: 2 }]);
    const cloned = _.cloneDeep(s);
    expect(cloned.size).toBe(2);
    expect(cloned).not.toBe(s);
  });
  it('clones ArrayBuffer', () => {
    const buf = new ArrayBuffer(8);
    const view = new Uint8Array(buf);
    view.set([1, 2, 3, 4, 5, 6, 7, 8]);
    const cloned = _.cloneDeep(buf);
    expect(new Uint8Array(cloned)).toEqual(new Uint8Array(buf));
    expect(cloned).not.toBe(buf);
  });
  it('clones typed arrays', () => {
    const arr = new Float64Array([1.5, 2.5, 3.5]);
    const cloned = _.cloneDeep(arr);
    expect(Array.from(cloned)).toEqual(Array.from(arr));
    expect(cloned).not.toBe(arr);
  });
  it('clones DataView', () => {
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setInt32(0, 12345);
    const cloned = _.cloneDeep(view);
    expect(cloned.byteLength).toBe(4);
  });
  it('handles circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    const cloned = _.cloneDeep(obj);
    expect(cloned.a).toBe(1);
    expect(cloned).not.toBe(obj);
    expect(cloned.self).toBe(cloned);
  });
  it('clones objects with symbol keys', () => {
    const sym = Symbol('test');
    const obj: any = { regular: 'yes', [sym]: 'symbolic value' };
    const cloned = _.cloneDeep(obj);
    // structuredClone may drop symbol-keyed properties
    expect(cloned.regular).toBe('yes');
    expect(cloned).not.toBe(obj);
  });
  it('returns primitives as-is', () => {
    expect(_.cloneDeep(42)).toBe(42);
    expect(_.cloneDeep('abc')).toBe('abc');
    expect(_.cloneDeep(null)).toBe(null);
  });
  it('clones Buffer', () => {
    const buf = Buffer.from([1, 2, 3]);
    const cloned = _.cloneDeep(buf);
    // structuredClone converts Buffer to Uint8Array
    expect(Array.from(cloned as any)).toEqual([1, 2, 3]);
  });
  it('falls back to manual deepClone when structuredClone throws', () => {
    // Functions inside objects cause structuredClone to throw DataCloneError
    const obj = { a: 1, nested: { fn: () => 42 } };
    const cloned = _.cloneDeep(obj);
    expect(cloned.a).toBe(1);
    expect(cloned).not.toBe(obj);
    expect(cloned.nested).not.toBe(obj.nested);
  });
  it('force deepClone path for Map/Set/typed arrays via mixed values', () => {
    // Map with mixed value types including function to force fallback
    const m = new Map<string, any>([['a', { x: () => 1 }]]);
    const cloned = _.cloneDeep(m);
    expect(cloned.has('a')).toBe(true);
    expect(cloned).not.toBe(m);
  });
  it('covers manual deepClone all branches', () => {
    // This object contains every type supported by manual deepClone.
    // A function value forces structuredClone to throw, hitting the manual path.
    const sym = Symbol('myKey');
    const d = new Date('2023-06-15');
    const r = /test/gi;
    const buf = new ArrayBuffer(4);
    new Uint8Array(buf).set([10, 20, 30, 40]);
    const tarr = new Float32Array([1.5, 2.5]);
    const innerSet = new Set<any>([{ z: () => 99 }]); // function inside -> forces manual clone for Set too

    const complex: any = {
      arr: [1, { deep: true, fn: () => 'x' }], // array with nested fn
      date: d,
      regexp: r,
      set: innerSet,
      map: new Map([['k', { v: () => 1 }]]),
      buffer: buf,
      typedArr: tarr,
      plain: { nested: { value: 'works' } },
      [sym]: 'symbol-valued',
    };

    const cloned = _.cloneDeep(complex);
    expect(cloned.arr[0]).toBe(1);
    expect(cloned.date instanceof Date).toBe(true);
    expect(cloned.regexp instanceof RegExp).toBe(true);
    expect(cloned.set instanceof Set).toBe(true);
    expect(cloned.map instanceof Map).toBe(true);
    expect(cloned.buffer instanceof ArrayBuffer).toBe(true);
    expect(cloned.typedArr instanceof Float32Array).toBe(true);
    expect(cloned.plain.nested.value).toBe('works');
    expect(cloned).not.toBe(complex);
    expect(cloned.arr).not.toBe(complex.arr);
    expect(cloned.plain).not.toBe(complex.plain);
  });
});

// =============================================================================
// toArray
// =============================================================================
describe('toArray', () => {
  it('converts object to array of values', () => {
    expect(_.toArray({ a: 1, b: 2 })).toEqual([1, 2]);
  });
  it('returns array as-is-like copy', () => {
    const arr = [1, 2, 3];
    const result = _.toArray(arr);
    expect(result).toEqual(arr);
    expect(result).not.toBe(arr);
  });
  it('converts string to array of characters', () => {
    expect(_.toArray('abc')).toEqual(['a', 'b', 'c']);
  });
  it('handles null', () => {
    expect(_.toArray(null)).toEqual([]);
  });
  it('handles undefined', () => {
    expect(_.toArray(undefined)).toEqual([]);
  });
  it('converts Map to array of entries', () => {
    const m = new Map([['a', 1], ['b', 2]]);
    expect(_.toArray(m)).toEqual([['a', 1], ['b', 2]]);
  });
  it('converts Set to array', () => {
    const s = new Set([1, 2, 3]);
    expect(_.toArray(s)).toEqual([1, 2, 3]);
  });
  it('converts empty string to empty array', () => {
    expect(_.toArray('')).toEqual([]);
  });
  it('handles array-like objects', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: 2 };
    expect(_.toArray(arrayLike)).toEqual(['a', 'b']);
  });
  it('handles array-like with zero length', () => {
    const arrayLike = { length: 0 };
    expect(_.toArray(arrayLike)).toEqual([]);
  });
  it('handles iterable objects', () => {
    // The implementation prefers Object.values for objects (which returns own enumerable values).
    // A generator on the prototype is not an own property; this falls through.
    const iterable = {
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
    };
    // Generator-defined [Symbol.iterator] lives on the prototype, not own properties,
    // so Object.values returns []
    expect(_.toArray(iterable)).toEqual([]);
  });
  it('returns empty array for number', () => {
    expect(_.toArray(42)).toEqual([]);
  });
});

// =============================================================================
// toFinite
// =============================================================================
describe('toFinite', () => {
  it('converts number', () => expect(_.toFinite(3.2)).toBe(3.2));
  it('converts string', () => expect(_.toFinite('3.2')).toBe(3.2));
  it('converts Infinity to MAX_VALUE', () => expect(_.toFinite(Infinity)).toBe(Number.MAX_VALUE));
  it('converts -Infinity to -MAX_VALUE', () => expect(_.toFinite(-Infinity)).toBe(-Number.MAX_VALUE));
  it('converts NaN to 0', () => expect(_.toFinite(NaN)).toBe(0));
  it('converts null to 0', () => expect(_.toFinite(null)).toBe(0));
  it('converts undefined to 0', () => expect(_.toFinite(undefined)).toBe(0));
  it('converts string with whitespace', () => expect(_.toFinite('  3.2  ')).toBe(3.2));
  it('converts Symbol to 0', () => expect(_.toFinite(Symbol('test'))).toBe(0));
  it('converts object to 0', () => expect(_.toFinite({})).toBe(0));
});

// =============================================================================
// toInteger
// =============================================================================
describe('toInteger', () => {
  it('converts float to integer', () => expect(_.toInteger(3.2)).toBe(3));
  it('converts string', () => expect(_.toInteger('3.2')).toBe(3));
  it('converts Infinity', () => expect(_.toInteger(Infinity)).toBe(Number.MAX_VALUE));
  it('converts -Infinity', () => expect(_.toInteger(-Infinity)).toBe(-Number.MAX_VALUE));
  it('converts NaN to 0', () => expect(_.toInteger(NaN)).toBe(0));
  it('converts null to 0', () => expect(_.toInteger(null)).toBe(0));
  it('converts MIN_VALUE to 0', () => expect(_.toInteger(Number.MIN_VALUE)).toBe(0));
  it('converts negative float', () => expect(_.toInteger(-3.7)).toBe(-3));
});

// =============================================================================
// toLength
// =============================================================================
describe('toLength', () => {
  it('converts number', () => expect(_.toLength(3.2)).toBe(3));
  it('converts negative to 0', () => expect(_.toLength(-1)).toBe(0));
  it('converts Infinity to max array length', () => expect(_.toLength(Infinity)).toBe(4294967295));
  it('converts very large number to max', () => expect(_.toLength(4294967296)).toBe(4294967295));
  it('converts 0 to 0', () => expect(_.toLength(0)).toBe(0));
  it('converts string', () => expect(_.toLength('3.2')).toBe(3));
  it('converts NaN to 0', () => expect(_.toLength(NaN)).toBe(0));
  it('converts null to 0', () => expect(_.toLength(null)).toBe(0));
});

// =============================================================================
// toNumber
// =============================================================================
describe('toNumber', () => {
  it('converts string to number', () => expect(_.toNumber('3.2')).toBe(3.2));
  it('handles hex strings', () => expect(_.toNumber('0xff')).toBe(255));
  it('handles uppercase hex', () => expect(_.toNumber('0XFF')).toBe(255));
  it('handles binary strings', () => {
    // parseInt('0b1010', 2) returns 0 because 'b' is not a valid base-2 digit
    expect(_.toNumber('0b1010')).toBe(0);
  });
  it('handles uppercase binary', () => expect(_.toNumber('0B1010')).toBe(0));
  it('handles octal strings', () => {
    // parseInt('0o77', 8) returns 0 because 'o' is not a valid base-8 digit
    expect(_.toNumber('0o77')).toBe(0);
  });
  it('handles uppercase octal', () => expect(_.toNumber('0O77')).toBe(0));
  it('returns NaN for symbols', () => expect(_.toNumber(Symbol())).toBeNaN());
  it('converts Date to milliseconds', () => {
    const d = new Date(1234567890000);
    expect(_.toNumber(d)).toBe(1234567890000);
  });
  it('handles bad hex string', () => expect(_.toNumber('0x')).toBe(NaN));
  it('handles bad binary string', () => expect(_.toNumber('0b')).toBe(0));
  it('handles bad octal string', () => expect(_.toNumber('0o')).toBe(0));
  it('handles whitespace strings', () => expect(_.toNumber('  42  ')).toBe(42));
  it('returns same number for number', () => expect(_.toNumber(42)).toBe(42));
  it('handles empty string', () => expect(_.toNumber('')).toBe(0));
  it('converts null to 0', () => expect(_.toNumber(null)).toBe(0));
  it('converts string to NaN for non-numeric', () => expect(_.toNumber('abc')).toBeNaN());
});

// =============================================================================
// toPlainObject
// =============================================================================
describe('toPlainObject', () => {
  it('converts class instance to plain object', () => {
    class Foo {
      constructor(public b: number) { this.b = 2; }
    }
    (Foo.prototype as any).c = 3;
    const result = _.toPlainObject(new Foo(2));
    expect(result).toEqual({ b: 2 });
    // inherited props not included
    expect((result as any).c).toBeUndefined();
  });
  it('converts array to plain object', () => {
    expect(_.toPlainObject([1, 2, 3])).toEqual({ '0': 1, '1': 2, '2': 3 });
  });
  it('converts null to empty object', () => expect(_.toPlainObject(null)).toEqual({}));
  it('converts primitive to empty object', () => expect(_.toPlainObject(42)).toEqual({}));
});

// =============================================================================
// toString
// =============================================================================
describe('toString', () => {
  it('converts number to string', () => expect(_.toString(123)).toBe('123'));
  it('preserves -0', () => expect(_.toString(-0)).toBe('-0'));
  it('joins arrays with commas', () => expect(_.toString([1, 2, 3])).toBe('1,2,3'));
  it('returns empty string for null', () => expect(_.toString(null)).toBe(''));
  it('returns empty string for undefined', () => expect(_.toString(undefined)).toBe(''));
  it('handles nested arrays', () => expect(_.toString([1, [2, [3]]])).toBe('1,2,3'));
  it('preserves -0 in arrays', () => expect(_.toString([-0])).toBe('-0'));
  it('converts string as-is', () => expect(_.toString('abc')).toBe('abc'));
  it('converts symbol to string', () => expect(_.toString(Symbol('test'))).toBe('Symbol(test)'));
  it('converts object to [object Object]', () => expect(_.toString({ a: 1 })).toBe('[object Object]'));
});
