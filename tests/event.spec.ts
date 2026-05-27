import { test, expect } from '@playwright/test';

test.describe('Event List Page', () => {
  test('should load event list', async ({ page }) => {
    await page.goto('/event');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should show event cards', async ({ page }) => {
    await page.goto('/event');
    // Tunggu sampai konten event muncul (API atau fallback)
    await page.waitForLoadState('networkidle');
    const cards = page.locator('a[href^="/event/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Event Detail Page', () => {
  test('should load event detail from slug', async ({ page }) => {
    await page.goto('/event/testing-tambah-image');
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
  });

  test('should show About Event section', async ({ page }) => {
    await page.goto('/event/testing-tambah-image');
    await expect(page.getByText(/about event/i)).toBeVisible({ timeout: 10000 });
  });

  test('should show location map section', async ({ page }) => {
    await page.goto('/event/testing-tambah-image');
    await expect(page.getByText(/tembi cultural house location/i)).toBeVisible({ timeout: 10000 });
  });

  test('About Event and Location section should have 20px gap', async ({ page }) => {
    await page.goto('/event/testing-tambah-image');
    await page.waitForLoadState('networkidle');

    const aboutEvent = page.locator('div.bg-white').filter({ hasText: /about event/i }).first();
    const locationSection = page.locator('div.bg-white').filter({ hasText: /tembi cultural house location/i }).first();

    const aboutBox = await aboutEvent.boundingBox();
    const locationBox = await locationSection.boundingBox();

    expect(aboutBox).not.toBeNull();
    expect(locationBox).not.toBeNull();

    const gap = locationBox!.y - (aboutBox!.y + aboutBox!.height);
    expect(gap).toBeGreaterThanOrEqual(18);
    expect(gap).toBeLessThanOrEqual(25);
  });

  test('should show back to events link', async ({ page }) => {
    await page.goto('/event/testing-tambah-image');
    await expect(page.getByRole('link', { name: /back to events/i })).toBeVisible({ timeout: 5000 });
  });

  test('should navigate back to event list', async ({ page }) => {
    await page.goto('/event/testing-tambah-image');
    await page.getByRole('link', { name: /back to events/i }).click();
    await expect(page).toHaveURL('/event');
  });
});
