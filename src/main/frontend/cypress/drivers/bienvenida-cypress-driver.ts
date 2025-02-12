import { BienvenidaDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/bienvenida-driver";

// Preferimos utilizar la misma interfaz que estamos usando en la version con Playwright y por ese motivo los metodos
// son asincrónicos a pesar de que no lo necesiten en este caso.
export class BienvenidaCypressDriver implements BienvenidaDriver {
    constructor() {}

    async iniciar(): Promise<void> {
      cy.get('#usuarioInput').type("julian");
      cy.get('#iniciarBienvenidaButton').click();
    }

    async validarQueSePuedeUsar(): Promise<void> {
      cy.get('#crearGruposButton').click();
      cy.get('#nuevoGrupoDialog').should('be.visible');
    }
  
    async acceder(): Promise<void> {
      cy.visit("/");
    }
  
    async validarMensajeDeBienvenida(): Promise<void> {
      cy.get(':nth-child(1) > .pl-4').should('contain', 'Repartir');
    };

  }