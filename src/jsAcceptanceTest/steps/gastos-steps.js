const {
  createBdd,
} = require("../../main/frontend/node_modules/playwright-bdd");

const { test } = require("../src/fixtures");
const { When } = createBdd(test);
const { contexto } = require("./grupos-steps.js");

When(
  "el usuario selecciona el grupo {string} y agrega un monto de ${string}",
  async ({ page }, nombreGrupo, monto) => {
    const agregarGastoButton = page.locator(
      `#agregarGastoGruposButton-${contexto.grupoId}`
    );

    await agregarGastoButton.waitFor({ state: "visible", timeout: 2000 });
    await agregarGastoButton.click();

    const montoInput = page.locator("#montoGastoNuevoInput");

    await montoInput.waitFor({ state: "visible", timeout: 2000 });
    await montoInput.fill("");
    await montoInput.fill(monto);

    const guardarGastoButton = page.locator("#guardarGastoNuevoButton");

    await guardarGastoButton.waitFor({ state: "visible", timeout: 2000 });
    await guardarGastoButton.click();
  }
);
