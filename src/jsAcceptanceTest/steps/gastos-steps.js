const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { When } = createBdd(test);

When('el usuario selecciona el grupo creado y agrega un monto de ${string}', async ({ page }, monto) => {
    const ultimaFila = page.locator('app-grupos table tr').last();

    const grupoId = await ultimaFila.locator('td:nth-child(1)').textContent();
    const agregarGastoButton = page.locator(`#agregarGastoGruposButton-${grupoId}`);
    
    await agregarGastoButton.waitFor({ state: 'visible', timeout: 2000 });
    await agregarGastoButton.click();

    const montoInput = page.locator('#montoGastoNuevoInput');
    
    await montoInput.waitFor({ state: 'visible', timeout: 2000 });
    await montoInput.fill(''); 
    await montoInput.fill(monto);

    const guardarGastoButton = page.locator('#guardarGastoNuevoButton');
    
    await guardarGastoButton.waitFor({ state: 'visible', timeout: 2000 });
    await guardarGastoButton.click();
});
