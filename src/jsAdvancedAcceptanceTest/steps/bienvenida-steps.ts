import { createBdd } from "../../main/frontend/node_modules/playwright-bdd";
import { test } from "../src/fixtures";

const { Given, When, Then } = createBdd(test);

Given("el usuario accede a la aplicación", async ({ assembly }) => {
  await assembly["bienvenida"].acceder();
});

Then("se muestra el mensaje de bienvenida", async ({ assembly }) => {
  await assembly["bienvenida"].validarMensajeDeBienvenida();
});

When("decidió iniciar", async ({ assembly }) => {
  await assembly["bienvenida"].iniciar();
});

Then("puede empezar a usarla", async ({ assembly }) => {
  await assembly["bienvenida"].validarQueSePuedeUsar();
});
