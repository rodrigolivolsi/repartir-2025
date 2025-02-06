import { BienvenidaDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/bienvenida-driver";

export class BienvenidaHttpDriver2 implements BienvenidaDriver {

    private inicio: any = undefined;
    private pedido: any = undefined;
  
    acceder = (): void => {
      cy.wrap(fetch("/api/grupos").then(respuesta => this.inicio = respuesta));
    };
  
    iniciar = (): void => {
      cy.wrap(fetch("/api/usuarios/julian").then(respuesta => this.pedido = respuesta));
    };
  
    validarMensajeDeBienvenida =  (): void => {
      expect(this.inicio.status).to.be.equal(200);
    };
  
    validarQueSePuedeUsar =  (): void => {
      expect(this.pedido.status).to.be.equal(200);
    };
  }