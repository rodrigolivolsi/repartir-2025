import { When, Then, } from "@badeball/cypress-cucumber-preprocessor";

When("el usuario accede a la aplicación", function() {
  this.assembly.bienvenida.acceder();
});

Then("se muestra el mensaje de bienvenida", function() {
  this.assembly.bienvenida.validarMensajeDeBienvenida();
});