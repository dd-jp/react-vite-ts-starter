import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectNoA11yViolations } from '@/shared/test/axe.ts';
import { Counter } from './Counter.tsx';

function setup(props: Parameters<typeof Counter>[0] = {}) {
  const user = userEvent.setup();
  render(<Counter {...props} />);
  return {
    user,
    value: () => screen.getByRole('status'),
    button: (name: string) => screen.getByRole('button', { name }),
  };
}

describe('Counter', () => {
  it('starts at the initial value', () => {
    const { value } = setup({ initial: 3 });
    expect(value()).toHaveTextContent('3');
  });

  it('clamps an out-of-range initial value', () => {
    const { value } = setup({ initial: 99, bounds: { min: 0, max: 5 } });
    expect(value()).toHaveTextContent('5');
  });

  it('increments and decrements', async () => {
    const { user, value, button } = setup();
    await user.click(button('Increment'));
    await user.click(button('Increment'));
    expect(value()).toHaveTextContent('2');
    await user.click(button('Decrement'));
    expect(value()).toHaveTextContent('1');
  });

  it('disables decrement at min and increment at max', async () => {
    const { user, button } = setup({ initial: 0, bounds: { min: 0, max: 1 } });
    expect(button('Decrement')).toBeDisabled();
    expect(button('Increment')).toBeEnabled();
    await user.click(button('Increment'));
    expect(button('Increment')).toBeDisabled();
    expect(button('Decrement')).toBeEnabled();
  });

  it('resets to the initial value', async () => {
    const { user, value, button } = setup({ initial: 2 });
    await user.click(button('Increment'));
    await user.click(button('Reset'));
    expect(value()).toHaveTextContent('2');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Counter />);
    await expectNoA11yViolations(container);
  });
});
