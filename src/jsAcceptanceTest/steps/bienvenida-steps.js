const { expect } = require('../../main/frontend/node_modules/@playwright/test');
const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

Given('el usuario accede a la aplicación', async ({ bienvenida }) => {
    await bienvenida.acceder();
});

Then('se muestra el mensaje de bienvenida', async ({ bienvenida }) => {
    await bienvenida.validarMensajeDeBienvenida();
});

When('decidió iniciar', async ({ bienvenida }) => {
    await bienvenida.iniciar();
})

Then('puede empezar a usarla', async ({ bienvenida }) => {
    await bienvenida.validarQueSePuedeUsar();
});

