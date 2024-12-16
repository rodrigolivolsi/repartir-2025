import { createBdd } from "../../main/frontend/node_modules/playwright-bdd";
import { test } from "../src/fixtures";

const { Given, When, Then, BeforeAll } = createBdd(test);

BeforeAll(async (...args) => {
  console.log("asd:::", args);
});

Given("que el usuario inició Repartir", async ({ assembly }) => {
  await assembly.grupos.iniciar();
});

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
  async ({ assembly }) => {
    await assembly.grupos.crearConUnUnicoMiembro();
  }
);

Then(
  "debería ser informado que necesita tener al menos dos miembros",
  async ({ assembly }) => {
    await assembly.grupos.validarMensajeDeAlMenosDosMiembros();
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
  async ({ assembly }) => {
    await assembly.grupos.validarMiembrosDeGrupo();
  }
);
