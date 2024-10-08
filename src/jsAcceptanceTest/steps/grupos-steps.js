const { Given, When, Then, After } = require('../../main/frontend/node_modules/@cucumber/cucumber');
const { expect, chromium} = require('../../main/frontend/node_modules/@playwright/test');

let nombreIndicado;
let miembroUno;
let miembroDos;

Given('que el usuario inició Repartir', async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:4200/');
    await page.getByRole('textbox').fill('julian');
    await page.locator('#iniciarBienvenidaButton').click()
});

When("el usuario crea un grupo indicando el nombre {string}", async function (nombre) {

    nombreIndicado = nombre;
    await page.locator('#crearGruposButton').click()
    await page.locator('#nombreGrupoNuevoInput').fill('Regalo de navidad');
    await page.locator('#miembrosGrupoNuevoInput').fill('Victor');
    await page.keyboard.press('Enter');
    await page.locator('#miembrosGrupoNuevoInput').fill('Brenda');
    await page.keyboard.press('Enter');
    await page.locator('#guardarGrupoNuevoButton').click();
});

When("el usuario crea un grupo indicando que sus miembros son {string} y {string}", async function(miembro1, miembro2){
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

When("el usuario crea un grupo", async function(){
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
})

Then("debería visualizar dentro del listado el grupo creado con total {string}", async function(montoEsperado){
    monto = await page.locator('app-grupos table tbody tr:last-child td:nth-child(3)');
    await expect(monto).toContainText(montoEsperado);
})

When("el usuario intenta crear un grupo indicando un único miembro", async function(){
    await page.locator("#crearGruposButton").click();

    await page.locator("#nombreGrupoNuevoInput").fill("After Office");

    await page.locator('#miembrosGrupoNuevoInput').fill("Oscar");
    await page.keyboard.press('Enter');

    await page.locator("#guardarGrupoNuevoButton").click();
})

Then("debería ser informado que necesita tener al menos dos miembros", async function (){

    let mensajesToast = page.getByRole('alert');
    await mensajesToast.waitFor({ state: 'visible', timeout: 2000 });

    // Esperar a que el texto del toast contenga "Error"
    await expect(mensajesToast).toContainText('Error');

    // Verificar que el texto del toast contenga "No se puede guardar"
    await expect(mensajesToast).toContainText('No se puede guardar');
})

Then('no debería crear el grupo con un único miembro', async function () {
});

Then('debería visualizar dentro del listado el grupo con el nombre indicado', async function () {
    await expect(await page.getByRole('alert')).toContainText(nombreIndicado);
});

Then('visualiza dentro del listado el grupo con los miembros indicados', async function () {
    nombreGrupo = 'After Office'
    row = page.locator(`app-grupos table tr:has(td:nth-child(2):text("${nombreGrupo}"))`);
    miembros = await row.locator('td:nth-child(4)')

    await expect(miembros.nth(1)).toContainText(miembroUno);
    await expect(miembros.nth(1)).toContainText(miembroDos);
    
});

After(async function () {
    if (browser) {
        await browser.close();
      }
  });