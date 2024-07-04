const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, chromium} = require('@playwright/test');
const assert = require('assert');


Given('Accedemos a la pagina de repartir', async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:4200/');
});

When('Creamos un grupo', async function () {
    await page.getByRole('textbox').fill('julian');
    await page.locator('#iniciarBienvenidaButton').click()
    await page.locator('#crearGruposButton').click()
    await page.locator('#nombreGrupoNuevoInput').fill('Regalo de navidad');
    await page.locator('#miembrosGrupoNuevoInput').fill('Victor');
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill('Brenda');
    await page.keyboard.press('Enter');
    await page.locator('#guardarGrupoNuevoButton').click()
});

Then('El grupo debe haberse creado exitosamente', async function () {
    await expect(await page.getByRole('alert')).toContainText('Regalo de navidad\' creado');
});