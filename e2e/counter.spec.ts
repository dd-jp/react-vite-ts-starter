import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('counter increments, decrements and resets', async ({ page }) => {
  const value = page.getByRole('status');
  await expect(value).toHaveText('0');
  await page.getByRole('button', { name: 'Increment' }).click();
  await page.getByRole('button', { name: 'Increment' }).click();
  await expect(value).toHaveText('2');
  await page.getByRole('button', { name: 'Decrement' }).click();
  await expect(value).toHaveText('1');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(value).toHaveText('0');
});

test('counter is keyboard operable', async ({ page }) => {
  await page.getByRole('button', { name: 'Increment' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('1');
});

test('page has no WCAG 2.2 AA violations', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
