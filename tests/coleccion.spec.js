import { test, expect } from '@playwright/test';

test.describe('Colección', () => {
  test('la página carga correctamente', async ({ page }) => {
    await page.goto('/coleccion');
    await expect(page.getByText(/colección destacada/i)).toBeVisible();
  });

  test('se muestran tarjetas de producto', async ({ page }) => {
    await page.goto('/coleccion');
    const cards = page.locator('[data-testid="product-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 25000 });
  });

  test('al hacer clic en la imagen lleva al detalle', async ({ page }) => {
    await page.goto('/coleccion');
    await page.locator('[data-testid="product-card"]').first().waitFor({ timeout: 25000 });
    await page.locator('[data-testid="product-card"] a').first().click();
    await expect(page).toHaveURL(/\/producto\//);
  });

  test('el botón Detalle lleva al detalle del producto', async ({ page }) => {
    await page.goto('/coleccion');
    await page.locator('[data-testid="product-card"]').first().waitFor({ timeout: 25000 });
    await page.getByRole('link', { name: /detalle/i }).first().click();
    await expect(page).toHaveURL(/\/producto\//);
  });
});
