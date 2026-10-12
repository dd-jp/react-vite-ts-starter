import axe from 'axe-core';

// jsdom has no canvas, so colour contrast is checked in the Playwright e2e suite instead
export async function expectNoA11yViolations(container: Element): Promise<void> {
  const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
  expect(results.violations).toEqual([]);
}
