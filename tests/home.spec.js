import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('la página carga y tiene título', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/reloj/i);
  });

  test('el Hero muestra el título principal', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('El Tiempo es un Lujo')).toBeVisible();
  });

  test('el botón Ver Colección navega a /coleccion', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /ver colección/i }).click();
    await expect(page).toHaveURL(/\/coleccion/);
  });
});
