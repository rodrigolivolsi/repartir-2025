import { BienvenidaDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/bienvenida-driver";

export class BienvenidaHttpDriver2 implements BienvenidaDriver {

    private inicio: any = undefined;
    private pedido: any = undefined;
  
    acceder = async (): Promise<void> => {
        cy.visit("noexiste");
        expect(true).to.be.false;
      //this.inicio = await this.request.get("/api/grupos");
    };
  
    iniciar = async (): Promise<void> => {
        expect(1).to.be.equal(2);
      //this.pedido = await this.request.get("/api/usuarios/julian");
    };
  
    validarMensajeDeBienvenida = async (): Promise<void> => {
      //expect(this.inicio.ok()).toBeTruthy();
    };
  
    validarQueSePuedeUsar = async (): Promise<void> => {
      //expect(this.pedido.ok()).toBeTruthy();
    };
  }