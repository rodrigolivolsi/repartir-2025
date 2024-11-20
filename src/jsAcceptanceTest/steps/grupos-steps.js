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

Then(
  "debería visualizar dentro del listado el grupo {string} con total {string} y miembros {string} y {string}",
  async ({ page }, nombreEsperado, montoEsperado, miembroUno, miembroDos) => {
    const filaConGrupoId = page.locator(
      `app-grupos table tr:has(td:nth-child(1):text("${contexto.grupoId}"))`
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
  async ({ assembly }) => {
    await assembly.grupos.validarNombreDeGrupo();
  }
);

Then(
  "visualiza dentro del listado el grupo con los miembros indicados",
  async ({ page }) => {
    let nombreGrupo = "After Office";
    let row = page.locator(
      `app-grupos table tr:has(td:nth-child(2):text("${nombreGrupo}"))`
    );
    let miembros = await row.locator("td:nth-child(4)");

    await expect(miembros.nth(1)).toContainText(miembroUno);
    await expect(miembros.nth(1)).toContainText(miembroDos);
  }
);
