import { test, expect } from '@playwright/test';

test.describe('Contacto', () => {
  test('la página carga con el formulario', async ({ page }) => {
    await page.goto('/contacto');
    await expect(page.getByText(/contacto y ubicación/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /enviar mensaje/i })).toBeVisible();
  });

  test('muestra errores si se envía vacío', async ({ page }) => {
    await page.goto('/contacto');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/nombre es requerido/i)).toBeVisible();
    await expect(page.getByText(/correo es requerido/i)).toBeVisible();
    await expect(page.getByText(/mensaje no puede/i)).toBeVisible();
  });

  test('valida formato de email incorrecto', async ({ page }) => {
    await page.goto('/contacto');
    await page.getByLabel(/nombre/i).fill('Test');
    await page.getByLabel(/correo/i).fill('correo-invalido');
    await page.getByLabel(/mensaje/i).fill('Hola');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/correo válido/i)).toBeVisible();
  });
});
