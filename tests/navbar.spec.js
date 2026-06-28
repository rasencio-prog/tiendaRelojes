import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
  test('el logo está visible y lleva al home', async ({ page }) => {
    await page.goto('/coleccion');
    await page.locator('nav img[alt]').click();
    await expect(page).toHaveURL('https://rolejeria.cl/');
  });

  test('el botón del carrito está visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Abrir carrito' })).toBeVisible();
  });

  test('el carrito se abre al hacer clic', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir carrito' }).click();
    await expect(page.getByText(/tu carrito/i)).toBeVisible();
  });

  test('los links de navegación llevan a sus páginas (desktop)', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'Mobile Chrome') testInfo.skip();
    const links = [
      { name: /colección/i,      url: /\/coleccion/ },
      { name: /ofertas/i,        url: /\/ofertas/ },
      { name: /vende tu reloj/i, url: /\/vender/ },
      { name: /quiénes somos/i,  url: /\/nosotros/ },
      { name: /contacto/i,       url: /\/contacto/ },
    ];
    for (const { name, url } of links) {
      await page.goto('/');
      await page.locator('nav').getByRole('link', { name }).first().click();
      await expect(page).toHaveURL(url);
    }
  });
});
