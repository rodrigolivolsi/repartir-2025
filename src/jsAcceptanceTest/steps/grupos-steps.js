const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

Given('que el usuario inició Repartir', async ({ grupos }) => {
    await grupos.iniciar();
});

When("el usuario crea un grupo indicando el nombre {string}", async ({ grupos }, nombre) => {
    await grupos.crearCon(nombre);
});

When("el usuario crea un grupo indicando que sus miembros son {string} y {string}", async ({ grupos }, miembro1, miembro2) => {
    await grupos.crearConMiembros([miembro1, miembro2]);
})

When("el usuario crea un grupo", async ({ grupos }) => {
    await grupos.crear();
})

Then("debería visualizar dentro del listado el grupo creado con total {string}", async ({ grupos }, montoEsperado) => {
    await grupos.validarMontoTotal(montoEsperado);
})

When("el usuario intenta crear un grupo indicando un único miembro", async ({ grupos }) => {
    await grupos.crearConUnUnicoMiembro();
})

Then("debería ser informado que necesita tener al menos dos miembros", async ({ grupos }) => {
    await grupos.validarMensajeDeAlMenosDosMiembros();
})

Then('no debería crear el grupo con un único miembro', async ({ page }) => {
});

Then('debería visualizar dentro del listado el grupo con el nombre indicado', async ({ grupos }) => {
    await grupos.validarNombreDeGrupo();
});

Then('visualiza dentro del listado el grupo con los miembros indicados', async ({ grupos }) => {
    await grupos.validarMiembrosDeGrupo();
});