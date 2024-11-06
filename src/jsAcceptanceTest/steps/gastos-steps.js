const { expect } = require('../../main/frontend/node_modules/@playwright/test');
const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

When('completa con el monto de $ {string}', async ({ page }, monto) => {
    const montoInput = await page.waitForSelector('#montoGastoNuevoInput', { timeout: 2000 });

    await montoInput.fill(''); 
    await montoInput.fill(monto);
});

When('guarda el gasto', async ({ page }) => {
    const agregarGastoButton = await page.waitForSelector('#guardarGastoNuevoButton', { timeout: 2000 });

    await agregarGastoButton.click();
});

When('el usuario selecciona agregar gasto al grupo creado', async ({ page }) => {
    const ultimaFila = page.locator('app-grupos table tr').last();

    const grupoId = await ultimaFila.locator('td:nth-child(1)').textContent();
    const agregarGastoButton = await page.waitForSelector(`#agregarGastoGruposButton-${grupoId}`, { timeout: 2000 });
    
    await agregarGastoButton.click();
});
