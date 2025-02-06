import { BienvenidaDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/bienvenida-driver";

export class BienvenidaCypressDriver implements BienvenidaDriver {
    constructor() {}

    iniciar(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    validarQueSePuedeUsar(): Promise<void> {
        throw new Error("Method not implemented.");
    }
  
    acceder = (): Promise<void> => {
      cy.visit("/");
      return Promise.resolve();
    }
  
    validarMensajeDeBienvenida = async (): Promise<void> => {
      cy.get(':nth-child(1) > .pl-4').should('contain', 'Repartir');
    };

  }