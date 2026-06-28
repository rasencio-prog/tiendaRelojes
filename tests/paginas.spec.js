import { test, expect } from '@playwright/test';

test.describe('Páginas generales', () => {
  test('Ofertas carga correctamente', async ({ page }) => {
    await page.goto('/ofertas');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Vender carga correctamente', async ({ page }) => {
    await page.goto('/vender');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Quiénes Somos carga correctamente', async ({ page }) => {
    await page.goto('/nosotros');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('el botón de WhatsApp está visible en todas las páginas', async ({ page }) => {
    for (const url of ['/', '/coleccion', '/contacto']) {
      await page.goto(url);
      await expect(page.getByRole('link', { name: 'Contactar por WhatsApp' })).toBeVisible();
    }
  });
});
