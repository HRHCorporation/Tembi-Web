import { test, expect } from '@playwright/test';

const publicPages = [
  { path: '/', name: 'Home' },
  { path: '/event', name: 'Event' },
  { path: '/rooms', name: 'Rooms' },
  { path: '/venue', name: 'Venue' },
  { path: '/catering', name: 'Catering' },
  { path: '/collections', name: 'Collections' },
  { path: '/blog', name: 'Blog' },
  { path: '/sejarah', name: 'Sejarah' },
];

test.describe('Public Pages - Smoke Test', () => {
  for (const { path, name } of publicPages) {
    test(`${name} page should return 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });

    test(`${name} page should not show error`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText(/500|internal server error/i)).not.toBeVisible();
      await expect(page.getByText(/404|not found/i)).not.toBeVisible();
    });
  }
});

test.describe('Booking Flow', () => {
  test('booking page should load', async ({ page }) => {
    const response = await page.goto('/booking');
    expect(response?.status()).toBe(200);
  });

  test('check-booking page should load', async ({ page }) => {
    const response = await page.goto('/check-booking');
    expect(response?.status()).toBe(200);
  });
});
