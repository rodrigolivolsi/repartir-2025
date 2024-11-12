const { expect } = require('../../main/frontend/node_modules/@playwright/test');
const { createBdd } = require('../../main/frontend/node_modules/playwright-bdd');

const { test } = require('../../main/frontend/fixtures');
const { Given, When, Then } = createBdd(test);

let nombreIndicado;
let miembroUno;
let miembroDos;

let context = {};

Given('que el usuario inició Repartir', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox').fill('julian');
    await page.locator('#iniciarBienvenidaButton').click()
});

When("el usuario crea un grupo indicando el nombre {string} con miembros {string} y {string}", async ({ page }, nombre, miembro1, miembro2) => {

    nombreIndicado = nombre;
    await page.locator('#crearGruposButton').click()
    await page.locator('#nombreGrupoNuevoInput').fill(nombre);
    await page.locator('#miembrosGrupoNuevoInput').fill(miembro1);
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill(miembro2);
    await page.keyboard.press('Enter');
    await page.locator('#guardarGrupoNuevoButton').click();

    let ultimaFila = page.locator('app-grupos table tr').last();
    let grupoId = await ultimaFila.locator('td:nth-child(1)').textContent();

    context.grupoId = grupoId;
});

When("el usuario crea un grupo indicando el nombre {string}", async ({ page }, nombre) => {

    nombreIndicado = nombre;
    await page.locator('#crearGruposButton').click()
    await page.locator('#nombreGrupoNuevoInput').fill(nombre);
    await page.locator('#miembrosGrupoNuevoInput').fill('Victor');
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill('Brenda');
    await page.keyboard.press('Enter');
    await page.locator('#guardarGrupoNuevoButton').click();
});

When("el usuario crea un grupo indicando que sus miembros son {string} y {string}", async ({ page }, miembro1, miembro2) => {
    miembroUno = miembro1;
    miembroDos = miembro2;

    await page.locator("#crearGruposButton").click();

    await page.locator("#nombreGrupoNuevoInput").fill("After Office");

    await page.locator('#miembrosGrupoNuevoInput').fill(miembroUno);
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill(miembroDos);
    await page.keyboard.press('Enter');

    await page.locator("#guardarGrupoNuevoButton").click();
})

When("el usuario crea un grupo", async ({ page }) => {
    const gruposAntesDeCrearUnoNuevo = await page.locator('app-grupos table tr').count();

    await page.locator("#crearGruposButton").click();

    await page.locator("#nombreGrupoNuevoInput").fill("Grupo de 4");

    await page.locator('#miembrosGrupoNuevoInput').fill("Guido");
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill("Laura");
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill("Mariano");
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill("Juan Cruz");
    await page.keyboard.press('Enter');

    await page.locator("#guardarGrupoNuevoButton").click();

    await page.waitForFunction(
        (gruposAntesDeCrearUnoNuevo) => {
          const gruposAhora = document.querySelectorAll('app-grupos table tr').length;
          return gruposAhora > gruposAntesDeCrearUnoNuevo;
        },
        gruposAntesDeCrearUnoNuevo
      );
      let ultimaFila = page.locator('app-grupos table tr').last();

      let grupoId = await ultimaFila.locator('td:nth-child(1)').textContent();

      context.grupoId = grupoId;
})

When("el usuario intenta crear un grupo indicando un único miembro", async ({ page }) => {
    await page.locator("#crearGruposButton").click();

    await page.locator("#nombreGrupoNuevoInput").fill("After Office");

    await page.locator('#miembrosGrupoNuevoInput').fill("Oscar");
    await page.keyboard.press('Enter');

    await page.locator("#guardarGrupoNuevoButton").click();
})

Then("debería visualizar dentro del listado el grupo con total {string}", async ({ page }, montoEsperado) => {
    let filaConGrupoId = page.locator(`app-grupos table tr:has(td:nth-child(1):text("${context.grupoId}"))`);
    let monto = await filaConGrupoId.locator('td:nth-child(3)');
    await expect(monto).toContainText(montoEsperado);
})

Then("debería visualizar dentro del listado el grupo {string} con total {string} y miembros {string} y {string}", async ({ page },nombreEsperado, montoEsperado, miembroUno, miembroDos) => {
    let filaConGrupoId = page.locator(`app-grupos table tr:has(td:nth-child(1):text("${context.grupoId}"))`);
    let nombre = await filaConGrupoId.locator('td:nth-child(2)');
    let monto = await filaConGrupoId.locator('td:nth-child(3)');
    let miembros = await filaConGrupoId.locator('td:nth-child(4)')

    await expect(monto).toContainText(montoEsperado);
    await expect(miembros).toContainText(miembroUno);
    await expect(miembros).toContainText(miembroDos);
    await expect(nombre).toContainText(nombreEsperado);
})

Then("debería ser informado que necesita tener al menos dos miembros", async ({ page }) => {

    let mensajesToast = page.getByRole('alert');
    await mensajesToast.waitFor({ state: 'visible', timeout: 2000 });

    await expect(mensajesToast).toContainText('Error');
    await expect(mensajesToast).toContainText('No se puede guardar');
})

Then('no debería crear el grupo con un único miembro', async ({ page }) => {
});

Then('debería visualizar dentro del listado el grupo con el nombre indicado', async ({ page }) => {
    await expect(await page.getByRole('alert')).toContainText(nombreIndicado);
});

Then('visualiza dentro del listado el grupo con los miembros indicados', async ({ page }) => {
    let nombreGrupo = 'After Office'
    let row = page.locator(`app-grupos table tr:has(td:nth-child(2):text("${nombreGrupo}"))`);
    let miembros = await row.locator('td:nth-child(4)')

    await expect(miembros.nth(1)).toContainText(miembroUno);
    await expect(miembros.nth(1)).toContainText(miembroDos);
    
});