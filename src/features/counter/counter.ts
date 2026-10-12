export interface CounterBounds {
  readonly min: number;
  readonly max: number;
}

export function clamp(value: number, { min, max }: CounterBounds): number {
  return Math.min(max, Math.max(min, value));
}
