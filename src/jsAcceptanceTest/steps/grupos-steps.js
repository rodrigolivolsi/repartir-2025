const {
  createBdd,
} = require("../../main/frontend/node_modules/playwright-bdd");

const { test } = require("../../main/frontend/fixtures");
const { Given, When, Then } = createBdd(test);

Given("que el usuario inició Repartir", async ({ assembly }) => {
  await assembly.grupos.iniciar();
});

When(
  "el usuario crea un grupo indicando el nombre {string} con miembros {string} y {string}",
  async ({ page }, nombre, miembro1, miembro2) => {
    const gruposAntesDeCrearUnoNuevo = await page
      .locator("app-grupos table tr")
      .count();
    nombreIndicado = nombre;
    await page.locator("#crearGruposButton").click();
    await page.locator("#nombreGrupoNuevoInput").fill(nombre);
    await page.locator("#miembrosGrupoNuevoInput").fill(miembro1);
    await page.keyboard.press("Enter");
    await page.locator("#miembrosGrupoNuevoInput").fill(miembro2);
    await page.keyboard.press("Enter");
    await page.locator("#guardarGrupoNuevoButton").click();

    await page.waitForFunction((gruposAntesDeCrearUnoNuevo) => {
      const gruposAhora = document.querySelectorAll(
        "app-grupos table tr"
      ).length;
      return gruposAhora > gruposAntesDeCrearUnoNuevo;
    }, gruposAntesDeCrearUnoNuevo);

    let ultimaFila = page.locator("app-grupos table tr").last();
    let grupoId = await ultimaFila.locator("td:nth-child(1)").textContent();

    contexto.grupoId = grupoId;
  }
);

When(
  "el usuario crea un grupo indicando el nombre {string}",
  async ({ assembly }, nombre) => {
    await assembly.grupos.crearCon(nombre);
  }
);

When(
  "el usuario crea un grupo indicando que sus miembros son {string} y {string}",
  async ({ assembly }, miembro1, miembro2) => {
    await assembly.grupos.crearConMiembros([miembro1, miembro2]);
  }
);

When("el usuario crea un grupo", async ({ assembly }) => {
  await assembly.grupos.crear();
});

Then(
  "debería visualizar dentro del listado el grupo con total $ {string}",
  async ({ assembly }, montoEsperado) => {
    await assembly.grupos.validarMontoTotal(montoEsperado);
  }
);

When(
  "el usuario intenta crear un grupo indicando un único miembro",
  async ({ page }) => {
    await page.locator("#crearGruposButton").click();

    await page.locator("#nombreGrupoNuevoInput").fill("After Office");

    await page.locator("#miembrosGrupoNuevoInput").fill("Oscar");
    await page.keyboard.press("Enter");

    await page.locator("#guardarGrupoNuevoButton").click();
  }
);

Then("no debería crear el grupo con un único miembro", async ({ page }) => {});

Then(
  "debería visualizar dentro del listado el grupo con el nombre indicado",
  async ({ assembly }) => {
    await assembly.grupos.validarNombreDeGrupo();
  }
);
