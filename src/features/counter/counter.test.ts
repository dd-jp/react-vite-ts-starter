import { clamp } from './counter.ts';

describe('clamp', () => {
  const bounds = { min: 0, max: 10 };

  it('keeps a value inside the bounds', () => {
    expect(clamp(5, bounds)).toBe(5);
  });

  it('raises a value below min to min', () => {
    expect(clamp(-1, bounds)).toBe(0);
  });

  it('lowers a value above max to max', () => {
    expect(clamp(11, bounds)).toBe(10);
  });

  it('keeps values equal to the bounds', () => {
    expect(clamp(0, bounds)).toBe(0);
    expect(clamp(10, bounds)).toBe(10);
  });
});
