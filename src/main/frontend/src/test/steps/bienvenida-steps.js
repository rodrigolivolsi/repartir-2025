const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect, chromium} = require('@playwright/test');
const assert = require('assert');

Given('el usuario accede a la aplicación', async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:4200/');
});

Then('se muestra el mensaje de bienvenida', async function () {
    let dialog = page.locator('p-dialog:has-text("Repartir")');
    await dialog.waitFor({ state: 'hidden', timeout: 2000 });
});

When('decidió iniciar', async function(){
    await page.getByRole('textbox').fill('julian');
    await page.locator('#iniciarBienvenidaButton').click()
})

Then('puede empezar a usarla', async function () {
    await page.locator("#crearGruposButton").click();
    let nuevoGrupoDialog = page.locator('#nuevoGrupoDialog');
        // Esperar hasta que el texto específico esté presente en el elemento del diálogo
    await expect(nuevoGrupoDialog).toContainText('Nuevo Grupo');
});

