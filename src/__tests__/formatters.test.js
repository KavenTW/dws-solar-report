import { describe, it, expect } from 'vitest';
import { makeFmt } from '../utils/formatters';

describe('makeFmt', () => {
  it('usd formats USD with $ prefix and commas', () => {
    const fmt = makeFmt('USD');
    expect(fmt.usd(1234)).toBe('$1,234');
    expect(fmt.usd(1000000)).toBe('$1,000,000');
  });

  it('usd formats CAD with C$ prefix', () => {
    const fmt = makeFmt('CAD');
    expect(fmt.usd(1234)).toBe('C$1,234');
  });

  it('kilo formats millions with one decimal place', () => {
    const fmt = makeFmt('USD');
    expect(fmt.kilo(1_200_000)).toBe('$1.2M');
    expect(fmt.kilo(1_000_000)).toBe('$1.0M');
  });

  it('kilo formats thousands as integer K', () => {
    const fmt = makeFmt('USD');
    expect(fmt.kilo(120_000)).toBe('$120K');
    expect(fmt.kilo(5_000)).toBe('$5K');
  });

  it('num formats integer with commas and no symbol', () => {
    const fmt = makeFmt('USD');
    expect(fmt.num(5000)).toBe('5,000');
    expect(fmt.num(1234567)).toBe('1,234,567');
  });
});
