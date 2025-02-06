import { When, Then, } from "@badeball/cypress-cucumber-preprocessor";

When("el usuario accede a la aplicación", function() {
  this.assembly.bienvenida.acceder();
});

Then("se muestra el mensaje de bienvenida", function() {
  this.assembly.bienvenida.validarMensajeDeBienvenida();
});

When("decidió iniciar", function () {
  this.assembly.bienvenida.iniciar();
});

Then("puede empezar a usarla", function () {
  this.assembly.bienvenida.validarQueSePuedeUsar();
});