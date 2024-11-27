const { expect } = require("../../main/frontend/node_modules/@playwright/test");
const {
  createBdd,
} = require("../../main/frontend/node_modules/playwright-bdd");

const { test } = require("../../main/frontend/fixtures");
const { Given, When, Then } = createBdd(test);

let nombreIndicado;
let miembroUno;
let miembroDos;

let contexto = {};

Given("que el usuario inició Repartir", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox").fill("julian");
  await page.locator("#iniciarBienvenidaButton").click();
});

When(
  "el usuario crea un grupo indicando el nombre {string} con miembros {string} y {string}",
  async ({ page }, nombre, miembro1, miembro2) => {
    
    await crearGrupoConMiembros(page, nombre, [miembro1, miembro2]);
  }
);

async function crearGrupoConMiembros(page, nombre, miembros) {

  const gruposAntesDeCrearUnoNuevo = await page
      .locator("app-grupos table tr")
      .count();

    nombreIndicado = nombre;

    await page.locator("#crearGruposButton").click();
    await page.locator("#nombreGrupoNuevoInput").fill(nombre);

    for(let i = 0; i < miembros.length; i++) {
      await page.locator("#miembrosGrupoNuevoInput").fill(miembros[i]);
      await page.keyboard.press("Enter");
    }

    await page.locator("#guardarGrupoNuevoButton").click();

    await page.waitForFunction((gruposAntesDeCrearUnoNuevo) => {
      const gruposAhora = document.querySelectorAll(
        "app-grupos table tr"
      ).length;
      return gruposAhora > gruposAntesDeCrearUnoNuevo;
    }, gruposAntesDeCrearUnoNuevo);

    let ultimaFila = page.locator(`app-grupos table tr:has-text("${nombre}")`).last();
    let grupoId = await ultimaFila.locator("td:nth-child(1)").textContent();

    contexto.grupoId = grupoId;
}

When(
  "el usuario crea un grupo indicando el nombre {string}",
  async ({ page }, nombre) => {
    
    await crearGrupoConMiembros(page, nombre, ["Victor", "Brenda"]);
  }
);

When(
  "el usuario crea un grupo indicando que sus miembros son {string} y {string}",
  async ({ page }, miembro1, miembro2) => {
    miembroUno = miembro1;
    miembroDos = miembro2;

    await crearGrupoConMiembros(page, "Futbol del jueves", [miembro1, miembro2]);
  }
);

When("el usuario crea un grupo", async ({ page }) => {

  await crearGrupoConMiembros(page, "Grupo de 4", ["Guido", "Laura", "Mariano", "Juan Cruz"]);

});

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

Then(
  "debería visualizar dentro del listado el grupo con total {string}",
  async ({ page }, montoEsperado) => {
    let filaConGrupoId = page.locator(
      `app-grupos table tr:has(td:nth-child(1):text-is("${contexto.grupoId}"))`
    );
    let monto = await filaConGrupoId.locator("td:nth-child(3)");
    await expect(monto).toContainText(montoEsperado);
  }
);

Then(
  "debería visualizar dentro del listado el grupo {string} con total {string} y miembros {string} y {string}",
  async ({ page }, nombreEsperado, montoEsperado, miembroUno, miembroDos) => {
    const filaConGrupoId = page.locator(
      `app-grupos table tr:has(td:nth-child(1):text-is("${contexto.grupoId}"))`
    );
    const nombre = filaConGrupoId.locator("td:nth-child(2)");
    const monto = filaConGrupoId.locator("td:nth-child(3)");
    const miembros = filaConGrupoId.locator("td:nth-child(4)");

    await page.waitForSelector(
      `#agregarGastoGruposButton-${contexto.grupoId}`,
      { state: "attached", timeout: 5000 }
    );

    await expect(monto).toContainText(montoEsperado);
    await expect(miembros).toContainText(miembroUno);
    await expect(miembros).toContainText(miembroDos);
    await expect(nombre).toContainText(nombreEsperado);
  }
);

Then(
  "debería ser informado que necesita tener al menos dos miembros",
  async ({ page }) => {
    let mensajesToast = page.getByRole("alert");
    await mensajesToast.waitFor({ state: "visible", timeout: 2000 });

    await expect(mensajesToast).toContainText("Error");
    await expect(mensajesToast).toContainText("No se puede guardar");
  }
);

Then("no debería crear el grupo con un único miembro", async ({ page }) => {});

Then(
  "debería visualizar dentro del listado el grupo con el nombre indicado",
  async ({ page }) => {
    await expect(await page.getByRole("alert")).toContainText(nombreIndicado);
  }
);

Then(
  "visualiza dentro del listado el grupo con los miembros indicados",
  async ({ page }) => {
    const filaConGrupoId = page.locator(
      `app-grupos table tr:has(td:nth-child(1):text-is("${contexto.grupoId}"))`
    );
    const miembros = filaConGrupoId.locator("td:nth-child(4)");

    await page.waitForSelector(
      `#agregarGastoGruposButton-${contexto.grupoId}`,
      { state: "attached", timeout: 5000 }
    );

    await expect(miembros).toContainText(miembroUno);
    await expect(miembros).toContainText(miembroDos);
  }
);

module.exports = {
  contexto,
};
