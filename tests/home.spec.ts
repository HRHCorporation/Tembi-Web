import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Tembi/i);
  });

  test('should show navigation bar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should show Book Now button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /book now/i })).toBeVisible();
  });

  test('should switch language EN/ID', async ({ page }) => {
    await page.goto('/');
    const idButton = page.getByRole('button', { name: /^ID$/i });
    if (await idButton.isVisible()) {
      await idButton.click();
      await expect(page.getByRole('button', { name: /^EN$/i })).toBeVisible();
    }
  });

  test('should navigate to event page', async ({ page }) => {
    await page.goto('/');
    await page.goto('/event');
    await expect(page).toHaveURL('/event');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});
