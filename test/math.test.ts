import * as _ from '../src';

describe('add', () => {
  it('adds two numbers', () => expect(_.add(6, 4)).toBe(10));
});
describe('subtract', () => {
  it('subtracts two numbers', () => expect(_.subtract(10, 4)).toBe(6));
});
describe('multiply', () => {
  it('multiplies two numbers', () => expect(_.multiply(6, 4)).toBe(24));
});
describe('divide', () => {
  it('divides two numbers', () => expect(_.divide(10, 4)).toBe(2.5));
});
describe('ceil', () => {
  it('rounds up', () => expect(_.ceil(4.006)).toBe(5));
  it('respects precision', () => expect(_.ceil(6.004, 2)).toBe(6.01));
});
describe('floor', () => {
  it('rounds down', () => expect(_.floor(4.006)).toBe(4));
  it('respects precision', () => expect(_.floor(0.046, 2)).toBe(0.04));
});
describe('round', () => {
  it('rounds to precision', () => expect(_.round(4.006, 2)).toBe(4.01));
});
describe('max', () => {
  it('returns maximum value', () => expect(_.max([4, 2, 8, 6])).toBe(8));
  it('returns undefined for empty', () => expect(_.max([])).toBeUndefined());
});
describe('min', () => {
  it('returns minimum value', () => expect(_.min([4, 2, 8, 6])).toBe(2));
  it('returns undefined for empty', () => expect(_.min([])).toBeUndefined());
});
describe('maxBy', () => {
  it('returns max by iteratee', () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(_.maxBy(objects, (o: any) => o.n)).toEqual({ n: 2 });
  });
});
describe('minBy', () => {
  it('returns min by iteratee', () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(_.minBy(objects, (o: any) => o.n)).toEqual({ n: 1 });
  });
});
describe('meanBy', () => {
  it('returns mean by iteratee', () => {
    const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
    expect(_.meanBy(objects, (o: any) => o.n)).toBe(5);
  });
});

describe('mean', () => {
  it('returns mean value', () => expect(_.mean([4, 2, 8, 6])).toBe(5));
  it('returns NaN for empty array', () => {
    expect(_.mean([])).toBeNaN();
  });
  it('returns NaN for null', () => {
    expect(_.mean(null as any)).toBeNaN();
  });
  it('returns NaN for empty array meanBy', () => {
    expect(_.meanBy([], (o: any) => o)).toBeNaN();
  });
});
describe('sum', () => {
  it('returns sum', () => expect(_.sum([4, 2, 8, 6])).toBe(20));
});
describe('sumBy', () => {
  it('returns sum by iteratee', () => {
    expect(_.sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o: any) => o.n)).toBe(20);
  });
});
