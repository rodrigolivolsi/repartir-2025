const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

Given('que el usuario inició Repartir', async ({ assemblyGrupos }) => {
    await assemblyGrupos.iniciar();
});

When("el usuario crea un grupo indicando el nombre {string}", async ({ assemblyGrupos }, nombre) => {
    await assemblyGrupos.crearCon(nombre);
});

When("el usuario crea un grupo indicando que sus miembros son {string} y {string}", async ({ assemblyGrupos }, miembro1, miembro2) => {
    await assemblyGrupos.crearConMiembros([miembro1, miembro2]);
})

When("el usuario crea un grupo", async ({ assemblyGrupos }) => {
    await assemblyGrupos.crear();
})

Then("debería visualizar dentro del listado el grupo con total $ {string}", async ({ assemblyGrupos }, montoEsperado) => {
    await assemblyGrupos.validarMontoTotal(montoEsperado);
})

When("el usuario intenta crear un grupo indicando un único miembro", async ({ assemblyGrupos }) => {
    await assemblyGrupos.crearConUnUnicoMiembro();
})

Then("debería ser informado que necesita tener al menos dos miembros", async ({ assemblyGrupos }) => {
    await assemblyGrupos.validarMensajeDeAlMenosDosMiembros();
})

Then('no debería crear el grupo con un único miembro', async ({ page }) => {
});

Then('debería visualizar dentro del listado el grupo con el nombre indicado', async ({ assemblyGrupos }) => {
    await assemblyGrupos.validarNombreDeGrupo();
});

Then('visualiza dentro del listado el grupo con los miembros indicados', async ({ assemblyGrupos }) => {
    await assemblyGrupos.validarMiembrosDeGrupo();
});