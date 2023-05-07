import { test, expect } from '@playwright/test';

test('has game', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Jouer' }).click();

  await page.getByRole('link', { name: '1', exact: true }).click();

  await expect(page.locator('#game')).toBeVisible();
});
