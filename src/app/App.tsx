import { Counter } from '@/features/counter';

export function App() {
  const title = import.meta.env.VITE_APP_TITLE ?? 'React Vite TS Starter';
  return (
    <main>
      <h1>{title}</h1>
      <Counter />
    </main>
  );
}
