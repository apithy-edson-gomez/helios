import * as _ from '../src';

// Helper: cast a function to avoid strict contravariance issues with AnyFunction
const fn = (f: any) => f;

describe('once', () => {
  it('only calls function once', () => {
    let count = 0;
    const f = _.once(() => ++count);
    expect(f()).toBe(1);
    expect(f()).toBe(1);
    expect(f()).toBe(1);
    expect(count).toBe(1);
  });
});

describe('after', () => {
  it('only calls after n calls', () => {
    let count = 0;
    const f = _.after(3, () => ++count);
    f(); f();
    expect(count).toBe(0);
    f();
    expect(count).toBe(1);
  });
});

describe('before', () => {
  it('only calls up to n times', () => {
    let count = 0;
    const f = _.before(3, () => ++count);
    f(); f();
    expect(count).toBe(2);
    f();
    expect(count).toBe(2);
  });
});

describe('negate', () => {
  it('negates predicate', () => {
    const isEven = fn((n: number) => n % 2 === 0);
    const isOdd = _.negate(isEven);
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
  });
});

describe('memoize', () => {
  it('caches results', () => {
    let callCount = 0;
    const f = _.memoize(fn((n: number) => {
      callCount++;
      return n * 2;
    }));
    expect(f(2)).toBe(4);
    expect(f(2)).toBe(4);
    expect(callCount).toBe(1);
    expect(f(3)).toBe(6);
    expect(callCount).toBe(2);
  });
  it('has cache property', () => {
    const f = _.memoize(fn((n: number) => n * 2));
    f(5);
    expect((f.cache as Map<any, any>) instanceof Map).toBe(true);
    expect((f.cache as Map<any, any>).get('5')).toBe(10);
  });
});

describe('defer', () => {
  it('defers function call', (done) => {
    let called = false;
    _.defer(() => {
      called = true;
      expect(called).toBe(true);
      done();
    });
    expect(called).toBe(false);
  });
});

describe('delay', () => {
  it('delays function call', (done) => {
    const start = Date.now();
    _.delay(() => {
      expect(Date.now() - start).toBeGreaterThanOrEqual(9);
      done();
    }, 10);
  });
});

describe('debounce', () => {
  it('delays function call', (done) => {
    let callCount = 0;
    const f = _.debounce(() => { callCount++; }, 30);

    f(); f(); f();

    expect(callCount).toBe(0);

    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 60);
  });

  it('supports leading edge', (done) => {
    let callCount = 0;
    const f = _.debounce(() => { callCount++; }, 30, { leading: true });

    f();

    expect(callCount).toBe(1);

    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 60);
  });

  it('has cancel method', (done) => {
    let callCount = 0;
    const f = _.debounce(() => callCount++, 30);
    f();
    f.cancel();
    setTimeout(() => {
      expect(callCount).toBe(0);
      done();
    }, 60);
  });

  it('flush invokes pending', (done) => {
    let callCount = 0;
    const f = _.debounce(() => { callCount++; }, 50);
    f();
    setTimeout(() => {
      f.flush();
      expect(callCount).toBe(1);
      done();
    }, 10);
  });

  it('flush on idle returns undefined', () => {
    const f = _.debounce(() => 'result', 50);
    expect(f.flush()).toBeUndefined();
  });

  it('supports maxWait', (done) => {
    let callCount = 0;
    const f = _.debounce(() => { callCount++; }, 50, { maxWait: 60 });
    f();
    const interval = setInterval(() => f(), 10);
    setTimeout(() => {
      clearInterval(interval);
      expect(callCount).toBeGreaterThanOrEqual(1);
      done();
    }, 150);
  });

  it('cancel on idle is safe', () => {
    const f = _.debounce(() => {}, 30);
    f.cancel();
    expect(true).toBe(true);
  });
});

describe('overArgs', () => {
  it('transforms arguments', () => {
    const fn = _.overArgs((...args: any[]) => args.join(','), [
      (n: any) => n * 2,
      (s: any) => s.toUpperCase(),
    ]);
    expect(fn(3, 'hello')).toBe('6,HELLO');
  });
  it('passes through args without transform', () => {
    const fn = _.overArgs((...args: any[]) => args, [
      undefined as any,
    ]);
    expect(fn(1, 2)).toEqual([1, 2]);
  });
});

describe('throttle', () => {
  it('calls immediately and throttles', (done) => {
    let callCount = 0;
    const f = _.throttle(fn((v: number) => { callCount += v; }), 50);

    f(1);
    f(2);

    expect(callCount).toBe(1);

    setTimeout(() => {
      expect(callCount).toBe(3);
      done();
    }, 100);
  });

  it('cancel works', () => {
    let callCount = 0;
    const f = _.throttle(() => { callCount++; }, 30);
    f();
    f.cancel();
    expect(callCount).toBe(1);
  });

  it('flush invokes pending', (done) => {
    let callCount = 0;
    const f = _.throttle(() => { callCount++; }, 50);
    f();
    setTimeout(() => {
      f.flush();
      expect(callCount).toBeGreaterThanOrEqual(1);
      done();
    }, 10);
  });

  it('flush on idle returns undefined', () => {
    const f = _.throttle(() => {}, 30);
    expect(f.flush()).toBeUndefined();
  });
});

describe('curry', () => {
  it('curries function', () => {
    const f = _.curry(fn((a: number, b: number, c: number) => [a, b, c]));
    const curried = (f as any)(1)(2)(3);
    expect(curried).toEqual([1, 2, 3]);
  });
  it('supports partial application', () => {
    const f = _.curry(fn((a: number, b: number, c: number) => [a, b, c]));
    expect((f as any)(1, 2)(3)).toEqual([1, 2, 3]);
  });
});

describe('partial', () => {
  it('partially applies arguments', () => {
    const f = _.partial(fn((a: number, b: number, c: number) => [a, b, c]), 1, 2);
    expect(f(3)).toEqual([1, 2, 3]);
  });
});

describe('partialRight', () => {
  it('partially applies right arguments', () => {
    const f = _.partialRight(fn((a: number, b: number, c: number) => [a, b, c]), 2, 3);
    expect(f(1)).toEqual([1, 2, 3]);
  });
});

describe('bind', () => {
  it('binds this and arguments', () => {
    const f = _.bind(function(this: any, ...args: any[]) {
      return [this, ...args];
    } as any, { x: 1 }, 'a');
    expect(f('b')).toEqual([{ x: 1 }, 'a', 'b']);
  });
});

describe('flip', () => {
  it('reverses arguments', () => {
    const f = _.flip((...args: any[]) => args.join(''));
    expect(f('a', 'b', 'c')).toBe('cba');
  });
});

describe('unary', () => {
  it('accepts only one argument', () => {
    const f = _.unary((...args: any[]) => args.length);
    expect(f(1, 2, 3)).toBe(1);
  });
});

describe('wrap', () => {
  it('passes value to wrapper', () => {
    const wrapped = _.wrap('hello', fn((v: string, ...args: any[]) => [v, ...args]));
    expect(wrapped('world')).toEqual(['hello', 'world']);
  });
});

describe('rest', () => {
  it('passes trailing args as array', () => {
    const f = _.rest(fn((a: any, rest: any[]) => [a, rest]));
    expect(f(1, 2, 3, 4)).toEqual([1, [2, 3, 4]]);
  });
});

describe('spread', () => {
  it('spreads array argument', () => {
    const f = _.spread(fn((a: number, b: number) => [a, b]));
    expect(f([1, 2])).toEqual([1, 2]);
  });
});
