// tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should display the homepage correctly', async ({ page }) => {
        await page.goto('/');

        // Check main title
        await expect(page).toHaveTitle(/SFL Tournament 2026/);

        // Check hero section
        const heroTitle = page.getByRole('heading', { name: /SFL Tournament/ });
        await expect(heroTitle).toBeVisible();

        // Check navigation
        const nav = page.getByRole('banner');
        await expect(nav).toBeVisible();

        // Check features section
        const featuresSection = page.getByText('Чому SFL Tournament?');
        await expect(featuresSection).toBeVisible();
    });

    test('should navigate to tournaments page', async ({ page }) => {
        await page.goto('/');

        // Click on tournaments link
        const tournamentsLink = page.getByRole('link', { name: /Всі турніри/ });
        await tournamentsLink.click();

        // Should navigate to tournaments page
        await expect(page).toHaveURL('/tournaments');
    });

    test('should show login/register buttons for anonymous users', async ({ page }) => {
        await page.goto('/');

        // Check for auth buttons
        const registerButton = page.getByRole('link', { name: /Зареєструватися/ });
        const loginButton = page.getByRole('link', { name: /Увійти/ });

        await expect(registerButton).toBeVisible();
        await expect(loginButton).toBeVisible();
    });
});

test.describe('Authentication Flow', () => {
    test('should show register form', async ({ page }) => {
        await page.goto('/auth/register');

        // Check form elements
        await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
        await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible();
        await expect(page.getByLabel(/password/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /зареєструватися/i })).toBeVisible();
    });

    test('should show login form', async ({ page }) => {
        await page.goto('/auth/login');

        // Check form elements
        await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
        await expect(page.getByLabel(/password/i)).toBeVisible();
        await expect(page.getByRole('button', { name: /увійти/i })).toBeVisible();

        // Check register link
        const registerLink = page.getByRole('link', { name: /зареєструватися/i });
        await expect(registerLink).toBeVisible();
    });
});

test.describe('Responsive Design', () => {
    test('should work on mobile devices', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Check that main content is visible
        const heroTitle = page.getByRole('heading', { name: /SFL Tournament/ });
        await expect(heroTitle).toBeVisible();

        // Check mobile navigation (hamburger menu)
        const mobileMenu = page.getByRole('button', { name: /меню/i });
        if (await mobileMenu.isVisible()) {
            await mobileMenu.click();
            // Check that navigation items are visible after click
        }
    });

    test('should work on tablet devices', async ({ page }) => {
        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');

        // Check that layout adapts correctly
        const heroTitle = page.getByRole('heading', { name: /SFL Tournament/ });
        await expect(heroTitle).toBeVisible();
    });
});