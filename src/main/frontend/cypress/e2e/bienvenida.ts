import { When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { CustomContext, } from "cypress/support/e2e";

When("el usuario accede a la aplicación", function(this: CustomContext) {
  this.assembly.bienvenida.acceder();
});

Then("se muestra el mensaje de bienvenida", function(this: CustomContext) {
  this.assembly.bienvenida.validarMensajeDeBienvenida();
});

When("decidió iniciar", function (this: CustomContext) {
  this.assembly.bienvenida.iniciar();
});

Then("puede empezar a usarla", function (this: CustomContext) {
  this.assembly.bienvenida.validarQueSePuedeUsar();
});