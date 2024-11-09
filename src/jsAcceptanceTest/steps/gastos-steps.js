const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { When } = createBdd(test);

When('el usuario selecciona el grupo creado y agrega un monto de ${string}', async ({ page },monto) => {
    const ultimaFila = page.locator('app-grupos table tr').last();

    const grupoId = await ultimaFila.locator('td:nth-child(1)').textContent();
    const agregarGastoButton = await page.waitForSelector(`#agregarGastoGruposButton-${grupoId}`, { timeout: 2000 });
    
    await agregarGastoButton.click();

    const montoInput = await page.waitForSelector('#montoGastoNuevoInput', { timeout: 2000 });

    await montoInput.fill(''); 
    await montoInput.fill(monto);

    const guardarGastoButton = await page.waitForSelector('#guardarGastoNuevoButton', { timeout: 2000 });

    await guardarGastoButton.click();
});