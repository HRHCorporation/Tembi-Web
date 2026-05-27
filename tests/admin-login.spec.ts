import { test, expect } from '@playwright/test';

test.describe('Admin Login', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show error on wrong credentials', async ({ page }) => {
    await page.goto('/admin');
    await page.fill('input[type="email"], input[name="email"]', 'wrong@email.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/email atau password/i)).toBeVisible({ timeout: 5000 });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/admin');
    await page.fill('input[type="email"], input[name="email"]', 'superadmin@tembi.com');
    await page.fill('input[type="password"]', '12345678');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin/dashboard', { timeout: 10000 });
  });

  test('should redirect to dashboard if already logged in', async ({ page, context }) => {
    // Login dulu
    await page.goto('/admin');
    await page.fill('input[type="email"], input[name="email"]', 'superadmin@tembi.com');
    await page.fill('input[type="password"]', '12345678');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin/dashboard', { timeout: 10000 });

    // Buka halaman login lagi, harusnya redirect ke dashboard
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin/dashboard');
  });
});
