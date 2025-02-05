import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("el usuario accede a la aplicación", () => {
  //await assembly.bienvenida.acceder();
  expect(Cypress.env("testData").apiKey).to.equal("mock-api");
});

Then("se muestra el mensaje de bienvenida", () => {
  cy.get("input").should(
    "have.attr",
    "placeholder",
    "Search the web without being tracked"
  );
});