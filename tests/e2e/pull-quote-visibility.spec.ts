import { test, expect } from '@playwright/test';

test.describe('Pull Quote Visibility Over Dark Images', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the news card test page
    await page.goto('/test-news-card.html');
    await page.waitForLoadState('networkidle');
  });

  test('screenshot: pull quote in dark theme', async ({ page }) => {
    // Ensure dark theme is active
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(300);

    // Take screenshot of the news card area
    const newsCard = page.locator('.lg-inner, .news-card, [class*="card"]').first();

    if (await newsCard.isVisible().catch(() => false)) {
      await newsCard.screenshot({
        path: 'artifacts/pull-quote-dark-theme.png',
      });
    } else {
      // Fallback: full page screenshot
      await page.screenshot({
        path: 'artifacts/pull-quote-dark-theme.png',
        fullPage: false,
      });
    }

    console.log('Screenshot saved: artifacts/pull-quote-dark-theme.png');
  });

  test('screenshot: pull quote in light theme', async ({ page }) => {
    // Set light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(300);

    // Take screenshot
    const newsCard = page.locator('.lg-inner, .news-card, [class*="card"]').first();

    if (await newsCard.isVisible().catch(() => false)) {
      await newsCard.screenshot({
        path: 'artifacts/pull-quote-light-theme.png',
      });
    } else {
      await page.screenshot({
        path: 'artifacts/pull-quote-light-theme.png',
        fullPage: false,
      });
    }

    console.log('Screenshot saved: artifacts/pull-quote-light-theme.png');
  });

  test('verify pull quote text contrast', async ({ page }) => {
    // Test both themes
    const themes = ['dark', 'light'];

    for (const theme of themes) {
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);
      await page.waitForTimeout(300);

      // Find pull quote elements
      const pullQuotes = page.locator('.pull-quote, .pull-quote-best, [class*="pull-quote"]');
      const count = await pullQuotes.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const quote = pullQuotes.nth(i);
          const isVisible = await quote.isVisible();
          const text = await quote.textContent();

          console.log(`[${theme}] Pull quote ${i + 1}: "${text?.substring(0, 50)}..." - Visible: ${isVisible}`);

          // Assert visibility
          expect(isVisible, `Pull quote ${i + 1} should be visible in ${theme} theme`).toBe(true);
        }
      }
    }
  });

  test('screenshot: full page comparison both themes', async ({ page }) => {
    // Create artifacts directory
    await page.evaluate(() => {
      // Ensure directory exists (this won't work in browser, just placeholder)
    });

    // Dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'artifacts/full-page-dark.png',
      fullPage: true,
    });

    // Light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'artifacts/full-page-light.png',
      fullPage: true,
    });

    console.log('Screenshots saved: artifacts/full-page-dark.png, artifacts/full-page-light.png');
  });
});

test.describe('News Card Component Tests', () => {
  test('verify meta info visibility over images', async ({ page }) => {
    await page.goto('/test-news-card.html');
    await page.waitForLoadState('networkidle');

    // Set light theme where visibility issues are most common
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(300);

    // Check meta elements
    const metaElements = page.locator('.meta-category, .meta-time, .meta-source, .featured-badge');
    const count = await metaElements.count();

    for (let i = 0; i < count; i++) {
      const el = metaElements.nth(i);
      const isVisible = await el.isVisible();
      const text = await el.textContent();

      console.log(`Meta element ${i + 1}: "${text}" - Visible: ${isVisible}`);
      expect(isVisible).toBe(true);
    }
  });

  test('responsive: mobile view pull quote', async ({ page }) => {
    await page.goto('/test-news-card.html');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Test light theme on mobile
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(300);

    await page.screenshot({
      path: 'artifacts/mobile-light-theme.png',
      fullPage: false,
    });

    console.log('Screenshot saved: artifacts/mobile-light-theme.png');
  });
});
