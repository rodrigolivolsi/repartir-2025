const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { When } = createBdd(test);
const { contexto } = require('./grupos-steps.js');

When('el usuario selecciona el grupo {string} y agrega un monto de ${string}', async ({ page }, nombreGrupo, monto) => {
    //const grupoBuscado = contexto.find((grupo) => grupo.grupoNombre === nombreGrupo);
    let grupoBuscado;
    const timeout = 5000;
    const start = Date.now();

    while (!grupoBuscado) {
        grupoBuscado = contexto.find((grupo) => grupo.grupoNombre === nombreGrupo);

        if (grupoBuscado) break; 

        if (Date.now() - start > timeout) {
            throw new Error(`Timeout esperando que el grupo ${nombreGrupo} esté en contexto.`);
        }

        await new Promise(resolve => setTimeout(resolve, 100));
    }


    const agregarGastoButton = page.locator(`#agregarGastoGruposButton-${grupoBuscado.grupoId}`);
    
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
