const { expect } = require('../../main/frontend/node_modules/@playwright/test');
const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

When('el usuario selecciona agregar gasto al grupo #{int}', async ({ page }, posicion) => {
    const ultimaFila = page.locator('app-grupos table tr').last();

    const grupoId = await ultimaFila.locator('td:nth-child(1)').textContent();
    const agregarGastoButton = await page.waitForSelector(`#agregarGastoGruposButton-${grupoId}`, { timeout: 2000 });
    
    await agregarGastoButton.click();
});

When('completa con el monto de $ {string}', async ({ page }, monto) => {
    const montoInput = await page.waitForSelector('#montoGastoNuevoInput', { timeout: 2000 });

    await montoInput.fill(''); 
    await montoInput.fill(monto);
});

When('guarda el gasto', async ({ page }) => {
    const agregarGastoButton = await page.waitForSelector('#guardarGastoNuevoButton', { timeout: 2000 });

    await agregarGastoButton.click();
});

Then('ve la confirmación {string}', async ({ page }, mensaje) => {
    const mensajesToast = await page.waitForSelector('#mensajesToast', { timeout: 2000 });
    
    const textoToast = await mensajesToast.innerText();
    
    expect(textoToast).toContain('Éxito');
    expect(textoToast).toContain(mensaje);
});

Then('ve el total del grupo #{int} actualizado a {string}', async ({ page }, posicion, monto) => {
    await page.waitForSelector('app-grupos table tr');

    const grupoTR = await page.$$('app-grupos table tr');

    expect(grupoTR).toHaveLengthGreaterThan(posicion);

    const campoTDs = await grupoTR[posicion].$$('td');

    const primerCampoTexto = await campoTDs[0].innerText();
    expect(primerCampoTexto).not.toBe('');

    const tercerCampoTexto = await campoTDs[2].innerText();
    expect(tercerCampoTexto).toBe(monto);
});
