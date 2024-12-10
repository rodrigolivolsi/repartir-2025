import { createBdd } from "../../main/frontend/node_modules/playwright-bdd";
import { test } from "../src/fixtures";

const { Given, When, Then } = createBdd(test);

Given("el usuario accede a la aplicación", async ({ assembly }) => {
  const bienvenida = assembly.drivers.bienvenida;
  await bienvenida.acceder?.();
});

Then("se muestra el mensaje de bienvenida", async ({ assembly }) => {
  await assembly.drivers.bienvenida.validarMensajeDeBienvenida?.();
});

When("decidió iniciar", async ({ assembly }) => {
  await assembly.drivers.bienvenida.iniciar?.();
});

Then("puede empezar a usarla", async ({ assembly }) => {
  await assembly.drivers.bienvenida.validarQueSePuedeUsar?.();
});
