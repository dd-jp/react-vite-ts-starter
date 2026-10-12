import { expectNoA11yViolations } from '@test/axe.ts';
import { render, screen } from '@testing-library/react';
import { App } from './App.tsx';

describe('App', () => {
  it('renders the page heading and the counter', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('React Vite TS Starter');
    expect(screen.getByRole('region', { name: 'Counter' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<App />);
    await expectNoA11yViolations(container);
  });
});
