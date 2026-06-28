import { test, expect } from '@playwright/test';

test.describe('Mobile', () => {
  test.beforeEach(async ({}, testInfo) => {
    if (testInfo.project.name !== 'Mobile Chrome') testInfo.skip();
  });

  test('el menú hamburguesa existe en móvil', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Menú' })).toBeVisible();
  });

  test('el menú se abre y muestra los links', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menú' }).click();
    // Scope al nav para evitar coincidir con links del hero o footer
    await expect(page.locator('nav a[href="/coleccion"]').last()).toBeVisible();
    await expect(page.locator('nav a[href="/contacto"]').last()).toBeVisible();
  });

  test('navegar desde el menú móvil funciona', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menú' }).click();
    await page.locator('nav a[href="/coleccion"]').last().click();
    await expect(page).toHaveURL(/\/coleccion/);
  });
});
