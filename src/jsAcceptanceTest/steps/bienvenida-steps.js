const { expect } = require('../../main/frontend/node_modules/@playwright/test');
const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

Given('el usuario accede a la aplicación', async ({ bienvenidaDriver }) => {
    await bienvenidaDriver.acceder();
});

Then('se muestra el mensaje de bienvenida', async ({ bienvenidaDriver }) => {
    await bienvenidaDriver.validarMensajeDeBienvenida();
});

When('decidió iniciar', async ({ bienvenidaDriver }) => {
    await bienvenidaDriver.iniciar();
})

Then('puede empezar a usarla', async ({ bienvenidaDriver }) => {
    await bienvenidaDriver.validarQueSePuedeUsar();
});

