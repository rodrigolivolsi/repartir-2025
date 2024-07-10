import { test, expect } from '@playwright/test';

test('visitar repartir', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByRole('textbox').fill('julian');
  await page.locator('#iniciarBienvenidaButton').click()
  await page.locator('#crearGruposButton').click()

  await page.locator("#nombreGrupoNuevoInput").fill("After Office");

  await page.locator('#miembrosGrupoNuevoInput').fill('gian');
  await page.keyboard.press('Enter');
  await page.locator('#miembrosGrupoNuevoInput').fill('juli');
  await page.keyboard.press('Enter');

  await page.locator('#guardarGrupoNuevoButton').click();

  let nombreGrupo = 'After Office'
  let grupoTR = await page.locator('app-grupos table tr').locator('td:nth-child(2)').locator('text=After Office').locator('..');
  let campoTDs = await grupoTR.locator('td:nth-child(4)');
  await expect(campoTDs.nth(0)).not.toBeEmpty();
  await expect(campoTDs.nth(1)).toContainText('gian');
  await expect(campoTDs.nth(1)).toContainText('juli');

});
