import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("el usuario accede a la aplicación", () => {
  const assembly = Cypress.env("assembly");
  cy.log("assembly", assembly);
  assembly.bienvenida.acceder();
});

Then("se muestra el mensaje de bienvenida", () => {
  const assembly = Cypress.env("assembly");
  assembly.bienvenida.validarMensajeDeBienvenida();
});