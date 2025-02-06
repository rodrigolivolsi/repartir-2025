import { BienvenidaDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/bienvenida-driver";

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
  
    acceder = (): Promise<void> => {
      cy.visit("/");
      return Promise.resolve();
    }
  
    validarMensajeDeBienvenida = async (): Promise<void> => {
      cy.get(':nth-child(1) > .pl-4').should('contain', 'Repartir');
    };

  }