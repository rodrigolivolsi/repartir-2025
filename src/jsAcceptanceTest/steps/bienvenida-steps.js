const { expect } = require('../../main/frontend/node_modules/@playwright/test');
const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

Given('el usuario accede a la aplicación', async ({ assemblyBienvenida }) => {
    await assemblyBienvenida.acceder();
});

Then('se muestra el mensaje de bienvenida', async ({ assemblyBienvenida }) => {
    await assemblyBienvenida.validarMensajeDeBienvenida();
});

When('decidió iniciar', async ({ assemblyBienvenida }) => {
    await assemblyBienvenida.iniciar();
})

Then('puede empezar a usarla', async ({ assemblyBienvenida }) => {
    await assemblyBienvenida.validarQueSePuedeUsar();
});

