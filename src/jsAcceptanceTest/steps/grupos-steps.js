const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

Given('que el usuario inició Repartir', async ({ gruposDriver }) => {
    await gruposDriver.iniciar();
});

When("el usuario crea un grupo indicando el nombre {string}", async ({ gruposDriver }, nombre) => {
    await gruposDriver.crearCon(nombre);
});

When("el usuario crea un grupo indicando que sus miembros son {string} y {string}", async ({ gruposDriver }, miembro1, miembro2) => {
    await gruposDriver.crearConMiembros([miembro1, miembro2]);
})

When("el usuario crea un grupo", async ({ gruposDriver }) => {
    await gruposDriver.crear();
})

Then("debería visualizar dentro del listado el grupo con total {string}", async ({ gruposDriver }, montoEsperado) => {
    await gruposDriver.validarMontoTotal(montoEsperado);
})

When("el usuario intenta crear un grupo indicando un único miembro", async ({ gruposDriver }) => {
    await gruposDriver.crearConUnUnicoMiembro();
})

Then("debería ser informado que necesita tener al menos dos miembros", async ({ gruposDriver }) => {
    await gruposDriver.validarMensajeDeAlMenosDosMiembros();
})

Then('no debería crear el grupo con un único miembro', async ({ page }) => {
});

Then('debería visualizar dentro del listado el grupo con el nombre indicado', async ({ gruposDriver }) => {
    await gruposDriver.validarNombreDeGrupo();
});

Then('visualiza dentro del listado el grupo con los miembros indicados', async ({ gruposDriver }) => {
    await gruposDriver.validarMiembrosDeGrupo();
});