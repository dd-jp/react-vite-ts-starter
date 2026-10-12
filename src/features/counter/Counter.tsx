import { useId, useState } from 'react';
import { type CounterBounds, clamp } from './counter.ts';
import './Counter.css';

interface CounterProps {
  readonly initial?: number;
  readonly bounds?: CounterBounds;
}

const DEFAULT_BOUNDS: CounterBounds = { min: 0, max: 10 };

export function Counter({ initial = 0, bounds = DEFAULT_BOUNDS }: CounterProps) {
  const [count, setCount] = useState(() => clamp(initial, bounds));
  const labelId = useId();
  const step = (delta: number) => setCount((current) => clamp(current + delta, bounds));

  return (
    <section className="counter" aria-labelledby={labelId}>
      <h2 id={labelId}>Counter</h2>
      <output aria-live="polite">{count}</output>
      <div className="counter__actions">
        <button type="button" onClick={() => step(-1)} disabled={count <= bounds.min}>
          Decrement
        </button>
        <button type="button" onClick={() => step(1)} disabled={count >= bounds.max}>
          Increment
        </button>
        <button type="button" onClick={() => setCount(clamp(initial, bounds))}>
          Reset
        </button>
      </div>
    </section>
  );
}
